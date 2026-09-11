'use client'

import { FollowButton } from '@/components/follow-button'
import { Tag } from '@/components/tag'
import { useTrainedBy } from '@/hooks/use-trainedby'

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export default function ProfilePage() {
  const { influencers, followedCount, isFollowing } = useTrainedBy()

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6">
      <header className="mb-6">
        <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-balance">
          Profile
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Following{' '}
          <span className="font-semibold text-primary">{followedCount}</span> of{' '}
          {influencers.length}. Your feed updates instantly as you follow.
        </p>
      </header>

      <section aria-label="Creators">
        <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Creators
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {influencers.map((influencer) => {
            const following = isFollowing(influencer.id)
            return (
              <li
                key={influencer.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-start gap-3">
                  <div
                    aria-hidden="true"
                    className={
                      'flex size-12 shrink-0 items-center justify-center rounded-full font-display text-base font-bold uppercase tracking-tight ' +
                      (following
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground')
                    }
                  >
                    {initials(influencer.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg font-semibold uppercase leading-none tracking-tight text-balance">
                      {influencer.name}
                    </p>
                    <p className="mt-1 truncate text-sm text-muted-foreground">
                      @{influencer.handle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <Tag variant="accent">{influencer.focus}</Tag>
                  <FollowButton influencerId={influencer.id} />
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
