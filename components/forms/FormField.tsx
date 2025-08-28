import { Typography } from '@/components/ui/Typography';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { TextInput, TextInputProps, View } from 'react-native';

interface FormFieldProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  name: string;
  control: Control<any>;
  label: string;
  error?: FieldError;
  required?: boolean;
  rules?: any;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  control,
  label,
  error,
  required = false,
  rules,
  multiline = false,
  ...textInputProps
}) => {
  const getInputStyles = (hasValue: boolean, hasError: boolean, isMultiline: boolean) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: hasError 
      ? '#EF4444' 
      : hasValue 
        ? '#B794F6' 
        : 'rgba(255, 255, 255, 0.12)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: isMultiline ? 12 : 14,
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    fontFamily: 'System',
    minHeight: isMultiline ? 88 : 48,
    maxHeight: isMultiline ? 120 : 48,
    textAlignVertical: isMultiline ? 'top' : 'center',
  });

  return (
    <View className="mb-5">
      <Typography variant="h3" weight="semibold" className="text-white mb-2">
        {label}
        {required && <Typography className="text-red-400 ml-1">*</Typography>}
      </Typography>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value || ''}
            onChangeText={onChange}
            onBlur={onBlur}
            style={getInputStyles(!!value, !!error, multiline)}
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            autoCapitalize="sentences"
            autoCorrect={false}
            spellCheck={false}
            multiline={multiline}
            numberOfLines={multiline ? 4 : 1}
            returnKeyType={multiline ? 'default' : 'done'}
            blurOnSubmit={!multiline}
            {...textInputProps}
          />
        )}
      />
      {error && (
        <Typography variant="small" className="text-red-400 mt-1.5 ml-0.5">
          {error.message}
        </Typography>
      )}
    </View>
  );
};