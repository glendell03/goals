import { DatePickerField } from '@/components/forms/DatePickerField';
import { FormField } from '@/components/forms/FormField';
import { PriorityField } from '@/components/forms/PriorityField';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Typography } from '@/components/ui/Typography';
import { Goal } from '@/lib/storage';
import { useGoalsStore } from '@/stores/useGoalsStore';
import { Target, X } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AddGoalModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialData?: Goal | null;
}

interface GoalFormData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
}

export const AddGoalModal: React.FC<AddGoalModalProps> = ({
  visible,
  onClose,
  onSuccess,
  initialData,
}) => {
  const { addGoal, updateGoal } = useGoalsStore();
  const [saveError, setSaveError] = useState<string | null>(null);
  const isEditing = !!initialData;
  
  const { 
    control, 
    handleSubmit, 
    reset, 
    formState: { errors, isSubmitting, isValid }
  } = useForm<GoalFormData>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      priority: initialData?.priority || 'medium',
      dueDate: initialData?.dueDate ? new Date(initialData.dueDate) : new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    mode: 'onChange',
  });

  // Reset form when initialData changes (for editing)
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description || '',
        priority: initialData.priority,
        dueDate: new Date(initialData.dueDate),
      });
    } else {
      reset({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
    }
  }, [initialData, reset]);

  const handleClose = useCallback(() => {
    reset();
    setSaveError(null);
    onClose();
  }, [reset, onClose]);

  const onSubmit = useCallback(async (data: GoalFormData) => {
    setSaveError(null);
    
    try {
      if (isEditing && initialData) {
        await updateGoal(initialData.id, {
          title: data.title.trim(),
          description: data.description.trim() || undefined,
          priority: data.priority,
          dueDate: data.dueDate.toISOString(),
        });
        
        // Success - close modal and trigger callback
        onSuccess?.();
        handleClose();
      } else {
        await addGoal({
          title: data.title.trim(),
          description: data.description.trim() || undefined,
          priority: data.priority,
          dueDate: data.dueDate.toISOString(),
          status: 'pending',
          progress: 0,
        });

        // Success - close modal and trigger callback
        onSuccess?.();
        handleClose();
      }
    } catch (error: any) {
      // Handle error state - stay in modal and show error
      const errorMessage = error?.error?.message || `Failed to ${isEditing ? 'update' : 'save'} goal. Please try again.`;
      setSaveError(errorMessage);
    }
  }, [addGoal, updateGoal, onSuccess, handleClose, isEditing, initialData]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <SafeAreaView 
        className="flex-1"
        style={{ backgroundColor: '#1A1A2E' }}
      >
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-6">
            <View className="flex-row items-center">
              <View 
                className="w-12 h-12 rounded-3xl items-center justify-center mr-4"
                style={{ backgroundColor: 'rgba(183, 148, 246, 0.2)' }}
              >
                <Icon icon={Target} size="lg" color="#B794F6" />
              </View>
              <Typography variant="display" weight="bold" className="text-white">
                {isEditing ? 'Edit Goal' : 'New Goal'}
              </Typography>
            </View>
            <Pressable
              onPress={handleClose}
              className="w-11 h-11 rounded-2xl items-center justify-center"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <Icon icon={X} size="md" color="#CBD5E0" />
            </Pressable>
          </View>

          <ScrollView 
            className="flex-1 px-6" 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <FormField
              name="title"
              control={control}
              label="Goal Title"
              placeholder="What do you want to achieve?"
              error={errors.title}
              required
              maxLength={100}
              rules={{
                required: 'Goal title is required',
                minLength: {
                  value: 3,
                  message: 'Title must be at least 3 characters'
                },
                maxLength: {
                  value: 100,
                  message: 'Title must be less than 100 characters'
                }
              }}
            />

            <FormField
              name="description"
              control={control}
              label="Description"
              placeholder="Add more details about your goal..."
              error={errors.description}
              multiline
              maxLength={500}
            />

            <PriorityField
              name="priority"
              control={control}
              label="Priority Level"
              error={errors.priority}
            />

            <DatePickerField
              name="dueDate"
              control={control}
              label="Target Date"
              error={errors.dueDate}
              minimumDate={new Date()}
            />

            {saveError && (
              <View 
                className="mt-4 p-4 rounded-xl"
                style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
              >
                <Typography variant="body" className="text-red-400 text-center">
                  {saveError}
                </Typography>
              </View>
            )}
          </ScrollView>

          {/* Bottom Actions */}
          <View 
            className="px-6 pb-8 pt-4"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              borderTopWidth: 1,
              borderTopColor: 'rgba(255, 255, 255, 0.1)'
            }}
          >
            <View className="flex-row space-x-4 gap-2">
              <Button
                variant="outline"
                onPress={handleClose}
                className="flex-1"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'transparent',
                  minHeight: 52,
                }}
              >
                <Typography variant="body" weight="semibold" className="text-white">
                  Cancel
                </Typography>
              </Button>
              <Button
                variant="primary"
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid || isSubmitting}
                className="flex-1"
                style={{
                  backgroundColor: isValid ? '#B794F6' : 'rgba(255, 255, 255, 0.1)',
                  opacity: isValid ? 1 : 0.5,
                  minHeight: 52,
                  shadowColor: isValid ? '#B794F6' : 'transparent',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <Typography variant="body" weight="bold" className="text-white">
                  {isSubmitting 
                    ? (isEditing ? 'Updating...' : 'Creating...') 
                    : (isEditing ? 'Update Goal' : 'Create Goal')
                  }
                </Typography>
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};
