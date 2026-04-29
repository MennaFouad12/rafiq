type Props = {
  name?: string;
};

export default function Avatar({ name }: Props) {
  const initials =
    name
      ?.split(" ")
      ?.map((n) => n[0])
      ?.join("")
      ?.toUpperCase() || "U";

  return (
    <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
      {initials}
    </div>
  );
}