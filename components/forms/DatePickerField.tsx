import { Icon } from '@/components/ui/icon';
import { Typography } from '@/components/ui/Typography';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native';
import React, { useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { Modal, Platform, Pressable, View } from 'react-native';

interface DatePickerFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  error?: FieldError;
  minimumDate?: Date;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  name,
  control,
  label,
  error,
  minimumDate = new Date(),
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <View className="mb-6">
      <Typography variant="h3" weight="semibold" className="text-white mb-3">
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Pressable
              onPress={() => setShowPicker(true)}
              className="flex-row items-center justify-between p-4 rounded-2xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderWidth: 1,
                borderColor: error 
                  ? '#EF4444' 
                  : value 
                    ? '#B794F6' 
                    : 'rgba(255, 255, 255, 0.12)',
                minHeight: 56,
              }}
            >
              <View className="flex-row items-center">
                <View 
                  className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                  style={{ backgroundColor: 'rgba(183, 148, 246, 0.2)' }}
                >
                  <Icon icon={Calendar} size="sm" color="#B794F6" />
                </View>
                <Typography variant="body" className="text-white">
                  {value ? formatDate(value) : 'Select target date'}
                </Typography>
              </View>
            </Pressable>

            {showPicker && (
              <>
                {Platform.OS === 'ios' ? (
                  <Modal
                    transparent
                    animationType="slide"
                    visible={showPicker}
                    onRequestClose={() => setShowPicker(false)}
                  >
                    <View className="flex-1 justify-end">
                      <View 
                        className="rounded-t-3xl p-6"
                        style={{ backgroundColor: '#1A1A2E' }}
                      >
                        <View className="flex-row justify-between items-center mb-4">
                          <Typography variant="h3" weight="semibold" className="text-white">
                            Select Date
                          </Typography>
                          <Pressable
                            onPress={() => setShowPicker(false)}
                            className="px-4 py-2 rounded-xl"
                            style={{ backgroundColor: 'rgba(183, 148, 246, 0.2)' }}
                          >
                            <Typography variant="caption" weight="semibold" className="text-white">
                              Done
                            </Typography>
                          </Pressable>
                        </View>
                        <DateTimePicker
                          value={value || new Date()}
                          mode="date"
                          display="spinner"
                          onChange={(event, selectedDate) => {
                            if (selectedDate) {
                              onChange(selectedDate);
                            }
                          }}
                          minimumDate={minimumDate}
                          themeVariant="dark"
                          style={{ backgroundColor: 'transparent' }}
                        />
                      </View>
                    </View>
                  </Modal>
                ) : (
                  <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowPicker(false);
                      if (selectedDate) {
                        onChange(selectedDate);
                      }
                    }}
                    minimumDate={minimumDate}
                  />
                )}
              </>
            )}
          </>
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
