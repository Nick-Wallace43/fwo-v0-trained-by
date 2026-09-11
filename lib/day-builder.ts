// Deterministic day-assembly logic. Pure functions only — no storage or React
// imports. Tries every 3- and 4-meal combination from a style-filtered pool
// and keeps whichever gets closest to the macro targets, preferring any
// combination within the 10% tolerance band. Swapping re-runs the same
// scoring against a single replaced meal.

import type { Macros, Meal } from './types'

const TOLERANCE = 0.1

function sumMacros(meals: Meal[]): Macros {
  return meals.reduce(
    (total, meal) => ({
      calories: total.calories + meal.macros.calories,
      protein: total.protein + meal.macros.protein,
      carbs: total.carbs + meal.macros.carbs,
      fat: total.fat + meal.macros.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  )
}

function percentDiff(value: number, target: number): number {
  return target === 0 ? 0 : Math.abs(value - target) / target
}

function isWithinTolerance(totals: Macros, target: Macros): boolean {
  return percentDiff(totals.calories, target.calories) <= TOLERANCE
}

// Average percent deviation across all four macros — lower is a better fit.
function deviationScore(totals: Macros, target: Macros): number {
  return (
    percentDiff(totals.calories, target.calories) +
    percentDiff(totals.protein, target.protein) +
    percentDiff(totals.carbs, target.carbs) +
    percentDiff(totals.fat, target.fat)
  )
}

function combinations<T>(items: T[], size: number): T[][] {
  if (size === 0) return [[]]
  if (items.length < size) return []
  const [first, ...rest] = items
  const withFirst = combinations(rest, size - 1).map((combo) => [first, ...combo])
  return [...withFirst, ...combinations(rest, size)]
}

export function dayTotals(meals: Meal[]): Macros {
  return sumMacros(meals)
}

export function isDayWithinTolerance(meals: Meal[], target: Macros): boolean {
  return isWithinTolerance(sumMacros(meals), target)
}

// Best 3- or 4-meal combination from the pool, ranked by proximity to target.
export function buildDay(pool: Meal[], target: Macros): Meal[] {
  if (pool.length === 0) return []
  const candidates = [...combinations(pool, 3), ...combinations(pool, 4)]
  if (candidates.length === 0) return pool.slice(0, Math.min(3, pool.length))

  let best = candidates[0]
  let bestScore = Number.POSITIVE_INFINITY
  let bestInTolerance = false

  for (const combo of candidates) {
    const totals = sumMacros(combo)
    const score = deviationScore(totals, target)
    const inTolerance = isWithinTolerance(totals, target)
    const better = (inTolerance && !bestInTolerance) || (inTolerance === bestInTolerance && score < bestScore)
    if (better) {
      best = combo
      bestScore = score
      bestInTolerance = inTolerance
    }
  }

  return best
}

// Replacement for the meal at `index` that produces the day with the lowest
// overall deviation from target — "the next best fit".
export function findBestSwap(day: Meal[], index: number, pool: Meal[], target: Macros): Meal | undefined {
  const usedIds = new Set(day.map((meal) => meal.id))
  const alternatives = pool.filter((meal) => !usedIds.has(meal.id))

  let best: Meal | undefined
  let bestScore = Number.POSITIVE_INFINITY
  for (const alternative of alternatives) {
    const trial = [...day]
    trial[index] = alternative
    const score = deviationScore(sumMacros(trial), target)
    if (score < bestScore) {
      bestScore = score
      best = alternative
    }
  }
  return best
}
