// Domain types for TrainedBy. These describe the shape of all app data and are
// shared by the storage adapter, repository, hook, and UI. A future API layer
// should return these same shapes so nothing above the repository changes.

export interface Influencer {
  id: string
  name: string
  handle: string
  focus: string
}

export interface Exercise {
  id: string
  name: string
  muscleGroup: string
  movementType: string
  compound: boolean
  doneBy: string[] // Influencer ids
}

export interface Supplement {
  id: string
  name: string
  category: string
  endorsedBy: string[] // Influencer ids
}

export interface Macros {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface Meal {
  id: string
  name: string
  macros: Macros
  style: string
  madeBy: string[] // Influencer ids
}

export interface AppData {
  influencers: Influencer[]
  exercises: Exercise[]
  supplements: Supplement[]
  meals: Meal[]
}
