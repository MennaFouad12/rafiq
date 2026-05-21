import { Task } from "@/lib/types/task.types";
import React from "react";
import TaskCard from "./TaskCard";

type Props = {
  tasks: Task[];
  onSelectTask?: (task: { taskId: string }) => void;
};

export default function TaskList({
  tasks,
  onSelectTask,
}: Props) {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="hidden lg:block">
          <TaskCard
            onSelectTask={onSelectTask}
            task={task as any}
          />
        </div>
      ))}
    </div>
  );
}