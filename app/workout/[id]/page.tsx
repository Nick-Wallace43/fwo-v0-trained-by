'use client'

import { useParams } from 'next/navigation'
import { BackLink } from '@/components/back-link'
import { PageHeader } from '@/components/page-header'
import { WorkoutExerciseRow } from '@/components/workout-exercise-row'
import { WorkoutSummaryHeader } from '@/components/workout-summary-header'
import { useTrainedBy } from '@/hooks/use-trainedby'

export default function SavedWorkoutPage() {
  const params = useParams<{ id: string }>()
  const { getSavedWorkout, getExercise, estimateWorkoutDuration } = useTrainedBy()
  const workout = getSavedWorkout(params.id)

  if (!workout) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6">
        <BackLink href="/" label="Workouts" className="mb-4" />
        <p className="text-sm text-muted-foreground">Workout not found.</p>
      </div>
    )
  }

  const duration = estimateWorkoutDuration(workout)
  const createdLabel = new Date(workout.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6">
      <PageHeader title={workout.name} description={`Saved ${createdLabel}`} backHref="/" backLabel="Workouts" />

      <div className="flex flex-col gap-4">
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
                backHref={`/workout/${workout.id}`}
                backLabel="Workout"
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
