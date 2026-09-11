'use client'

import type { Exercise } from '@/lib/types'
import { InitialsAvatar } from '@/components/initials-avatar'
import { Tag } from '@/components/tag'
import { useTrainedBy } from '@/hooks/use-trainedby'
import { cn } from '@/lib/utils'

const MAX_CHIPS = 5

// Rich Workouts card: prominent "X of Y people you follow do this" line, a
// ratio bar, followed-creator avatar chips, movement-type badge, and a
// Compound tag. All counts derive from live follow state via the hook.
export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const { followedCount, countFollowedEndorsers, isFollowing, getInfluencer } = useTrainedBy()

  const followedHere = countFollowedEndorsers(exercise.doneBy)
  const muted = followedHere === 0
  const ratio = followedCount > 0 ? followedHere / followedCount : 0

  const followedDoers = exercise.doneBy.filter(isFollowing)
  const shownDoers = followedDoers.slice(0, MAX_CHIPS)
  const overflow = followedDoers.length - shownDoers.length

  return (
    <article
      className={cn(
        'rounded-xl border border-border bg-card p-4 transition-all',
        muted ? 'opacity-55 saturate-50' : 'hover:border-primary/30',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold uppercase leading-none tracking-tight text-pretty">
          {exercise.name}
        </h3>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Tag>{exercise.muscleGroup}</Tag>
        <Tag variant="outline">{exercise.movementType}</Tag>
        {exercise.compound ? <Tag variant="accent">Compound</Tag> : null}
      </div>

      <p className="mt-4 font-display text-lg font-semibold uppercase leading-tight tracking-tight">
        <span className={cn(followedHere > 0 ? 'text-primary' : 'text-muted-foreground')}>
          {followedHere}
        </span>{' '}
        <span className="text-muted-foreground">
          {`of ${followedCount} ${followedCount === 1 ? 'person' : 'people'} you follow do this`}
        </span>
      </p>

      <div
        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={followedHere}
        aria-valuemin={0}
        aria-valuemax={followedCount}
        aria-label={`${followedHere} of ${followedCount} followed creators do this`}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width]"
          style={{ width: `${Math.round(ratio * 100)}%` }}
        />
      </div>

      {shownDoers.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3">
          {shownDoers.map((id) => {
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
    </article>
  )
}
