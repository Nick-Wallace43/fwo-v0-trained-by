'use client'

import { Check, Plus } from 'lucide-react'
import { useTrainedBy } from '@/hooks/use-trainedby'
import { cn } from '@/lib/utils'

// Labeled follow control used where a full button reads better than a chip
// (e.g. the Profile list). Shares the same toggle action as CreatorBadge.
export function FollowButton({ influencerId }: { influencerId: string }) {
  const { isFollowing, toggleFollow } = useTrainedBy()
  const following = isFollowing(influencerId)

  return (
    <button
      type="button"
      onClick={() => toggleFollow(influencerId)}
      aria-pressed={following}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold uppercase tracking-wide transition-all active:scale-95',
        following
          ? 'bg-primary text-primary-foreground hover:opacity-90'
          : 'border border-border bg-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground',
      )}
    >
      {following ? <Check className="size-4" /> : <Plus className="size-4" />}
      {following ? 'Following' : 'Follow'}
    </button>
  )
}
