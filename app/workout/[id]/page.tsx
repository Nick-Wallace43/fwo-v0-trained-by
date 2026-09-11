'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { WorkoutExerciseRow } from '@/components/workout-exercise-row'
import { WorkoutSummaryHeader } from '@/components/workout-summary-header'
import { useTrainedBy } from '@/hooks/use-trainedby'

export default function SavedWorkoutPage() {
  const params = useParams<{ id: string }>()
  const { getSavedWorkout, getExercise, estimateWorkoutDuration } = useTrainedBy()
  const workout = getSavedWorkout(params.id)

  const backLink = (
    <Link
      href="/"
      className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="size-4" />
      Workouts
    </Link>
  )

  if (!workout) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6">
        {backLink}
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
      {backLink}

      <header className="mb-5">
        <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-balance">
          {workout.name}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Saved {createdLabel}</p>
      </header>

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
            return <WorkoutExerciseRow key={`${spec.exerciseId}-${index}`} exercise={exercise} spec={spec} />
          })}
        </div>
      </div>
    </div>
  )
}
