'use client'

import { useState } from 'react'
import { SegmentedControl } from '@/components/segmented-control'
import { EATING_STYLE_INFO, GOAL_OPTIONS } from '@/lib/nutrition-insights'
import type { EatingStyle, Goal } from '@/lib/types'
import { cn } from '@/lib/utils'

// Bodyweight, goal, and eating style inputs. Persists every change to
// storage via saveUserStats, which is what makes the macro engine below
// recalculate live.
export function UserStatsForm({
  bodyweight,
  goal,
  eatingStyle,
  onChange,
}: {
  bodyweight: number
  goal: Goal
  eatingStyle: EatingStyle
  onChange: (patch: Partial<{ bodyweight: number; goal: Goal; eatingStyle: EatingStyle }>) => void
}) {
  const [bodyweightText, setBodyweightText] = useState(String(bodyweight))

  function commitBodyweight(text: string) {
    const parsed = Number.parseInt(text, 10)
    if (Number.isFinite(parsed) && parsed > 0) {
      onChange({ bodyweight: parsed })
    } else {
      setBodyweightText(String(bodyweight))
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
      <div>
        <label htmlFor="bodyweight" className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          Bodyweight
        </label>
        <div className="mt-1.5 flex items-center gap-2">
          <input
            id="bodyweight"
            type="number"
            inputMode="numeric"
            min={1}
            value={bodyweightText}
            onChange={(event) => setBodyweightText(event.target.value)}
            onBlur={(event) => commitBodyweight(event.target.value)}
            className="w-24 rounded-lg border border-border bg-secondary px-3 py-2 font-display text-lg font-bold text-foreground outline-none focus:border-primary"
          />
          <span className="text-sm font-medium text-muted-foreground">lbs</span>
        </div>
      </div>

      <div>
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Goal</p>
        <div className="mt-1.5">
          <SegmentedControl
            options={GOAL_OPTIONS}
            value={goal}
            onChange={(value) => onChange({ goal: value })}
            ariaLabel="Nutrition goal"
          />
        </div>
      </div>

      <div>
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Eating style</p>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          {(Object.keys(EATING_STYLE_INFO) as EatingStyle[]).map((style) => {
            const active = eatingStyle === style
            const info = EATING_STYLE_INFO[style]
            return (
              <button
                key={style}
                type="button"
                onClick={() => onChange({ eatingStyle: style })}
                aria-pressed={active}
                className={cn(
                  'rounded-lg border p-3 text-left transition-colors',
                  active ? 'border-primary bg-primary/10' : 'border-border bg-secondary hover:border-primary/40',
                )}
              >
                <p
                  className={cn(
                    'font-display text-sm font-bold uppercase tracking-wide',
                    active ? 'text-primary' : 'text-foreground',
                  )}
                >
                  {info.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground text-pretty">{info.description}</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
