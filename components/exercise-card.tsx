'use client'

import Link from 'next/link'
import type { Exercise } from '@/lib/types'
import { InitialsAvatar } from '@/components/initials-avatar'
import { RatioBar } from '@/components/ratio-bar'
import { Tag } from '@/components/tag'
import { formatMovementType } from '@/lib/exercise-insights'
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

  const followedDoers = exercise.doneBy.filter(isFollowing)
  const shownDoers = followedDoers.slice(0, MAX_CHIPS)
  const overflow = followedDoers.length - shownDoers.length

  return (
    <Link
      href={`/exercise/${exercise.id}`}
      className={cn(
        'block rounded-xl border border-border bg-card p-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
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
        <Tag variant="outline">{formatMovementType(exercise.movementType)}</Tag>
        {exercise.compound ? <Tag variant="accent">Compound</Tag> : null}
      </div>

      <RatioBar className="mt-4" count={followedHere} total={followedCount} verb="do this" />

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
    </Link>
  )
}
