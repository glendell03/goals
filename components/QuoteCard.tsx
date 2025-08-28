import { Card, CardContent } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { useQuoteOfTheDay } from '@/hooks/useQuoteOfTheDay';
import { Quote, RefreshCw } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';

export const QuoteCard: React.FC = () => {
  const { quote, loading, error, refetch } = useQuoteOfTheDay();

  const handleRefresh = async () => {
    await refetch();
  };

  if (error) {
    return (
      <Card className="border-error-500/20 bg-error-900/10">
        <CardContent className="py-4">
          <View className="flex-row items-center">
            <Quote size={20} color="#EF4444" />
            <Typography variant="caption" className="text-error-300 ml-2 flex-1">
              Failed to load quote
            </Typography>
            <Pressable
              onPress={handleRefresh}
              className="p-2 rounded-full"
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Retry loading quote"
            >
              <RefreshCw size={16} color="#EF4444" />
            </Pressable>
          </View>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-indigo-900/20"
      style={{
        shadowColor: '#B794F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      <CardContent className="py-6 px-6">
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-row items-center">
            <View 
              className="w-8 h-8 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: 'rgba(183, 148, 246, 0.2)' }}
            >
              <Quote size={16} color="#B794F6" />
            </View>
            <Typography variant="caption" weight="semibold" className="text-purple-300">
              Quote of the Day
            </Typography>
          </View>
          
          {!loading && (
            <Pressable
              onPress={handleRefresh}
              className="p-2 rounded-full"
              style={{ backgroundColor: 'rgba(183, 148, 246, 0.1)' }}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Get new quote"
            >
              <RefreshCw size={16} color="#B794F6" />
            </Pressable>
          )}
        </View>

        {loading ? (
          <View className="py-8 items-center">
            <ActivityIndicator size="small" color="#B794F6" />
            <Typography variant="caption" className="text-white/60 mt-2">
              Loading inspiration...
            </Typography>
          </View>
        ) : quote ? (
          <View>
            <Typography 
              variant="body" 
              className="text-white leading-relaxed mb-4 italic"
              style={{ lineHeight: 24 }}
            >
              "{quote.quote}"
            </Typography>
            
            <View className="flex-row items-center justify-end">
              <Typography variant="caption" weight="semibold" className="text-purple-200">
                — {quote.author}
              </Typography>
            </View>
          </View>
        ) : null}
      </CardContent>
    </Card>
  );
};
