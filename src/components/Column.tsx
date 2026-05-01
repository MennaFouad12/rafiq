// // components/Column.tsx
// 'use client';

import Avatar from "./Avatar";
import AddTaskIcon from "./icons/AddTask-icon";
import TaskCard from "./TaskCard";

// import { Task } from "./providers/tasks";
// import { TaskCard } from "./TaskCard";



// interface ColumnProps {
//   title: string;
//   status: Task['status'];
//   tasks: Task[];
//   onTaskMove: (taskId: string, newStatus: Task['status']) => void;
//   color: string;
// }

// export function Column({ title, status, tasks, onTaskMove, color }: ColumnProps) {
//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = 'move';
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     const taskId = e.dataTransfer.getData('text/plain');
//     onTaskMove(taskId, status);
//   };

//   const getCountColor = () => {
//     switch (status) {
//       case 'todo': return 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
//       case 'in-progress': return 'bg-blue-200 text-blue-700 dark:bg-blue-800 dark:text-blue-200';
//       case 'blocked': return 'bg-red-200 text-red-700 dark:bg-red-800 dark:text-red-200';
//       case 'urgent': return 'bg-amber-200 text-amber-700 dark:bg-amber-800 dark:text-amber-200';
//       case 'completed': return 'bg-emerald-200 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-200';
//       default: return 'bg-slate-200 text-slate-700';
//     }
//   };

//   return (
//     <div
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//       className={`rounded-xl p-3 ${color} min-w-[280px] transition-all`}
//     >
//       <div className="flex items-center justify-between mb-3 px-1">
//         <div className="flex items-center gap-2">
//           <h3 className="font-semibold text-slate-700 dark:text-slate-200">{title}</h3>
//           <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCountColor()}`}>
//             {tasks.length}
//           </span>
//         </div>
//         <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//           </svg>
//         </button>
//       </div>
//       <div className="space-y-2">
//         {tasks.map(task => (
//           <TaskCard key={task.id} task={task} onTaskMove={onTaskMove} />
//         ))}
//         {tasks.length === 0 && (
//           <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
//             Drop tasks here
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




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

  const formatDate = (date?: string) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      : "-";
  return (
    <div className=" rounded-xl p-3 w-64 flex-shrink-0">
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