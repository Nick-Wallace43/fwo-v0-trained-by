import type { Exercise, Influencer, Meal, Supplement } from './types'
import { getSnapshot, persistFollowedIds } from './storage'

// Data access API. UI never calls storage directly — it goes through here (via
// the hook). Reads are derived from the current snapshot; writes go to storage.
// Replace the storage import with API calls to move off localStorage later.

function isFollowed(creatorIds: string[], followedIds: string[]): boolean {
  return creatorIds.some((id) => followedIds.includes(id))
}

export function getInfluencers(): Influencer[] {
  return getSnapshot().data.influencers
}

export function getInfluencer(id: string): Influencer | undefined {
  return getSnapshot().data.influencers.find((influencer) => influencer.id === id)
}

export function getFollowedIds(): string[] {
  return getSnapshot().followedIds
}

export function isFollowing(id: string): boolean {
  return getSnapshot().followedIds.includes(id)
}

export function follow(id: string): void {
  const ids = getSnapshot().followedIds
  if (!ids.includes(id)) persistFollowedIds([...ids, id])
}

export function unfollow(id: string): void {
  persistFollowedIds(getSnapshot().followedIds.filter((existing) => existing !== id))
}

export function toggleFollow(id: string): void {
  if (isFollowing(id)) unfollow(id)
  else follow(id)
}

export function getExercises(followedOnly: boolean): Exercise[] {
  const { data, followedIds } = getSnapshot()
  if (!followedOnly) return data.exercises
  return data.exercises.filter((exercise) => isFollowed(exercise.doneBy, followedIds))
}

export function getMeals(followedOnly: boolean): Meal[] {
  const { data, followedIds } = getSnapshot()
  if (!followedOnly) return data.meals
  return data.meals.filter((meal) => isFollowed(meal.madeBy, followedIds))
}

export function getSupplements(followedOnly: boolean): Supplement[] {
  const { data, followedIds } = getSnapshot()
  if (!followedOnly) return data.supplements
  return data.supplements.filter((supplement) => isFollowed(supplement.endorsedBy, followedIds))
}
