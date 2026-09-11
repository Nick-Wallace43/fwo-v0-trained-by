'use client'

import { Check, Plus } from 'lucide-react'
import { useTrainedBy } from '@/hooks/use-trainedby'
import { cn } from '@/lib/utils'

// Inline attribution chip with a one-tap follow toggle. Reused on every card.
export function CreatorBadge({ influencerId }: { influencerId: string }) {
  const { getInfluencer, isFollowing, toggleFollow } = useTrainedBy()
  const influencer = getInfluencer(influencerId)
  if (!influencer) return null

  const following = isFollowing(influencerId)

  return (
    <button
      type="button"
      onClick={() => toggleFollow(influencerId)}
      aria-pressed={following}
      aria-label={`${following ? 'Unfollow' : 'Follow'} ${influencer.name}`}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
        following
          ? 'border-primary/40 bg-primary/15 text-primary'
          : 'border-border bg-secondary text-secondary-foreground hover:border-primary/40 hover:text-primary',
      )}
    >
      {following ? <Check className="size-3" /> : <Plus className="size-3" />}
      <span>@{influencer.handle}</span>
    </button>
  )
}
