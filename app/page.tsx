'use client'

import { Dumbbell, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ChipSelector } from '@/components/chip-selector'
import { ContentLayout } from '@/components/content-layout'
import { EmptyState } from '@/components/empty-state'
import { ExerciseCard } from '@/components/exercise-card'
import { FollowStrip } from '@/components/follow-strip'
import { SavedWorkoutList } from '@/components/saved-workout-list'
import { SearchInput } from '@/components/search-input'
import { SegmentedControl } from '@/components/segmented-control'
import { useTrainedBy } from '@/hooks/use-trainedby'

type CompoundFilter = 'all' | 'compound' | 'isolation'

const COMPOUND_OPTIONS: { label: string; value: CompoundFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Compound', value: 'compound' },
  { label: 'Isolation', value: 'isolation' },
]

export default function WorkoutsPage() {
  const [followedOnly, setFollowedOnly] = useState(true)
  const [muscleGroup, setMuscleGroup] = useState<string | null>(null)
  const [compoundFilter, setCompoundFilter] = useState<CompoundFilter>('all')
  const [search, setSearch] = useState('')
  const { getExercises, getMuscleGroups, savedWorkouts } = useTrainedBy()

  const muscleGroups = getMuscleGroups()
  // Default to the first available group until the user picks one.
  const activeGroup = muscleGroup ?? muscleGroups[0] ?? ''
  const exercises = getExercises(followedOnly, activeGroup || undefined)

  // Compound and search are display-level refinements applied over the
  // follow-sorted list, so the "count descending" order is preserved.
  const visible = useMemo(() => {
    const query = search.trim().toLowerCase()
    return exercises.filter((exercise) => {
      if (compoundFilter === 'compound' && !exercise.compound) return false
      if (compoundFilter === 'isolation' && exercise.compound) return false
      if (query && !exercise.name.toLowerCase().includes(query)) return false
      return true
    })
  }, [exercises, compoundFilter, search])

  const filtersActive = compoundFilter !== 'all' || search.trim().length > 0

  return (
    <ContentLayout
      title="Workouts"
      description="Go-to movements from the creators you follow."
      followedOnly={followedOnly}
      onFilterChange={setFollowedOnly}
      topSlot={
        <div className="mb-5 flex flex-col gap-4">
          <FollowStrip />
          <Link
            href="/build"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Sparkles className="size-4" />
            Build a Workout
          </Link>
          <SavedWorkoutList workouts={savedWorkouts} />
          <ChipSelector
            ariaLabel="Muscle group"
            options={muscleGroups.map((group) => ({ id: group, label: group }))}
            value={activeGroup}
            onChange={setMuscleGroup}
          />
          <div className="flex flex-wrap items-center gap-3">
            <SegmentedControl
              ariaLabel="Movement type"
              options={COMPOUND_OPTIONS}
              value={compoundFilter}
              onChange={setCompoundFilter}
            />
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search exercises"
              className="min-w-[12rem] flex-1"
            />
          </div>
        </div>
      }
    >
      {visible.length === 0 ? (
        <EmptyState
          icon={Dumbbell}
          title={filtersActive ? 'No matches' : 'No exercises here'}
          description={
            filtersActive
              ? 'No exercises match your filters — try a different search, movement type, or muscle group.'
              : 'No followed creators train this muscle group yet — switch to All or pick another group.'
          }
        />
      ) : (
        <div className="flex flex-col gap-3">
          {visible.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      )}
    </ContentLayout>
  )
}
