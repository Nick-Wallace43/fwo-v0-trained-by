import { cn } from '@/lib/utils'
import { initials } from '@/lib/utils'

// Small circular initials avatar. Reused wherever a creator needs a compact
// visual token (exercise attribution chips, etc.).
export function InitialsAvatar({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display text-[10px] font-semibold uppercase text-primary ring-1 ring-primary/30',
        className,
      )}
      title={name}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}
