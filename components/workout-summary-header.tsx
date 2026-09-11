import { Clock, ListChecks } from 'lucide-react'

// Total exercise count and estimated duration shown at the top of a generated
// or saved workout, plus the muscle groups it targets.
export function WorkoutSummaryHeader({
  exerciseCount,
  durationMinutes,
  muscleGroups,
}: {
  exerciseCount: number
  durationMinutes: number
  muscleGroups: string[]
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-primary/40 bg-primary/10 px-4 py-3">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
        <ListChecks className="size-4" />
        {exerciseCount} exercises
      </div>
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
        <Clock className="size-4" />
        ~{durationMinutes} min
      </div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{muscleGroups.join(' + ')}</div>
    </div>
  )
}
