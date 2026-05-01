import Avatar from "./Avatar";
import DateIcon from "./icons/date-icon";




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

  const isToday =
    due.toDateString() === today.toDateString();

  const isDelayed = due < today && !isToday;

  if (isToday) return { text: "Today", type: "today" };
  if (isDelayed) return { text: "Delayed", type: "delayed" };

  return { text: due.toLocaleDateString("en-GB"), type: "normal" };
};

export default function TaskCard({ task, onSelectTask }: { task: Task, onSelectTask: (task: { taskId: string }) => void; }) {


  const date = task.due_date ? formatDueDate(task.due_date) : null;
  return (
    <div onClick={() => onSelectTask({ taskId: task.id })} className={` p-3 rounded-lg shadow-sm  hover:shadow-md transition ${task.status === "BLOCKED"
        ? "bg-red-100 border border-red-300"
        : "bg-white"
      }`}>
      <p className="text-sm font-medium mb-5">{task.title}</p>
      <div className="flex justify-between items-ceneter">
        <div className="flex items-center text-neutral-light" >
          <DateIcon></DateIcon>
          <p className={`ms-3 font-bold ${date?.type === "delayed" ? "text-red-500" : date?.type === "today" ? "text-primary" : ""
            }`}>
            {date?.text}
          </p>
        </div>
        <div>
          <Avatar name={task.assignee?.name}></Avatar>
        </div>
      </div>
      {/* <span className="text-xs text-gray-400">#{task.id}</span> */}
    </div>
  );
}