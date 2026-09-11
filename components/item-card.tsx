import type { ReactNode } from 'react'
import { CreatorBadge } from '@/components/creator-badge'

// Shared card primitive reused across Workouts, Nutrition, and Supplements.
// Keeps titles, tag rows, body content, and creator attribution consistent.
export function ItemCard({
  title,
  tags,
  attributionLabel,
  creatorIds,
  children,
}: {
  title: string
  tags?: ReactNode
  attributionLabel: string
  creatorIds: string[]
  children?: ReactNode
}) {
  return (
    <article className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30">
      <h3 className="font-display text-xl font-semibold uppercase leading-none tracking-tight text-pretty">
        {title}
      </h3>

      {tags ? <div className="mt-3 flex flex-wrap gap-2">{tags}</div> : null}

      {children ? <div className="mt-4">{children}</div> : null}

      {creatorIds.length > 0 ? (
        <div className="mt-4 border-t border-border pt-3">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            {attributionLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            {creatorIds.map((id) => (
              <CreatorBadge key={id} influencerId={id} />
            ))}
          </div>
        </div>
      ) : null}
    </article>
  )
}
