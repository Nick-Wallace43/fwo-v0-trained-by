'use client'

import { RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { Tag } from '@/components/tag'
import { buildWhyLine, formatMovementType } from '@/lib/exercise-insights'
import { useTrainedBy } from '@/hooks/use-trainedby'
import type { Exercise, GeneratedWorkoutExercise } from '@/lib/types'

// A single exercise within a generated or saved workout: name, badges, sets x
// reps, a live "Why" line, and an optional swap control. The why line is
// computed from live follow state on every render, so it stays accurate even
// when reopening a workout saved in the past.
export function WorkoutExerciseRow({
  exercise,
  spec,
  onSwap,
  swapDisabled,
  backHref,
  backLabel,
}: {
  exercise: Exercise
  spec: GeneratedWorkoutExercise
  onSwap?: () => void
  swapDisabled?: boolean
  // Where the exercise detail page's back link should return to. When set, it
  // is passed through as query params so returning lands on the originating
  // page (e.g. the workout builder) instead of the Workouts home.
  backHref?: string
  backLabel?: string
}) {
  const { countFollowedEndorsers, followedCount } = useTrainedBy()
  const count = countFollowedEndorsers(exercise.doneBy)
  const why = buildWhyLine(spec.movementType, count, followedCount)

  const detailHref = backHref
    ? `/exercise/${exercise.id}?from=${encodeURIComponent(backHref)}&fromLabel=${encodeURIComponent(backLabel ?? 'Back')}`
    : `/exercise/${exercise.id}`

  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50">
      <Link
        href={detailHref}
        className="min-w-0 flex-1 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={`View details for ${exercise.name}`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-base font-semibold uppercase leading-tight tracking-tight text-balance">
            {exercise.name}
          </h3>
          <Tag variant="outline">{formatMovementType(spec.movementType)}</Tag>
          {spec.compound && <Tag variant="accent">Compound</Tag>}
        </div>
        <p className="mt-1.5 text-sm font-semibold text-primary">
          {spec.sets} x {spec.repsLabel}
        </p>
        <p className="mt-1 text-sm text-muted-foreground text-pretty">{why}</p>
      </Link>
      {onSwap && (
        <button
          type="button"
          onClick={onSwap}
          disabled={swapDisabled}
          aria-label={`Swap ${exercise.name} for an alternative`}
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary active:scale-95 disabled:opacity-30 disabled:active:scale-100 disabled:hover:border-border disabled:hover:text-muted-foreground"
        >
          <RefreshCw className="size-4" />
        </button>
      )}
    </div>
  )
}
