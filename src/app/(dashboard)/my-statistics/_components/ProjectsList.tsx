// components/statistics/ProjectsList.tsx
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
// import { ProjectTasksCount } from '@/types/statistics';

import { ProjectTasksCount } from "@/lib/types/statistics";
import { Card, CardContent, CardHeader, CardTitle } from "./_ui/Card";

interface ProjectsListProps {
  projects: ProjectTasksCount[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const getProgressColor = (percentage: number): string => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    if (percentage >= 25) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const maxTasks = Math.max(...projects.map(p => p.tasks_count), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => {
            const percentage = maxTasks > 0 ? (project.tasks_count / maxTasks) * 100 : 0;
            
            return (
              <div key={project.project_id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {project.project_name}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {project.tasks_count} Tasks
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${getProgressColor(percentage)} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
          
          {projects.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No projects found in this date range
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}