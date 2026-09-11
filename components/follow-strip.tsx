'use client'

import Link from 'next/link'
import { useTrainedBy } from '@/hooks/use-trainedby'
import { initials } from '@/lib/utils'

// Compact "who you follow" strip: overlapping avatar circles for followed
// creators plus a "+N" overflow chip. The whole strip links to Profile.
// Purely presentational over the hook — no direct storage/repository access.
export function FollowStrip({ max = 6 }: { max?: number }) {
  const { influencers, followedIds } = useTrainedBy()
  const followed = influencers.filter((influencer) => followedIds.includes(influencer.id))

  if (followed.length === 0) {
    return null
  }

  const shown = followed.slice(0, max)
  const overflow = followed.length - shown.length

  return (
    <Link
      href="/profile"
      className="group mb-5 flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 transition-colors hover:border-primary/50"
      aria-label={`You follow ${followed.length} creators. View profile.`}
    >
      <div className="flex items-center">
        {shown.map((influencer, index) => (
          <span
            key={influencer.id}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-card bg-primary/15 font-display text-xs font-semibold uppercase text-primary ring-1 ring-primary/30"
            style={{ marginLeft: index === 0 ? 0 : '-0.6rem', zIndex: shown.length - index }}
            title={influencer.name}
          >
            {initials(influencer.name)}
          </span>
        ))}
        {overflow > 0 ? (
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-card bg-muted font-display text-xs font-semibold text-muted-foreground"
            style={{ marginLeft: '-0.6rem' }}
          >
            {`+${overflow}`}
          </span>
        ) : null}
      </div>

      <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        {`Following ${followed.length}`}
      </span>
    </Link>
  )
}
