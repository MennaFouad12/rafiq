


"use client";

import BoardView from "@/components/BoardView";
import BoardIcon from "@/components/icons/Board-icon";
import DropdownIcon from "@/components/icons/dropdown-icon";
import FilterIcon from "@/components/icons/filter-icon";
import SearchIcon from "@/components/icons/search-icon";
import ListView from "@/components/ListView";
import TaskDetailsModal from "@/components/TaskDetailsModel";
import { useParams } from "next/navigation";
// import TaskDetailsModal from "@/components/TaskDetailsModal";
import { useState } from "react";

export default function Workboard() {
  const [view, setView] = useState("BOARD");
  const params = useParams();
  const projectId = Array.isArray(params.projectId)
    ? params.projectId[0]
    : params.projectId;


  const [selectedTask, setSelectedTask] = useState<{
    taskId: string;

  } | null>(null);

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Active Workboard
          </h1>
          <p className="text-sm text-gray-500">
            Curating Project Alpha's production pipeline and milestones.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:items-center">

          {/* search */}
          <div className="relative w-full sm:w-72">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-3 py-2 rounded-md bg-surface-highest"
            />
          </div>

          {/* select */}
          <div className="relative w-full sm:w-72">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <BoardIcon />
            </div>

            <select
              value={view}
              onChange={(e) => setView(e.target.value)}
              className="w-full appearance-none pl-7 pr-5 py-2 rounded-md bg-white border"
            >
              <option value="LIST">List View</option>
              <option value="BOARD">Board View</option>
            </select>

            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <DropdownIcon />
            </div>
          </div>

          <div className="bg-surface-highest p-3 rounded-md">
            <FilterIcon />
          </div>
        </div>
      </div>

      {/* VIEWS */}
      {view === "BOARD" && (
        <BoardView onSelectTask={setSelectedTask} />
      )}

      {view === "LIST" && (
        <ListView onSelectTask={setSelectedTask} />
      )}

      {/* MODAL */}
      {selectedTask && projectId && (
        <TaskDetailsModal
          taskId={selectedTask.taskId}
          projectId={projectId}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}