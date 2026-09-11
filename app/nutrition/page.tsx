'use client'

import { Salad, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { ContentLayout } from '@/components/content-layout'
import { DayMealRow } from '@/components/day-meal-row'
import { EmptyState } from '@/components/empty-state'
import { ItemCard } from '@/components/item-card'
import { MacroProgressBar } from '@/components/macro-progress-bar'
import { MacroRow } from '@/components/macro-row'
import { MacroSummaryCard } from '@/components/macro-summary-card'
import { Tag } from '@/components/tag'
import { UserStatsForm } from '@/components/user-stats-form'
import { useTrainedBy } from '@/hooks/use-trainedby'
import type { Meal } from '@/lib/types'

export default function NutritionPage() {
  const [followedOnly, setFollowedOnly] = useState(true)
  const [day, setDay] = useState<Meal[] | null>(null)
  const {
    userStats,
    saveUserStats,
    getMacroTargets,
    getMealsByStyle,
    buildDay,
    dayTotals,
    isDayWithinTolerance,
    swapDayMeal,
  } = useTrainedBy()

  const targets = getMacroTargets(userStats)
  const meals = getMealsByStyle(followedOnly, userStats.eatingStyle)

  const totals = day ? dayTotals(day) : null
  const withinTolerance = day ? isDayWithinTolerance(day, targets) : false

  function handleBuildDay() {
    setDay(buildDay(userStats.eatingStyle, targets))
  }

  function handleSwap(index: number) {
    if (!day) return
    setDay(swapDayMeal(day, index, userStats.eatingStyle, targets))
  }

  return (
    <ContentLayout
      title="Nutrition"
      description="Macros and meals shaped by the creators you follow."
      followedOnly={followedOnly}
      onFilterChange={setFollowedOnly}
      topSlot={
        <div className="mb-5 flex flex-col gap-4">
          <UserStatsForm
            bodyweight={userStats.bodyweight}
            goal={userStats.goal}
            eatingStyle={userStats.eatingStyle}
            onChange={(patch) => saveUserStats({ ...userStats, ...patch })}
          />
          <MacroSummaryCard targets={targets} />
        </div>
      }
    >
      {meals.length === 0 ? (
        <EmptyState
          icon={Salad}
          title="No meals yet"
          description="Follow a creator to see their meals, or switch to All."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {meals.map((meal) => (
            <ItemCard
              key={meal.id}
              title={meal.name}
              attributionLabel="As made by"
              creatorIds={meal.madeBy}
              href={`/meal/${meal.id}`}
              image={meal.image}
              tags={<Tag variant="accent">{meal.style}</Tag>}
            >
              <MacroRow macros={meal.macros} />
            </ItemCard>
          ))}
        </div>
      )}

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-bold uppercase leading-none tracking-tight">Build My Day</h2>
          <button
            type="button"
            onClick={handleBuildDay}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-transform active:scale-95"
          >
            <Sparkles className="size-4" />
            {day ? 'Rebuild' : 'Build'}
          </button>
        </div>

        {!day ? (
          <EmptyState
            icon={Sparkles}
            title="No day built yet"
            description="Assemble 3-4 meals that hit your macro targets."
          />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                  Day Total vs Target
                </p>
                <span
                  className={
                    withinTolerance
                      ? 'text-[11px] font-semibold uppercase tracking-widest text-primary'
                      : 'text-[11px] font-semibold uppercase tracking-widest text-muted-foreground'
                  }
                >
                  {withinTolerance ? 'Within 10%' : 'Outside 10%'}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <MacroProgressBar
                  label="Calories"
                  current={totals!.calories}
                  target={targets.calories}
                  withinTolerance={withinTolerance}
                />
                <MacroProgressBar
                  label="Protein"
                  current={totals!.protein}
                  target={targets.protein}
                  unit="g"
                  withinTolerance={withinTolerance}
                />
                <MacroProgressBar
                  label="Carbs"
                  current={totals!.carbs}
                  target={targets.carbs}
                  unit="g"
                  withinTolerance={withinTolerance}
                />
                <MacroProgressBar
                  label="Fat"
                  current={totals!.fat}
                  target={targets.fat}
                  unit="g"
                  withinTolerance={withinTolerance}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {day.map((meal, index) => (
                <DayMealRow key={`${meal.id}-${index}`} meal={meal} onSwap={() => handleSwap(index)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </ContentLayout>
  )
}
