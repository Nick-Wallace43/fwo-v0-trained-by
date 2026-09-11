'use client'

import Link from 'next/link'
import { RefreshCw } from 'lucide-react'
import { MacroRow } from '@/components/macro-row'
import type { Meal } from '@/lib/types'

// One meal within the assembled day: name, macros, and a swap control that
// replaces it with the next best fit toward the day's macro targets. The name
// links to the meal's recipe; the swap button stays a separate control.
export function DayMealRow({ meal, onSwap }: { meal: Meal; onSwap: () => void }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30">
      <div className="flex items-start justify-between gap-3">
        <Link href={`/meal/${meal.id}`} className="min-w-0 flex-1">
          <h3 className="font-display text-base font-semibold uppercase leading-tight tracking-tight text-balance hover:text-primary">
            {meal.name}
          </h3>
        </Link>
        <button
          type="button"
          onClick={onSwap}
          aria-label={`Swap ${meal.name} for an alternative`}
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary active:scale-95"
        >
          <RefreshCw className="size-4" />
        </button>
      </div>
      <Link href={`/meal/${meal.id}`} className="mt-3 block">
        <MacroRow macros={meal.macros} />
      </Link>
    </div>
  )
}
