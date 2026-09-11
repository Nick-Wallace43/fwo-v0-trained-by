'use client'

import { Dumbbell } from 'lucide-react'
import { useState } from 'react'
import { ChipSelector } from '@/components/chip-selector'
import { ContentLayout } from '@/components/content-layout'
import { EmptyState } from '@/components/empty-state'
import { FollowStrip } from '@/components/follow-strip'
import { ItemCard } from '@/components/item-card'
import { Tag } from '@/components/tag'
import { useTrainedBy } from '@/hooks/use-trainedby'

export default function WorkoutsPage() {
  const [followedOnly, setFollowedOnly] = useState(true)
  const [muscleGroup, setMuscleGroup] = useState<string | null>(null)
  const { getExercises, getMuscleGroups } = useTrainedBy()

  const muscleGroups = getMuscleGroups()
  // Default to the first available group until the user picks one.
  const activeGroup = muscleGroup ?? muscleGroups[0] ?? ''
  const exercises = getExercises(followedOnly, activeGroup || undefined)

  return (
    <ContentLayout
      title="Workouts"
      description="Go-to movements from the creators you follow."
      followedOnly={followedOnly}
      onFilterChange={setFollowedOnly}
      topSlot={
        <div className="flex flex-col gap-3">
          <FollowStrip />
          <ChipSelector
            ariaLabel="Muscle group"
            options={muscleGroups.map((group) => ({ id: group, label: group }))}
            value={activeGroup}
            onChange={setMuscleGroup}
          />
        </div>
      }
    >
      {exercises.length === 0 ? (
        <EmptyState
          icon={Dumbbell}
          title="No exercises here"
          description="No followed creators train this muscle group yet — switch to All or pick another group."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {exercises.map((exercise) => (
            <ItemCard
              key={exercise.id}
              title={exercise.name}
              attributionLabel="Done by"
              creatorIds={exercise.doneBy}
              tags={
                <>
                  <Tag>{exercise.muscleGroup}</Tag>
                  <Tag variant="outline">{exercise.movementType}</Tag>
                  {exercise.compound ? <Tag variant="accent">Compound</Tag> : null}
                </>
              }
            />
          ))}
        </div>
      )}
    </ContentLayout>
  )
}
