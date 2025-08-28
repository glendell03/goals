import { cn } from '@/lib/utils';
import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface TypographyProps extends RNTextProps {
  variant?: 'display' | 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'small';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'muted' | 'success' | 'error' | 'warning';
  className?: string;
}

const variantStyles = {
  display: 'text-4xl leading-9',      // 32px
  h1: 'text-3xl leading-8',           // 28px
  h2: 'text-2xl leading-7',           // 24px
  h3: 'text-xl leading-6',            // 20px
  body: 'text-base leading-6',        // 16px
  caption: 'text-sm leading-5',       // 14px
  small: 'text-xs leading-4',         // 12px
};

const weightStyles = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const colorStyles = {
  primary: 'text-typography-950 dark:text-typography-0',
  secondary: 'text-typography-700 dark:text-typography-300',
  muted: 'text-typography-500 dark:text-typography-400',
  success: 'text-success-600 dark:text-success-400',
  error: 'text-error-600 dark:text-error-400',
  warning: 'text-warning-600 dark:text-warning-400',
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  weight = 'regular',
  color = 'primary',
  className,
  children,
  ...props
}) => {
  const combinedClassName = cn(
    variantStyles[variant],
    weightStyles[weight],
    colorStyles[color],
    className
  );

  return (
    <RNText className={combinedClassName} {...props}>
      {children}
    </RNText>
  );
};

// Preset components for common use cases
export const DisplayText: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="display" weight="bold" {...props} />
);

export const Heading1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h1" weight="bold" {...props} />
);

export const Heading2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h2" weight="semibold" {...props} />
);

export const Heading3: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h3" weight="semibold" {...props} />
);

export const BodyText: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="body" {...props} />
);

export const CaptionText: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="caption" weight="medium" {...props} />
);

export const SmallText: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="small" weight="medium" {...props} />
);