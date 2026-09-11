import type { AppData } from './types'

// PLACEHOLDER SEED — replace ONLY this file with the pasted seed data.
// Keep the exact shape (AppData + seedFollowedIds) and everything else works unchanged.

export const seedData: AppData = {
  influencers: [
    { id: 'inf-chris', name: 'Chris Vault', handle: 'chrisvault', focus: 'Hypertrophy' },
    { id: 'inf-mara', name: 'Mara Lin', handle: 'maralift', focus: 'Powerlifting' },
    { id: 'inf-deej', name: 'DJ Flexx', handle: 'djflexx', focus: 'Calisthenics' },
    { id: 'inf-sofia', name: 'Sofia Reyes', handle: 'sofiafuel', focus: 'Nutrition' },
    { id: 'inf-tyler', name: 'Tyler Stone', handle: 'tylerstone', focus: 'CrossFit' },
  ],
  exercises: [
    { id: 'ex-squat', name: 'Barbell Back Squat', muscleGroup: 'Legs', movementType: 'Squat', compound: true, doneBy: ['inf-chris', 'inf-mara', 'inf-tyler'] },
    { id: 'ex-bench', name: 'Bench Press', muscleGroup: 'Chest', movementType: 'Push', compound: true, doneBy: ['inf-chris', 'inf-mara'] },
    { id: 'ex-pullup', name: 'Pull-Up', muscleGroup: 'Back', movementType: 'Pull', compound: true, doneBy: ['inf-deej', 'inf-tyler'] },
    { id: 'ex-rdl', name: 'Romanian Deadlift', muscleGroup: 'Hamstrings', movementType: 'Hinge', compound: true, doneBy: ['inf-mara', 'inf-chris'] },
    { id: 'ex-ohp', name: 'Overhead Press', muscleGroup: 'Shoulders', movementType: 'Push', compound: true, doneBy: ['inf-mara', 'inf-tyler'] },
    { id: 'ex-pistol', name: 'Pistol Squat', muscleGroup: 'Legs', movementType: 'Squat', compound: false, doneBy: ['inf-deej'] },
    { id: 'ex-curl', name: 'Dumbbell Curl', muscleGroup: 'Biceps', movementType: 'Pull', compound: false, doneBy: ['inf-chris'] },
    { id: 'ex-kbswing', name: 'Kettlebell Swing', muscleGroup: 'Full Body', movementType: 'Hinge', compound: true, doneBy: ['inf-tyler', 'inf-deej'] },
  ],
  supplements: [
    { id: 'sup-whey', name: 'Whey Protein', category: 'Protein', endorsedBy: ['inf-chris', 'inf-mara', 'inf-sofia'] },
    { id: 'sup-creatine', name: 'Creatine Monohydrate', category: 'Performance', endorsedBy: ['inf-chris', 'inf-mara', 'inf-tyler'] },
    { id: 'sup-omega', name: 'Omega-3 Fish Oil', category: 'Health', endorsedBy: ['inf-sofia'] },
    { id: 'sup-pre', name: 'Pre-Workout', category: 'Energy', endorsedBy: ['inf-tyler', 'inf-deej'] },
    { id: 'sup-mag', name: 'Magnesium Glycinate', category: 'Recovery', endorsedBy: ['inf-sofia', 'inf-mara'] },
  ],
  meals: [
    { id: 'meal-steak', name: 'Steak & Sweet Potato', macros: { calories: 650, protein: 52, carbs: 45, fat: 28 }, style: 'High Protein', madeBy: ['inf-chris', 'inf-mara'] },
    { id: 'meal-oats', name: 'Overnight Oats', macros: { calories: 420, protein: 24, carbs: 58, fat: 12 }, style: 'Breakfast', madeBy: ['inf-sofia'] },
    { id: 'meal-burrito', name: 'Chicken Burrito Bowl', macros: { calories: 720, protein: 55, carbs: 72, fat: 22 }, style: 'Meal Prep', madeBy: ['inf-sofia', 'inf-tyler'] },
    { id: 'meal-salmon', name: 'Salmon & Greens', macros: { calories: 540, protein: 44, carbs: 18, fat: 32 }, style: 'Low Carb', madeBy: ['inf-sofia', 'inf-mara'] },
    { id: 'meal-smoothie', name: 'Protein Smoothie', macros: { calories: 380, protein: 34, carbs: 40, fat: 9 }, style: 'Snack', madeBy: ['inf-deej', 'inf-chris'] },
  ],
}

export const seedFollowedIds: string[] = ['inf-chris', 'inf-sofia']
