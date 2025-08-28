/**
 * Modern sports/gambling app inspired color system
 * Designed for premium dark theme with high contrast and accessibility
 */

export const Colors = {
  light: {
    // Backgrounds
    background: '#FFFFFF',
    surface: '#F8F9FA',
    card: '#FFFFFF',
    
    // Text
    text: '#1A1A1A',
    textSecondary: '#6B6B73',
    textMuted: '#9E9E9E',
    
    // Interactive
    primary: '#8B5A96',
    success: '#00C853',
    error: '#FF1744',
    warning: '#FFB300',
    
    // UI Elements
    border: '#E0E0E0',
    tint: '#8B5A96',
    icon: '#6B6B73',
    tabIconDefault: '#9E9E9E',
    tabIconSelected: '#8B5A96',
  },
  dark: {
    // Backgrounds - Dark lavender theme
    background: '#1A1A2E',        // Deep navy base
    surface: '#16213E',           // Elevated surfaces
    card: '#2D3748',             // Card backgrounds
    
    // Text - High contrast hierarchy
    text: '#F7FAFC',             // Off-white text
    textSecondary: '#CBD5E0',    // Light gray text
    textMuted: '#9CA3AF',        // Muted text
    
    // Interactive - Lavender accent colors
    primary: '#B794F6',          // Primary lavender
    success: '#68D391',          // Success green
    error: '#F56565',           // Error red
    warning: '#F6E05E',         // Warning yellow
    accent: '#81E6D9',          // Accent teal
    
    // UI Elements
    border: '#4A5568',          // Subtle borders
    tint: '#B794F6',
    icon: '#CBD5E0',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: '#B794F6',
    
    // Special states
    cardHover: '#374151',       // Hover states
    overlay: 'rgba(26, 26, 46, 0.9)', // Modal overlays
    
    // Bento box colors - Sophisticated gradient system
    bentoA: '#6366F1',          // Indigo (Primary stats)
    bentoB: '#8B5CF6',          // Purple (Secondary stats) 
    bentoC: '#06B6D4',          // Cyan (Today goals)
    bentoD: '#F59E0B',          // Amber (Overdue - attention)
    bentoE: '#10B981',          // Emerald (Completed - success)
  },
};
