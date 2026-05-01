

"use client";

import { useSidebarCollapsed } from "@/context/sidebar-context";
import Logo from "./Logo";
import UserInfo from "./UserInfo";


export default function Topbar() {
  const { isCollapsed, toggle } = useSidebarCollapsed();

  return (
    <div
    className={`
  bg-background w-full border-b px-6 border-[#0000001A] min-h-16 flex justify-between
  ${!isCollapsed ? "justify-end" : ""}
`}
    >
      {isCollapsed && (
        <div className="flex gap-4">
          <button onClick={toggle} className="md:hidden">
            ☰
          </button>
          <Logo />
        </div>
      )}
      <UserInfo />
    </div>
  );
}