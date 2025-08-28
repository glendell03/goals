import { Typography } from '@/components/ui/Typography';
import { Icon } from '@/components/ui/icon';
import { Colors } from '@/constants/Colors';
import { cn } from '@/lib/utils';
import { Calendar, CheckCircle2, Clock, Flame, Target, TrendingUp } from 'lucide-react-native';
import React from 'react';
import { Dimensions, View } from 'react-native';

const { width } = Dimensions.get('window');
const padding = 16;
const gap = 12;
const availableWidth = width - (padding * 2);

interface BentoBoxProps {
  stats: {
    completionRate: number;
    todayGoals: number;
    overdueGoals: number;
    streak: number;
    totalGoals: number;
    completedGoals: number;
  };
  className?: string;
}

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  style?: any;
  variant?: 'A' | 'B' | 'C' | 'D' | 'E';
}

const BentoItem: React.FC<BentoItemProps> = ({ 
  children, 
  className, 
  style, 
  variant = 'A' 
}) => {
  const getVariantStyle = () => {
    const darkColors = Colors.dark;
    const baseStyle = {
      borderRadius: 24,
      elevation: 8,
    };
    
    // Color-coded shadows for depth and meaning
    switch (variant) {
      case 'A': return { 
        ...baseStyle, 
        backgroundColor: darkColors.bentoA,
        shadowColor: darkColors.bentoA,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
      };
      case 'B': return { 
        ...baseStyle, 
        backgroundColor: darkColors.bentoB,
        shadowColor: darkColors.bentoB,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
      };
      case 'C': return { 
        ...baseStyle, 
        backgroundColor: darkColors.bentoC,
        shadowColor: darkColors.bentoC,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 18,
      };
      case 'D': return { 
        ...baseStyle, 
        backgroundColor: darkColors.bentoD,
        shadowColor: darkColors.bentoD,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 18,
      };
      case 'E': return { 
        ...baseStyle, 
        backgroundColor: darkColors.bentoE,
        shadowColor: darkColors.bentoE,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 18,
      };
      default: return { 
        ...baseStyle, 
        backgroundColor: darkColors.bentoA,
        shadowColor: darkColors.bentoA,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
      };
    }
  };

  return (
    <View style={[getVariantStyle(), style]} className={cn('overflow-hidden', className)}>
      <View className="p-5 flex-1">
        {children}
      </View>
    </View>
  );
};

