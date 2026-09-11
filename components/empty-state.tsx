import type { LucideIcon } from 'lucide-react'

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-14 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        <Icon className="size-6" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-tight">
        {title}
      </h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground text-pretty">{description}</p>
    </div>
  )
}
