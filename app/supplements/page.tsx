'use client'

import { Pill } from 'lucide-react'
import { useState } from 'react'
import { ChipSelector } from '@/components/chip-selector'
import { ContentLayout } from '@/components/content-layout'
import { EmptyState } from '@/components/empty-state'
import { SupplementCard } from '@/components/supplement-card'
import { TrustBanner } from '@/components/trust-banner'
import { useTrainedBy } from '@/hooks/use-trainedby'

export default function SupplementsPage() {
  const [followedOnly, setFollowedOnly] = useState(true)
  const [category, setCategory] = useState('all')
  const { getSupplements, getSupplementCategories } = useTrainedBy()

  const categories = getSupplementCategories()
  const categoryOptions = [{ id: 'all', label: 'All' }, ...categories.map((c) => ({ id: c, label: c }))]
  const supplements = getSupplements(followedOnly, category === 'all' ? undefined : category)

  return (
    <ContentLayout
      title="Supplements"
      description="Stacks endorsed by the creators you follow."
      followedOnly={followedOnly}
      onFilterChange={setFollowedOnly}
      topSlot={
        <div className="mb-5 flex flex-col gap-4">
          <TrustBanner />
          <ChipSelector options={categoryOptions} value={category} onChange={setCategory} ariaLabel="Category" />
        </div>
      }
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
            <SupplementCard key={supplement.id} supplement={supplement} />
          ))}
        </div>
      )}
    </ContentLayout>
  )
}