export const BentoBox: React.FC<BentoBoxProps> = ({ stats, className }) => {
  const largeWidth = (availableWidth - gap) / 2;
  const smallWidth = (availableWidth - gap * 2) / 3;
  const mediumHeight = 140;
  const largeHeight = 180;
  const smallHeight = 110;

  return (
    <View className={cn('p-4', className)}>
      {/* Row 1: Two large cards */}
      <View className="flex-row mb-3" style={{ gap }}>
        <BentoItem
          variant="A"
          style={{ width: largeWidth, height: largeHeight }}
        >
          <View className="flex-1 justify-between">
            <View className="flex-row items-start justify-between">
              <View 
                className="w-12 h-12 rounded-2xl items-center justify-center"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Icon icon={Target} size="lg" color="#FFFFFF" />
              </View>
              <View className="items-end">
                <Typography variant="display" weight="bold" className="text-white leading-none">
                  {stats.completionRate}
                </Typography>
                <Typography variant="caption" className="text-white/60">
                  %
                </Typography>
              </View>
            </View>
            <View className="mt-4">
              <Typography variant="h3" weight="semibold" className="text-white/95 mb-1">
                Completion Rate
              </Typography>
              <Typography variant="caption" className="text-white/70">
                {stats.completedGoals} of {stats.totalGoals} goals completed
              </Typography>
            </View>
            <View className="mt-4">
              <View className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <View 
                  className="h-full bg-white rounded-full"
                  style={{ width: `${stats.completionRate}%` }}
                />
              </View>
            </View>
          </View>
        </BentoItem>

        <BentoItem
          variant="B"
          style={{ width: largeWidth, height: largeHeight }}
        >
          <View className="flex-1 justify-between">
            <View className="flex-row items-start justify-between">
              <View 
                className="w-12 h-12 rounded-2xl items-center justify-center"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Icon icon={Flame} size="lg" color="#FFFFFF" />
              </View>
              <View className="items-end">
                <Typography variant="display" weight="bold" className="text-white leading-none">
                  {stats.streak}
                </Typography>
                <Typography variant="caption" className="text-white/60">
                  days
                </Typography>
              </View>
            </View>
            <View className="mt-4">
              <Typography variant="h3" weight="semibold" className="text-white/95 mb-1">
                Current Streak
              </Typography>
              <Typography variant="caption" className="text-white/70">
                Keep the momentum going! 🔥
              </Typography>
            </View>
            <View className="flex-row items-center mt-4 space-x-2">
              {[...Array(7)].map((_, i) => (
                <View 
                  key={i}
                  className="w-1 h-6 rounded-full"
                  style={{ 
                    backgroundColor: i < stats.streak ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)',
                    opacity: i < stats.streak ? 1 : 0.5 
                  }}
                />
              ))}
            </View>
          </View>
        </BentoItem>
      </View>

      {/* Row 2: Three small cards */}
      <View className="flex-row mb-3" style={{ gap }}>
        <BentoItem
          variant="C"
          style={{ width: smallWidth, height: smallHeight }}
        >
          <View className="flex-1 justify-between items-center">
            <View 
              className="w-10 h-10 rounded-2xl items-center justify-center mb-2"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <Icon icon={Calendar} size="md" color="#FFFFFF" />
            </View>
            <View className="items-center">
              <Typography variant="h1" weight="bold" className="text-white leading-none">
                {stats.todayGoals}
              </Typography>
              <Typography variant="small" className="text-white/80 text-center mt-1">
                Due Today
              </Typography>
            </View>
          </View>
        </BentoItem>

        <BentoItem
          variant="D"
          style={{ width: smallWidth, height: smallHeight }}
        >
          <View className="flex-1 justify-between items-center">
            <View 
              className="w-10 h-10 rounded-2xl items-center justify-center mb-2"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <Icon icon={Clock} size="md" color="#FFFFFF" />
            </View>
            <View className="items-center">
              <Typography variant="h1" weight="bold" className="text-white leading-none">
                {stats.overdueGoals}
              </Typography>
              <Typography variant="small" className="text-white/80 text-center mt-1">
                Overdue
              </Typography>
            </View>
          </View>
        </BentoItem>

        <BentoItem
          variant="E"
          style={{ width: smallWidth, height: smallHeight }}
        >
          <View className="flex-1 justify-between items-center">
            <View 
              className="w-10 h-10 rounded-2xl items-center justify-center mb-2"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <Icon icon={CheckCircle2} size="md" color="#FFFFFF" />
            </View>
            <View className="items-center">
              <Typography variant="h1" weight="bold" className="text-white leading-none">
                {stats.completedGoals}
              </Typography>
              <Typography variant="small" className="text-white/80 text-center mt-1">
                Completed
              </Typography>
            </View>
          </View>
        </BentoItem>
      </View>

      {/* Row 3: One wide card for recent activity */}
      <BentoItem
        variant="A"
        style={{ width: availableWidth, height: mediumHeight }}
      >
        <View className="flex-1 justify-between">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View 
                className="w-10 h-10 rounded-2xl items-center justify-center mr-3"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Icon icon={TrendingUp} size="md" color="#FFFFFF" />
              </View>
              <View>
                <Typography variant="h3" weight="semibold" className="text-white">
                  Recent Activity
                </Typography>
                <Typography variant="caption" className="text-white/70">
                  Last updated just now
                </Typography>
              </View>
            </View>
          </View>
          
          <View className="mt-4">
            <Typography variant="body" className="text-white/90 mb-2">
              {stats.completedGoals > 0 
                ? `Great progress! ${stats.completedGoals} goals completed.`
                : "Ready to start your goal journey? 🚀"
              }
            </Typography>
            <Typography variant="small" className="text-white/70">
              {stats.todayGoals > 0 
                ? `${stats.todayGoals} goals due today - you've got this! 💪`
                : "No goals due today. Perfect time to plan ahead! ✨"
              }
            </Typography>
          </View>
          
          <View className="flex-row items-center mt-2">
            <View className="flex-1 bg-white/20 h-2 rounded-full mr-3">
              <View 
                className="bg-white h-2 rounded-full" 
                style={{ width: `${stats.completionRate}%` }}
              />
            </View>
            <Typography variant="caption" weight="semibold" className="text-white">
              {stats.completionRate}% Complete
            </Typography>
          </View>
        </View>
      </BentoItem>
    </View>
  );
};
