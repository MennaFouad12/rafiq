



// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import Column from "./Column";
// import { useEffect, useRef, useState } from "react";
// import { fetchtasks } from "@/redux/features/tasks/task";
// import { useParams } from "next/navigation";

// const statuses = [
//   "TO_DO",
//   "IN_PROGRESS",
//   "BLOCKED",
//   "IN_REVIEW",
//   "READY_FOR_QA",
//   "REOPENED",
//   "READY_FOR_PRODUCTION",
//   "DONE",
// ] as const;


// export default function BoardView({
//   search,
//   onSelectTask,
// }: {
//   search: string;
//   onSelectTask: (task: { taskId: string }) => void;
// }) {
//   const dispatch = useAppDispatch();

//   const { tasksByStatus, loadingTasks } = useAppSelector(
//     (state) => state.tasks
//   );
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const limit = 10;
//   const sentinelRef = useRef<HTMLDivElement | null>(null);
//   const params = useParams();

//   const projectId = Array.isArray(params.projectId)
//     ? params.projectId[0]
//     : params.projectId;

//   // useEffect(() => {
//   //   if (!projectId || !hasMore) return;

//   //   dispatch(
//   //     fetchtasks({
//   //       projectId,
//   //       page,
//   //       limit,
//   //       search,
//   //     })
//   //   )
//   //     .unwrap()
//   //     .then((res) => {
//   //       if (res.data.length < limit) {
//   //         setHasMore(false);
//   //       }
//   //     });
//   // }, [projectId, page]);
  
//   useEffect(() => {
//   if (!projectId) return;

//   setPage(1);
//   setHasMore(true);

//   dispatch(
//     fetchtasks({
//       projectId,
//       page: 1,
//       limit,
//       search,
//     })
//   )
//     .unwrap()
//     .then((res) => {
//       if (res.data.length < limit) {
//         setHasMore(false);
//       }
//     });
// }, [projectId, search]);
//   useEffect(() => {
//     if (!sentinelRef.current || !hasMore) return;

//     const observer = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting) {
//         setPage((prev) => prev + 1);
//       }
//     });

//     observer.observe(sentinelRef.current);

//     return () => observer.disconnect();
//   }, [hasMore]);

//   if (loadingTasks) {
//     return <p>Loading tasks...</p>;
//   }

//   return (
//     <div className="flex gap-4 overflow-x-auto">
//       {statuses.map((status) => (
//         <Column
//           onSelectTask={onSelectTask}
//           key={status}
//           title={status}
//           length={tasksByStatus?.[status]?.length || 0}
//           tasks={tasksByStatus?.[status] || []}
//         />
//       ))}
//       <div ref={sentinelRef} className="w-10" />
//     </div>
//   );
// }



