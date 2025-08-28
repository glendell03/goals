import { router } from 'expo-router';
import { User } from 'lucide-react-native';
import React from 'react';
import { Pressable } from 'react-native';

import { Icon } from './icon';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg';
  imageUrl?: string;
  onPress?: () => void;
  navigateToProfile?: boolean;
  accessibilityLabel?: string;
}

const sizeMap = {
  sm: 32,
  md: 44,
  lg: 64,
};

const iconSizeMap = {
  sm: 'sm' as const,
  md: 'md' as const, 
  lg: 'lg' as const,
};

export const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  imageUrl,
  onPress,
  navigateToProfile = true,
  accessibilityLabel = 'Profile avatar, tap to open profile',
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (navigateToProfile) {
      router.push('/profile');
    }
  };

  const avatarSize = sizeMap[size];
  const iconSize = iconSizeMap[size];

  return (
    <Pressable
      onPress={handlePress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      className="items-center justify-center rounded-full overflow-hidden"
      style={({ pressed }) => ({
        width: avatarSize,
        height: avatarSize,
        backgroundColor: pressed 
          ? '#A78BFA' 
          : '#B794F6',
        borderWidth: 0,
        transform: [{ scale: pressed ? 0.95 : 1 }],
      })}
    >
      {imageUrl ? (
        // Future: Add Image component when user profile photos are implemented
        <Icon icon={User} size={iconSize} color="#FFFFFF" />
      ) : (
        <Icon icon={User} size={iconSize} color="#FFFFFF" />
      )}
    </Pressable>
  );
};
