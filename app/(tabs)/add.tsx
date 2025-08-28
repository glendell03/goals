import { Typography } from '@/components/ui/Typography';
import React from 'react';
import { View } from 'react-native';

export default function AddScreen() {
  return (
    <View className="flex-1 bg-background-0 dark:bg-background-950 items-center justify-center">
      <Typography variant="h1">Add Goal</Typography>
      <Typography variant="body" color="secondary">
        Add goal form coming soon
      </Typography>
    </View>
  );
}