"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Column from "./Column";
import React, { useEffect, useRef, useState } from "react";
import { fetchtasks, moveTask } from "@/redux/features/tasks/task";
import { useParams } from "next/navigation";
import {
  DndContext,
  closestCorners,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { updateTask } from "@/lib/tasks";
import Avatar from "./Avatar";

const statuses = [
  "TO_DO",
  "IN_PROGRESS",
  "BLOCKED",
  "IN_REVIEW",
  "READY_FOR_QA",
  "REOPENED",
  "READY_FOR_PRODUCTION",
  "DONE",
] as const;

export default function BoardView({
  search,
  onSelectTask,
}: {
  search: string;
  onSelectTask: (task: { taskId: string }) => void;
}) {
  const dispatch = useAppDispatch();

  const { tasksByStatus,tasks, loadingTasks } = useAppSelector(
    (state) => state.tasks
  );

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const params = useParams();

  const projectId = Array.isArray(params.projectId)
    ? params.projectId[0]
    : params.projectId;
    const formatDate = (date?: string) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      : "-";
const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5, // 👈 drag يبدأ بعد 5px حركة
    },
  })
);
  // ✅ Fetch tasks
  useEffect(() => {
    if (!projectId) return;

    setPage(1);
    setHasMore(true);

    dispatch(
      fetchtasks({
        projectId,
        page: 1,
        limit,
        search,
      })
    )
      .unwrap()
      .then((res) => {
        if (res.data.length < limit) {
          setHasMore(false);
        }
      });
  }, [projectId, search]);

  // ✅ Infinite scroll
  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [hasMore]);

  // 🔥 Drag End Handler
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as string;

    let oldStatus: string | null = null;

    for (const status in tasksByStatus) {
      if (tasksByStatus[status].some((t) => t.id === taskId)) {
        oldStatus = status;
        break;
      }
    }

    if (!oldStatus || oldStatus === newStatus) return;

    // ✅ optimistic update
    dispatch(moveTask({ taskId, oldStatus, newStatus }));

    try {
      await updateTask(newStatus, taskId);
    } catch (err) {
      // ❌ rollback
      dispatch({
        type: "tasks/moveTask",
        payload: {
          taskId,
          oldStatus: newStatus,
          newStatus: oldStatus,
        },
      });

      alert("Failed to update task ❌");
    }
  };

  if (loadingTasks) {
    return <p>Loading tasks...</p>;
  }

  return (
    <DndContext
     sensors={sensors}
  collisionDetection={closestCorners}
  onDragEnd={handleDragEnd}>
      <div className="hidden lg:flex gap-4 overflow-x-auto">
        {statuses.map((status) => (
          <Column
            onSelectTask={onSelectTask}
            key={status}
            title={status}
            length={tasksByStatus?.[status]?.length || 0}
            tasks={tasksByStatus?.[status] || []}
          />
        ))}

        <div ref={sentinelRef} className="w-10" />
      </div>

{tasks.map((task: any) => (
  <React.Fragment key={task.id}>
    <div className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-gray-200 last:border-none hover:bg-gray-50">
      <div className="w-full">
        <div className="flex justify-between items-center mb-3">
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

        <div className="font-bold text-xl mb-5">
          {task.title}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div>
            <Avatar name={task.assignee?.name} />
          </div>

          <div className="text-sm">
            <p className="text-gray-500">DUE DATE</p>
            <p>{formatDate(task?.due_date)}</p>
          </div>
        </div>
      </div>

      <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 flex-shrink-0">
        ⋮
      </button>
    </div>
  </React.Fragment>
))}
    </DndContext>
  );
}






// "use client";

// import {
//   DndContext,
//   closestCorners,
//   DragEndEvent,
// } from "@dnd-kit/core";
// import { updateTask } from "@/lib/tasks";

// export default function BoardView({...}) {

//   const dispatch = useAppDispatch();
//   const { tasksByStatus } = useAppSelector((state) => state.tasks);

//   // 🧠 handler
//   const handleDragEnd = async (event: DragEndEvent) => {
//     const { active, over } = event;

//     if (!over) return;

//     const taskId = active.id as string;
//     const newStatus = over.id as string;

//     // 🔍 نلاقي التاسك القديمة
//     let oldStatus: string | null = null;

//     for (const status in tasksByStatus) {
//       if (tasksByStatus[status].some((t) => t.id === taskId)) {
//         oldStatus = status;
//         break;
//       }
//     }

//     if (!oldStatus || oldStatus === newStatus) return;

//     // ✅ optimistic update
//     dispatch({
//       type: "tasks/moveTask",
//       payload: { taskId, oldStatus, newStatus },
//     });

//     try {
//       await updateTask(newStatus, taskId);
//     } catch (err) {
//       // ❌ rollback
//       dispatch({
//         type: "tasks/moveTask",
//         payload: { taskId, oldStatus: newStatus, newStatus: oldStatus },
//       });

//       alert("Failed to update task ❌");
//     }
//   };

//   return (
//     <DndContext
//       collisionDetection={closestCorners}
//       onDragEnd={handleDragEnd}
//     >
//       <div className="flex gap-4 overflow-x-auto">
//         {statuses.map((status) => (
//           <Column
//             key={status}
//             title={status}
//             tasks={tasksByStatus?.[status] || []}
//           />
//         ))}
//       </div>
//     </DndContext>
//   );
// }