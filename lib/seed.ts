import type { AppData, NutritionRules, UserStats, WorkoutRules } from './types'

// SEED DATA — the app's initial state. On first run the storage adapter copies
// this into localStorage; thereafter localStorage is the source of truth.
// Handles are stored WITHOUT a leading "@" (the UI adds it). Ids for exercises,
// supplements, and meals are stable slugs so a future API can map to them.
//
// NOTE: Demo data — illustrative attributions based on publicly known training
// styles and content, not verified endorsements. Surfaced as a disclaimer in-app.

export const seedData: AppData = {
  influencers: [
    { id: 'cbum', name: 'Chris Bumstead', handle: 'cbum', focus: 'Classic Physique' },
    { id: 'sulek', name: 'Sam Sulek', handle: 'sam_sulek', focus: 'High-Volume Bodybuilding' },
    { id: 'terry', name: 'Ryan Terry', handle: 'ryanjterry', focus: "Men's Physique" },
    { id: 'ronnie', name: 'Ronnie Coleman', handle: 'ronniecoleman8', focus: 'Old-School Mass' },
    { id: 'nippard', name: 'Jeff Nippard', handle: 'jeffnippard', focus: 'Science-Based Training' },
    { id: 'arnold', name: 'Arnold Schwarzenegger', handle: 'schwarzenegger', focus: 'Golden-Era Bodybuilding' },
    { id: 'cutler', name: 'Jay Cutler', handle: 'jaycutler', focus: 'Pro Bodybuilding' },
    { id: 'yates', name: 'Dorian Yates', handle: 'thedorianyates', focus: 'High-Intensity Training' },
    { id: 'platz', name: 'Tom Platz', handle: 'tomplatz', focus: 'Leg Training Legend' },
    { id: 'deyzel', name: 'Noel Deyzel', handle: 'noeldeyzel_bodybuilder', focus: 'Motivation & Mass' },
    { id: 'wheels', name: 'Larry Wheels', handle: 'larrywheels', focus: 'Powerbuilding' },
    { id: 'eubank', name: 'Alex Eubank', handle: 'alex_eubank15', focus: 'Aesthetics' },
    { id: 'cavaliere', name: 'Jeff Cavaliere', handle: 'athleanx', focus: 'Function & Injury Prevention' },
    { id: 'israetel', name: 'Dr. Mike Israetel', handle: 'rpstrength', focus: 'Hypertrophy Science' },
    { id: 'kai', name: 'Kai Greene', handle: 'kaigreene', focus: 'Mind-Muscle Mastery' },
    { id: 'heath', name: 'Phil Heath', handle: 'philheath', focus: '7x Mr. Olympia' },
    { id: 'ohearn', name: "Mike O'Hearn", handle: 'mikeohearn', focus: 'Powerbuilding Longevity' },
    { id: 'laid', name: 'David Laid', handle: 'davidlaid', focus: 'Aesthetic Powerbuilding' },
    { id: 'doucette', name: 'Greg Doucette', handle: 'gregdoucetteifbbpro', focus: 'Coaching & Nutrition' },
    { id: 'feroce', name: 'Seth Feroce', handle: 'sethferoce', focus: 'Intensity & Arms' },
  ],
  exercises: [
    { id: 'ex-incline-db-press', name: 'Incline Dumbbell Press', muscleGroup: 'chest', movementType: 'incline-press', compound: true, doneBy: ['cbum', 'sulek', 'eubank', 'wheels', 'laid', 'heath'] },
    { id: 'ex-flat-bb-bench', name: 'Flat Barbell Bench Press', muscleGroup: 'chest', movementType: 'horizontal-press', compound: true, doneBy: ['ronnie', 'wheels', 'cutler', 'ohearn', 'laid', 'arnold'] },
    { id: 'ex-incline-bb-press', name: 'Incline Barbell Press', muscleGroup: 'chest', movementType: 'incline-press', compound: true, doneBy: ['heath', 'cutler', 'laid', 'cbum'] },
    { id: 'ex-cable-fly', name: 'Cable Fly', muscleGroup: 'chest', movementType: 'fly', compound: false, doneBy: ['terry', 'eubank', 'arnold', 'kai', 'heath'] },
    { id: 'ex-dips', name: 'Dips', muscleGroup: 'chest', movementType: 'vertical-press', compound: true, doneBy: ['yates', 'arnold', 'nippard', 'cavaliere', 'feroce'] },
    { id: 'ex-machine-chest-press', name: 'Machine Chest Press', muscleGroup: 'chest', movementType: 'horizontal-press', compound: true, doneBy: ['sulek', 'cutler', 'israetel', 'doucette'] },
    { id: 'ex-db-fly', name: 'Dumbbell Fly', muscleGroup: 'chest', movementType: 'fly', compound: false, doneBy: ['arnold', 'kai', 'sulek'] },
    { id: 'ex-pec-deck', name: 'Pec Deck', muscleGroup: 'chest', movementType: 'fly', compound: false, doneBy: ['yates', 'heath', 'israetel', 'sulek'] },
    { id: 'ex-push-up', name: 'Push-Up', muscleGroup: 'chest', movementType: 'horizontal-press', compound: true, doneBy: ['cavaliere', 'deyzel', 'ohearn'] },
    { id: 'ex-low-high-cable-fly', name: 'Low-to-High Cable Fly', muscleGroup: 'chest', movementType: 'fly', compound: false, doneBy: ['terry', 'eubank', 'kai'] },
    { id: 'ex-barbell-row', name: 'Barbell Row', muscleGroup: 'back', movementType: 'horizontal-pull', compound: true, doneBy: ['ronnie', 'yates', 'cutler', 'wheels', 'nippard', 'laid', 'ohearn', 'arnold'] },
    { id: 'ex-lat-pulldown', name: 'Lat Pulldown', muscleGroup: 'back', movementType: 'vertical-pull', compound: true, doneBy: ['sulek', 'cbum', 'terry', 'eubank', 'israetel', 'heath'] },
    { id: 'ex-pull-up', name: 'Pull-Up', muscleGroup: 'back', movementType: 'vertical-pull', compound: true, doneBy: ['nippard', 'arnold', 'deyzel', 'cavaliere', 'laid'] },
    { id: 'ex-t-bar-row', name: 'T-Bar Row', muscleGroup: 'back', movementType: 'horizontal-pull', compound: true, doneBy: ['cbum', 'ronnie', 'cutler', 'kai', 'ohearn'] },
    { id: 'ex-deadlift', name: 'Deadlift', muscleGroup: 'back', movementType: 'hinge', compound: true, doneBy: ['ronnie', 'deyzel', 'wheels', 'nippard', 'laid', 'yates', 'ohearn'] },
    { id: 'ex-seated-cable-row', name: 'Seated Cable Row', muscleGroup: 'back', movementType: 'horizontal-pull', compound: true, doneBy: ['terry', 'sulek', 'eubank', 'heath', 'israetel'] },
    { id: 'ex-single-arm-db-row', name: 'Single-Arm Dumbbell Row', muscleGroup: 'back', movementType: 'horizontal-pull', compound: true, doneBy: ['kai', 'cutler', 'feroce', 'cbum'] },
    { id: 'ex-straight-arm-pulldown', name: 'Straight-Arm Pulldown', muscleGroup: 'back', movementType: 'vertical-pull', compound: false, doneBy: ['kai', 'terry', 'cbum'] },
    { id: 'ex-chest-supported-row', name: 'Chest-Supported Row', muscleGroup: 'back', movementType: 'horizontal-pull', compound: true, doneBy: ['nippard', 'israetel', 'cavaliere', 'laid'] },
    { id: 'ex-rack-pull', name: 'Rack Pull', muscleGroup: 'back', movementType: 'hinge', compound: true, doneBy: ['wheels', 'yates', 'ohearn'] },
    { id: 'ex-barbell-back-squat', name: 'Barbell Back Squat', muscleGroup: 'quads', movementType: 'squat', compound: true, doneBy: ['ronnie', 'platz', 'wheels', 'deyzel', 'ohearn', 'laid', 'israetel'] },
    { id: 'ex-hack-squat', name: 'Hack Squat', muscleGroup: 'quads', movementType: 'squat', compound: true, doneBy: ['cbum', 'platz', 'cutler', 'heath', 'sulek'] },
    { id: 'ex-leg-press', name: 'Leg Press', muscleGroup: 'quads', movementType: 'squat', compound: true, doneBy: ['sulek', 'cutler', 'ronnie', 'doucette', 'feroce', 'heath'] },
    { id: 'ex-leg-extension', name: 'Leg Extension', muscleGroup: 'quads', movementType: 'isolation', compound: false, doneBy: ['platz', 'cutler', 'cbum', 'sulek', 'kai', 'israetel'] },
    { id: 'ex-bulgarian-split-squat', name: 'Bulgarian Split Squat', muscleGroup: 'quads', movementType: 'squat', compound: true, doneBy: ['nippard', 'cavaliere', 'laid', 'eubank'] },
    { id: 'ex-front-squat', name: 'Front Squat', muscleGroup: 'quads', movementType: 'squat', compound: true, doneBy: ['platz', 'cavaliere', 'wheels'] },
    { id: 'ex-romanian-deadlift', name: 'Romanian Deadlift', muscleGroup: 'hamstrings', movementType: 'hinge', compound: true, doneBy: ['nippard', 'cbum', 'deyzel', 'laid', 'israetel', 'eubank'] },
    { id: 'ex-lying-leg-curl', name: 'Lying Leg Curl', muscleGroup: 'hamstrings', movementType: 'isolation', compound: false, doneBy: ['platz', 'sulek', 'cutler', 'heath', 'kai'] },
    { id: 'ex-seated-leg-curl', name: 'Seated Leg Curl', muscleGroup: 'hamstrings', movementType: 'isolation', compound: false, doneBy: ['nippard', 'terry', 'israetel', 'cbum'] },
    { id: 'ex-stiff-leg-deadlift', name: 'Stiff-Leg Deadlift', muscleGroup: 'hamstrings', movementType: 'hinge', compound: true, doneBy: ['ronnie', 'platz', 'yates'] },
    { id: 'ex-glute-ham-raise', name: 'Glute-Ham Raise', muscleGroup: 'hamstrings', movementType: 'isolation', compound: false, doneBy: ['cavaliere', 'wheels', 'ohearn'] },
    { id: 'ex-seated-db-press', name: 'Seated Dumbbell Press', muscleGroup: 'shoulders', movementType: 'vertical-press', compound: true, doneBy: ['ronnie', 'sulek', 'cutler', 'heath', 'feroce'] },
    { id: 'ex-arnold-press', name: 'Arnold Press', muscleGroup: 'shoulders', movementType: 'vertical-press', compound: true, doneBy: ['arnold', 'eubank', 'laid'] },
    { id: 'ex-lateral-raise', name: 'Lateral Raise', muscleGroup: 'shoulders', movementType: 'isolation', compound: false, doneBy: ['terry', 'eubank', 'cbum', 'sulek', 'nippard', 'feroce', 'heath', 'kai', 'israetel'] },
    { id: 'ex-rear-delt-fly', name: 'Rear Delt Fly', muscleGroup: 'shoulders', movementType: 'isolation', compound: false, doneBy: ['nippard', 'terry', 'yates', 'cavaliere', 'israetel'] },
    { id: 'ex-overhead-bb-press', name: 'Overhead Barbell Press', muscleGroup: 'shoulders', movementType: 'vertical-press', compound: true, doneBy: ['ohearn', 'wheels', 'laid', 'arnold'] },
    { id: 'ex-cable-lateral-raise', name: 'Cable Lateral Raise', muscleGroup: 'shoulders', movementType: 'isolation', compound: false, doneBy: ['cbum', 'terry', 'kai'] },
    { id: 'ex-preacher-curl', name: 'Preacher Curl', muscleGroup: 'biceps', movementType: 'isolation', compound: false, doneBy: ['cbum', 'sulek', 'feroce', 'arnold'] },
    { id: 'ex-incline-db-curl', name: 'Incline Dumbbell Curl', muscleGroup: 'biceps', movementType: 'isolation', compound: false, doneBy: ['sulek', 'eubank', 'arnold', 'laid'] },
    { id: 'ex-concentration-curl', name: 'Concentration Curl', muscleGroup: 'biceps', movementType: 'isolation', compound: false, doneBy: ['arnold', 'terry', 'kai'] },
    { id: 'ex-barbell-curl', name: 'Barbell Curl', muscleGroup: 'biceps', movementType: 'isolation', compound: false, doneBy: ['ronnie', 'wheels', 'cutler', 'feroce', 'yates'] },
    { id: 'ex-hammer-curl', name: 'Hammer Curl', muscleGroup: 'biceps', movementType: 'isolation', compound: false, doneBy: ['heath', 'deyzel', 'feroce', 'laid', 'sulek'] },
    { id: 'ex-cable-pushdown', name: 'Cable Pushdown', muscleGroup: 'triceps', movementType: 'isolation', compound: false, doneBy: ['terry', 'cbum', 'sulek', 'cutler', 'heath', 'feroce'] },
    { id: 'ex-skull-crushers', name: 'Skull Crushers', muscleGroup: 'triceps', movementType: 'isolation', compound: false, doneBy: ['wheels', 'ronnie', 'arnold', 'feroce'] },
    { id: 'ex-overhead-triceps-ext', name: 'Overhead Triceps Extension', muscleGroup: 'triceps', movementType: 'isolation', compound: false, doneBy: ['eubank', 'nippard', 'israetel', 'kai'] },
    { id: 'ex-close-grip-bench', name: 'Close-Grip Bench Press', muscleGroup: 'triceps', movementType: 'horizontal-press', compound: true, doneBy: ['wheels', 'nippard', 'yates', 'ohearn'] },
    { id: 'ex-triceps-dip-machine', name: 'Triceps Dip Machine', muscleGroup: 'triceps', movementType: 'vertical-press', compound: true, doneBy: ['sulek', 'cutler', 'doucette'] },
    { id: 'ex-standing-calf-raise', name: 'Standing Calf Raise', muscleGroup: 'calves', movementType: 'isolation', compound: false, doneBy: ['arnold', 'platz', 'cutler', 'heath', 'cbum'] },
    { id: 'ex-seated-calf-raise', name: 'Seated Calf Raise', muscleGroup: 'calves', movementType: 'isolation', compound: false, doneBy: ['platz', 'sulek', 'terry', 'israetel'] },
    { id: 'ex-leg-press-calf-raise', name: 'Leg Press Calf Raise', muscleGroup: 'calves', movementType: 'isolation', compound: false, doneBy: ['sulek', 'cutler', 'doucette', 'heath'] },
    { id: 'ex-donkey-calf-raise', name: 'Donkey Calf Raise', muscleGroup: 'calves', movementType: 'isolation', compound: false, doneBy: ['arnold', 'platz'] },
    { id: 'ex-barbell-wrist-curl', name: 'Barbell Wrist Curl', muscleGroup: 'forearms', movementType: 'isolation', compound: false, doneBy: ['wheels', 'feroce', 'ronnie'] },
    { id: 'ex-reverse-barbell-curl', name: 'Reverse Barbell Curl', muscleGroup: 'forearms', movementType: 'isolation', compound: false, doneBy: ['feroce', 'arnold', 'laid'] },
    { id: 'ex-farmers-carry', name: "Farmer's Carry", muscleGroup: 'forearms', movementType: 'carry', compound: true, doneBy: ['wheels', 'ohearn', 'cavaliere', 'deyzel'] },
    { id: 'ex-dead-hang', name: 'Dead Hang', muscleGroup: 'forearms', movementType: 'isometric', compound: false, doneBy: ['cavaliere', 'nippard', 'laid'] },
    { id: 'ex-barbell-shrug', name: 'Barbell Shrug', muscleGroup: 'traps', movementType: 'isolation', compound: false, doneBy: ['ronnie', 'wheels', 'cutler', 'ohearn', 'feroce'] },
    { id: 'ex-db-shrug', name: 'Dumbbell Shrug', muscleGroup: 'traps', movementType: 'isolation', compound: false, doneBy: ['heath', 'sulek', 'deyzel', 'laid'] },
    { id: 'ex-face-pull', name: 'Face Pull', muscleGroup: 'traps', movementType: 'horizontal-pull', compound: false, doneBy: ['cavaliere', 'nippard', 'israetel', 'terry'] },
    { id: 'ex-upright-row', name: 'Upright Row', muscleGroup: 'traps', movementType: 'vertical-pull', compound: true, doneBy: ['arnold', 'cutler', 'feroce'] },
    { id: 'ex-hanging-leg-raise', name: 'Hanging Leg Raise', muscleGroup: 'abs', movementType: 'isolation', compound: false, doneBy: ['terry', 'eubank', 'nippard', 'laid', 'cbum'] },
    { id: 'ex-cable-crunch', name: 'Cable Crunch', muscleGroup: 'abs', movementType: 'isolation', compound: false, doneBy: ['cbum', 'cutler', 'heath', 'kai'] },
    { id: 'ex-ab-wheel-rollout', name: 'Ab Wheel Rollout', muscleGroup: 'abs', movementType: 'isolation', compound: false, doneBy: ['cavaliere', 'israetel', 'ohearn'] },
    { id: 'ex-plank', name: 'Plank', muscleGroup: 'abs', movementType: 'isometric', compound: false, doneBy: ['nippard', 'deyzel', 'cavaliere', 'doucette'] },
  ],
  supplements: [
    { id: 'sup-creatine', name: 'Creatine Monohydrate', category: 'performance', endorsedBy: ['cbum', 'sulek', 'terry', 'nippard', 'cutler', 'deyzel', 'wheels', 'eubank', 'ronnie', 'yates', 'israetel', 'cavaliere', 'laid', 'heath', 'doucette', 'feroce', 'ohearn'] },
    { id: 'sup-whey', name: 'Whey Protein', category: 'protein', endorsedBy: ['cbum', 'sulek', 'terry', 'ronnie', 'nippard', 'cutler', 'deyzel', 'wheels', 'eubank', 'arnold', 'platz', 'heath', 'laid', 'doucette', 'feroce', 'israetel', 'kai', 'ohearn'] },
    { id: 'sup-pre-workout', name: 'Pre-Workout / Caffeine', category: 'performance', endorsedBy: ['sulek', 'terry', 'cutler', 'wheels', 'deyzel', 'eubank', 'ronnie', 'cbum', 'feroce', 'laid', 'doucette'] },
    { id: 'sup-vitamin-d3', name: 'Vitamin D3', category: 'health', endorsedBy: ['nippard', 'terry', 'cbum', 'eubank', 'cutler', 'deyzel', 'arnold', 'israetel', 'cavaliere', 'ohearn'] },
    { id: 'sup-omega3', name: 'Omega-3 Fish Oil', category: 'health', endorsedBy: ['nippard', 'terry', 'cutler', 'arnold', 'cbum', 'yates', 'cavaliere', 'israetel', 'ohearn', 'heath'] },
    { id: 'sup-multivitamin', name: 'Multivitamin', category: 'health', endorsedBy: ['ronnie', 'cutler', 'terry', 'deyzel', 'platz', 'arnold', 'heath', 'feroce'] },
    { id: 'sup-electrolytes', name: 'Electrolytes', category: 'recovery', endorsedBy: ['sulek', 'wheels', 'deyzel', 'eubank', 'terry', 'ohearn', 'laid'] },
    { id: 'sup-magnesium', name: 'Magnesium', category: 'recovery', endorsedBy: ['nippard', 'cbum', 'arnold', 'yates', 'israetel', 'cavaliere'] },
    { id: 'sup-citrulline', name: 'Citrulline Malate', category: 'performance', endorsedBy: ['israetel', 'nippard', 'feroce', 'eubank', 'laid'] },
    { id: 'sup-ashwagandha', name: 'Ashwagandha', category: 'recovery', endorsedBy: ['deyzel', 'eubank', 'laid', 'terry'] },
  ],
  meals: [
    { id: 'meal-chicken-rice-broccoli', name: 'Chicken, Rice & Broccoli', macros: { calories: 590, protein: 55, carbs: 70, fat: 10 }, style: 'hardcore', madeBy: ['cbum', 'ronnie', 'cutler', 'heath', 'terry', 'yates'] },
    { id: 'meal-anabolic-french-toast', name: 'Anabolic French Toast', macros: { calories: 470, protein: 42, carbs: 55, fat: 9 }, style: 'balanced', madeBy: ['doucette'] },
    { id: 'meal-ground-beef-rice', name: 'Ground Beef & Rice Bowl', macros: { calories: 650, protein: 48, carbs: 65, fat: 22 }, style: 'hardcore', madeBy: ['sulek', 'wheels', 'deyzel'] },
    { id: 'meal-steak-eggs', name: 'Steak & Eggs', macros: { calories: 610, protein: 62, carbs: 5, fat: 38 }, style: 'hardcore', madeBy: ['ohearn', 'wheels', 'yates'] },
    { id: 'meal-egg-white-pancakes', name: 'Egg White Oat Pancakes', macros: { calories: 430, protein: 38, carbs: 52, fat: 8 }, style: 'balanced', madeBy: ['nippard', 'israetel', 'terry'] },
    { id: 'meal-salmon-sweet-potato', name: 'Salmon, Sweet Potato & Greens', macros: { calories: 520, protein: 44, carbs: 45, fat: 18 }, style: 'balanced', madeBy: ['terry', 'eubank', 'cavaliere', 'arnold'] },
    { id: 'meal-greek-yogurt-bowl', name: 'Greek Yogurt Protein Bowl', macros: { calories: 380, protein: 40, carbs: 38, fat: 7 }, style: 'balanced', madeBy: ['israetel', 'laid', 'nippard', 'eubank'] },
    { id: 'meal-mass-gainer-smoothie', name: 'Mass-Gainer Smoothie', macros: { calories: 700, protein: 50, carbs: 90, fat: 15 }, style: 'hardcore', madeBy: ['deyzel', 'wheels', 'sulek', 'feroce'] },
    { id: 'meal-turkey-chili', name: 'Turkey Chili', macros: { calories: 480, protein: 46, carbs: 40, fat: 14 }, style: 'balanced', madeBy: ['cavaliere', 'doucette', 'cutler'] },
    { id: 'meal-protein-oatmeal', name: 'Protein Oatmeal with Berries', macros: { calories: 470, protein: 35, carbs: 60, fat: 9 }, style: 'balanced', madeBy: ['cbum', 'nippard', 'laid', 'deyzel'] },
  ],
}

