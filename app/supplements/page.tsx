'use client'

import { Pill } from 'lucide-react'
import { useState } from 'react'
import { ContentLayout } from '@/components/content-layout'
import { EmptyState } from '@/components/empty-state'
import { ItemCard } from '@/components/item-card'
import { Tag } from '@/components/tag'
import { useTrainedBy } from '@/hooks/use-trainedby'

export default function SupplementsPage() {
  const [followedOnly, setFollowedOnly] = useState(true)
  const { getSupplements } = useTrainedBy()
  const supplements = getSupplements(followedOnly)

  return (
    <ContentLayout
      title="Supplements"
      description="Stacks endorsed by the creators you follow."
      followedOnly={followedOnly}
      onFilterChange={setFollowedOnly}
    >
      {supplements.length === 0 ? (
        <EmptyState
          icon={Pill}
          title="No supplements yet"
          description="Follow a creator to see their stack, or switch to All."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {supplements.map((supplement) => (
            <ItemCard
              key={supplement.id}
              title={supplement.name}
              attributionLabel="Endorsed by"
              creatorIds={supplement.endorsedBy}
              tags={<Tag variant="outline">{supplement.category}</Tag>}
            />
          ))}
        </div>
      )}
    </ContentLayout>
  )
}
