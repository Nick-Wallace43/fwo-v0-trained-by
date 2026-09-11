'use client'

import { FollowButton } from '@/components/follow-button'
import { Tag } from '@/components/tag'
import { useTrainedBy } from '@/hooks/use-trainedby'

export default function ProfilePage() {
  const { influencers, followedCount } = useTrainedBy()

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6">
      <header className="mb-6">
        <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-balance">
          Profile
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You follow{' '}
          <span className="font-semibold text-primary">{followedCount}</span> of{' '}
          {influencers.length} creators. Your feed updates instantly as you follow.
        </p>
      </header>

      <section aria-label="Creators">
        <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Creators
        </h2>
        <ul className="flex flex-col gap-3">
          {influencers.map((influencer) => (
            <li
              key={influencer.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4"
            >
              <div className="min-w-0">
                <p className="font-display text-lg font-semibold uppercase leading-none tracking-tight">
                  {influencer.name}
                </p>
                <p className="mt-1 truncate text-sm text-muted-foreground">
                  @{influencer.handle}
                </p>
                <div className="mt-2">
                  <Tag variant="accent">{influencer.focus}</Tag>
                </div>
              </div>
              <FollowButton influencerId={influencer.id} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
