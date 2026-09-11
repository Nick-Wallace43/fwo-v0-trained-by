'use client'

import { FollowButton } from '@/components/follow-button'
import { PageHeader } from '@/components/page-header'
import { Tag } from '@/components/tag'
import { useTrainedBy } from '@/hooks/use-trainedby'
import { initials } from '@/lib/utils'

export default function ProfilePage() {
  const { influencers, followedCount, isFollowing } = useTrainedBy()

  const sortedInfluencers = [...influencers].sort((a, b) => {
    const aFollowing = isFollowing(a.id)
    const bFollowing = isFollowing(b.id)
    if (aFollowing === bFollowing) return 0
    return aFollowing ? -1 : 1
  })

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6">
      <PageHeader
        title="Profile"
        description={
          <>
            Following <span className="font-semibold text-primary">{followedCount}</span> of{' '}
            {influencers.length}. Your feed updates instantly as you follow.
          </>
        }
      />

      <section aria-label="Creators">
        <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Creators
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {sortedInfluencers.map((influencer) => {
            const following = isFollowing(influencer.id)
            return (
              <li
                key={influencer.id}
                className={
                  'flex flex-col gap-4 rounded-xl border bg-card p-4 transition-all ' +
                  (following
                    ? 'border-primary/60 ring-1 ring-primary/20'
                    : 'border-border opacity-70')
                }
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
