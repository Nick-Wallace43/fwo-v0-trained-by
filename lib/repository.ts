import type { Exercise, GeneratedWorkout, Influencer, Macros, Meal, SavedWorkout, Supplement, UserStats } from './types'
import * as builder from './workout-builder'
import * as macroEngine from './macro-engine'
import * as dayBuilder from './day-builder'
import { nutritionRules } from './seed'
import { getSnapshot, persistFollowedIds, persistSavedWorkouts, persistUserStats } from './storage'

// Data access API. UI never calls storage directly — it goes through here (via
// the hook). Reads are derived from the current snapshot; writes go to storage.
// Replace the storage import with API calls to move off localStorage later.

function isFollowed(creatorIds: string[], followedIds: string[]): boolean {
  return creatorIds.some((id) => followedIds.includes(id))
}

function followedCountAmong(creatorIds: string[], followedIds: string[]): number {
  return creatorIds.reduce((total, id) => (followedIds.includes(id) ? total + 1 : total), 0)
}

// Zero-followed items sink to the bottom; ties keep their original order.
function sortByFollowedEndorsers<T>(
  items: T[],
  creatorsOf: (item: T) => string[],
  followedIds: string[],
): T[] {
  return [...items].sort(
    (a, b) => followedCountAmong(creatorsOf(b), followedIds) - followedCountAmong(creatorsOf(a), followedIds),
  )
}

// How many of an item's creators the user currently follows. Used by the UI
// to render the "X of Y people you follow" count.
export function countFollowedEndorsers(creatorIds: string[]): number {
  return followedCountAmong(creatorIds, getSnapshot().followedIds)
}

export function getInfluencers(): Influencer[] {
  return getSnapshot().data.influencers
}

export function getInfluencer(id: string): Influencer | undefined {
  return getSnapshot().data.influencers.find((influencer) => influencer.id === id)
}

export function getFollowedIds(): string[] {
  return getSnapshot().followedIds
}

export function isFollowing(id: string): boolean {
  return getSnapshot().followedIds.includes(id)
}

export function follow(id: string): void {
  const ids = getSnapshot().followedIds
  if (!ids.includes(id)) persistFollowedIds([...ids, id])
}

export function unfollow(id: string): void {
  persistFollowedIds(getSnapshot().followedIds.filter((existing) => existing !== id))
}

export function toggleFollow(id: string): void {
  if (isFollowing(id)) unfollow(id)
  else follow(id)
}

// Canonical muscle-group order for the selector. Groups the seed doesn't use
// are dropped so chips only show groups that actually have exercises.
const MUSCLE_GROUP_ORDER = [
  'chest',
  'back',
  'shoulders',
  'biceps',
  'triceps',
  'quads',
  'hamstrings',
  'calves',
  'forearms',
  'traps',
  'abs',
]

export function getMuscleGroups(): string[] {
  const present = new Set(getSnapshot().data.exercises.map((exercise) => exercise.muscleGroup.toLowerCase()))
  return MUSCLE_GROUP_ORDER.filter((group) => present.has(group))
}

export function getExercise(id: string): Exercise | undefined {
  return getSnapshot().data.exercises.find((exercise) => exercise.id === id)
}

export function getExercises(followedOnly: boolean, muscleGroup?: string): Exercise[] {
  const { data, followedIds } = getSnapshot()
  let items = followedOnly
    ? data.exercises.filter((exercise) => isFollowed(exercise.doneBy, followedIds))
    : data.exercises
  if (muscleGroup) {
    items = items.filter((exercise) => exercise.muscleGroup.toLowerCase() === muscleGroup.toLowerCase())
  }
  return sortByFollowedEndorsers(items, (exercise) => exercise.doneBy, followedIds)
}

export function getMeals(followedOnly: boolean): Meal[] {
  const { data, followedIds } = getSnapshot()
  const items = followedOnly
    ? data.meals.filter((meal) => isFollowed(meal.madeBy, followedIds))
    : data.meals
  return sortByFollowedEndorsers(items, (meal) => meal.madeBy, followedIds)
}

