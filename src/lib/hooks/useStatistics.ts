// hooks/useStatistics.ts
import { useState, useEffect, useCallback } from 'react';

// import { getTasksCalendarStats, getTasksCountPerProject } from '@/services/statisticsService';
import { CalendarStatsResponse, ProjectTasksCount, StatisticsFilters } from '../types/statistics';
import { getTasksCalendarStats, getTasksCountPerProject } from '../statistics';

export function useStatistics() {
  const [filters, setFilters] = useState<StatisticsFilters>(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    const day = today.getDay();
const diff = day === 0 ? -6 : 1 - day;
    startOfWeek.setDate(today.getDate() + diff);
    console.log("Calculated Start of Week:", startOfWeek);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    console.log("Calculated End of Week:", endOfWeek);
    
    return {
      startDate: startOfWeek,
      endDate: endOfWeek,
      projectId: null,
      status: null,
    };
  });
  
  const [calendarStats, setCalendarStats] = useState<CalendarStatsResponse | null>(null);
  const [projectsTasks, setProjectsTasks] = useState<ProjectTasksCount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error2, setError2] = useState<string | null>(null);
  const [dateRangeError, setDateRangeError] = useState<string | null>(null);

  const validateDateRange = useCallback((start: Date, end: Date): boolean => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 7) {
      setDateRangeError('Date range cannot exceed 7 days');
      return false;
    }
    
    setDateRangeError(null);
    return true;
  }, []);

  const fetchStatistics = useCallback(async () => {
    if (!validateDateRange(filters.startDate, filters.endDate)) {
      return;
    }
console.log({
  start: filters.startDate.toISOString().split('T')[0],
  end: filters.endDate.toISOString().split('T')[0],
});
    setIsLoading(true);
    setError2(null);

    try {
      const [stats, projects] = await Promise.all([
        getTasksCalendarStats(filters),
        getTasksCountPerProject(filters.startDate, filters.endDate),
      ]);
      
      setCalendarStats(stats);
      console.log("Fetched Calendar Stats:", stats);
      setProjectsTasks(projects);
      console.log("Fetched Projects Tasks Count:", projects);
    } catch (err) {
      setError2(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [filters, validateDateRange]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  const updateFilters = useCallback((newFilters: Partial<StatisticsFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  return {
    filters,
    calendarStats,
    projectsTasks,
    isLoading,
    error2,
    dateRangeError,
    updateFilters,
    fetchStatistics,
  };
}