

import Avatar from "./Avatar";
import AddTaskIcon from "./icons/AddTask-icon";
import TaskCard from "./TaskCard";

import { useDroppable } from "@dnd-kit/core";




type Task = {
  id: string;
  task_id: string;
  title: string;
  status: string;
  due_date?: string | null;
  assignee?: {
    name?: string | null;
  };
};

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

  const formatDate = (date?: string) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      : "-";
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
        {tasks.map((task) => (
          <div key={task.id} >
            <div className=" hidden lg:block">
              <TaskCard onSelectTask={onSelectTask} key={task.id} task={task as any} />
            </div>

            <div className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-gray-200 last:border-none hover:bg-gray-50">
              <div className="w-full" >
                <div className="flex   justify-between items-center mb-3">
                  <div>
                    <p className="font-semibold text-gray-500 text-sm">
                      {task.task_id}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm mt-0.5">
                      {task.status}
                    </p>
                  </div>
                </div>
                <div className="font-bold text-xl mb-5" >
                  {task.title}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div >
                    <Avatar name={task.assignee?.name || undefined}></Avatar>
                  </div>
                  <div className="text-sm ">
                    <p className="text-gray-500">DUE DATE</p>
                    <p> {formatDate(task?.due_date ?? undefined)}</p>
                  </div>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 flex-shrink-0">
                ⋮
              </button>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
}