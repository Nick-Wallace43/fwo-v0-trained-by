'use client'

import { RefreshCw } from 'lucide-react'
import { MacroRow } from '@/components/macro-row'
import type { Meal } from '@/lib/types'

// One meal within the assembled day: name, macros, and a swap control that
// replaces it with the next best fit toward the day's macro targets.
export function DayMealRow({ meal, onSwap }: { meal: Meal; onSwap: () => void }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-base font-semibold uppercase leading-tight tracking-tight text-balance">
          {meal.name}
        </h3>
        <button
          type="button"
          onClick={onSwap}
          aria-label={`Swap ${meal.name} for an alternative`}
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <RefreshCw className="size-4" />
        </button>
      </div>
      <div className="mt-3">
        <MacroRow macros={meal.macros} />
      </div>
    </div>
  )
}
