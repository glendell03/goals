import { cn } from '@/lib/utils';
import React from 'react';
import { View, ViewProps } from 'react-native';
import { Typography } from './Typography';

interface ProgressProps extends ViewProps {
  value: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  className?: string;
}

const progressSizes = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const progressVariants = {
  default: 'bg-primary-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  error: 'bg-error-500',
};

export const Progress: React.FC<ProgressProps> = ({
  value,
  size = 'md',
  variant = 'default',
  showLabel = false,
  className,
  ...props
}) => {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <View className={cn('w-full', className)} {...props}>
      {showLabel && (
        <View className="flex-row justify-between items-center mb-1">
          <Typography variant="caption" color="secondary">
            Progress
          </Typography>
          <Typography variant="caption" color="secondary">
            {Math.round(clampedValue)}%
          </Typography>
        </View>
      )}
      <View className={cn(
        'w-full rounded-full bg-background-200 dark:bg-background-800',
        progressSizes[size]
      )}>
        <View
          className={cn(
            'rounded-full transition-all duration-300',
            progressSizes[size],
            progressVariants[variant]
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </View>
    </View>
  );
};

// Circular progress component for goals
interface CircularProgressProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 64,
  strokeWidth = 4,
  variant = 'default',
  showLabel = true,
  className,
}) => {
  const clampedValue = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (clampedValue / 100) * circumference;

  const colors = {
    default: '#0180FF',
    success: '#00E676',
    warning: '#FFD700',
    error: '#FF1744',
  };

  return (
    <View className={cn('items-center justify-center', className)}>
      <View className="relative">
        {/* Background circle */}
        <View
          className="rounded-full bg-background-200 dark:bg-background-800"
          style={{
            width: size,
            height: size,
            transform: [{ rotate: '-90deg' }],
          }}
        >
          {/* Progress circle - This would need react-native-svg for actual implementation */}
          <View
            className={cn('rounded-full', progressVariants[variant])}
            style={{
              width: strokeWidth,
              height: clampedValue * (size / 100),
              position: 'absolute',
              left: (size - strokeWidth) / 2,
            }}
          />
        </View>
        
        {showLabel && (
          <View className="absolute inset-0 items-center justify-center">
            <Typography variant="caption" weight="bold" color="primary">
              {Math.round(clampedValue)}%
            </Typography>
          </View>
        )}
      </View>
    </View>
  );
};
