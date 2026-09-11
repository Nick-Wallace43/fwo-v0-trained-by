import type { Supplement } from '@/lib/types'
import { InitialsAvatar } from '@/components/initials-avatar'
import { Tag } from '@/components/tag'
import { useTrainedBy } from '@/hooks/use-trainedby'
import { cn } from '@/lib/utils'

const MAX_CHIPS = 5

// Ranked Supplements card: prominent "X of Y people you follow take this"
// line, a ratio bar, a category badge, and followed-creator avatar chips.
// Mirrors ExerciseCard's pattern so the two tabs feel cohesive.
export function SupplementCard({ supplement }: { supplement: Supplement }) {
  const { followedCount, countFollowedEndorsers, isFollowing, getInfluencer } = useTrainedBy()

  const followedHere = countFollowedEndorsers(supplement.endorsedBy)
  const muted = followedHere === 0
  const ratio = followedCount > 0 ? followedHere / followedCount : 0

  const followedTakers = supplement.endorsedBy.filter(isFollowing)
  const shownTakers = followedTakers.slice(0, MAX_CHIPS)
  const overflow = followedTakers.length - shownTakers.length

  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-4 transition-all',
        muted ? 'opacity-55 saturate-50' : '',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold uppercase leading-none tracking-tight text-pretty">
          {supplement.name}
        </h3>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Tag variant="outline">{supplement.category}</Tag>
      </div>

      <p className="mt-4 font-display text-lg font-semibold uppercase leading-tight tracking-tight">
        <span className={cn(followedHere > 0 ? 'text-primary' : 'text-muted-foreground')}>
          {followedHere}
        </span>{' '}
        <span className="text-muted-foreground">
          {`of ${followedCount} ${followedCount === 1 ? 'person' : 'people'} you follow take this`}
        </span>
      </p>

      <div
        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={followedHere}
        aria-valuemin={0}
        aria-valuemax={followedCount}
        aria-label={`${followedHere} of ${followedCount} followed creators take this`}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width]"
          style={{ width: `${Math.round(ratio * 100)}%` }}
        />
      </div>

      {shownTakers.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3">
          {shownTakers.map((id) => {
            const influencer = getInfluencer(id)
            if (!influencer) return null
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 py-0.5 pl-0.5 pr-2.5 text-xs font-medium text-primary"
              >
                <InitialsAvatar name={influencer.name} className="size-5 text-[9px]" />
                {`@${influencer.handle}`}
              </span>
            )
          })}
          {overflow > 0 ? (
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {`+${overflow} more`}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
