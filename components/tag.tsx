import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type TagVariant = 'default' | 'accent' | 'outline'

const variants: Record<TagVariant, string> = {
  default: 'bg-secondary text-secondary-foreground',
  accent: 'bg-primary/15 text-primary ring-1 ring-inset ring-primary/30',
  outline: 'text-muted-foreground ring-1 ring-inset ring-border',
}

export function Tag({
  children,
  variant = 'default',
}: {
  children: ReactNode
  variant?: TagVariant
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium uppercase tracking-wide',
        variants[variant],
      )}
    >
      {children}
    </span>
  )
}
