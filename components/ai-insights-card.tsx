import { Sparkles } from 'lucide-react'

// Visually distinct placeholder for a future AI feature. Dashed border and a
// "Coming soon" tag make it clear this is not live functionality yet.
export function AiInsightsCard() {
  return (
    <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Sparkles className="size-5" />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-semibold uppercase leading-none tracking-tight">
              AI Creator Insights
            </h3>
            <span className="inline-flex items-center rounded-md bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary ring-1 ring-inset ring-primary/30">
              Coming soon
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
            {
              "AI summaries of what your creators say about this exercise — cues, common mistakes, and their personal tips — pulled straight from their content."
            }
          </p>
        </div>
      </div>
    </div>
  )
}
