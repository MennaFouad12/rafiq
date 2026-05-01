



import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Column from "./Column";
import { useEffect, useRef, useState } from "react";
import { fetchtasks } from "@/redux/features/tasks/task";
import { useParams } from "next/navigation";

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
  onSelectTask,
}: {
  onSelectTask: (task: { taskId: string }) => void;
}) {
  const dispatch = useAppDispatch();

  const { tasksByStatus, loadingTasks } = useAppSelector(
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

  useEffect(() => {
    if (!projectId || !hasMore) return;

    dispatch(
      fetchtasks({
        projectId,
        page,
        limit,
      })
    )
      .unwrap()
      .then((res) => {
        if (res.data.length < limit) {
          setHasMore(false);
        }
      });
  }, [projectId, page]);
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

  if (loadingTasks) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className="flex gap-4 overflow-x-auto">
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
  );
}