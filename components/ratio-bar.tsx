import { cn } from '@/lib/utils'

// Single shared "X of Y people you follow ___" line + progress bar. Used on
// exercise cards, supplement cards, and the exercise detail page so every
// ratio stat in the app looks and behaves identically.
export function RatioBar({
  count,
  total,
  verb,
  size = 'md',
  className,
}: {
  count: number
  total: number
  verb: string
  size?: 'md' | 'lg'
  className?: string
}) {
  const ratio = total > 0 ? count / total : 0
  const percent = Math.round(ratio * 100)

  return (
    <div className={className}>
      <p
        className={cn(
          'font-display font-semibold uppercase leading-tight tracking-tight',
          size === 'lg' ? 'text-xl' : 'text-lg',
        )}
      >
        <span className={count > 0 ? 'text-primary' : 'text-muted-foreground'}>{count}</span>{' '}
        <span className="text-muted-foreground">
          {`of ${total} ${total === 1 ? 'person' : 'people'} you follow ${verb}`}
        </span>
      </p>
      <div
        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={count}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${count} of ${total} followed creators ${verb}`}
      >
        <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
