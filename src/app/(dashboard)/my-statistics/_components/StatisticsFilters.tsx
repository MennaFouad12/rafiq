// components/statistics/StatisticsFilters.tsx
'use client';

import { TaskStatus,StatisticsFilters as FiltersType } from "@/lib/types/statistics";
import { Select, SelectItem } from "./_ui/Select";
import Button from "./_ui/Button";
// import { Button } from '@/components/ui/Button';



const STATUSES: TaskStatus[] = [
  'TO_DO',
  'IN_PROGRESS',
  'BLOCKED',
  'IN_REVIEW',
  'READY_FOR_QA',
  'REOPENED',
  'READY_FOR_PRODUCTION',
  'DONE'
];

const formatStatusForUI = (status: TaskStatus): string => {
  return status.replace(/_/g, ' ');
};

interface StatisticsFiltersProps {
  filters: FiltersType;
  projects: { id: string; name: string }[];
  dateRangeError: string | null;
  onUpdateFilters: (filters: Partial<FiltersType>) => void;
  onApply: () => void;
}

export function StatisticsFilters({
  filters,
  projects,
  dateRangeError,
  onUpdateFilters,
  onApply,
}: StatisticsFiltersProps) {
  const handleDateChange = (type: 'start' | 'end', value: string) => {
    const date = new Date(value);
    onUpdateFilters({ [type === 'start' ? 'startDate' : 'endDate']: date });
  };

  const formatDateForInput = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={formatDateForInput(filters.startDate)}
            onChange={(e) => handleDateChange('start', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            value={formatDateForInput(filters.endDate)}
            onChange={(e) => handleDateChange('end', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project
          </label>
          <Select
            value={filters.projectId || 'all'}
            onValueChange={(value) => onUpdateFilters({ projectId: value === 'all' ? null : value })}
          >
            <SelectItem value="all">All Projects</SelectItem>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <Select
            value={filters.status || 'all'}
            onValueChange={(value) => onUpdateFilters({ status: value === 'all' ? null : value as TaskStatus })}
          >
            <SelectItem value="all">All Statuses</SelectItem>
            {STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {formatStatusForUI(status)}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {dateRangeError && (
        <div className="mt-3 text-sm text-red-600">
          {dateRangeError}
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <Button onClick={onApply}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}