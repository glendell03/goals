import { Card, CardContent } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import {
    Bell,
    ChevronRight,
    HelpCircle,
    LogOut,
    Moon,
    Shield,
    Star,
} from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';

interface SettingItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  showChevron?: boolean;
  textColor?: string;
}

interface ProfileSettingsProps {
  onSettingPress?: (settingId: string) => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  onSettingPress = () => {},
}) => {
  const settingsItems: SettingItem[] = [
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell size={20} color="#B794F6" />,
      onPress: () => onSettingPress('notifications'),
      showChevron: true,
    },
    {
      id: 'theme',
      title: 'Dark Mode',
      icon: <Moon size={20} color="#B794F6" />,
      onPress: () => onSettingPress('theme'),
      showChevron: true,
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: <Shield size={20} color="#B794F6" />,
      onPress: () => onSettingPress('privacy'),
      showChevron: true,
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: <HelpCircle size={20} color="#B794F6" />,
      onPress: () => onSettingPress('help'),
      showChevron: true,
    },
    {
      id: 'rate',
      title: 'Rate the App',
      icon: <Star size={20} color="#FFD700" />,
      onPress: () => onSettingPress('rate'),
      showChevron: true,
    },
    {
      id: 'logout',
      title: 'Sign Out',
      icon: <LogOut size={20} color="#EF4444" />,
      onPress: () => onSettingPress('logout'),
      textColor: '#EF4444',
      showChevron: false,
    },
  ];

  return (
    <Card className="border-slate-700/50 bg-slate-800/30">
      <CardContent className="p-0">
        {settingsItems.map((item, index) => (
          <Pressable
            key={item.id}
            onPress={item.onPress}
            className={`flex-row items-center justify-between p-4 ${
              index !== settingsItems.length - 1 ? 'border-b border-slate-700/30' : ''
            }`}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={item.title}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-full items-center justify-center mr-3 bg-slate-700/30">
                {item.icon}
              </View>
              <Typography
                variant="body"
                className={item.textColor ? '' : 'text-white'}
                style={item.textColor ? { color: item.textColor } : undefined}
              >
                {item.title}
              </Typography>
            </View>
            
            {item.showChevron && (
              <ChevronRight size={20} color="#6B7280" />
            )}
          </Pressable>
        ))}
      </CardContent>
    </Card>
  );
};
