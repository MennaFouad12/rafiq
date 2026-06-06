import { Task } from "@/lib/types/task.types";
import React from "react";
import TaskCard from "./TaskCard";

type Props = {
  tasks: Task[];
  onSelectTask?: (task: { taskId: string }) => void;
fromepic?: boolean;
};

export default function TaskList({
  tasks,
  onSelectTask,
  fromepic = false,
}: Props) {
  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className={fromepic ? "" : "hidden lg:block"}
        >
          <TaskCard
            onSelectTask={onSelectTask}
            task={task as any}
          />
        </div>
      ))}
    </div>
  );
}