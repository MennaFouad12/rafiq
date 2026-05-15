// import CheckIcon from "../icons/check-icon";
import TrueIcon from "../icons/true-icon";

export default function SuccessToast({
  title,
  className,
  footer,
}: {
  title: string;
  className?: string;
  footer?: React.ReactElement | undefined;
}) {
  return (
    <div
      className={`bg-[#82F9BE33] text-[#005235] p-4 rounded-lg ${
        className || ""
      }`}
    >
      <div className="flex gap-3 pb-3">
        <span>
          <TrueIcon />
        </span>
        <span>{title}</span>
      </div>

      {footer && footer}
    </div>
  );
}