import { Icon } from '@/components/ui/icon';
import { Typography } from '@/components/ui/Typography';
import { Goal } from '@/lib/storage';
import { useGoalsStore } from '@/stores/useGoalsStore';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  TouchableOpacity,
  type BottomSheetBackdropProps,
  type BottomSheetModal as BottomSheetModalType,
} from '@gorhom/bottom-sheet';
import { Edit3, Trash2 } from 'lucide-react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Alert, View } from 'react-native';

interface GoalActionsModalProps {
  goal: Goal | null;
  onEdit: (goal: Goal) => void;
}

export const GoalActionsModal = forwardRef<BottomSheetModalType, GoalActionsModalProps>(
  ({ goal, onEdit }, ref) => {
    const { deleteGoal } = useGoalsStore();
    const snapPoints = useMemo(() => ['35%'], []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.5}
        />
      ),
      []
    );

    const handleEdit = useCallback(() => {
      if (goal) {
        onEdit(goal);
        (ref as React.RefObject<BottomSheetModalType>)?.current?.dismiss();
      }
    }, [goal, onEdit, ref]);

    const handleDelete = useCallback(() => {
      if (goal) {
        (ref as React.RefObject<BottomSheetModalType>)?.current?.dismiss();
        
        // Show confirmation dialog after dismissing
        setTimeout(() => {
          Alert.alert(
            'Delete Goal',
            `Are you sure you want to delete "${goal.title}"? This action cannot be undone.`,
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => deleteGoal(goal.id),
              },
            ]
          );
        }, 100);
      }
    }, [goal, deleteGoal, ref]);

    if (!goal) return null;

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enableDynamicSizing={true}
        maxDynamicContentSize={350}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: '#1A1A2E',
        }}
        handleIndicatorStyle={{
          backgroundColor: '#4A5568',
        }}
      >
        <BottomSheetView style={{ padding: 24, paddingBottom: 32 }}>
          <Typography variant="h3" weight="bold" className="text-white mb-6">
            Goal Actions
          </Typography>
          
          <TouchableOpacity
            onPress={handleEdit}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
              paddingHorizontal: 16,
              marginBottom: 8,
              borderRadius: 12,
              backgroundColor: 'transparent',
            }}
          >
            <View 
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}
            >
              <Icon icon={Edit3} size="md" color="#6366F1" />
            </View>
            <View>
              <Typography variant="body" weight="semibold" className="text-white">
                Edit Goal
              </Typography>
              <Typography variant="caption" className="text-white/60 mt-1">
                Modify goal details and settings
              </Typography>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDelete}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
              paddingHorizontal: 16,
              borderRadius: 12,
              backgroundColor: 'transparent',
            }}
          >
            <View 
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}
            >
              <Icon icon={Trash2} size="md" color="#EF4444" />
            </View>
            <View>
              <Typography variant="body" weight="semibold" className="text-red-400">
                Delete Goal
              </Typography>
              <Typography variant="caption" className="text-white/60 mt-1">
                Permanently remove this goal
              </Typography>
            </View>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

GoalActionsModal.displayName = 'GoalActionsModal';
