import { GoalCard } from "@/components/GoalCard";
import { AddGoalModal } from "@/components/modals/AddGoalModal";
import { GoalActionsModal } from "@/components/modals/GoalActionsModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/Card";
import { Icon } from "@/components/ui/icon";
import { Typography } from "@/components/ui/Typography";
import { Goal } from "@/lib/storage";
import { useGoalsStore } from "@/stores/useGoalsStore";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  Plus,
  Target,
  TrendingUp,
} from "lucide-react-native";
import React, { useCallback, useRef, useState } from "react";
import { Pressable, RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FilterType =
  | "all"
  | "today"
  | "pending"
  | "in-progress"
  | "completed"
  | "overdue";

const FilterChip = ({
  label,
  count,
  isActive,
  onPress,
  icon: IconComponent,
  color,
}: {
  label: string;
  count: number;
  isActive: boolean;
  onPress: () => void;
  icon: any;
  color: string;
}) => (
  <Pressable
    onPress={onPress}
    className="flex-row items-center px-4 py-3 rounded-2xl mr-3 mb-2"
    style={{
      backgroundColor: isActive ? color : "rgba(255, 255, 255, 0.08)",
      borderWidth: 1,
      borderColor: isActive ? color : "rgba(255, 255, 255, 0.12)",
    }}
  >
    <Icon icon={IconComponent} size="sm" color="#FFFFFF" />
    <Typography
      variant="caption"
      weight="medium"
      className="text-white ml-2 mr-1"
    >
      {label}
    </Typography>
    <View
      className="px-2 py-0.5 rounded-full"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
    >
      <Typography variant="small" weight="bold" className="text-white">
        {count}
      </Typography>
    </View>
  </Pressable>
);

export default function GoalsScreen() {
  const {
    goals,
    loading,
    completeGoal,
    deleteGoal,
    getTodaysGoals,
    getOverdueGoals,
    getGoalsByStatus,
    loadGoals,
  } = useGoalsStore();

  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  // Bottom sheet ref
  const goalActionsModalRef = useRef<BottomSheetModal>(null);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    loadGoals();
    setRefreshing(false);
  }, [loadGoals]);

  const handleMenuPress = useCallback((goal: Goal) => {
    setSelectedGoal(goal);
    goalActionsModalRef.current?.present();
  }, []);

  const handleEditGoal = useCallback((goal: Goal) => {
    setEditingGoal(goal);
    setShowEditModal(true);
  }, []);

  const getFilteredGoals = useCallback((): Goal[] => {
    let filtered: Goal[] = [];
    switch (filter) {
      case "today":
        filtered = getTodaysGoals();
        break;
      case "overdue":
        filtered = getOverdueGoals();
        break;
      case "pending":
      case "in-progress":
      case "completed":
        filtered = getGoalsByStatus(filter);
        break;
      default:
        filtered = goals;
    }

    return filtered;
  }, [filter, goals, getTodaysGoals, getOverdueGoals, getGoalsByStatus]);

  const filteredGoals = getFilteredGoals();
  const todayGoals = getTodaysGoals();
  const overdueGoals = getOverdueGoals();
  const completedGoals = getGoalsByStatus("completed").length;

  const filterOptions = [
    {
      key: "all" as const,
      label: "All Goals",
      count: goals.length,
      icon: Target,
      color: "#6366F1",
    },
    {
      key: "today" as const,
      label: "Today",
      count: todayGoals.length,
      icon: Calendar,
      color: "#06B6D4",
    },
    {
      key: "pending" as const,
      label: "Pending",
      count: getGoalsByStatus("pending").length,
      icon: Clock,
      color: "#8B5CF6",
    },
    {
      key: "in-progress" as const,
      label: "Active",
      count: getGoalsByStatus("in-progress").length,
      icon: TrendingUp,
      color: "#6366F1",
    },
    {
      key: "overdue" as const,
      label: "Overdue",
      count: overdueGoals.length,
      icon: Flame,
      color: "#F59E0B",
    },
    {
      key: "completed" as const,
      label: "Completed",
      count: completedGoals,
      icon: CheckCircle2,
      color: "#10B981",
    },
  ];

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#1A1A2E" }}>
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-4 pt-6 pb-4">
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Typography
                variant="display"
                weight="bold"
                className="text-white"
              >
                Goals
              </Typography>
              <Typography variant="body" className="text-white/70 mt-1">
                Manage and track your progress
              </Typography>
            </View>
            <View className="flex-row space-x-3 gap-2">
              <Pressable
                className="w-11 h-11 rounded-2xl items-center justify-center"
                style={{ backgroundColor: "rgba(183, 148, 246, 0.2)" }}
                onPress={() => setShowAddModal(true)}
              >
                <Icon icon={Plus} size="md" color="#B794F6" />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Filter Chips */}
        <View className="px-4 mb-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            {filterOptions.map((option) => (
              <FilterChip
                key={option.key}
                label={option.label}
                count={option.count}
                isActive={filter === option.key}
                onPress={() => setFilter(option.key)}
                icon={option.icon}
                color={option.color}
              />
            ))}
          </ScrollView>
        </View>

        {/* Goals List */}
        <View className="px-4 pb-32">
          {filteredGoals.length === 0 ? (
            <Card
              variant="elevated"
              className="py-12 border-0"
              style={{ backgroundColor: "#2D3748" }}
            >
              <CardContent className="items-center">
                <Icon icon={Plus} size="xl" color="#9CA3AF" />
                <Typography
                  variant="h3"
                  className="mt-4 mb-2 text-center text-white"
                >
                  {filter === "all" ? "No goals yet" : `No ${filter} goals`}
                </Typography>
                <Typography
                  variant="caption"
                  className="text-white/60 text-center mb-4"
                >
                  {filter === "all"
                    ? "Create your first goal to get started"
                    : "Try switching to a different filter"}
                </Typography>
                {filter === "all" && (
                  <Button
                    variant="primary"
                    size="sm"
                    style={{ backgroundColor: "#B794F6" }}
                    onPress={() => setShowAddModal(true)}
                  >
                    Create Goal
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onMenuPress={handleMenuPress}
                onPress={() => {
                  /* Navigate to detail */
                }}
              />
            ))
          )}
        </View>
      </ScrollView>

      <AddGoalModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={() => setShowAddModal(false)}
      />

      <AddGoalModal
        visible={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingGoal(null);
        }}
        onSuccess={() => {
          setShowEditModal(false);
          setEditingGoal(null);
        }}
        initialData={editingGoal}
      />

      <GoalActionsModal
        ref={goalActionsModalRef}
        goal={selectedGoal}
        onEdit={handleEditGoal}
      />
    </SafeAreaView>
  );
}