// Default state: the user follows every creator.
export const seedFollowedIds: string[] = seedData.influencers.map((influencer) => influencer.id)

// Deterministic selection rules the workout builder applies per muscle group.
// requiredMovementTypes must each appear at least once when the group is
// picked (e.g. back needs one vertical pull AND one horizontal pull).
// maxPerMovementType caps how many exercises of one movement type can appear
// across the whole generated workout (never more than 2 of the same type).
export const workoutRules: WorkoutRules = {
  chest: { requiredMovementTypes: ['horizontal-press', 'incline-press'], maxPerMovementType: 2 },
  back: { requiredMovementTypes: ['vertical-pull', 'horizontal-pull'], maxPerMovementType: 2 },
  shoulders: { requiredMovementTypes: ['vertical-press', 'isolation'], maxPerMovementType: 2 },
  biceps: { requiredMovementTypes: ['isolation'], maxPerMovementType: 2 },
  triceps: { requiredMovementTypes: ['isolation'], maxPerMovementType: 2 },
  quads: { requiredMovementTypes: ['squat'], maxPerMovementType: 2 },
  hamstrings: { requiredMovementTypes: ['hinge'], maxPerMovementType: 2 },
  calves: { requiredMovementTypes: ['isolation'], maxPerMovementType: 2 },
  forearms: { requiredMovementTypes: [], maxPerMovementType: 2 },
  traps: { requiredMovementTypes: [], maxPerMovementType: 2 },
  abs: { requiredMovementTypes: [], maxPerMovementType: 2 },
}

// Deterministic per-goal rules the macro engine applies to bodyweight.
// calorieAdjustment is a fraction of maintenance (bodyweight x 15); protein
// is set per pound of bodyweight, staying high across every goal.
export const nutritionRules: NutritionRules = {
  cut: { calorieAdjustment: -0.2, proteinPerLb: 1.0 },
  maintain: { calorieAdjustment: 0, proteinPerLb: 0.85 },
  bulk: { calorieAdjustment: 0.15, proteinPerLb: 1.0 },
}

export const defaultUserStats: UserStats = {
  bodyweight: 180,
  goal: 'maintain',
  eatingStyle: 'balanced',
}
