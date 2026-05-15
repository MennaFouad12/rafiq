// components/statistics/WeeklyCalendar.tsx
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
// import { DailyStats } from '@/types/statistics';

import { DailyStats } from "@/lib/types/statistics";
import { Card, CardContent, CardHeader, CardTitle } from "./_ui/Card";
import NoTasksIcon from "@/components/icons/NoTasks-Icon";

interface WeeklyCalendarProps {
  dailyStats: DailyStats[];
  startDate: Date;
  endDate: Date;
}

const formatStatusForUI = (status: string): string => {
  return status.replace(/_/g, ' ');
};

export function WeeklyCalendar({ dailyStats, startDate, endDate }: WeeklyCalendarProps) {
  const getDaysInRange = (): Date[] => {
    const days: Date[] = [];
    const current = new Date(startDate);
    const end = new Date(endDate);

    while (current <= end) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const getDayStats = (date: Date): DailyStats | undefined => {
    const dateStr = date.toISOString().split('T')[0];
    return dailyStats.find(stat => stat.day === dateStr);
  };

  const formatDayLabel = (date: Date): string => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };
  const formatDayLabel2 = (date: Date): string => {
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  const STATUS_COLORS: Record<string, {
    background: string;
    text: string;
  }> = {
    TO_DO: {
      background: '#FEE2E2',
      text: '#B91C1C',
    },
    IN_PROGRESS: {
      background: '#003D9B',
      text: '#FFFFFF',
    },
    BLOCKED: {
      background: '#BA1A1A',
      text: '#FFFFFF',
    },
    IN_REVIEW: {
      background: '#8B5CF6',
      text: '#FFFFFF',
    },
    READY_FOR_QA: {
      background: '#10B981',
      text: '#FFFFFF',
    },
    REOPENED: {
      background: '#EC4899',
      text: '#FFFFFF',
    },
    READY_FOR_PRODUCTION: {
      background: '#14B8A6',
      text: '#FFFFFF',
    },
    DONE: {
      background: '#004E32',
      text: '#FFFFFF',
    },
  };


  const days = getDaysInRange();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {days.map((day, index) => {
            const stats = getDayStats(day);

            const isToday =
              day.toDateString() === new Date().toDateString();


            console.log(stats);
            const hasTasks = stats && Object.keys(stats.statuses).length > 0;

            return (
              <div
                key={index}
                className={` p-6 relative  rounded-lg  bg-gray-50 min-h-80 ${isToday ? "border-3 border-primary" : "border  border-gray-200 "}`}
              >
                {isToday && (
                  <p className="absolute left-1/2 -top-3 -translate-x-1/2 text-xs text-white bg-primary rounded-md px-2 py-1">
                    Today
                  </p>
                )}
                <div className="text-sm font-semibold text-gray-700 mb-3">
                  <p className={`${isToday ? "text-primary" : "text-[#041B3C66]"}`} >  {formatDayLabel(day)}</p>
                  <p>  {formatDayLabel2(day)}</p>
                </div>
                {hasTasks ? (
                  <div className="space-y-1">


                    {Object.entries(stats!.statuses).map(([status, count]) => {
                      const colors = STATUS_COLORS[status];

                      return (
                        <div
                          key={status}
                          className="text-xs flex justify-between items-center px-2 py-1 rounded-md"
                          style={{
                            backgroundColor: colors?.background,
                            color: colors?.text,
                          }}
                        >
                          <span>{formatStatusForUI(status)}</span>
                          <span className="font-medium">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full space-y-2">
                    <span className="text-gray-400"><NoTasksIcon /></span>
                    <div className="text-sm text-gray-400 italic">No Tasks</div>

                  </div>
                  // <div className="text-sm text-gray-400 italic">No Tasks</div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}