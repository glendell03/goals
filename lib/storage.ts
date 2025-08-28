import { MMKV } from 'react-native-mmkv';

// Create MMKV storage instance for goals app
export const storage = new MMKV({
  id: 'goals-app-storage',
  encryptionKey: 'goals-secure-key-2024'
});

// Storage keys
export const STORAGE_KEYS = {
  GOALS: 'goals',
  USER_PREFERENCES: 'userPreferences',
  THEME: 'theme',
  ONBOARDING_COMPLETED: 'onboardingCompleted',
  LAST_SYNC: 'lastSync',
  DAILY_QUOTE: 'dailyQuote',
  STREAK_DATA: 'streakData',
} as const;

// Type-safe storage utilities
export const storageUtils = {
  // Goals management
  getGoals: (): Goal[] => {
    try {
      const goalsJson = storage.getString(STORAGE_KEYS.GOALS);
      return goalsJson ? JSON.parse(goalsJson) : [];
    } catch (error) {
      // If parsing fails, return empty array and clear corrupted data
      storage.delete(STORAGE_KEYS.GOALS);
      return [];
    }
  },

  setGoals: (goals: Goal[]): void => {
    storage.set(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  },

  addGoal: (goal: Goal): void => {
    try {
      const currentGoals = storageUtils.getGoals();
      const updatedGoals = [...currentGoals, goal];
      storageUtils.setGoals(updatedGoals);
    } catch (error) {
      throw new Error(`Failed to add goal: ${error}`);
    }
  },

  updateGoal: (goalId: string, updates: Partial<Goal>): void => {
    try {
      const currentGoals = storageUtils.getGoals();
      const goalExists = currentGoals.some(goal => goal.id === goalId);
      
      if (!goalExists) {
        throw new Error(`Goal with ID ${goalId} not found`);
      }
      
      const updatedGoals = currentGoals.map(goal =>
        goal.id === goalId ? { ...goal, ...updates } : goal
      );
      storageUtils.setGoals(updatedGoals);
    } catch (error) {
      throw new Error(`Failed to update goal: ${error}`);
    }
  },

  deleteGoal: (goalId: string): void => {
    try {
      const currentGoals = storageUtils.getGoals();
      const goalExists = currentGoals.some(goal => goal.id === goalId);
      
      if (!goalExists) {
        throw new Error(`Goal with ID ${goalId} not found`);
      }
      
      const updatedGoals = currentGoals.filter(goal => goal.id !== goalId);
      storageUtils.setGoals(updatedGoals);
    } catch (error) {
      throw new Error(`Failed to delete goal: ${error}`);
    }
  },

  // User preferences
  getUserPreferences: (): UserPreferences => {
    const prefsJson = storage.getString(STORAGE_KEYS.USER_PREFERENCES);
    return prefsJson ? JSON.parse(prefsJson) : {
      theme: 'dark',
      notifications: true,
      hapticFeedback: true,
      streakReminders: true,
    };
  },

  setUserPreferences: (preferences: UserPreferences): void => {
    storage.set(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
  },

  // Theme
  getTheme: (): 'light' | 'dark' => {
    return storage.getString(STORAGE_KEYS.THEME) as 'light' | 'dark' || 'dark';
  },

  setTheme: (theme: 'light' | 'dark'): void => {
    storage.set(STORAGE_KEYS.THEME, theme);
  },

  // Daily quote cache
  getDailyQuote: (): DailyQuote | null => {
    const quoteJson = storage.getString(STORAGE_KEYS.DAILY_QUOTE);
    return quoteJson ? JSON.parse(quoteJson) : null;
  },

  setDailyQuote: (quote: DailyQuote): void => {
    storage.set(STORAGE_KEYS.DAILY_QUOTE, JSON.stringify(quote));
  },

  // Streak data
  getStreakData: (): StreakData => {
    const streakJson = storage.getString(STORAGE_KEYS.STREAK_DATA);
    return streakJson ? JSON.parse(streakJson) : {
      currentStreak: 0,
      longestStreak: 0,
      lastCompletionDate: null,
    };
  },

  setStreakData: (data: StreakData): void => {
    storage.set(STORAGE_KEYS.STREAK_DATA, JSON.stringify(data));
  },

  // Utility methods
  clear: (): void => {
    storage.clearAll();
  },

  removeKey: (key: string): void => {
    storage.delete(key);
  },
};

// Type definitions
export interface Goal {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  category?: string;
  priority: 'low' | 'medium' | 'high';
  progress: number; // 0-100
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  proofPhoto?: string;
  subtasks?: SubTask[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  hapticFeedback: boolean;
  streakReminders: boolean;
}

export interface DailyQuote {
  text: string;
  author: string;
  date: string;
  category?: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCompletionDate: string | null;
}
