import { Goal, storageUtils } from '@/lib/storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface GoalsState {
  goals: Goal[];
  loading: boolean;
}

interface GoalsActions {
  loadGoals: () => void;
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<{ success: boolean; goal?: Goal; error?: any }>;
  updateGoal: (goalId: string, updates: Partial<Goal>) => Promise<{ success: boolean; error?: any }>;
  deleteGoal: (goalId: string) => Promise<{ success: boolean; error?: any }>;
  completeGoal: (goalId: string) => Promise<{ success: boolean; error?: any }>;
  getGoalsByStatus: (status: Goal['status']) => Goal[];
  getTodaysGoals: () => Goal[];
  getOverdueGoals: () => Goal[];
}

type GoalsStore = GoalsState & GoalsActions;

// Custom MMKV storage adapter for Zustand
const mmkvStorage = {
  getItem: (name: string): string | null => {
    try {
      const goals = storageUtils.getGoals();
      return JSON.stringify({ goals });
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      const parsed = JSON.parse(value);
      if (parsed.goals) {
        storageUtils.setGoals(parsed.goals);
      }
    } catch {
      // Silent fail for storage errors
    }
  },
  removeItem: (name: string): void => {
    try {
      storageUtils.setGoals([]);
    } catch {
      // Silent fail for storage errors
    }
  },
};

export const useGoalsStore = create<GoalsStore>()(
  persist(
    (set, get) => ({
      // State
      goals: [],
      loading: true,

      // Actions
      loadGoals: () => {
        try {
          const storedGoals = storageUtils.getGoals();
          set({ goals: storedGoals, loading: false });
        } catch {
          set({ goals: [], loading: false });
        }
      },

      addGoal: async (goalData) => {
        const newGoal: Goal = {
          ...goalData,
          id: Date.now().toString(36) + Math.random().toString(36).substr(2),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Optimistic update
        set((state) => ({
          goals: [...state.goals, newGoal],
        }));

        try {
          await new Promise<void>((resolve, reject) => {
            try {
              storageUtils.addGoal(newGoal);
              resolve();
            } catch (error) {
              reject(error);
            }
          });

          return { success: true, goal: newGoal };
        } catch (error) {
          // Rollback optimistic update
          set((state) => ({
            goals: state.goals.filter((g) => g.id !== newGoal.id),
          }));
          return { success: false, error };
        }
      },

      updateGoal: async (goalId, updates) => {
        const updatedGoal = {
          ...updates,
          updatedAt: new Date().toISOString(),
        };

        // Store original goal for rollback
        let originalGoal: Goal | undefined;

        // Optimistic update
        set((state) => ({
          goals: state.goals.map((goal) => {
            if (goal.id === goalId) {
              originalGoal = goal;
              return { ...goal, ...updatedGoal };
            }
            return goal;
          }),
        }));

        try {
          await new Promise<void>((resolve, reject) => {
            try {
              storageUtils.updateGoal(goalId, updatedGoal);
              resolve();
            } catch (error) {
              reject(error);
            }
          });

          return { success: true };
        } catch (error) {
          // Rollback optimistic update
          if (originalGoal) {
            set((state) => ({
              goals: state.goals.map((goal) =>
                goal.id === goalId ? originalGoal! : goal
              ),
            }));
          }
          return { success: false, error };
        }
      },

      deleteGoal: async (goalId) => {
        // Store deleted goal for rollback
        let deletedGoal: Goal | undefined;

        // Optimistic update
        set((state) => {
          deletedGoal = state.goals.find((goal) => goal.id === goalId);
          return {
            goals: state.goals.filter((goal) => goal.id !== goalId),
          };
        });

        try {
          await new Promise<void>((resolve, reject) => {
            try {
              storageUtils.deleteGoal(goalId);
              resolve();
            } catch (error) {
              reject(error);
            }
          });

          return { success: true };
        } catch (error) {
          // Rollback optimistic update
          if (deletedGoal) {
            set((state) => ({
              goals: [...state.goals, deletedGoal!],
            }));
          }
          return { success: false, error };
        }
      },

      completeGoal: async (goalId) => {
        const completedAt = new Date().toISOString();
        return get().updateGoal(goalId, {
          status: 'completed',
          progress: 100,
          completedAt,
        });
      },

      // Computed getters
      getGoalsByStatus: (status) => {
        return get().goals.filter((goal) => goal.status === status);
      },

      getTodaysGoals: () => {
        const today = new Date().toDateString();
        return get().goals.filter((goal) => {
          const dueDate = new Date(goal.dueDate).toDateString();
          return dueDate === today;
        });
      },

      getOverdueGoals: () => {
        const now = new Date();
        return get().goals.filter((goal) => {
          const dueDate = new Date(goal.dueDate);
          return dueDate < now && goal.status !== 'completed';
        });
      },
    }),
    {
      name: 'goals-storage',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({ goals: state.goals }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.loading = false;
        }
      },
    }
  )
);

// Initialize store
useGoalsStore.getState().loadGoals();
