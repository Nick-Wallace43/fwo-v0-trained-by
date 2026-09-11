'use client'

import { Salad } from 'lucide-react'
import { useState } from 'react'
import { ContentLayout } from '@/components/content-layout'
import { EmptyState } from '@/components/empty-state'
import { ItemCard } from '@/components/item-card'
import { Tag } from '@/components/tag'
import { useTrainedBy } from '@/hooks/use-trainedby'
import type { Macros } from '@/lib/types'

function MacroStat({ label, value, unit }: { label: string; value: number; unit?: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-secondary py-2">
      <span className="font-display text-lg font-bold leading-none text-foreground">
        {value}
        {unit ? <span className="text-xs font-medium text-muted-foreground">{unit}</span> : null}
      </span>
      <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

function MacroRow({ macros }: { macros: Macros }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <MacroStat label="Cal" value={macros.calories} />
      <MacroStat label="Protein" value={macros.protein} unit="g" />
      <MacroStat label="Carbs" value={macros.carbs} unit="g" />
      <MacroStat label="Fat" value={macros.fat} unit="g" />
    </div>
  )
}

export default function NutritionPage() {
  const [followedOnly, setFollowedOnly] = useState(true)
  const { getMeals } = useTrainedBy()
  const meals = getMeals(followedOnly)

  return (
    <ContentLayout
      title="Nutrition"
      description="Meals cooked up by the creators you follow."
      followedOnly={followedOnly}
      onFilterChange={setFollowedOnly}
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
              attributionLabel="Made by"
              creatorIds={meal.madeBy}
              tags={<Tag variant="accent">{meal.style}</Tag>}
            >
              <MacroRow macros={meal.macros} />
            </ItemCard>
          ))}
        </div>
      )}
    </ContentLayout>
  )
}
