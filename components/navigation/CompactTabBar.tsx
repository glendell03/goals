import { BlurView } from 'expo-blur';
import { Home, Plus, Target } from 'lucide-react-native';
import React from 'react';
import { Platform, Pressable, View } from 'react-native';


interface TabButtonProps {
  name: string;
  isActive: boolean;
  onPress: () => void;
  icon: any;
}

const TabButton: React.FC<TabButtonProps> = ({ name, isActive, onPress, icon: IconComponent }) => (
  <Pressable
    onPress={onPress}
    className="flex-1 items-center justify-center"
    accessible={true}
    accessibilityRole="button"
    accessibilityLabel={`${name} tab`}
    accessibilityState={{ selected: isActive }}
  >
    <View className="items-center justify-center relative">
      <IconComponent 
        size={26} 
        color={isActive ? '#B794F6' : '#9CA3AF'} 
        strokeWidth={isActive ? 2.5 : 2} 
      />
      {isActive && (
        <View 
          className="absolute -bottom-3 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: '#B794F6' }}
        />
      )}
    </View>
  </Pressable>
);

const PlusButton = ({ onPress }: { onPress: () => void }) => (
  <View className="flex-1 items-center justify-center">
    <Pressable
      onPress={onPress}
      className="items-center justify-center"
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Add goal"
      style={{
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#B794F6',
        shadowColor: '#B794F6',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 12,
        transform: [{ translateY: -2 }],
      }}
    >
      <Plus size={26} color="#FFFFFF" strokeWidth={2.5} />
    </Pressable>
  </View>
);

interface CompactTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  onAddPress: () => void;
}

export const CompactTabBar: React.FC<CompactTabBarProps> = ({
  state,
  descriptors,
  navigation,
  onAddPress,
}) => {
  const tabConfig = [
    { name: 'dashboard', icon: Home },
    { name: 'add', icon: null, isButton: true },
    { name: 'goals', icon: Target },
  ];

  return (
    <View
      style={{
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 34 : 20,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <View
        style={{
          width: 200,
          height: 72,
          flexDirection: 'row',
          borderRadius: 28,
          overflow: 'hidden',
          paddingHorizontal: 8,
          paddingVertical: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.3,
          shadowRadius: 24,
          elevation: 24,
        }}
      >
        {Platform.OS === 'ios' ? (
          <BlurView
            intensity={80}
            tint="dark"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(26, 26, 46, 0.4)',
            }}
          />
        ) : (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(26, 26, 46, 0.95)',
            }}
          />
        )}
        
        {tabConfig.map((tab, index) => {
          if (tab.isButton) {
            return <PlusButton key={tab.name} onPress={onAddPress} />;
          }

          const route = state.routes.find((r: any) => r.name === tab.name);
          if (!route) return null;

          const isFocused = state.index === state.routes.indexOf(route);

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TabButton
              key={tab.name}
              name={tab.name}
              isActive={isFocused}
              onPress={onPress}
              icon={tab.icon}
            />
          );
        })}
      </View>
    </View>
  );
};
