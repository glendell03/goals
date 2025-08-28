import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { View, ViewProps } from 'react-native';
import { Icon } from './icon';
import { Typography } from './Typography';

interface StatusBadgeProps extends ViewProps {
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  size?: 'sm' | 'md';
  showIcon?: boolean;
  className?: string;
}

interface PriorityBadgeProps extends ViewProps {
  priority: 'low' | 'medium' | 'high';
  size?: 'sm' | 'md';
  className?: string;
}

interface CustomBadgeProps extends ViewProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  icon?: LucideIcon;
  className?: string;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    variant: 'default' as const,
    bgClass: 'bg-background-200 dark:bg-background-700',
    textClass: 'text-typography-700 dark:text-typography-300',
  },
  'in-progress': {
    label: 'In Progress',
    variant: 'info' as const,
    bgClass: 'bg-primary-100 dark:bg-primary-900',
    textClass: 'text-primary-700 dark:text-primary-300',
  },
  completed: {
    label: 'Completed',
    variant: 'success' as const,
    bgClass: 'bg-success-100 dark:bg-success-900',
    textClass: 'text-success-700 dark:text-success-300',
  },
  overdue: {
    label: 'Overdue',
    variant: 'error' as const,
    bgClass: 'bg-error-100 dark:bg-error-900',
    textClass: 'text-error-700 dark:text-error-300',
  },
};

const priorityConfig = {
  low: {
    label: 'Low',
    bgClass: 'bg-success-100 dark:bg-success-900',
    textClass: 'text-success-700 dark:text-success-300',
  },
  medium: {
    label: 'Medium',
    bgClass: 'bg-warning-100 dark:bg-warning-900',
    textClass: 'text-warning-700 dark:text-warning-300',
  },
  high: {
    label: 'High',
    bgClass: 'bg-error-100 dark:bg-error-900',
    textClass: 'text-error-700 dark:text-error-300',
  },
};

const variantStyles = {
  default: {
    bgClass: 'bg-background-200 dark:bg-background-700',
    textClass: 'text-typography-700 dark:text-typography-300',
  },
  success: {
    bgClass: 'bg-success-100 dark:bg-success-900',
    textClass: 'text-success-700 dark:text-success-300',
  },
  warning: {
    bgClass: 'bg-warning-100 dark:bg-warning-900',
    textClass: 'text-warning-700 dark:text-warning-300',
  },
  error: {
    bgClass: 'bg-error-100 dark:bg-error-900',
    textClass: 'text-error-700 dark:text-error-300',
  },
  info: {
    bgClass: 'bg-primary-100 dark:bg-primary-900',
    textClass: 'text-primary-700 dark:text-primary-300',
  },
};

const sizeStyles = {
  sm: 'px-2 py-1 rounded-md',
  md: 'px-3 py-1.5 rounded-lg',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'sm',
  showIcon = false,
  className,
  ...props
}) => {
  const config = statusConfig[status];

  return (
    <View
      className={cn(
        'flex-row items-center',
        sizeStyles[size],
        config.bgClass,
        className
      )}
      {...props}
    >
      {showIcon && (
        <View className="mr-1">
          {/* Status icons would be implemented here */}
        </View>
      )}
      <Typography
        variant={size === 'sm' ? 'small' : 'caption'}
        weight="medium"
        className={config.textClass}
      >
        {config.label}
      </Typography>
    </View>
  );
};

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  size = 'sm',
  className,
  ...props
}) => {
  const config = priorityConfig[priority];

  return (
    <View
      className={cn(
        'flex-row items-center',
        sizeStyles[size],
        config.bgClass,
        className
      )}
      {...props}
    >
      <Typography
        variant={size === 'sm' ? 'small' : 'caption'}
        weight="medium"
        className={config.textClass}
      >
        {config.label}
      </Typography>
    </View>
  );
};

export const CustomBadge: React.FC<CustomBadgeProps> = ({
  label,
  variant = 'default',
  size = 'sm',
  icon: IconComponent,
  className,
  ...props
}) => {
  const config = variantStyles[variant];

  return (
    <View
      className={cn(
        'flex-row items-center',
        sizeStyles[size],
        config.bgClass,
        className
      )}
      {...props}
    >
      {IconComponent && (
        <Icon
          icon={IconComponent}
          size="xs"
          className="mr-1"
        />
      )}
      <Typography
        variant={size === 'sm' ? 'small' : 'caption'}
        weight="medium"
        className={config.textClass}
      >
        {label}
      </Typography>
    </View>
  );
};
