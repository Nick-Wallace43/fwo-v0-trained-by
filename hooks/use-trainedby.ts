'use client'

import { useMemo, useSyncExternalStore } from 'react'
import * as repo from '@/lib/repository'
import { getServerSnapshot, getSnapshot, subscribe } from '@/lib/storage'

// The single bridge between UI and data. Components use only this hook; they
// never import storage or repository directly. It subscribes to the store so
// every follow/unfollow re-renders consumers automatically.
export function useTrainedBy() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return useMemo(
    () => ({
      influencers: state.data.influencers,
      followedIds: state.followedIds,
      followedCount: state.followedIds.length,
      getInfluencer: repo.getInfluencer,
      isFollowing: (id: string) => state.followedIds.includes(id),
      // Derived from live state so every "X of Y" count re-renders on follow changes.
      countFollowedEndorsers: (creatorIds: string[]) =>
        creatorIds.reduce((total, id) => (state.followedIds.includes(id) ? total + 1 : total), 0),
      follow: repo.follow,
      unfollow: repo.unfollow,
      toggleFollow: repo.toggleFollow,
      getExercise: repo.getExercise,
      getExercises: repo.getExercises,
      getMuscleGroups: repo.getMuscleGroups,
      getMeals: repo.getMeals,
      getSupplements: repo.getSupplements,
      generateWorkout: repo.generateWorkout,
      canSwapExercise: repo.canSwapExercise,
      swapExerciseInWorkout: repo.swapExerciseInWorkout,
      estimateWorkoutDuration: repo.estimateWorkoutDuration,
      savedWorkouts: state.savedWorkouts,
      getSavedWorkout: (id: string) => state.savedWorkouts.find((workout) => workout.id === id),
      saveWorkout: repo.saveWorkout,
      userStats: state.userStats,
      saveUserStats: repo.saveUserStats,
      getMacroTargets: repo.getMacroTargets,
      getMealsByStyle: repo.getMealsByStyle,
      buildDay: repo.buildDay,
      dayTotals: repo.dayTotals,
      isDayWithinTolerance: repo.isDayWithinTolerance,
      swapDayMeal: repo.swapDayMeal,
    }),
    [state],
  )
}
