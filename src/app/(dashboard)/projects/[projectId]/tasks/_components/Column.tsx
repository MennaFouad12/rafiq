

import { Task } from "@/lib/types/task.types";
import Avatar from "../../../../../../components/Avatar";
import AddTaskIcon from "../../../../../../components/icons/AddTask-icon";
import TaskCard from "./TaskCard";

import { useDroppable } from "@dnd-kit/core";
import TaskList from "./Task-List";


export default function Column({
  onSelectTask,
  title,
  length,
  tasks,

}: {
  onSelectTask: (task: { taskId: string }) => void;
  title: string;
  length: number;
  tasks: Task[];
}) {
  const { setNodeRef } = useDroppable({
    id: title,
  });


  return (
    <div ref={setNodeRef} className=" rounded-xl p-3 w-64 flex-shrink-0">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold">
          {title}
          <span className={` px-2  py-1 rounded-md ms-3 ${title === "BLOCKED" ? "bg-red-100 text-error" : "bg-surface-highest text-primary"}`}>{length}</span>
        </h3>
        <button className="text-gray-500 hover:text-black">+</button>
      </div>
      <button className="text-gray-500 border border-dashed w-full flex items-center justify-center mb-4 border-gray-300 rounded-lg px-4 py-2 hover:text-black">
        <span className="mr-2 font-bold"> <AddTaskIcon /></span>
        ADD NEW TASK</button>
      {/* Tasks */}
      <div className="space-y-2">
        
        <TaskList tasks={tasks} onSelectTask={onSelectTask} />
      </div>
    </div>
  );
}