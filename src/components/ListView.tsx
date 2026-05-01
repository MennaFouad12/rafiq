

"use client";

import React, { useEffect } from "react";
import Avatar from "./Avatar";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchtasks } from "@/redux/features/tasks/task";
import Pagination from "./Pagination";

type Task = {
  id: string;
  title: string;
  status: string;
};

export default function ListView({
  onSelectTask,
}: {
  onSelectTask: (task: { taskId: string }) => void;
}) {
  // console.log("list view tasks",tasks);

  const [currentPage, setCurrentPage] = React.useState(1);
  const limit = 6
  const dispatch = useAppDispatch();

  const { tasks, totalCount, loadingTasks } = useAppSelector(
    (state) => state.tasks
  );
const formatDate = (date?: string) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      : "-";

  const params = useParams();

  const projectId = Array.isArray(params.projectId)
    ? params.projectId[0]
    : params.projectId;

  useEffect(() => {
    if (!projectId) return;

    dispatch(
      fetchtasks({
        projectId,
        page: currentPage,
        limit,
      })
    );
  }, [projectId, currentPage]); 

  return (


    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header - شاشات كبيرة بس */}
      <div className="hidden lg:grid grid-cols-6 px-6 py-4 text-sm font-semibold text-gray-500 border-b">
        <span>Task ID</span>
        <span>Title</span>
        <span>Status</span>
        <span>Due Date</span>
        <span>Assignee</span>
        <span className="text-right">Actions</span>
      </div>


      {tasks.map((task: any) => (

        <React.Fragment key={task.id}>
          {/* ── Desktop Row (lg+) ── */}
          <div onClick={() =>
            onSelectTask({
              taskId: task.id,
            })
          } className="hidden lg:grid grid-cols-6 items-center px-6 py-4 border-b border-gray-300 hover:bg-gray-50">

            <div className="text-sm text-primary">{task.task_id}</div>

            <div className="font-medium text-gray-800">
              {task.title}
            </div>

            <div>
              <span className="text-xs px-2 py-1 rounded bg-gray-100">
                {task.status}
              </span>
            </div>

            <div className="text-sm text-gray-600">
              {task.due_date && new Date(task.due_date).toLocaleDateString("en-GB")}

            </div>

            <div className="flex items-center gap-2">
              <Avatar name={task.assignee?.name} />
              <span>{task.assignee?.name || "No Name"}</span>
            </div>

            <div className="flex justify-end">
              <button className="p-2">⋮</button>
            </div>
          </div>

          {/* ── Mobile Card (أقل من lg) ── */}
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
                  <Avatar name={task.assignee?.name}></Avatar>
                </div>
                <div className="text-sm ">
                  <p className="text-gray-500">DUE DATE</p>
                  <p> {formatDate(task?.due_date)}</p>
                </div>
              </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 flex-shrink-0">
              ⋮
            </button>
          </div>

        </React.Fragment>

      ))}
      <div className="mb-3 px-6">
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          limit={limit}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );

}