'use client'

import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { BackLink } from '@/components/back-link'
import { MultiChipSelector } from '@/components/multi-chip-selector'
import { PageHeader } from '@/components/page-header'
import { WorkoutExerciseRow } from '@/components/workout-exercise-row'
import { WorkoutSummaryHeader } from '@/components/workout-summary-header'
import { useTrainedBy } from '@/hooks/use-trainedby'
import type { GeneratedWorkout } from '@/lib/types'

export default function BuildWorkoutPage() {
  const {
    getMuscleGroups,
    getExercise,
    generateWorkout,
    canSwapExercise,
    swapExerciseInWorkout,
    estimateWorkoutDuration,
    saveWorkout,
  } = useTrainedBy()

  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [workout, setWorkout] = useState<GeneratedWorkout | null>(null)
  const [workoutName, setWorkoutName] = useState('')
  const [savedId, setSavedId] = useState<string | null>(null)

  const muscleGroups = getMuscleGroups()

  function toggleGroup(id: string): void {
    setSelectedGroups((prev) => (prev.includes(id) ? prev.filter((group) => group !== id) : [...prev, id]))
  }

  function handleGenerate(): void {
    if (selectedGroups.length === 0) return
    setWorkout(generateWorkout(selectedGroups))
    setSavedId(null)
  }

  function handleSwap(index: number): void {
    if (!workout) return
    setWorkout(swapExerciseInWorkout(workout, index))
  }

  function handleSave(): void {
    if (!workout || workoutName.trim().length === 0) return
    const record = saveWorkout(workoutName.trim(), workout)
    setSavedId(record.id)
  }

  const duration = workout ? estimateWorkoutDuration(workout) : 0

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6">
      <PageHeader
        title="Build a Workout"
        description="Pick muscle groups and we'll build a workout from the creators you follow."
        backHref="/"
        backLabel="Workouts"
      />

      <section className="mb-6 flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Muscle groups</h2>
        <MultiChipSelector
          ariaLabel="Muscle groups"
          options={muscleGroups.map((group) => ({ id: group, label: group }))}
          value={selectedGroups}
          onToggle={toggleGroup}
        />
        <button
          type="button"
          onClick={handleGenerate}
          disabled={selectedGroups.length === 0}
          className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100"
        >
          <Sparkles className="size-4" />
          {workout ? 'Regenerate Workout' : 'Generate Workout'}
        </button>
      </section>

      {workout && (
        <section className="flex flex-col gap-4">
          <WorkoutSummaryHeader
            exerciseCount={workout.exercises.length}
            durationMinutes={duration}
            muscleGroups={workout.muscleGroups}
          />

          <div className="flex flex-col gap-3">
            {workout.exercises.map((spec, index) => {
              const exercise = getExercise(spec.exerciseId)
              if (!exercise) return null
              return (
                <WorkoutExerciseRow
                  key={`${spec.exerciseId}-${index}`}
                  exercise={exercise}
                  spec={spec}
                  onSwap={() => handleSwap(index)}
                  swapDisabled={!canSwapExercise(workout, index)}
                />
              )
            })}
          </div>

          {savedId ? (
            <div className="rounded-xl border border-primary/40 bg-primary/10 px-4 py-4 text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Workout saved</p>
              <Link
                href="/"
                className="mt-2 inline-block text-sm font-semibold uppercase tracking-wide text-foreground underline"
              >
                Back to Workouts
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
              <label
                htmlFor="workout-name"
                className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
              >
                Name this workout
              </label>
              <div className="flex flex-wrap gap-2">
                <input
                  id="workout-name"
                  value={workoutName}
                  onChange={(event) => setWorkoutName(event.target.value)}
                  placeholder="e.g. Back &amp; Biceps Day"
                  className="min-h-11 min-w-[10rem] flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={workoutName.trim().length === 0}
                  className="min-h-11 rounded-lg bg-primary px-4 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all active:scale-95 disabled:opacity-40 disabled:active:scale-100"
                >
                  Save Workout
                </button>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
