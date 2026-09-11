'use client'

import { Check, Radar, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CreatorAvatar } from '@/components/creator-avatar'
import type { Influencer } from '@/lib/types'
import { cn } from '@/lib/utils'

type Step = 'welcome' | 'syncing' | 'review'

// First-run flow shown as a full-screen overlay from AppShell whenever
// onboarding hasn't been completed. Purely presentational — all persistence
// happens through the onComplete callback, which the caller wires to the hook.
export function OnboardingFlow({
  influencers,
  onComplete,
}: {
  influencers: Influencer[]
  onComplete: (selectedIds: string[]) => void
}) {
  const router = useRouter()
  const [step, setStep] = useState<Step>('welcome')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (step !== 'syncing') return
    const timeout = setTimeout(() => {
      setSelected(new Set(influencers.map((influencer) => influencer.id)))
      setStep('review')
    }, 1700)
    return () => clearTimeout(timeout)
  }, [step, influencers])

  function toggle(id: string) {
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleConfirm() {
    onComplete(Array.from(selected))
    router.push('/')
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-background">
      <div className="flex h-full w-full max-w-2xl flex-col overflow-y-auto px-6 py-10">
        {step === 'welcome' && (
          <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Sparkles className="size-8" />
            </span>
            <div className="space-y-3">
              <h1 className="text-balance font-display text-4xl font-bold uppercase leading-tight tracking-tight">
                Train like the people you <span className="text-primary">actually</span> follow
              </h1>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                TrainedBy pulls your workouts, meals, and supplements straight from the fitness
                creators already in your feed.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStep('syncing')}
              className="w-full max-w-xs rounded-lg bg-primary py-3.5 font-display text-sm font-bold uppercase tracking-wide text-primary-foreground transition-transform active:scale-95"
            >
              Get Started
            </button>
          </div>
        )}

        {step === 'syncing' && (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-card text-primary">
              <Radar className="size-7 animate-pulse" />
            </span>
            <div className="space-y-1">
              <h2 className="font-display text-xl font-bold uppercase tracking-wide">
                Syncing your Instagram
              </h2>
              <p className="text-sm text-muted-foreground">Finding the creators you follow&hellip;</p>
            </div>
            <div className="w-full max-w-sm space-y-2.5" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <div className="size-10 shrink-0 animate-pulse rounded-full bg-muted" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2.5 w-2/5 animate-pulse rounded bg-muted" />
                    <div className="h-2 w-1/4 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'review' && (
          <div className="flex flex-1 flex-col gap-5">
            <div className="space-y-1.5 text-center">
              <h2 className="font-display text-xl font-bold uppercase tracking-wide">
                Found {influencers.length} creators
              </h2>
              <p className="text-pretty text-sm text-muted-foreground">
                Deselect anyone you don&apos;t want to follow. You can change this anytime in Profile.
              </p>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto pb-2">
              {influencers.map((influencer) => {
                const isSelected = selected.has(influencer.id)
                return (
                  <button
                    key={influencer.id}
                    type="button"
                    onClick={() => toggle(influencer.id)}
                    aria-pressed={isSelected}
                    className={cn(
                      'flex min-h-11 w-full items-center gap-3 rounded-lg border p-3 text-left transition-all active:scale-[0.98]',
                      isSelected ? 'border-primary/60 bg-primary/10' : 'border-border bg-card opacity-60',
                    )}
                  >
                    <CreatorAvatar
                      id={influencer.id}
                      name={influencer.name}
                      size={36}
                      className={cn('ring-1', isSelected ? 'ring-primary/30' : 'opacity-60 ring-border')}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm font-semibold uppercase tracking-wide">
                        {influencer.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">@{influencer.handle}</p>
                    </div>
                    <span
                      className={cn(
                        'flex size-6 shrink-0 items-center justify-center rounded-full border',
                        isSelected
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border text-transparent',
                      )}
                    >
                      <Check className="size-3.5" />
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="space-y-2 pt-2">
              <p className="text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Following {selected.size} of {influencers.length}
              </p>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={selected.size === 0}
                className="w-full rounded-lg bg-primary py-3.5 font-display text-sm font-bold uppercase tracking-wide text-primary-foreground transition-transform active:scale-95 disabled:opacity-40"
              >
                Confirm &amp; Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
