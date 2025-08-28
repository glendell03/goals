import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Check, Crown, Zap } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  icon: 'crown' | 'zap';
}

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  onSubscribe: (planId: string) => void;
  isLoading?: boolean;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  plan,
  onSubscribe,
  isLoading = false,
}) => {
  const IconComponent = plan.icon === 'crown' ? Crown : Zap;
  const iconColor = plan.isPopular ? '#FFD700' : '#B794F6';
  const cardBorderColor = plan.isPopular ? '#FFD700' : '#B794F6';

  return (
    <Card
      className={`${
        plan.isPopular ? 'border-yellow-500/40' : 'border-purple-500/40'
      } bg-gradient-to-br from-slate-800/50 to-slate-900/50 relative`}
      style={{
        shadowColor: cardBorderColor,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
      }}
    >
      {plan.isPopular && (
        <View
          className="absolute -top-3 left-1/2 px-4 py-1 rounded-full"
          style={{
            backgroundColor: '#FFD700',
            transform: [{ translateX: -50 }],
            zIndex: 10,
          }}
        >
          <Typography variant="small" weight="bold" className="text-black">
            Most Popular
          </Typography>
        </View>
      )}

      <CardHeader>
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center">
            <View
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{
                backgroundColor: `${iconColor}20`,
              }}
            >
              <IconComponent size={20} color={iconColor} />
            </View>
            <Typography variant="h3" weight="bold" className="text-white">
              {plan.name}
            </Typography>
          </View>
        </View>

        <View className="flex-row items-baseline mb-4">
          <Typography variant="display" weight="bold" className="text-white">
            {plan.price}
          </Typography>
          <Typography variant="caption" className="text-white/60 ml-2">
            {plan.period}
          </Typography>
        </View>
      </CardHeader>

      <CardContent>
        <View className="mb-6">
          {plan.features.map((feature, index) => (
            <View key={index} className="flex-row items-center mb-3">
              <View
                className="w-5 h-5 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: `${iconColor}30` }}
              >
                <Check size={12} color={iconColor} />
              </View>
              <Typography variant="body" className="text-white/90 flex-1">
                {feature}
              </Typography>
            </View>
          ))}
        </View>

        <Pressable
          onPress={() => onSubscribe(plan.id)}
          disabled={isLoading}
          className={`py-4 px-6 rounded-2xl items-center justify-center ${
            isLoading ? 'opacity-50' : ''
          }`}
          style={{
            backgroundColor: plan.isPopular ? '#FFD700' : '#B794F6',
          }}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`Subscribe to ${plan.name} plan`}
        >
          <Typography
            variant="body"
            weight="bold"
            className={plan.isPopular ? 'text-black' : 'text-white'}
          >
            {isLoading ? 'Processing...' : 'Subscribe with Stripe'}
          </Typography>
        </Pressable>

        <Typography variant="small" className="text-white/40 text-center mt-3">
          Powered by Stripe • Cancel anytime
        </Typography>
      </CardContent>
    </Card>
  );
};
