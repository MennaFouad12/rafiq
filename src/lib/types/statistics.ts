// types/statistics.ts
export interface CalendarStatsResponse {
  daily: DailyStats[];
  totals: StatusTotals;
  total_tasks: number;
  done_tasks: number;
  overdue_tasks: number;
}

export interface DailyStats {
  day: string;
  statuses: Record<string, number>;
}

export interface StatusTotals {
  TO_DO: number;
  IN_PROGRESS: number;
  BLOCKED: number;
  IN_REVIEW: number;
  READY_FOR_QA: number;
  REOPENED: number;
  READY_FOR_PRODUCTION: number;
  DONE: number;
}

export interface ProjectTasksCount {
  project_id: string;
  project_name: string;
  tasks_count: number;
}

export type TaskStatus = 
  | 'TO_DO'
  | 'IN_PROGRESS'
  | 'BLOCKED'
  | 'IN_REVIEW'
  | 'READY_FOR_QA'
  | 'REOPENED'
  | 'READY_FOR_PRODUCTION'
  | 'DONE';

export interface StatisticsFilters {
  startDate: Date;
  endDate: Date;
  projectId: string | null;
  status: TaskStatus | null;
}

export interface Project {
  id: string;
  name: string;
}