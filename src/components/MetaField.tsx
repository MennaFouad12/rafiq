import React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
};

export default function MetaField({ label, children }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-gray-400 font-bold">{label}</span>
      <div className="flex items-center gap-2 text-sm text-gray-800">
        {children}
      </div>
    </div>
  );
}