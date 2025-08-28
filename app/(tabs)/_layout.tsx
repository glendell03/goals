import { AddGoalModal } from '@/components/modals/AddGoalModal';
import { CompactTabBar } from '@/components/navigation/CompactTabBar';
import { Tabs } from 'expo-router';
import React, { useState } from 'react';

export default function TabLayout() {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddGoal = () => {
    setShowAddModal(true);
  };

  const handleModalClose = () => {
    setShowAddModal(false);
  };

  return (
    <>
    <Tabs
      initialRouteName="dashboard"
      tabBar={(props) => (
        <CompactTabBar {...props} onAddPress={handleAddGoal} />
      )}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="add" />
      <Tabs.Screen name="goals" />
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
        }}
      />
    </Tabs>
    
    <AddGoalModal
      visible={showAddModal}
      onClose={handleModalClose}
      onSuccess={handleModalClose}
    />
  </>
  );
}
