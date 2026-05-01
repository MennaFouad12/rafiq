"use client";

import { useEffect, useState } from "react";

import Avatar from "./Avatar";
import { getTaskDetails } from "@/lib/tasks"; // 

type TaskDetails = {
  id: string;
  task_id: string;
  title: string;
  description: string;
  status: string;
  epic?: {
    epic_id?: string;
    title?: string;
  };
  assignee?: {
    name: string;
    role?: string;
  };
  created_by?: {
    name: string;
  };
  due_date?: string;
  created_at?: string;
};

export default function TaskDetailsModal({
  taskId,
  projectId,
  onClose,
}: {
  taskId: string;
  projectId: string;
  onClose: () => void;
}) {
  const [task, setTask] = useState<TaskDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const data = await getTaskDetails(projectId, taskId);
        setTask(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [projectId, taskId]);

  if (!task && !loading) return null;

  const formatDate = (date?: string) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      : "-";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] h-[600px] max-w-[95%] rounded-2xl shadow-xl overflow-hidden flex relative">

        {/* CLOSE */}
        <button onClick={onClose} className="absolute top-3 right-3">
          X
        </button>

        {/* LEFT */}
        <div className="w-2/3 ">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className=" flex flex-col h-full  justify-between  ">
              <div className="p-6">
                <div className="text-xs text-primary font-semibold">
                  <span className="bg-blue-100 px-2 py-1 rounded">
                    {task?.task_id}
                  </span>
                  <span className="ml-2">{task?.epic?.title}</span>
                </div>

                <h1 className="text-2xl font-bold mt-3">{task?.title}</h1>

                <p className="mt-6 text-gray-700">{task?.description}</p>
              </div>
              <div className="bg-indigo-50 p-6 flex justify-between">
                <button className="text-gray-600 cursor-pointer">copy link</button>
                <button className="p-2 bg-surface-highest cursor-pointer rounded-md"> cancel</button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="w-1/3 bg-indigo-50 p-6 space-y-6">
          <div>
            <p className="text-xs text-gray-500">STATUS</p>
            <div className="font-semibold">{task?.status}</div>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-5">ASSIGNEE</p>
            <div className="flex bg-white p-2 rounded-lg items-center gap-2">
              <Avatar name={task?.assignee?.name || "U"} />
              <span>{task?.assignee?.name}</span>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">CREATED BY</p>
            <span>{task?.created_by?.name}</span>
          </div>

          <div className="text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 mb-4">Due Date</span>
              <span>{formatDate(task?.due_date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 mb-4">Created At</span>
              <span>{formatDate(task?.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}