'use client'

import { Dumbbell } from 'lucide-react'
import { useState } from 'react'
import { ContentLayout } from '@/components/content-layout'
import { EmptyState } from '@/components/empty-state'
import { ItemCard } from '@/components/item-card'
import { Tag } from '@/components/tag'
import { useTrainedBy } from '@/hooks/use-trainedby'

export default function WorkoutsPage() {
  const [followedOnly, setFollowedOnly] = useState(true)
  const { getExercises } = useTrainedBy()
  const exercises = getExercises(followedOnly)

  return (
    <ContentLayout
      title="Workouts"
      description="Go-to movements from the creators you follow."
      followedOnly={followedOnly}
      onFilterChange={setFollowedOnly}
    >
      {exercises.length === 0 ? (
        <EmptyState
          icon={Dumbbell}
          title="No exercises yet"
          description="Follow a creator to see their movements, or switch to All."
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
