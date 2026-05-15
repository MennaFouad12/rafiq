
import Avatar from "./Avatar";
import DateIcon from "./icons/date-icon";
import { useDraggable } from "@dnd-kit/core";

type Task = {
  id: string;
  title: string;
  status: string;
  due_date?: string;
  assignee?: {
    name?: string;
  };
};

const formatDueDate = (due_date: string) => {
  const due = new Date(due_date);
  const today = new Date();

  const isToday = due.toDateString() === today.toDateString();
  const isDelayed = due < today && !isToday;

  if (isToday) return { text: "Today", type: "today" };
  if (isDelayed) return { text: "Delayed", type: "delayed" };

  return { text: due.toLocaleDateString("en-GB"), type: "normal" };
};

export default function TaskCard({
  task,
  onSelectTask,
}: {
  task: Task;
  onSelectTask: (task: { taskId: string }) => void;
}) {
  // 🔥 draggable
  const { setNodeRef, listeners, attributes, transform } =
    useDraggable({
      id: task.id, // مهم جدًا
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  const date = task.due_date ? formatDueDate(task.due_date) : null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() =>{  onSelectTask({ taskId: task.id })}}
      // onClick={() => onSelectTask({ taskId: task.id })}
      className={`p-3 rounded-lg shadow-sm hover:shadow-md transition cursor-grab ${
        task.status === "BLOCKED"
          ? "bg-red-100 border border-red-300"
          : "bg-white"
      }`}
    >
      <div   >
      <p className="text-sm font-medium mb-5">{task.title}</p>

      <div className="flex justify-between items-center">
        <div className="flex items-center text-neutral-light">
          <DateIcon />
          <p
            className={`ms-3 font-bold ${
              date?.type === "delayed"
                ? "text-red-500"
                : date?.type === "today"
                ? "text-primary"
                : ""
            }`}
          >
            {date?.text}
          </p>
        </div>

        <div>
          <Avatar name={task.assignee?.name} />
        </div>
      </div>
      </div>
    </div>
  );
}