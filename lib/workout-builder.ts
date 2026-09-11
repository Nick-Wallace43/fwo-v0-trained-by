// Deterministic workout-generation logic. Pure functions only — no storage or
// React imports — so the repository can wire it to live data and the UI never
// touches these rules directly. A future API layer could reimplement this
// server-side without any UI changes.

import type { Exercise, GeneratedWorkout, GeneratedWorkoutExercise } from './types'
import { workoutRules } from './seed'

const SETS_REPS = {
  compound: { sets: 4, repsLabel: '6-8' },
  isolation: { sets: 3, repsLabel: '10-15' },
} as const

function countFollowed(exercise: Exercise, followedIds: string[]): number {
  return exercise.doneBy.filter((id) => followedIds.includes(id)).length
}

// Exercises for a muscle group, restricted to ones at least one followed
// creator does, ranked by followed-count descending (ties broken by name).
function rankedPool(exercises: Exercise[], muscleGroup: string, followedIds: string[]): Exercise[] {
  return exercises
    .filter((exercise) => exercise.muscleGroup.toLowerCase() === muscleGroup.toLowerCase())
    .filter((exercise) => countFollowed(exercise, followedIds) > 0)
    .sort((a, b) => {
      const diff = countFollowed(b, followedIds) - countFollowed(a, followedIds)
      return diff !== 0 ? diff : a.name.localeCompare(b.name)
    })
}

function targetExerciseCount(groupCount: number): number {
  return groupCount <= 1 ? 5 : 6
}

// Give each group enough slots for its required movement types first, then
// spread remaining slots round-robin starting from the first selected group.
function allocateSlots(groups: string[], total: number): number[] {
  const minimums = groups.map((group) => Math.min(workoutRules[group]?.requiredMovementTypes.length || 1, total))
  const allocated = [...minimums]
  let used = allocated.reduce((sum, n) => sum + n, 0)

  while (used > total) {
    const maxIndex = allocated.indexOf(Math.max(...allocated))
    allocated[maxIndex] -= 1
    used -= 1
  }

  let remaining = total - used
  let cursor = 0
  while (remaining > 0) {
    allocated[cursor % groups.length] += 1
    remaining -= 1
    cursor += 1
  }

  return allocated
}

function toGeneratedExercise(exercise: Exercise): GeneratedWorkoutExercise {
  const spec = exercise.compound ? SETS_REPS.compound : SETS_REPS.isolation
  return {
    exerciseId: exercise.id,
    muscleGroup: exercise.muscleGroup,
    movementType: exercise.movementType,
    compound: exercise.compound,
    sets: spec.sets,
    repsLabel: spec.repsLabel,
  }
}

export function generateWorkout(
  muscleGroups: string[],
  exercises: Exercise[],
  followedIds: string[],
): GeneratedWorkout {
  const total = targetExerciseCount(muscleGroups.length)
  const slotsPerGroup = allocateSlots(muscleGroups, total)
  const pools = new Map(muscleGroups.map((group) => [group, rankedPool(exercises, group, followedIds)]))

  const typeCounts = new Map<string, number>()
  const usedIds = new Set<string>()
  const picked: Exercise[] = []

  function canTake(exercise: Exercise): boolean {
    if (usedIds.has(exercise.id)) return false
    const cap = workoutRules[exercise.muscleGroup]?.maxPerMovementType ?? 2
    return (typeCounts.get(exercise.movementType) ?? 0) < cap
  }

  function take(exercise: Exercise): void {
    usedIds.add(exercise.id)
    picked.push(exercise)
    typeCounts.set(exercise.movementType, (typeCounts.get(exercise.movementType) ?? 0) + 1)
  }

  muscleGroups.forEach((group, index) => {
    const rule = workoutRules[group]
    const pool = pools.get(group) ?? []
    let slots = slotsPerGroup[index]

    // Required movement types first (e.g. back needs a vertical AND horizontal pull).
    if (rule) {
      for (const movementType of rule.requiredMovementTypes) {
        if (slots <= 0) break
        const candidate = pool.find((exercise) => exercise.movementType === movementType && canTake(exercise))
        if (candidate) {
          take(candidate)
          slots -= 1
        }
      }
    }

    // Fill remaining slots for this group, compounds before isolation.
    const remainingCandidates = pool
      .filter((exercise) => canTake(exercise))
      .sort((a, b) => Number(b.compound) - Number(a.compound))
    for (const exercise of remainingCandidates) {
      if (slots <= 0) break
      if (!canTake(exercise)) continue
      take(exercise)
      slots -= 1
    }
  })

  // If some groups ran out of eligible exercises, backfill from any selected
  // group's pool so the workout still reaches its target count where possible.
  let shortfall = total - picked.length
  if (shortfall > 0) {
    const everyCandidate = muscleGroups
      .flatMap((group) => pools.get(group) ?? [])
      .filter((exercise) => canTake(exercise))
      .sort((a, b) => Number(b.compound) - Number(a.compound))
    for (const exercise of everyCandidate) {
      if (shortfall <= 0) break
      if (!canTake(exercise)) continue
      take(exercise)
      shortfall -= 1
    }
  }

  return {
    muscleGroups,
    exercises: picked.map(toGeneratedExercise),
  }
}

// Next-ranked exercise in the same muscle group and movement type that isn't
// already in the workout — "the same rule" the swapped-out exercise satisfied.
export function findSwapAlternative(
  workout: GeneratedWorkout,
  index: number,
  exercises: Exercise[],
  followedIds: string[],
): Exercise | undefined {
  const current = workout.exercises[index]
  if (!current) return undefined
  const usedIds = new Set(workout.exercises.map((exercise) => exercise.exerciseId))
  return rankedPool(exercises, current.muscleGroup, followedIds).find(
    (exercise) => exercise.movementType === current.movementType && !usedIds.has(exercise.id),
  )
}

export function canSwap(
  workout: GeneratedWorkout,
  index: number,
  exercises: Exercise[],
  followedIds: string[],
): boolean {
  return Boolean(findSwapAlternative(workout, index, exercises, followedIds))
}

export function swapExercise(
  workout: GeneratedWorkout,
  index: number,
  exercises: Exercise[],
  followedIds: string[],
): GeneratedWorkout {
  const alternative = findSwapAlternative(workout, index, exercises, followedIds)
  if (!alternative) return workout
  const nextExercises = [...workout.exercises]
  nextExercises[index] = toGeneratedExercise(alternative)
  return { ...workout, exercises: nextExercises }
}

// ~3 minutes per set (work + rest), rounded to the nearest 5 for a clean estimate.
export function estimateDurationMinutes(workout: GeneratedWorkout): number {
  const totalSets = workout.exercises.reduce((sum, exercise) => sum + exercise.sets, 0)
  return Math.round((totalSets * 3) / 5) * 5
}
