import { Typography } from '@/components/ui/Typography';
import { Edit3, Mail, User } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';

interface ProfileHeaderProps {
  onEditProfile?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  onEditProfile,
}) => {
  return (
    <View className="items-center mb-8">
      <View className="relative mb-4">
        <View
          className="w-24 h-24 rounded-full items-center justify-center"
          style={{
            backgroundColor: '#B794F6',
            shadowColor: '#B794F6',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 8,
          }}
        >
          <User size={32} color="#FFFFFF" />
        </View>
        
        {onEditProfile && (
          <Pressable
            onPress={onEditProfile}
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full items-center justify-center"
            style={{ backgroundColor: '#1A1A2E' }}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Edit profile"
          >
            <Edit3 size={14} color="#B794F6" />
          </Pressable>
        )}
      </View>

      <Typography variant="h2" weight="bold" className="text-white mb-2">
        John Doe
      </Typography>

      <View className="flex-row items-center mb-4">
        <Mail size={16} color="#B794F6" />
        <Typography variant="body" className="text-white/80 ml-2">
          john.doe@example.com
        </Typography>
      </View>

      <View className="flex-row items-center space-x-6">
        <View className="items-center">
          <Typography variant="h3" weight="bold" className="text-white">
            12
          </Typography>
          <Typography variant="caption" className="text-white/60">
            Goals
          </Typography>
        </View>
        
        <View className="w-px h-8 bg-white/20" />
        
        <View className="items-center">
          <Typography variant="h3" weight="bold" className="text-white">
            8
          </Typography>
          <Typography variant="caption" className="text-white/60">
            Completed
          </Typography>
        </View>
        
        <View className="w-px h-8 bg-white/20" />
        
        <View className="items-center">
          <Typography variant="h3" weight="bold" className="text-white">
            67%
          </Typography>
          <Typography variant="caption" className="text-white/60">
            Success Rate
          </Typography>
        </View>
      </View>
    </View>
  );
};
