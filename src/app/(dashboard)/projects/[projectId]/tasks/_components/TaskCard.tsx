
import { formatDate } from "@/lib/utils/format-date";
// import Avatar from "./Avatar";
import DateIcon from "../../../../../../components/icons/date-icon";
import { useDraggable } from "@dnd-kit/core";
import Avatar from "../../../../../../components/Avatar";
import { Task } from "@/lib/types/task.types";



const formatDueDate = (due_date: string) => {
  const due = new Date(due_date);
  const today = new Date();

  const isToday = due.toDateString() === today.toDateString();
  const isDelayed = due < today && !isToday;

  if (isToday) return { text: "Today", type: "today" };
  if (isDelayed) return { text: "Delayed", type: "delayed" };

  return { text: due.toLocaleDateString("en-GB"), type: "normal" };
};
type Props = {
  task: Task;
  onSelectTask?: (task: { taskId: string }) => void;
};
export default function TaskCard({
  task,
  onSelectTask,
}: Props) {
  //  draggable
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
    <div>
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        onClick={() => { onSelectTask?.({ taskId: task.id }) }}
        // onClick={() => onSelectTask({ taskId: task.id })}
        className={` hidden lg:block p-3 rounded-lg shadow-sm hover:shadow-md transition cursor-grab ${task.status === "BLOCKED"
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
                className={`ms-3 font-bold ${date?.type === "delayed"
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
              <Avatar name={task.assignee?.name ?? ""} />
            </div>
          </div>
        </div>
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
              <Avatar name={task.assignee?.name ?? ""} />
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
  );
}