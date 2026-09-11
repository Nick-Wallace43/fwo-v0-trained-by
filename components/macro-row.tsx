import type { Macros } from '@/lib/types'

// Shared calories/protein/carbs/fat display. Reused on meal cards, the macro
// summary card, and day-plan rows so numbers always look the same everywhere.
export function MacroStat({ label, value, unit }: { label: string; value: number; unit?: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-secondary py-2">
      <span className="font-display text-lg font-bold leading-none text-foreground">
        {value}
        {unit ? <span className="text-xs font-medium text-muted-foreground">{unit}</span> : null}
      </span>
      <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
  )
}

export function MacroRow({ macros }: { macros: Macros }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <MacroStat label="Cal" value={macros.calories} />
      <MacroStat label="Protein" value={macros.protein} unit="g" />
      <MacroStat label="Carbs" value={macros.carbs} unit="g" />
      <MacroStat label="Fat" value={macros.fat} unit="g" />
    </div>
  )
}
