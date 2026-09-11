// Generated coaching copy for exercise detail pages, keyed by movementType.
// This is data logic (not UI): it derives display labels, a "why it matters"
// line, and a sensible "how to perform" sequence purely from the exercise's
// movementType. Kept separate so the detail page stays a thin presentation
// layer and a future API could return this same copy instead.

const MOVEMENT_LABELS: Record<string, string> = {
  'incline-press': 'Incline Press',
  'horizontal-press': 'Horizontal Press',
  fly: 'Fly',
  'vertical-press': 'Vertical Press',
  hinge: 'Hip Hinge',
  'horizontal-pull': 'Horizontal Pull',
  'vertical-pull': 'Vertical Pull',
  squat: 'Squat',
  isolation: 'Isolation',
  carry: 'Loaded Carry',
  isometric: 'Isometric Hold',
}

export function formatMovementType(movementType: string): string {
  return (
    MOVEMENT_LABELS[movementType] ??
    movementType
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  )
}

const WHY_IT_MATTERS: Record<string, string> = {
  'incline-press':
    'Incline presses shift emphasis onto the upper chest and front delts, building the shelf-like upper-pec fullness that separates a flat chest from a three-dimensional one.',
  'horizontal-press':
    'Horizontal presses build overall chest thickness and mass — the foundation most other chest work gets layered on top of.',
  fly: 'Flys isolate the pec fibers through a long stretch-to-contraction range, adding shape and inner-chest separation that pressing alone can\u2019t reach.',
  'vertical-press':
    'Vertical presses build shoulder width and overhead strength, rounding out the delts from the front and side.',
  hinge: 'Hip hinges load the posterior chain — glutes, hamstrings, and spinal erectors — building raw pulling strength and a resilient lower back.',
  'horizontal-pull':
    'Horizontal pulls build mid-back thickness, dragging the shoulder blades together to thicken the mid-traps and rhomboids.',
  'vertical-pull':
    'Vertical pulls build back width, widening the lats to create the V-taper look.',
  squat: 'Squats are the primary driver of quad size and overall leg mass, loading the muscle through a long, stretched range of motion.',
  isolation:
    'Isolation work lets you fatigue a single muscle directly, filling in detail and balance that compound lifts can\u2019t fully target.',
  carry: 'Loaded carries build grip and forearm endurance under real-world load while reinforcing full-body bracing.',
  isometric:
    'Isometric holds build tendon and core stability by training a muscle to resist movement rather than produce it.',
}

export function getWhyItMatters(movementType: string): string {
  return (
    WHY_IT_MATTERS[movementType] ??
    'This movement pattern trains the target muscle through a range and loading style that complements the rest of your program.'
  )
}

const HOW_TO_STEPS: Record<string, string[]> = {
  'incline-press': [
    'Set an incline bench to roughly 30\u201345\u00b0 and lie back with your feet flat on the floor.',
    'Grip the bar or dumbbells just outside shoulder width and unrack to arm\u2019s length.',
    'Lower the weight under control to the top of your chest, keeping elbows at about a 45\u00b0 angle.',
    'Press back up and slightly back, driving through your upper chest and front delts.',
    'Pause briefly at the top without locking out hard, then repeat for reps.',
  ],
  'horizontal-press': [
    'Lie on a flat bench (or set up for push-ups) with your grip slightly wider than shoulder width.',
    'Brace your core and pull your shoulder blades back and down into the bench.',
    'Lower the weight under control to chest level, keeping elbows at roughly a 45\u00b0 angle.',
    'Press back up powerfully, exhaling as you extend your arms.',
    'Pause briefly at the top, then repeat without letting your shoulders round forward.',
  ],
  fly: [
    'Set an incline bench or stand between cable towers with a slight, fixed bend in your elbows.',
    'Start with your arms wide and feel a deep stretch across the chest.',
    'Sweep your arms together in an arcing motion, squeezing the pecs at the center.',
    'Control the negative back to the stretched position without letting the weight drop.',
    'Keep the elbow bend constant throughout \u2014 this is a chest isolation move, not a press.',
  ],
  'vertical-press': [
    'Set the bench upright or stand tall with the bar or dumbbells at shoulder height.',
    'Brace your core and glutes to keep your lower back neutral.',
    'Press the weight straight overhead until your arms are fully extended.',
    'Lower with control back to shoulder height, keeping elbows slightly forward.',
    'Repeat without letting your lower back arch excessively.',
  ],
  hinge: [
    'Stand with feet hip-width apart, the bar or weight close to your shins.',
    'Push your hips back while keeping a flat back and soft knees.',
    'Lower until you feel a deep hamstring stretch, keeping the weight close to your legs.',
    'Drive your hips forward to stand tall, squeezing your glutes at the top.',
    'Keep the bar path vertical and your spine neutral throughout the lift.',
  ],
  'horizontal-pull': [
    'Hinge at the hips or sit at the row station with a slight forward lean.',
    'Grip the bar or handle and let your shoulder blades protract at the start position.',
    'Pull the weight into your torso, driving your elbows back and squeezing shoulder blades together.',
    'Pause briefly at full contraction, then extend your arms fully under control.',
    'Avoid using momentum \u2014 let your back do the work, not your lower back.',
  ],
  'vertical-pull': [
    'Grip the bar or handle wider than shoulder width for a lat-focused variation.',
    'Hang or sit with your arms fully extended and shoulder blades depressed.',
    'Pull your chest up toward the bar (or the bar down to your chest), leading with your elbows.',
    'Squeeze your lats hard at the bottom of the movement.',
    'Lower back to a full stretch under control before the next rep.',
  ],
  squat: [
    'Set up with the weight loaded and your feet shoulder-width apart.',
    'Brace your core and unrack or load the weight, keeping your chest tall.',
    'Descend by pushing your hips back and bending your knees, keeping weight through your midfoot.',
    'Go as deep as your mobility allows while keeping your lower back neutral.',
    'Drive back up through your heels, extending your hips and knees together.',
  ],
  isolation: [
    'Set a light-to-moderate weight and get into a stable position for the target muscle.',
    'Perform a brief warm-up rep to feel the target muscle working before loading up.',
    'Move through a full range of motion, focusing on the muscle rather than momentum.',
    'Squeeze hard at peak contraction for a one-second pause.',
    'Control the eccentric (lowering) portion \u2014 this is where isolation work does most of its job.',
  ],
  carry: [
    'Load a pair of implements to a challenging but manageable weight.',
    'Brace your core, stand tall, and pack your shoulders down and back.',
    'Walk with controlled, even steps, keeping the weight from swinging.',
    'Maintain your grip and posture for the full distance or time target.',
    'Set the weight down with control rather than dropping it.',
  ],
  isometric: [
    'Get into the hold position with proper alignment through your whole body.',
    'Brace your core and squeeze the target muscles hard.',
    'Hold a straight, neutral line \u2014 no sagging or piking.',
    'Breathe steadily through the hold rather than holding your breath.',
    'Release with control once your form starts to break down.',
  ],
}

export function getHowToSteps(movementType: string): string[] {
  return (
    HOW_TO_STEPS[movementType] ?? [
      'Set up in a stable, controlled starting position for the movement.',
      'Brace your core and move through a full, deliberate range of motion.',
      'Focus tension on the target muscle rather than relying on momentum.',
      'Control the return to the starting position on every rep.',
      'Repeat for your target rep range, keeping form consistent set to set.',
    ]
  )
}
