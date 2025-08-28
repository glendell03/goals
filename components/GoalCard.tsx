import { Icon } from '@/components/ui/icon';
import { Typography } from '@/components/ui/Typography';
import { Goal } from '@/lib/storage';
import { cn, dateUtils } from '@/lib/utils';
import { useGoalsStore } from '@/stores/useGoalsStore';
import { Calendar, Flag, MoreVertical, Trash2 } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';

interface GoalCardProps {
  goal: Goal;
  onPress?: () => void;
  onMenuPress?: (goal: Goal) => void;
}

const getStatusColor = (status: Goal['status']) => {
  switch (status) {
    case 'completed': return '#10B981';
    case 'in-progress': return '#6366F1';
    case 'pending': return '#F59E0B';
    default: return '#94A3B8';
  }
};

const SWIPE_THRESHOLD = -80;

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onPress,
  onMenuPress,
}) => {
  const { completeGoal } = useGoalsStore();
  
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  
  const isOverdue = dateUtils.isOverdue(goal.dueDate) && goal.status !== 'completed';
  const daysUntilDue = dateUtils.getDaysUntilDue(goal.dueDate);
  const isToday = dateUtils.isToday(goal.dueDate);
  const isCompleted = goal.status === 'completed';

  const getDueDateText = () => {
    if (isToday) return 'Today';
    if (isOverdue) return `${Math.abs(daysUntilDue)}d overdue`;
    if (daysUntilDue === 1) return 'Tomorrow';
    if (daysUntilDue <= 7) return `${daysUntilDue}d`;
    return dateUtils.formatDate(goal.dueDate);
  };

  const getDueDateColor = () => {
    if (isOverdue) return '#EF4444';
    if (isToday) return '#F59E0B';
    if (daysUntilDue <= 3) return '#F59E0B';
    return '#94A3B8';
  };

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress(goal);
    }
  };

  const handleComplete = async () => {
    await completeGoal(goal.id);
  };

  const handleSwipeDelete = async () => {
    // This will be handled by swipe gesture - no longer used
    // Delete is now handled through the bottom sheet
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onChange((event) => {
      translateX.value = Math.min(0, event.translationX);
    })
    .onEnd((event) => {
      if (event.translationX < SWIPE_THRESHOLD) {
        translateX.value = withSpring(-120);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { scale: scale.value }
    ],
    opacity: opacity.value,
  }));

  const deleteButtonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < -40 ? withTiming(1) : withTiming(0),
    transform: [{ scale: translateX.value < -40 ? withSpring(1) : withSpring(0.8) }],
  }));

  const cardStyles = {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 16,
    overflow: 'hidden' as const,
  };


  return (
    <>
      <View style={{ position: 'relative' }}>
        {/* Delete Button Behind Card */}
        <Reanimated.View
          style={[
            {
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 120,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#EF4444',
              borderRadius: 20,
              marginBottom: 16,
            },
            deleteButtonAnimatedStyle,
          ]}
        >
          <Pressable
            onPress={handleSwipeDelete}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon icon={Trash2} size="lg" color="#FFFFFF" />
            <Typography variant="small" weight="bold" className="text-white mt-1">
              Delete
            </Typography>
          </Pressable>
        </Reanimated.View>

        {/* Main Card */}
        <GestureDetector gesture={panGesture}>
          <Reanimated.View style={[cardStyles, cardAnimatedStyle]}>
            <Pressable onPress={onPress} style={{ padding: 24 }}>
              {/* Header Section */}
              <View className="flex-row items-start justify-between mb-4">
                <View className="flex-1 mr-4">
                  <Typography
                    variant="h3"
                    weight="bold"
                    className={cn(
                      'text-gray-900 leading-tight',
                      isCompleted && 'text-gray-400 line-through'
                    )}
                    numberOfLines={2}
                  >
                    {goal.title}
                  </Typography>
                  {goal.description && (
                    <Typography
                      variant="body"
                      className={cn(
                        'text-gray-600 mt-2 leading-relaxed',
                        isCompleted && 'text-gray-400'
                      )}
                      numberOfLines={2}
                    >
                      {goal.description}
                    </Typography>
                  )}
                </View>
                
                <Pressable
                  onPress={handleMenuPress}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: '#F8FAFC',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon icon={MoreVertical} size="sm" color="#64748B" />
                </Pressable>
              </View>

              {/* Progress Section */}
              {!isCompleted && goal.progress > 0 && (
                <View className="mb-4">
                  <View className="flex-row items-center justify-between mb-2">
                    <Typography variant="small" className="text-gray-500 font-medium">
                      Progress
                    </Typography>
                    <Typography variant="small" className="text-gray-700 font-semibold">
                      {goal.progress}%
                    </Typography>
                  </View>
                  <View 
                    className="h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: '#F1F5F9' }}
                  >
                    <View
                      className="h-full rounded-full"
                      style={{
                        width: `${goal.progress}%` as any,
                        backgroundColor: goal.progress >= 75 ? '#10B981' : goal.progress >= 50 ? '#6366F1' : '#F59E0B',
                      }}
                    />
                  </View>
                </View>
              )}

              {/* Status & Due Date Row */}
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <View 
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: getStatusColor(goal.status) }}
                  />
                  <Typography variant="small" className="text-gray-600 font-medium">
                    {goal.status.charAt(0).toUpperCase() + goal.status.slice(1).replace('-', ' ')}
                  </Typography>
                </View>

                <View className="flex-row items-center">
                  <Icon 
                    icon={Calendar} 
                    size="xs" 
                    color={getDueDateColor()} 
                  />
                  <Typography
                    variant="small"
                    className="ml-1.5 font-semibold"
                    style={{ color: getDueDateColor() }}
                  >
                    {getDueDateText()}
                  </Typography>
                </View>
              </View>

              {/* Action Buttons */}
              {!isCompleted && (
                <View className="flex-row">
                  <Pressable
                    onPress={handleComplete}
                    className="flex-1 py-3 rounded-xl items-center justify-center"
                    style={{ backgroundColor: '#10B981' }}
                  >
                    <Typography variant="caption" weight="bold" className="text-white">
                      Mark Complete
                    </Typography>
                  </Pressable>
                </View>
              )}

              {/* Category */}
              {goal.category && (
                <View className="flex-row items-center mt-3 pt-3 border-t border-gray-100">
                  <Icon icon={Flag} size="xs" color="#94A3B8" />
                  <Typography variant="small" className="text-gray-500 ml-1.5">
                    {goal.category}
                  </Typography>
                </View>
              )}
            </Pressable>
          </Reanimated.View>
        </GestureDetector>
      </View>
    </>
  );
};