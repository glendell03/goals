import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date utilities
export const dateUtils = {
  formatDate: (date: string | Date): string => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  formatRelativeTime: (date: string | Date): string => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return dateUtils.formatDate(date);
  },

  isToday: (date: string | Date): boolean => {
    const d = new Date(date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  },

  isOverdue: (dueDate: string | Date): boolean => {
    const due = new Date(dueDate);
    const now = new Date();
    return due < now && !dateUtils.isToday(due);
  },

  getDaysUntilDue: (dueDate: string | Date): number => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffMs = due.getTime() - now.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  },
};

// Goal utilities
export const goalUtils = {
  generateId: (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  calculateProgress: (subtasks: any[]): number => {
    if (!subtasks || subtasks.length === 0) return 0;
    const completed = subtasks.filter(task => task.completed).length;
    return Math.round((completed / subtasks.length) * 100);
  },

  getStatusColor: (status: string): string => {
    switch (status) {
      case 'completed':
        return 'text-success-600 dark:text-success-400';
      case 'in-progress':
        return 'text-primary-600 dark:text-primary-400';
      case 'overdue':
        return 'text-error-600 dark:text-error-400';
      default:
        return 'text-typography-600 dark:text-typography-400';
    }
  },

  getPriorityColor: (priority: string): string => {
    switch (priority) {
      case 'high':
        return 'text-error-600 dark:text-error-400';
      case 'medium':
        return 'text-warning-600 dark:text-warning-400';
      case 'low':
        return 'text-success-600 dark:text-success-400';
      default:
        return 'text-typography-600 dark:text-typography-400';
    }
  },
};

// String utilities
export const stringUtils = {
  truncate: (str: string, length: number): string => {
    return str.length > length ? str.substring(0, length) + '...' : str;
  },

  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  slugify: (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  },
};

// Animation utilities
export const animationUtils = {
  spring: {
    damping: 15,
    mass: 1,
    stiffness: 150,
  },

  timing: {
    duration: 300,
  },

  easing: {
    ease: 'ease-in-out',
  },
};

// Haptic feedback utilities (for React Native)
export const hapticUtils = {
  light: () => {
    // Will be implemented with expo-haptics
  },

  medium: () => {
    // Will be implemented with expo-haptics
  },

  heavy: () => {
    // Will be implemented with expo-haptics
  },

  success: () => {
    // Will be implemented with expo-haptics
  },

  error: () => {
    // Will be implemented with expo-haptics
  },
};
