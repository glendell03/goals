import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileSettings } from '@/components/profile/ProfileSettings';
import { SubscriptionCard } from '@/components/subscription/SubscriptionCard';
import { Typography } from '@/components/ui/Typography';
import React, { useCallback, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  icon: 'crown' | 'zap';
}

export default function ProfileScreen() {
  const [loading, setLoading] = useState<string | null>(null);

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'pro',
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      features: [
        'Unlimited goals',
        'Advanced analytics',
        'Priority support',
        'Goal templates',
        'Export data',
      ],
      isPopular: true,
      icon: 'crown',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$4.99',
      period: '/month',
      features: [
        'Up to 50 goals',
        'Basic analytics',
        'Email support',
        'Goal reminders',
      ],
      icon: 'zap',
    },
  ];

  const handleSubscribe = useCallback(async (planId: string) => {
    setLoading(planId);
    
    try {
      // Simulate Stripe integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Subscription',
        'This would integrate with Stripe for payment processing. The subscription flow is ready for implementation.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to process subscription. Please try again.');
    } finally {
      setLoading(null);
    }
  }, []);

  const handleEditProfile = useCallback(() => {
    Alert.alert('Edit Profile', 'Profile editing functionality coming soon!');
  }, []);

  const handleSettingPress = useCallback((settingId: string) => {
    Alert.alert('Settings', `${settingId} settings coming soon!`);
  }, []);

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: '#1A1A2E' }}
    >
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-4 pt-6">
          <ProfileHeader onEditProfile={handleEditProfile} />

          {/* Subscription Section */}
          <View className="mb-8">
            <Typography variant="h2" weight="bold" className="text-white mb-2">
              Upgrade Your Experience
            </Typography>
            <Typography variant="body" className="text-white/70 mb-6">
              Unlock premium features and take your goal achievement to the next level
            </Typography>
            
            <View className="space-y-4">
              {subscriptionPlans.map((plan) => (
                <View key={plan.id} className="mb-4">
                  <SubscriptionCard
                    plan={plan}
                    onSubscribe={handleSubscribe}
                    isLoading={loading === plan.id}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Settings Section */}
          <View className="mb-6">
            <Typography variant="h2" weight="bold" className="text-white mb-4">
              Settings
            </Typography>
            <ProfileSettings onSettingPress={handleSettingPress} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
