import type { AppData, SavedWorkout, UserStats } from './types'
import { defaultUserStats, seedData, seedFollowedIds } from './seed'

// Low-level persistence adapter. Today this is localStorage; swapping to a real
// API means reimplementing this file (and repository) only. Nothing else changes.
// A subscribe/snapshot store is exposed so React can bind via useSyncExternalStore.

const DATA_KEY = 'trainedby:data:v3'
const FOLLOW_KEY = 'trainedby:followed:v2'
const WORKOUTS_KEY = 'trainedby:workouts:v1'
const USER_STATS_KEY = 'trainedby:userstats:v1'
const ONBOARDING_KEY = 'trainedby:onboarding-complete:v1'

export interface AppState {
  data: AppData
  followedIds: string[]
  savedWorkouts: SavedWorkout[]
  userStats: UserStats
  onboardingComplete: boolean
}

// Stable reference used for SSR and hydration so client/server markup matches.
// Onboarding defaults to true here so returning users never see a flash of the
// onboarding overlay before hydration corrects state; true first-run users get
// the overlay the instant hydrate() runs on the client.
const SERVER_STATE: AppState = {
  data: seedData,
  followedIds: seedFollowedIds,
  savedWorkouts: [],
  userStats: defaultUserStats,
  onboardingComplete: true,
}

let cache: AppState | null = null
const listeners = new Set<() => void>()

function hydrate(): AppState {
  try {
    const rawData = localStorage.getItem(DATA_KEY)
    const data: AppData = rawData ? (JSON.parse(rawData) as AppData) : seedData
    if (!rawData) localStorage.setItem(DATA_KEY, JSON.stringify(seedData))

    const rawFollow = localStorage.getItem(FOLLOW_KEY)
    const followedIds: string[] = rawFollow ? (JSON.parse(rawFollow) as string[]) : seedFollowedIds
    if (!rawFollow) localStorage.setItem(FOLLOW_KEY, JSON.stringify(seedFollowedIds))

    const rawWorkouts = localStorage.getItem(WORKOUTS_KEY)
    const savedWorkouts: SavedWorkout[] = rawWorkouts ? (JSON.parse(rawWorkouts) as SavedWorkout[]) : []
    if (!rawWorkouts) localStorage.setItem(WORKOUTS_KEY, JSON.stringify(savedWorkouts))

    const rawUserStats = localStorage.getItem(USER_STATS_KEY)
    const userStats: UserStats = rawUserStats ? (JSON.parse(rawUserStats) as UserStats) : defaultUserStats
    if (!rawUserStats) localStorage.setItem(USER_STATS_KEY, JSON.stringify(defaultUserStats))

    // Absence of this key is how we detect a true first run — it's written
    // the moment onboarding is shown (see below), so a missing key here means
    // no localStorage state has ever been written for this app.
    const rawOnboarding = localStorage.getItem(ONBOARDING_KEY)
    const onboardingComplete: boolean = rawOnboarding ? (JSON.parse(rawOnboarding) as boolean) : false
    if (!rawOnboarding) localStorage.setItem(ONBOARDING_KEY, JSON.stringify(false))

    return { data, followedIds, savedWorkouts, userStats, onboardingComplete }
  } catch {
    return {
      data: seedData,
      followedIds: seedFollowedIds,
      savedWorkouts: [],
      userStats: defaultUserStats,
      onboardingComplete: true,
    }
  }
}

export function subscribe(callback: () => void): () => void {
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}

export function getSnapshot(): AppState {
  if (typeof window === 'undefined') return SERVER_STATE
  if (!cache) cache = hydrate()
  return cache
}

export function getServerSnapshot(): AppState {
  return SERVER_STATE
}

function commit(next: AppState): void {
  cache = next
  for (const listener of listeners) listener()
}

export function persistFollowedIds(ids: string[]): void {
  const current = getSnapshot()
  try {
    localStorage.setItem(FOLLOW_KEY, JSON.stringify(ids))
  } catch {
    // Ignore write failures (e.g. private mode); in-memory state still updates.
  }
  commit({ ...current, followedIds: ids })
}

export function persistSavedWorkouts(workouts: SavedWorkout[]): void {
  const current = getSnapshot()
  try {
    localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts))
  } catch {
    // Ignore write failures (e.g. private mode); in-memory state still updates.
  }
  commit({ ...current, savedWorkouts: workouts })
}

export function persistUserStats(stats: UserStats): void {
  const current = getSnapshot()
  try {
    localStorage.setItem(USER_STATS_KEY, JSON.stringify(stats))
  } catch {
    // Ignore write failures (e.g. private mode); in-memory state still updates.
  }
  commit({ ...current, userStats: stats })
}

export function persistOnboardingComplete(complete: boolean): void {
  const current = getSnapshot()
  try {
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify(complete))
  } catch {
    // Ignore write failures (e.g. private mode); in-memory state still updates.
  }
  commit({ ...current, onboardingComplete: complete })
}
