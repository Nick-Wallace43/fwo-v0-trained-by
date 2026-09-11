'use client'

import { cn } from '@/lib/utils'

// Horizontal, scrollable single-select chip row. Used for the muscle-group
// selector on Workouts; kept generic so other tabs can reuse it.
export function ChipSelector({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { id: string; label: string }[]
  value: string
  onChange: (id: string) => void
  ariaLabel: string
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="edge-fade-x -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {options.map((option) => {
        const active = value === option.id
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.id)}
            className={cn(
              'inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full border px-4 text-sm font-semibold uppercase tracking-wide transition-all active:scale-95',
              active
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
