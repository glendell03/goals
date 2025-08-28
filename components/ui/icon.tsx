import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { View, ViewProps } from 'react-native';

interface IconProps extends ViewProps {
  icon: LucideIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 'md',
  color,
  className,
  ...props
}) => {
  const iconSize = iconSizes[size];
  
  return (
    <View
      className={cn('items-center justify-center', className)}
      style={{ width: iconSize, height: iconSize }}
      {...props}
    >
      <IconComponent
        size={iconSize}
        color={color || '#B3B3B8'} // Default to secondary text color
      />
    </View>
  );
};

// Preset icon components for common use cases
export const SmallIcon: React.FC<Omit<IconProps, 'size'>> = (props) => (
  <Icon size="sm" {...props} />
);

export const LargeIcon: React.FC<Omit<IconProps, 'size'>> = (props) => (
  <Icon size="lg" {...props} />
);
