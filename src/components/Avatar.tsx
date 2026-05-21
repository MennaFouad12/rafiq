// type Props = {
//   name?: string;
// };

// export default function Avatar({ name }: Props) {
//   const initials =
//     name
//       ?.split(" ")
//       ?.map((n) => n[0])
//       ?.join("")
//       ?.toUpperCase() || "U";

//   return (
//     <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
//       {initials}
//     </div>
//   );
// }


// type Props = {
//   name?: string;
//   palette?: {
//     color?: string;
//     backgroundColor?: string;
//   };
// };

// export default function Avatar({ name,, palette }: Props) {
//   const initials =
//     name
//       ?.split(" ")
//       ?.map((n) => n[0])
//       ?.join("")
//       ?.toUpperCase() || "U";

//   return (
//     <div
//       style={{
//         color: palette?.color,
//         backgroundColor: palette?.backgroundColor,
//       }}
//       className={`w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold`}
//     >
//       {initials}
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { getInitials } from "@/lib/utils/get-name-initials";

type AvatarProps = {
  name: string;
  src?: string | null;
  sizeClassName?: string;
  className?: string;
  textClassName?: string;
  alt?: string;
  palette?: {
    color?: string;
    backgroundColor?: string;
  };
};

export default function Avatar({
  name,
  src,
  sizeClassName = "w-10 h-10",
  className = "",
  textClassName = "text-sm",
  alt,
  palette,
}: AvatarProps) {
  const initials = getInitials(name);

  return (
    <span
  style={{
    color: palette?.color ?? "#fff",
    backgroundColor: palette?.backgroundColor ?? "#003D9B",
  }}
  className={`
    inline-flex items-center justify-center
    rounded-xl overflow-hidden
    font-semibold
    ${sizeClassName}
    ${textClassName}
    ${className}
  `}
>
      {src ? (
        <Image
          src={src}
          alt={alt ?? name}
          width={64}
          height={64}
          className="w-full h-full object-cover"
          unoptimized
        />
      ) : (
        initials
      )}
    </span>
  );
}