import { Card, CardContent } from '@/components/ui/Card';
import { Icon } from '@/components/ui/icon';
import { Typography } from '@/components/ui/Typography';
import { Goal } from '@/lib/storage';
import { cn } from '@/lib/utils';
import { Calendar, Flame, Target, TrendingUp } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

interface DashboardStatsProps {
  goals: Goal[];
  className?: string;
}

interface StatCardProps {
  icon: any;
  label: string;
  value: string | number;
  color: string;
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  color,
  description,
}) => (
  <Card variant="elevated" className="flex-1 mr-2 last:mr-0">
    <CardContent className="items-center py-4">
      <Icon icon={icon} size="lg" color={color} />
      <Typography variant="h2" weight="bold" className="mt-2">
        {value}
      </Typography>
      <Typography variant="caption" color="secondary" className="text-center">
        {label}
      </Typography>
      {description && (
        <Typography variant="small" color="muted" className="text-center mt-1">
          {description}
        </Typography>
      )}
    </CardContent>
  </Card>
);

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  goals,
  className,
}) => {
  const completedGoals = goals.filter(goal => goal.status === 'completed').length;
  const totalGoals = goals.length;
  const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
  
  const todayGoals = goals.filter(goal => {
    const today = new Date().toDateString();
    const dueDate = new Date(goal.dueDate).toDateString();
    return dueDate === today;
  }).length;

  const overdueGoals = goals.filter(goal => {
    const now = new Date();
    const dueDate = new Date(goal.dueDate);
    return dueDate < now && goal.status !== 'completed';
  }).length;

  // Calculate current streak
  const currentStreak = calculateStreak(goals);

  return (
    <View className={cn('flex-row', className)}>
      <StatCard
        icon={Target}
        label="Completion Rate"
        value={`${completionRate}%`}
        color="#00E676"
        description={`${completedGoals}/${totalGoals} goals`}
      />
      
      <StatCard
        icon={Calendar}
        label="Due Today"
        value={todayGoals}
        color="#FFD700"
        description={todayGoals === 1 ? 'goal' : 'goals'}
      />
      
      <StatCard
        icon={TrendingUp}
        label="Overdue"
        value={overdueGoals}
        color={overdueGoals > 0 ? "#FF1744" : "#00E676"}
        description={overdueGoals === 1 ? 'goal' : 'goals'}
      />
      
      <StatCard
        icon={Flame}
        label="Streak"
        value={currentStreak}
        color="#FF6B35"
        description={currentStreak === 1 ? 'day' : 'days'}
      />
    </View>
  );
};

const calculateStreak = (goals: Goal[]): number => {
  const completedGoals = goals
    .filter(goal => goal.status === 'completed' && goal.completedAt)
    .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime());

  if (completedGoals.length === 0) return 0;

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const goal of completedGoals) {
    const completedDate = new Date(goal.completedAt!);
    completedDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((currentDate.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === streak) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (diffDays > streak) {
      break;
    }
  }

  return streak;
};
