'use client'

import { cn } from '@/lib/utils'

// Segmented control: "Following" (followed creators only) vs "All".
export function FilterToggle({
  value,
  onChange,
}: {
  value: boolean
  onChange: (followedOnly: boolean) => void
}) {
  const options: { label: string; followedOnly: boolean }[] = [
    { label: 'Following', followedOnly: true },
    { label: 'All', followedOnly: false },
  ]

  return (
    <div
      role="group"
      aria-label="Filter content"
      className="inline-flex rounded-lg border border-border bg-card p-1"
    >
      {options.map((option) => {
        const active = value === option.followedOnly
        return (
          <button
            key={option.label}
            type="button"
            onClick={() => onChange(option.followedOnly)}
            aria-pressed={active}
            className={cn(
              'rounded-md px-4 py-1.5 text-sm font-semibold uppercase tracking-wide transition-colors',
              active
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
