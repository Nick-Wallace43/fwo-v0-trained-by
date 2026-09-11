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
  gif?: string // Public path to a demo GIF, if one exists
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

// A recipe attached to a meal: what it makes, what you need, and how to make
// it. Optional on Meal so a meal can exist without one (the detail page hides
// sections it lacks).
export interface Recipe {
  servings: number
  prepMinutes: number
  cookMinutes: number
  ingredients: string[]
  steps: string[]
}

export interface Meal {
  id: string
  name: string
  macros: Macros
  style: string
  madeBy: string[] // Influencer ids
  image?: string // Public path to a finished-dish photo, if one exists
  recipe?: Recipe
}

export interface AppData {
  influencers: Influencer[]
  exercises: Exercise[]
  supplements: Supplement[]
  meals: Meal[]
}

// Deterministic per-muscle-group rules the workout builder uses to pick
// exercises. Lives alongside seed data since it's static ruleset config, not
// user-mutable state.
export interface WorkoutRule {
  requiredMovementTypes: string[]
  maxPerMovementType: number
}

export type WorkoutRules = Record<string, WorkoutRule>

export interface GeneratedWorkoutExercise {
  exerciseId: string
  muscleGroup: string
  movementType: string
  compound: boolean
  sets: number
  repsLabel: string
}

export interface GeneratedWorkout {
  muscleGroups: string[]
  exercises: GeneratedWorkoutExercise[]
}

export interface SavedWorkout extends GeneratedWorkout {
  id: string
  name: string
  createdAt: string // ISO date
}

// Nutrition domain. Goal and eating style are user-set inputs; nutrition
// rules (below) are static ruleset config the macro engine applies to them.
export type Goal = 'cut' | 'maintain' | 'bulk'
export type EatingStyle = 'hardcore' | 'balanced'

export interface UserStats {
  bodyweight: number
  goal: Goal
  eatingStyle: EatingStyle
}

export interface NutritionRule {
  // Fraction applied to maintenance calories, e.g. -0.2 for a 20% cut.
  calorieAdjustment: number
  proteinPerLb: number
}

export type NutritionRules = Record<Goal, NutritionRule>
