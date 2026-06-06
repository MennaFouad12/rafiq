// import { TasksCountFilter, TasksStas } from "@/lib/types/stats.types";
// import useGetTasksCount from "../hooks/use-get-tasks-count";
// import EmptyTasksState from "./empty-tasks-count-state";
"use client";
import { TasksCountFilter, TasksStas } from "@/lib/types/stats.types";
import EmptyTasksState from "./empty-tasks-count-state";
import { getTasksCountPerProject } from "@/lib/statistics";
import { useEffect, useState } from "react";

export default function TasksCountCard(filters: TasksCountFilter) {
  // const { tasksCount } = useGetTasksCount(filters);

  



  const [data, setData] = useState<TasksStas[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getTasksCountPerProject(filters);
        setData(result ?? []);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [filters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const isEmpty = data.length === 0;

  if (isEmpty) {
    return <EmptyTasksState />;
  }
  return (
    <div className="bg-white md:w-1/3 w-full min-h-66 p-8 rounded-lg">
      <p className="text-slate-dark font-bold text-lg mb-10">All Projects</p>
      {data?.map((task: TasksStas) => (
        <div
          key={task.project_id}
          className="flex items-center justify-between"
        >
          <span className="text-slate-dark/70 font-bold text-sm mt-4">
            {task.project_name}
          </span>
          <span className="text-slate-dark font-bold">
            {task.tasks_count} tasks
          </span>
        </div>
      ))}
    </div>
  );
}