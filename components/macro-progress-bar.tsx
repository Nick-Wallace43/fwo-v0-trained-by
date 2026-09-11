import { cn } from '@/lib/utils'

// Single macro's progress toward its target, used in the "Build my day"
// totals. Bar color flags whether the total lands within the 10% tolerance.
export function MacroProgressBar({
  label,
  current,
  target,
  unit,
  withinTolerance,
}: {
  label: string
  current: number
  target: number
  unit?: string
  withinTolerance: boolean
}) {
  const percent = target > 0 ? Math.min((current / target) * 100, 100) : 0

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{label}</span>
        <span className="text-xs font-semibold text-foreground">
          {current}
          {unit} <span className="text-muted-foreground">/ {target}{unit}</span>
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn('h-full rounded-full transition-all', withinTolerance ? 'bg-primary' : 'bg-muted-foreground')}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
