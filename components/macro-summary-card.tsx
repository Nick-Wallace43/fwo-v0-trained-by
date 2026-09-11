import { MacroRow } from '@/components/macro-row'
import type { Macros } from '@/lib/types'

// Clean summary of the computed daily macro targets. Always rendered from
// live userStats, so it recalculates the instant bodyweight or goal changes.
export function MacroSummaryCard({ targets }: { targets: Macros }) {
  return (
    <div className="rounded-xl border border-primary/40 bg-primary/10 p-4">
      <p className="text-[11px] font-medium uppercase tracking-widest text-primary">Your Daily Macro Targets</p>
      <div className="mt-3">
        <MacroRow macros={targets} />
      </div>
    </div>
  )
}
