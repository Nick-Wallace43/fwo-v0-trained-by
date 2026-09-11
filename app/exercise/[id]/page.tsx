'use client'

import { ArrowLeft, ListOrdered, Users } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { AiInsightsCard } from '@/components/ai-insights-card'
import { EmptyState } from '@/components/empty-state'
import { InitialsAvatar } from '@/components/initials-avatar'
import { Tag } from '@/components/tag'
import { formatMovementType, getHowToSteps, getWhyItMatters } from '@/lib/exercise-insights'
import { useTrainedBy } from '@/hooks/use-trainedby'
import { cn } from '@/lib/utils'

export default function ExerciseDetailPage() {
  const params = useParams<{ id: string }>()
  const { getExercise, followedCount, countFollowedEndorsers, isFollowing, getInfluencer } = useTrainedBy()

  const exercise = getExercise(params.id)

  if (!exercise) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6">
        <BackLink />
        <EmptyState
          icon={Users}
          title="Exercise not found"
          description="This exercise doesn't exist or may have been removed."
        />
      </div>
    )
  }

  const followedHere = countFollowedEndorsers(exercise.doneBy)
  const ratio = followedCount > 0 ? followedHere / followedCount : 0
  const followedDoers = exercise.doneBy.filter(isFollowing)
  const steps = getHowToSteps(exercise.movementType)

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6">
      <BackLink />

      <header className="mt-4">
        <h1 className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-balance">
          {exercise.name}
        </h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <Tag>{exercise.muscleGroup}</Tag>
          <Tag variant="outline">{formatMovementType(exercise.movementType)}</Tag>
          {exercise.compound ? <Tag variant="accent">Compound</Tag> : null}
        </div>
      </header>

      <section className="mt-6 rounded-xl border border-border bg-card p-4">
        <p className="font-display text-xl font-semibold uppercase leading-tight tracking-tight">
          <span className={cn(followedHere > 0 ? 'text-primary' : 'text-muted-foreground')}>{followedHere}</span>{' '}
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

        {followedDoers.length > 0 ? (
          <ul className="mt-4 flex flex-col gap-2 border-t border-border pt-3">
            {followedDoers.map((id) => {
              const influencer = getInfluencer(id)
              if (!influencer) return null
              return (
                <li key={id} className="flex items-center gap-3">
                  <InitialsAvatar name={influencer.name} className="size-8 text-xs" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium leading-tight">{influencer.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{`@${influencer.handle} · ${influencer.focus}`}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="mt-4 border-t border-border pt-3 text-sm text-muted-foreground">
            None of your followed creators do this one yet.
          </p>
        )}
      </section>

      <section className="mt-6 rounded-xl border border-border bg-card p-4">
        <h2 className="font-display text-sm font-semibold uppercase leading-none tracking-wide text-muted-foreground">
          Why it matters
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-pretty">{getWhyItMatters(exercise.movementType)}</p>
      </section>

      <section className="mt-6 rounded-xl border border-border bg-card p-4">
        <h2 className="flex items-center gap-2 font-display text-sm font-semibold uppercase leading-none tracking-wide text-muted-foreground">
          <ListOrdered className="size-4" aria-hidden="true" />
          How to perform
        </h2>
        <ol className="mt-3 flex flex-col gap-3">
          {steps.map((step, index) => (
            <li key={index} className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display text-xs font-semibold text-primary ring-1 ring-primary/30">
                {index + 1}
              </span>
              <p className="text-sm leading-relaxed text-pretty">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-6">
        <AiInsightsCard />
      </div>
    </div>
  )
}

function BackLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      Workouts
    </Link>
  )
}