// Canonical category order for the filter chips. Categories the seed
// doesn't use are dropped so chips only show categories that actually exist.
const SUPPLEMENT_CATEGORY_ORDER = ['performance', 'protein', 'health', 'recovery']

export function getSupplementCategories(): string[] {
  const present = new Set(getSnapshot().data.supplements.map((supplement) => supplement.category.toLowerCase()))
  return SUPPLEMENT_CATEGORY_ORDER.filter((category) => present.has(category))
}

export function getSupplements(followedOnly: boolean, category?: string): Supplement[] {
  const { data, followedIds } = getSnapshot()
  let items = followedOnly
    ? data.supplements.filter((supplement) => isFollowed(supplement.endorsedBy, followedIds))
    : data.supplements
  if (category) {
    items = items.filter((supplement) => supplement.category.toLowerCase() === category.toLowerCase())
  }
  return sortByFollowedEndorsers(items, (supplement) => supplement.endorsedBy, followedIds)
}

// Workout builder — generation, swapping, and duration all run against the
// live snapshot so results reflect current follow state; the algorithm
// itself lives in workout-builder.ts and takes no dependency on storage.
export function generateWorkout(muscleGroups: string[]): GeneratedWorkout {
  const { data, followedIds } = getSnapshot()
  return builder.generateWorkout(muscleGroups, data.exercises, followedIds)
}

export function canSwapExercise(workout: GeneratedWorkout, index: number): boolean {
  const { data, followedIds } = getSnapshot()
  return builder.canSwap(workout, index, data.exercises, followedIds)
}

export function swapExerciseInWorkout(workout: GeneratedWorkout, index: number): GeneratedWorkout {
  const { data, followedIds } = getSnapshot()
  return builder.swapExercise(workout, index, data.exercises, followedIds)
}

export function estimateWorkoutDuration(workout: GeneratedWorkout): number {
  return builder.estimateDurationMinutes(workout)
}

export function getSavedWorkouts(): SavedWorkout[] {
  return getSnapshot().savedWorkouts
}

export function getSavedWorkout(id: string): SavedWorkout | undefined {
  return getSnapshot().savedWorkouts.find((workout) => workout.id === id)
}

export function saveWorkout(name: string, workout: GeneratedWorkout): SavedWorkout {
  const saved: SavedWorkout = {
    ...workout,
    id: `workout-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    createdAt: new Date().toISOString(),
  }
  persistSavedWorkouts([...getSnapshot().savedWorkouts, saved])
  return saved
}

// Nutrition — user stats persist to storage; macro targets and day-building
// are pure functions in macro-engine.ts / day-builder.ts that the repository
// wires to the live ruleset and meal catalog.
export function getUserStats(): UserStats {
  return getSnapshot().userStats
}

export function saveUserStats(stats: UserStats): void {
  persistUserStats(stats)
}

export function getMacroTargets(stats: UserStats): Macros {
  return macroEngine.computeMacroTargets(stats.bodyweight, stats.goal, nutritionRules)
}

// Meals of a given eating style, always ranked by followed-endorser count
// descending (independent of the followedOnly display filter).
export function getMealsByStyle(followedOnly: boolean, style: Meal['style']): Meal[] {
  return getMeals(followedOnly).filter((meal) => meal.style === style)
}

function stylePool(style: Meal['style']): Meal[] {
  return getMeals(false).filter((meal) => meal.style === style)
}

export function buildDay(style: Meal['style'], target: Macros): Meal[] {
  return dayBuilder.buildDay(stylePool(style), target)
}

export function isDayWithinTolerance(day: Meal[], target: Macros): boolean {
  return dayBuilder.isDayWithinTolerance(day, target)
}

export function dayTotals(day: Meal[]): Macros {
  return dayBuilder.dayTotals(day)
}

export function swapDayMeal(day: Meal[], index: number, style: Meal['style'], target: Macros): Meal[] {
  const alternative = dayBuilder.findBestSwap(day, index, stylePool(style), target)
  if (!alternative) return day
  const next = [...day]
  next[index] = alternative
  return next
}
