// services/statisticsService.ts
// import { CalendarStatsResponse, ProjectTasksCount, StatisticsFilters, TaskStatus } from '@/types/statistics';
import { fetchWithAuth } from './auth';
import { CalendarStatsResponse, Project, ProjectTasksCount, StatisticsFilters } from './types/statistics';
import { StatsFilters, TasksCountFilter } from './types/stats.types';

const baseUrl="https://lwsctewpcxlvwjixzdky.supabase.co"
const apiKey="sb_publishable_WueluaPFskLbogGJGAe6-Q_U_Jvc2Qj"

// export async function getTasksCalendarStats(filters: StatisticsFilters): Promise<CalendarStatsResponse> {
//   const response = await fetchWithAuth(`${baseUrl}/rest/v1/rpc/get_tasks_calendar_stats`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'apikey': apiKey,
//     },
//     body: JSON.stringify({
//       p_start_date: filters.startDate.toISOString().split('T')[0],
//       p_end_date: filters.endDate.toISOString().split('T')[0],
//       p_project_id: filters.projectId,
//       p_status: filters.status,
//     }),
//   });

//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error('Failed to fetch calendar stats');
//   }
// console.log("Calendar Stats Response:", data);
//   return data;
// }

export async function getTasksCalendarStats(
  filters: StatsFilters
): Promise<CalendarStatsResponse> {
  const response = await fetchWithAuth(
    `${baseUrl}/rest/v1/rpc/get_tasks_calendar_stats`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
      },
      body: JSON.stringify(filters),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch calendar stats");
  }

  console.log("Calendar Stats Response:", data);

  return data;
}

export async function getTasksCountPerProject(filters: TasksCountFilter) {
  const response = await fetchWithAuth(`${baseUrl}/rest/v1/rpc/get_tasks_count_per_project`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apiKey,
    },
    body: JSON.stringify(filters),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch projects tasks count');
  }
  console.log("Projects Tasks Count Response:", data);
// console.log( await response.json());
  return data;
}

// export async function getUserProjects(): Promise<Project[]> {
//   // Fetch user's projects - adjust based on your actual API
//   const response = await fetchWithAuth(`${baseUrl}/rest/v1/user_projects`, {
//     headers: {
//       'apikey': apiKey,
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Failed to fetch projects');
//   }

//   return response.json();
// }