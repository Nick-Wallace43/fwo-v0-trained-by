'use client'

import type { ReactNode } from 'react'
import { FilterToggle } from '@/components/filter-toggle'
import { PageHeader } from '@/components/page-header'

// Common scaffold for the three content tabs: page title, description, the
// Following/All toggle, and the list slot. Keeps the tabs visually identical.
export function ContentLayout({
  title,
  description,
  followedOnly,
  onFilterChange,
  topSlot,
  children,
}: {
  title: string
  description: string
  followedOnly: boolean
  onFilterChange: (followedOnly: boolean) => void
  topSlot?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6">
      <PageHeader title={title} description={description} />

      {topSlot}

      <div className="mb-5">
        <FilterToggle value={followedOnly} onChange={onFilterChange} />
      </div>

      {children}
    </div>
  )
}
