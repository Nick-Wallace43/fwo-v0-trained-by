'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

// Multi-select sibling of ChipSelector — toggles any number of options rather
// than exactly one. Used by the workout builder's muscle-group picker.
export function MultiChipSelector({
  options,
  value,
  onToggle,
  ariaLabel,
}: {
  options: { id: string; label: string }[]
  value: string[]
  onToggle: (id: string) => void
  ariaLabel: string
}) {
  return (
    <div role="group" aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = value.includes(option.id)
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(option.id)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors',
              active
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:text-foreground',
            )}
          >
            {active && <Check className="size-3.5" aria-hidden="true" />}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
