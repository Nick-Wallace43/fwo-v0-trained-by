import { ShieldCheck } from 'lucide-react'

// A trust feature, not a warning: reassures rather than alarms, so it uses
// the accent color and calm copy instead of destructive red/yellow styling.
export function TrustBanner() {
  return (
    <div className="mb-5 flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/10 p-4">
      <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
      <p className="text-sm leading-relaxed text-pretty">
        <span className="font-semibold text-foreground">Curated for safety.</span>{' '}
        <span className="text-muted-foreground">
          Banned and hazardous compounds are excluded from TrainedBy by design.
        </span>
      </p>
    </div>
  )
}
