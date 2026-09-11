// Static display copy for nutrition inputs. Kept separate from seed.ts since
// this is UI-facing labeling, not a selection ruleset.

import type { EatingStyle, Goal } from './types'

export const GOAL_OPTIONS: { label: string; value: Goal }[] = [
  { label: 'Cut', value: 'cut' },
  { label: 'Maintain', value: 'maintain' },
  { label: 'Bulk', value: 'bulk' },
]

export const EATING_STYLE_INFO: Record<EatingStyle, { label: string; description: string }> = {
  hardcore: {
    label: 'Hardcore',
    description: 'Strict macros, minimal flexibility, built for fast results.',
  },
  balanced: {
    label: 'Balanced',
    description: 'Flexible macros with room for real food and consistency.',
  },
}
