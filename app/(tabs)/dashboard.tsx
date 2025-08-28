import { BentoBox } from "@/components/BentoBox";
import { QuoteCard } from "@/components/QuoteCard";
import { Avatar } from "@/components/ui/Avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Typography } from "@/components/ui/Typography";
import { useGoalsStore } from "@/stores/useGoalsStore";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const {
    goals,
    loadGoals,
    getTodaysGoals,
    getOverdueGoals,
    getGoalsByStatus,
  } = useGoalsStore();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    loadGoals();
    setRefreshing(false);
  }, [loadGoals]);

  const todayGoals = getTodaysGoals();
  const overdueGoals = getOverdueGoals();
  const completedGoals = getGoalsByStatus("completed").length;
  const totalGoals = goals.length;
  const completionRate =
    totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const bentoStats = {
    completionRate,
    todayGoals: todayGoals.length,
    overdueGoals: overdueGoals.length,
    streak: Math.min(7, Math.max(1, completedGoals)),
    totalGoals,
    completedGoals,
  };

  return (
    <SafeAreaView
      className="flex-1 bg-background-0 dark:bg-background-950"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header */}
        <View className="px-4 pt-6 pb-2">
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <View className="flex-row items-center mb-2">
                <Typography
                  variant="display"
                  weight="bold"
                  className="text-white mr-3"
                >
                  {getGreeting()}
                </Typography>
          
              </View>
              <Typography variant="body" className="text-white/80 text-lg">
                Let&apos;s achieve your goals today 
              </Typography>
            </View>
            <View className="w-20 h-20 rounded-2xl items-center justify-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
              <Avatar size="lg" />
            </View>
          </View>
        </View>

        {/* Quote of the Day */}
        <View className="px-4 mb-6">
          <QuoteCard />
        </View>

        {/* Bento Box Stats */}
        <BentoBox stats={bentoStats} />

        {/* Priority Alerts */}
        {(todayGoals.length > 0 || overdueGoals.length > 0) && (
          <View className="px-4 mb-4">
            <Card
              variant="outlined"
              className="border-warning-500 bg-warning-900/20"
            >
              <CardHeader>
                <Typography
                  variant="h3"
                  weight="semibold"
                  className="text-warning-300"
                >
                  Attention Needed
                </Typography>
              </CardHeader>
              <CardContent>
                {overdueGoals.length > 0 && (
                  <Typography variant="caption" className="text-error-300 mb-1">
                    {overdueGoals.length} overdue goal
                    {overdueGoals.length !== 1 ? "s" : ""}
                  </Typography>
                )}
                {todayGoals.length > 0 && (
                  <Typography variant="caption" className="text-warning-300">
                    {todayGoals.length} goal{todayGoals.length !== 1 ? "s" : ""}{" "}
                    due today
                  </Typography>
                )}
              </CardContent>
            </Card>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
