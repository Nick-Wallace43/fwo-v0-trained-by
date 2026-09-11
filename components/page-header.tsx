import type { ReactNode } from 'react'
import { BackLink } from '@/components/back-link'

// Shared title + one-line subtitle treatment used at the top of every tab
// and sub-page, so header styling never drifts between screens.
export function PageHeader({
  title,
  description,
  backHref,
  backLabel,
}: {
  title: string
  description?: ReactNode
  backHref?: string
  backLabel?: string
}) {
  return (
    <header className="mb-5">
      {backHref ? <BackLink href={backHref} label={backLabel} className="mb-4" /> : null}
      <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-balance">{title}</h1>
      {description ? <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">{description}</p> : null}
    </header>
  )
}
