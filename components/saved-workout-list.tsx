import { CalendarDays, Dumbbell } from 'lucide-react'
import Link from 'next/link'
import type { SavedWorkout } from '@/lib/types'

// Horizontal strip of saved workouts on the Workouts tab. Tapping one reopens
// it at /workout/[id]. Renders nothing until the user has saved a workout.
export function SavedWorkoutList({ workouts }: { workouts: SavedWorkout[] }) {
  if (workouts.length === 0) return null

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">My Workouts</h2>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {workouts.map((workout) => (
          <Link
            key={workout.id}
            href={`/workout/${workout.id}`}
            className="flex w-48 shrink-0 flex-col gap-2 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary"
          >
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
              <Dumbbell className="size-3.5" />
              {workout.exercises.length} exercises
            </span>
            <span className="font-display text-sm font-semibold uppercase leading-tight text-balance">
              {workout.name}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <CalendarDays className="size-3.5" />
              {new Date(workout.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
