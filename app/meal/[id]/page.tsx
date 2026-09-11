'use client'

import { Clock, ListOrdered, Salad, Users, UtensilsCrossed } from 'lucide-react'
import { useParams } from 'next/navigation'
import { BackLink } from '@/components/back-link'
import { CreatorBadge } from '@/components/creator-badge'
import { EmptyState } from '@/components/empty-state'
import { MacroRow } from '@/components/macro-row'
import { RatioBar } from '@/components/ratio-bar'
import { Tag } from '@/components/tag'
import { useTrainedBy } from '@/hooks/use-trainedby'

export default function MealDetailPage() {
  const params = useParams<{ id: string }>()
  const { getMeal, followedCount, countFollowedEndorsers } = useTrainedBy()

  const meal = getMeal(params.id)

  if (!meal) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6">
        <BackLink href="/nutrition" label="Nutrition" />
        <EmptyState
          icon={Salad}
          title="Meal not found"
          description="This meal doesn't exist or may have been removed."
        />
      </div>
    )
  }

  const followedHere = countFollowedEndorsers(meal.madeBy)
  const recipe = meal.recipe
  const totalMinutes = recipe ? recipe.prepMinutes + recipe.cookMinutes : 0

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6">
      <BackLink href="/nutrition" label="Nutrition" />

      {meal.image ? (
        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-white">
          <img
            src={meal.image || "/placeholder.svg"}
            alt={meal.name}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      ) : null}

      <header className="mt-5">
        <h1 className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-balance">
          {meal.name}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Tag variant="accent">{meal.style}</Tag>
          {recipe ? (
            <>
              <Tag variant="outline">
                <span className="flex items-center gap-1">
                  <Clock className="size-3" aria-hidden="true" />
                  {totalMinutes} min
                </span>
              </Tag>
              <Tag variant="outline">
                <span className="flex items-center gap-1">
                  <UtensilsCrossed className="size-3" aria-hidden="true" />
                  {recipe.servings} {recipe.servings === 1 ? 'serving' : 'servings'}
                </span>
              </Tag>
            </>
          ) : null}
        </div>
      </header>

      <section className="mt-6 rounded-xl border border-border bg-card p-4">
        <h2 className="mb-3 font-display text-sm font-semibold uppercase leading-none tracking-wide text-muted-foreground">
          {recipe ? 'Macros per serving' : 'Macros'}
        </h2>
        <MacroRow macros={meal.macros} />
      </section>

      {recipe ? (
        <>
          <section className="mt-6 rounded-xl border border-border bg-card p-4">
            <h2 className="font-display text-sm font-semibold uppercase leading-none tracking-wide text-muted-foreground">
              Ingredients
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3 text-sm leading-relaxed text-pretty">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6 rounded-xl border border-border bg-card p-4">
            <h2 className="flex items-center gap-2 font-display text-sm font-semibold uppercase leading-none tracking-wide text-muted-foreground">
              <ListOrdered className="size-4" aria-hidden="true" />
              How to make it
            </h2>
            <ol className="mt-3 flex flex-col gap-3">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display text-xs font-semibold text-primary ring-1 ring-primary/30">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-pretty">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </>
      ) : null}

      <section className="mt-6 rounded-xl border border-border bg-card p-4">
        <RatioBar count={followedHere} total={followedCount} verb="make this" size="lg" />
        {meal.madeBy.length > 0 ? (
          <div className="mt-4 border-t border-border pt-3">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              <Users className="size-3" aria-hidden="true" />
              As made by
            </p>
            <div className="flex flex-wrap gap-2">
              {meal.madeBy.map((id) => (
                <CreatorBadge key={id} influencerId={id} />
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  )
}
