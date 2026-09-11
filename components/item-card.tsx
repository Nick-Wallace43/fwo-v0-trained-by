'use client'

import type { ReactNode } from 'react'
import { CreatorBadge } from '@/components/creator-badge'
import { useTrainedBy } from '@/hooks/use-trainedby'
import { cn } from '@/lib/utils'

// Shared card primitive reused across Workouts, Nutrition, and Supplements.
// Keeps titles, tag rows, body content, and creator attribution consistent.
// Cards where you follow none of the creators render muted (they also sort to
// the bottom via the repository queries).
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
  const { followedCount, countFollowedEndorsers } = useTrainedBy()
  const followedHere = countFollowedEndorsers(creatorIds)
  const muted = followedHere === 0

  return (
    <article
      className={cn(
        'rounded-xl border border-border bg-card p-4 transition-all',
        muted ? 'opacity-55 saturate-50' : 'hover:border-primary/30',
      )}
    >
      <h3 className="font-display text-xl font-semibold uppercase leading-none tracking-tight text-pretty">
        {title}
      </h3>

      {tags ? <div className="mt-3 flex flex-wrap gap-2">{tags}</div> : null}

      {children ? <div className="mt-4">{children}</div> : null}

      {creatorIds.length > 0 ? (
        <div className="mt-4 border-t border-border pt-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              {attributionLabel}
            </p>
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              <span className={cn('font-semibold', followedHere > 0 ? 'text-primary' : 'text-muted-foreground')}>
                {followedHere}
              </span>{' '}
              of {followedCount} you follow
            </p>
          </div>
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
