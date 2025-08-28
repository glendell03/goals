import { cn } from '@/lib/utils';
import React from 'react';
import { ActivityIndicator, Pressable, PressableProps } from 'react-native';
import { Typography } from './Typography';

interface ButtonProps extends PressableProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  className?: string;
  textClassName?: string;
  children: React.ReactNode;
}

const buttonVariants = {
  primary: 'bg-primary-600 active:bg-primary-700 dark:bg-primary-500 dark:active:bg-primary-600',
  secondary: 'bg-secondary-200 active:bg-secondary-300 dark:bg-secondary-800 dark:active:bg-secondary-700',
  outline: 'border border-outline-300 active:bg-background-50 dark:border-outline-700 dark:active:bg-background-900',
  ghost: 'active:bg-background-100 dark:active:bg-background-800',
  destructive: 'bg-error-600 active:bg-error-700 dark:bg-error-500 dark:active:bg-error-600',
};

const buttonSizes = {
  sm: 'px-3 py-2 rounded-lg min-h-[36px]',
  md: 'px-4 py-3 rounded-xl min-h-[44px]',
  lg: 'px-6 py-4 rounded-2xl min-h-[52px]',
};

const textVariants = {
  primary: 'text-typography-0',
  secondary: 'text-typography-900 dark:text-typography-100',
  outline: 'text-typography-900 dark:text-typography-100',
  ghost: 'text-typography-900 dark:text-typography-100',
  destructive: 'text-typography-0',
};

const textSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className,
  textClassName,
  children,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      className={cn(
        'flex-row items-center justify-center',
        buttonVariants[variant],
        buttonSizes[size],
        isDisabled && 'opacity-50',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'destructive' ? '#FFFFFF' : '#000000'}
          className="mr-2"
        />
      )}
      <Typography
        variant={size === 'sm' ? 'caption' : size === 'lg' ? 'h3' : 'body'}
        weight="semibold"
        className={cn(
          textVariants[variant],
          textSizes[size],
          textClassName
        )}
      >
        {children}
      </Typography>
    </Pressable>
  );
};

// Preset button components
export const PrimaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="primary" {...props} />
);

export const SecondaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="secondary" {...props} />
);

export const OutlineButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="outline" {...props} />
);

export const GhostButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="ghost" {...props} />
);

export const DestructiveButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="destructive" {...props} />
);
