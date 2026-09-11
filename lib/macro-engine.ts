// Deterministic macro-target calculation. Pure function only — no storage or
// React imports — so the repository wires it to live nutritionRules and the
// UI never touches the formula directly.
//
// maintenance = bodyweight x 15
// calories = maintenance adjusted by the goal's calorie fraction
// protein = bodyweight x the goal's protein-per-lb rate
// fat = 25% of calories
// carbs = whatever calories remain after protein and fat

import type { Goal, Macros, NutritionRules } from './types'

export function computeMacroTargets(bodyweight: number, goal: Goal, rules: NutritionRules): Macros {
  const rule = rules[goal]
  const maintenance = bodyweight * 15
  const calories = Math.round(maintenance * (1 + rule.calorieAdjustment))
  const protein = Math.round(bodyweight * rule.proteinPerLb)

  const fatCalories = calories * 0.25
  const fat = Math.round(fatCalories / 9)

  const proteinCalories = protein * 4
  const carbsCalories = Math.max(calories - proteinCalories - fatCalories, 0)
  const carbs = Math.round(carbsCalories / 4)

  return { calories, protein, carbs, fat }
}
