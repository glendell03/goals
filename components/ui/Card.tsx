import { cn } from '@/lib/utils';
import React from 'react';
import { Pressable, PressableProps, View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

interface CardPressableProps extends PressableProps {
  variant?: 'default' | 'elevated' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const cardVariants = {
  default: 'bg-background-0 dark:bg-background-950',
  elevated: 'bg-background-0 dark:bg-background-900 shadow-soft-1',
  outlined: 'bg-background-0 dark:bg-background-900 border border-outline-200 dark:border-outline-800',
};

const cardSizes = {
  sm: 'p-3 rounded-lg',
  md: 'p-4 rounded-xl',
  lg: 'p-6 rounded-2xl',
};

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <View
      className={cn(
        cardVariants[variant],
        cardSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
};

export const CardPressable: React.FC<CardPressableProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <Pressable
      className={cn(
        cardVariants[variant],
        cardSizes[size],
        'active:scale-95 transition-transform',
        className
      )}
      {...props}
    >
      {children}
    </Pressable>
  );
};

// Sub-components
export const CardHeader: React.FC<ViewProps & { className?: string }> = ({
  className,
  children,
  ...props
}) => (
  <View className={cn('mb-3', className)} {...props}>
    {children}
  </View>
);

export const CardContent: React.FC<ViewProps & { className?: string }> = ({
  className,
  children,
  ...props
}) => (
  <View className={cn('flex-1', className)} {...props}>
    {children}
  </View>
);

export const CardFooter: React.FC<ViewProps & { className?: string }> = ({
  className,
  children,
  ...props
}) => (
  <View className={cn('mt-3 flex-row justify-between items-center', className)} {...props}>
    {children}
  </View>
);