import type { Exercise, Influencer, Meal, Supplement } from './types'
import { getSnapshot, persistFollowedIds } from './storage'

// Data access API. UI never calls storage directly — it goes through here (via
// the hook). Reads are derived from the current snapshot; writes go to storage.
// Replace the storage import with API calls to move off localStorage later.

function isFollowed(creatorIds: string[], followedIds: string[]): boolean {
  return creatorIds.some((id) => followedIds.includes(id))
}

function followedCountAmong(creatorIds: string[], followedIds: string[]): number {
  return creatorIds.reduce((total, id) => (followedIds.includes(id) ? total + 1 : total), 0)
}

// Zero-followed items sink to the bottom; ties keep their original order.
function sortByFollowedEndorsers<T>(
  items: T[],
  creatorsOf: (item: T) => string[],
  followedIds: string[],
): T[] {
  return [...items].sort(
    (a, b) => followedCountAmong(creatorsOf(b), followedIds) - followedCountAmong(creatorsOf(a), followedIds),
  )
}

// How many of an item's creators the user currently follows. Used by the UI
// to render the "X of Y people you follow" count.
export function countFollowedEndorsers(creatorIds: string[]): number {
  return followedCountAmong(creatorIds, getSnapshot().followedIds)
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

// Canonical muscle-group order for the selector. Groups the seed doesn't use
// are dropped so chips only show groups that actually have exercises.
const MUSCLE_GROUP_ORDER = [
  'chest',
  'back',
  'shoulders',
  'biceps',
  'triceps',
  'quads',
  'hamstrings',
  'calves',
  'forearms',
  'traps',
  'abs',
]

export function getMuscleGroups(): string[] {
  const present = new Set(getSnapshot().data.exercises.map((exercise) => exercise.muscleGroup.toLowerCase()))
  return MUSCLE_GROUP_ORDER.filter((group) => present.has(group))
}

export function getExercise(id: string): Exercise | undefined {
  return getSnapshot().data.exercises.find((exercise) => exercise.id === id)
}

export function getExercises(followedOnly: boolean, muscleGroup?: string): Exercise[] {
  const { data, followedIds } = getSnapshot()
  let items = followedOnly
    ? data.exercises.filter((exercise) => isFollowed(exercise.doneBy, followedIds))
    : data.exercises
  if (muscleGroup) {
    items = items.filter((exercise) => exercise.muscleGroup.toLowerCase() === muscleGroup.toLowerCase())
  }
  return sortByFollowedEndorsers(items, (exercise) => exercise.doneBy, followedIds)
}

export function getMeals(followedOnly: boolean): Meal[] {
  const { data, followedIds } = getSnapshot()
  const items = followedOnly
    ? data.meals.filter((meal) => isFollowed(meal.madeBy, followedIds))
    : data.meals
  return sortByFollowedEndorsers(items, (meal) => meal.madeBy, followedIds)
}

export function getSupplements(followedOnly: boolean): Supplement[] {
  const { data, followedIds } = getSnapshot()
  const items = followedOnly
    ? data.supplements.filter((supplement) => isFollowed(supplement.endorsedBy, followedIds))
    : data.supplements
  return sortByFollowedEndorsers(items, (supplement) => supplement.endorsedBy, followedIds)
}
