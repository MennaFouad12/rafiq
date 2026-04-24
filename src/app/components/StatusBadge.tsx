type Props = {
  status: "done" | "in_progress" | "todo" | string;
};

export default function StatusBadge({ status }: Props) {
  const color =
    status === "done"
      ? "bg-green-100 text-green-600"
      : status === "in_progress"
      ? "bg-blue-100 text-blue-600"
      : "bg-gray-100 text-gray-600";

  return (
    <span className={`text-xs px-2 py-1 rounded ${color}`}>
      {status}
    </span>
  );
}