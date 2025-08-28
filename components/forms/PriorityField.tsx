import { Icon } from '@/components/ui/icon';
import { Typography } from '@/components/ui/Typography';
import { Flag } from 'lucide-react-native';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { Pressable, View } from 'react-native';

type Priority = 'low' | 'medium' | 'high';

interface PriorityFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  error?: FieldError;
}

interface PriorityChipProps {
  priority: Priority;
  isSelected: boolean;
  onSelect: (priority: Priority) => void;
}

const PriorityChip: React.FC<PriorityChipProps> = ({ 
  priority, 
  isSelected, 
  onSelect 
}) => {
  const getConfig = () => {
    switch (priority) {
      case 'low': return { color: '#10B981', label: 'Low Priority' };
      case 'medium': return { color: '#F59E0B', label: 'Medium Priority' };
      case 'high': return { color: '#EF4444', label: 'High Priority' };
    }
  };

  const config = getConfig();

  return (
    <Pressable
      onPress={() => onSelect(priority)}
      className="flex-1 flex-row items-center justify-center py-4 rounded-2xl mr-3 last:mr-0"
      style={{
        backgroundColor: isSelected ? config.color : 'rgba(255, 255, 255, 0.08)',
        borderWidth: 1,
        borderColor: isSelected ? config.color : 'rgba(255, 255, 255, 0.12)',
        minHeight: 56,
      }}
    >
      <Icon icon={Flag} size="sm" color="#FFFFFF" />
      <Typography variant="caption" weight="semibold" className="text-white ml-2">
        {config.label.split(' ')[0]}
      </Typography>
    </Pressable>
  );
};

export const PriorityField: React.FC<PriorityFieldProps> = ({
  name,
  control,
  label,
  error,
}) => {
  return (
    <View className="mb-6">
      <Typography variant="h3" weight="semibold" className="text-white mb-3">
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <View className="flex-row gap-2">
            {(['low', 'medium', 'high'] as Priority[]).map((priority) => (
              <PriorityChip
                key={priority}
                priority={priority}
                isSelected={value === priority}
                onSelect={onChange}
              />
            ))}
          </View>
        )}
      />
      {error && (
        <Typography variant="small" className="text-error-400 mt-2 ml-1">
          {error.message}
        </Typography>
      )}
    </View>
  );
};
