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
    { id: 'ex-incline-db-press', name: 'Incline Dumbbell Press', muscleGroup: 'chest', movementType: 'incline-press', compound: true, doneBy: ['cbum', 'sulek', 'eubank', 'wheels', 'laid', 'heath'], gif: '/exercises/ex-incline-db-press.gif' },
    { id: 'ex-flat-bb-bench', name: 'Flat Barbell Bench Press', muscleGroup: 'chest', movementType: 'horizontal-press', compound: true, doneBy: ['ronnie', 'wheels', 'cutler', 'ohearn', 'laid', 'arnold'], gif: '/exercises/ex-flat-bb-bench.gif' },
    { id: 'ex-incline-bb-press', name: 'Incline Barbell Press', muscleGroup: 'chest', movementType: 'incline-press', compound: true, doneBy: ['heath', 'cutler', 'laid', 'cbum'] },
    { id: 'ex-cable-fly', name: 'Cable Fly', muscleGroup: 'chest', movementType: 'fly', compound: false, doneBy: ['terry', 'eubank', 'arnold', 'kai', 'heath'], gif: '/exercises/ex-cable-fly.gif' },
    { id: 'ex-dips', name: 'Dips', muscleGroup: 'chest', movementType: 'vertical-press', compound: true, doneBy: ['yates', 'arnold', 'nippard', 'cavaliere', 'feroce'] },
    { id: 'ex-machine-chest-press', name: 'Machine Chest Press', muscleGroup: 'chest', movementType: 'horizontal-press', compound: true, doneBy: ['sulek', 'cutler', 'israetel', 'doucette'] },
    { id: 'ex-db-fly', name: 'Dumbbell Fly', muscleGroup: 'chest', movementType: 'fly', compound: false, doneBy: ['arnold', 'kai', 'sulek'] },
    { id: 'ex-pec-deck', name: 'Pec Deck', muscleGroup: 'chest', movementType: 'fly', compound: false, doneBy: ['yates', 'heath', 'israetel', 'sulek'], gif: '/exercises/ex-pec-deck.gif' },
    { id: 'ex-push-up', name: 'Push-Up', muscleGroup: 'chest', movementType: 'horizontal-press', compound: true, doneBy: ['cavaliere', 'deyzel', 'ohearn'] },
    { id: 'ex-low-high-cable-fly', name: 'Low-to-High Cable Fly', muscleGroup: 'chest', movementType: 'fly', compound: false, doneBy: ['terry', 'eubank', 'kai'], gif: '/exercises/ex-low-high-cable-fly.gif' },
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
    { id: 'ex-triceps-dip-machine', name: 'Triceps Dip Machine', muscleGroup: 'triceps', movementType: 'vertical-press', compound: true, doneBy: ['sulek', 'cutler', 'doucette'], gif: '/exercises/ex-triceps-dip-machine.gif' },
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
    { id: 'meal-chicken-rice-broccoli', name: 'Chicken, Rice & Broccoli', macros: { calories: 590, protein: 55, carbs: 70, fat: 10 }, style: 'hardcore', madeBy: ['cbum', 'ronnie', 'cutler', 'heath', 'terry', 'yates'], image: '/meals/meal-chicken-rice-broccoli.png', recipe: { servings: 1, prepMinutes: 5, cookMinutes: 20, ingredients: ['8 oz chicken breast', '1 cup cooked white rice', '2 cups broccoli florets', '1 tsp olive oil', 'Salt, pepper, garlic powder, paprika'], steps: ['Season the chicken breast on both sides with salt, pepper, garlic powder, and paprika.', 'Heat olive oil in a pan over medium-high heat and cook the chicken 6-7 minutes per side until it reaches 165°F internal. Rest, then slice.', 'While the chicken cooks, steam the broccoli for 4-5 minutes until bright green and tender-crisp.', 'Plate the rice, top with sliced chicken and broccoli, and season to taste.'] } },
    { id: 'meal-anabolic-french-toast', name: 'Anabolic French Toast', macros: { calories: 470, protein: 42, carbs: 55, fat: 9 }, style: 'balanced', madeBy: ['doucette'], image: '/meals/meal-anabolic-french-toast.png', recipe: { servings: 1, prepMinutes: 5, cookMinutes: 10, ingredients: ['3 slices high-protein bread', '4 egg whites', '1 scoop vanilla protein powder', '1/4 cup unsweetened almond milk', '1/2 tsp cinnamon', 'Fresh berries and sugar-free syrup to top'], steps: ['Whisk the egg whites, protein powder, almond milk, and cinnamon into a smooth batter.', 'Dip each slice of bread, coating both sides but not soaking through.', 'Cook on a nonstick griddle over medium heat, 2-3 minutes per side, until golden.', 'Stack, top with berries and a drizzle of sugar-free syrup, and serve warm.'] } },
    { id: 'meal-ground-beef-rice', name: 'Ground Beef & Rice Bowl', macros: { calories: 650, protein: 48, carbs: 65, fat: 22 }, style: 'hardcore', madeBy: ['sulek', 'wheels', 'deyzel'], image: '/meals/meal-ground-beef-rice.png', recipe: { servings: 1, prepMinutes: 5, cookMinutes: 15, ingredients: ['8 oz 90/10 ground beef', '1 cup cooked white rice', '1/2 cup diced bell pepper and onion', '1 tbsp low-sodium soy sauce', 'Salt, pepper, garlic powder'], steps: ['Brown the ground beef in a hot pan, breaking it apart, until no pink remains. Drain excess fat if desired.', 'Add the diced pepper and onion and cook 3-4 minutes until softened.', 'Stir in the soy sauce and seasonings and cook 1 more minute.', 'Serve the beef and vegetables over the warm rice.'] } },
    { id: 'meal-steak-eggs', name: 'Steak & Eggs', macros: { calories: 610, protein: 62, carbs: 5, fat: 38 }, style: 'hardcore', madeBy: ['ohearn', 'wheels', 'yates'], image: '/meals/meal-steak-eggs.png', recipe: { servings: 1, prepMinutes: 5, cookMinutes: 12, ingredients: ['8 oz sirloin or ribeye steak', '2 whole eggs', '1 tsp butter or tallow', 'Salt and coarse black pepper'], steps: ['Pat the steak dry and season generously with salt and pepper. Let it sit 10 minutes at room temperature.', 'Sear in a screaming-hot pan 3-4 minutes per side for medium-rare, then rest 5 minutes before slicing.', 'In the same pan, melt the butter and fry the eggs sunny-side up to your liking.', 'Plate the sliced steak alongside the eggs and finish with flaky salt.'] } },
    { id: 'meal-egg-white-pancakes', name: 'Egg White Oat Pancakes', macros: { calories: 430, protein: 38, carbs: 52, fat: 8 }, style: 'balanced', madeBy: ['nippard', 'israetel', 'terry'], image: '/meals/meal-egg-white-pancakes.png', recipe: { servings: 1, prepMinutes: 5, cookMinutes: 10, ingredients: ['1/2 cup rolled oats', '1/2 cup egg whites', '1 scoop vanilla protein powder', '1/2 banana', '1/2 tsp baking powder', 'Sliced banana to top'], steps: ['Blend the oats, egg whites, protein powder, banana, and baking powder until smooth.', 'Let the batter rest 2-3 minutes to thicken.', 'Pour small pancakes onto a nonstick griddle over medium heat; cook until bubbles form, then flip and cook 1-2 minutes more.', 'Stack and top with sliced banana.'] } },
    { id: 'meal-salmon-sweet-potato', name: 'Salmon, Sweet Potato & Greens', macros: { calories: 520, protein: 44, carbs: 45, fat: 18 }, style: 'balanced', madeBy: ['terry', 'eubank', 'cavaliere', 'arnold'], image: '/meals/meal-salmon-sweet-potato.png', recipe: { servings: 1, prepMinutes: 10, cookMinutes: 25, ingredients: ['6 oz salmon fillet', '1 medium sweet potato, cubed', '2 cups spinach or kale', '1 tbsp olive oil', 'Lemon, salt, pepper'], steps: ['Preheat oven to 425°F. Toss the sweet potato cubes with half the olive oil, salt, and pepper, and roast 20-25 minutes.', 'Season the salmon and roast on the same tray for the last 12-14 minutes, until it flakes easily.', 'Sauté the greens in the remaining olive oil for 2-3 minutes until wilted.', 'Plate everything and finish the salmon with a squeeze of lemon.'] } },
    { id: 'meal-greek-yogurt-bowl', name: 'Greek Yogurt Protein Bowl', macros: { calories: 380, protein: 40, carbs: 38, fat: 7 }, style: 'balanced', madeBy: ['israetel', 'laid', 'nippard', 'eubank'], image: '/meals/meal-greek-yogurt-bowl.png', recipe: { servings: 1, prepMinutes: 5, cookMinutes: 0, ingredients: ['1.5 cups nonfat Greek yogurt', '1/3 cup granola', '1/2 cup mixed berries', '1 tsp honey', '1 tbsp chopped nuts (optional)'], steps: ['Spoon the Greek yogurt into a bowl and level the top.', 'Layer on the granola and mixed berries.', 'Drizzle with honey and scatter the chopped nuts if using.', 'Serve immediately so the granola stays crunchy.'] } },
    { id: 'meal-mass-gainer-smoothie', name: 'Mass-Gainer Smoothie', macros: { calories: 700, protein: 50, carbs: 90, fat: 15 }, style: 'hardcore', madeBy: ['deyzel', 'wheels', 'sulek', 'feroce'], image: '/meals/meal-mass-gainer-smoothie.png', recipe: { servings: 1, prepMinutes: 5, cookMinutes: 0, ingredients: ['2 scoops whey protein', '1 cup whole milk', '1 banana', '1/2 cup rolled oats', '2 tbsp peanut butter', '1 cup ice'], steps: ['Add the milk and oats to a blender first so the oats break down fully.', 'Add the protein, banana, peanut butter, and ice.', 'Blend on high 45-60 seconds until completely smooth and thick.', 'Pour into a tall glass and drink right away.'] } },
    { id: 'meal-turkey-chili', name: 'Turkey Chili', macros: { calories: 480, protein: 46, carbs: 40, fat: 14 }, style: 'balanced', madeBy: ['cavaliere', 'doucette', 'cutler'], image: '/meals/meal-turkey-chili.png', recipe: { servings: 4, prepMinutes: 10, cookMinutes: 30, ingredients: ['1.5 lb lean ground turkey', '1 can kidney beans, drained', '1 can diced tomatoes', '1 onion, diced', '2 tbsp chili powder', '1 tsp cumin', 'Salt and pepper'], steps: ['Brown the ground turkey with the diced onion in a large pot over medium-high heat.', 'Stir in the chili powder, cumin, salt, and pepper and cook 1 minute until fragrant.', 'Add the diced tomatoes and kidney beans, then bring to a simmer.', 'Reduce heat and simmer, stirring occasionally, for 20-25 minutes until thickened. Divide into 4 servings.'] } },
    { id: 'meal-protein-oatmeal', name: 'Protein Oatmeal with Berries', macros: { calories: 470, protein: 35, carbs: 60, fat: 9 }, style: 'balanced', madeBy: ['cbum', 'nippard', 'laid', 'deyzel'], image: '/meals/meal-protein-oatmeal.png', recipe: { servings: 1, prepMinutes: 3, cookMinutes: 7, ingredients: ['1 cup rolled oats', '2 cups water or milk', '1 scoop vanilla protein powder', '1/2 cup mixed berries', 'Pinch of salt and cinnamon'], steps: ['Bring the water or milk to a gentle boil with a pinch of salt.', 'Stir in the oats and cook 5-6 minutes over medium heat, stirring, until creamy.', 'Remove from heat and let cool 1 minute, then stir in the protein powder until smooth (adding off-heat keeps it from clumping).', 'Top with mixed berries and a dusting of cinnamon.'] } },
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
