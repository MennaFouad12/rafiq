export default function Check({ valid, text }: { valid: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-3 h-3 rounded-full ${
          valid ? "bg-[#006844]" : "border border-gray-400"
        }`}
      ></div>
      <span className={valid ? "text-[#041B3C]" : "text-gray-400"}>
        {text}
      </span>
    </div>
  );
}