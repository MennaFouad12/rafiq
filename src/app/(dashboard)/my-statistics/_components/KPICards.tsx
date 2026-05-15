// components/statistics/KPICards.tsx
// import { Card, CardContent } from '@/components/ui/Card';

import TotalTasksIcon from "@/components/icons/TotalTasks-icon";
import { Card, CardContent } from "./_ui/Card";
import TrueIcon from "@/components/icons/true-icon";
import OverDueTasksIcon from "@/components/icons/OverDueTasks-icon";

interface KPICardsProps {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
}

export function KPICards({ totalTasks, completedTasks, overdueTasks }: KPICardsProps) {
  const cards = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      color: 'text-primary',
      icon:<TotalTasksIcon />,
      bgColor: 'bg-surface-highest',
    },
    {
      title: 'Completed Tasks',
      value: completedTasks,
      color: 'text-green-600',
      icon:<TrueIcon />,
      bgColor: 'bg-[#0068441A]',
    },
    {
      title: 'Overdue Tasks',
      value: overdueTasks,
      color: 'text-red-600',
      icon:<OverDueTasksIcon />,
      bgColor: 'bg-[#FFDAD633]',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
              </div>
              <div className={`w-12 h-12 p-3 ${card.bgColor}  flex items-center justify-center`}>
                {card.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}