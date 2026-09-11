import type { AppData } from './types'
import { seedData, seedFollowedIds } from './seed'

// Low-level persistence adapter. Today this is localStorage; swapping to a real
// API means reimplementing this file (and repository) only. Nothing else changes.
// A subscribe/snapshot store is exposed so React can bind via useSyncExternalStore.

const DATA_KEY = 'trainedby:data:v2'
const FOLLOW_KEY = 'trainedby:followed:v2'

export interface AppState {
  data: AppData
  followedIds: string[]
}

// Stable reference used for SSR and hydration so client/server markup matches.
const SERVER_STATE: AppState = { data: seedData, followedIds: seedFollowedIds }

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

    return { data, followedIds }
  } catch {
    return { data: seedData, followedIds: seedFollowedIds }
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
