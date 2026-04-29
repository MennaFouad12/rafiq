





"use client";



import Link from "next/link";
import { usePathname } from "next/navigation";


import RightChevron from "./icons/right-chevron";
import LogOutIcon from "./icons/logout-icon";
import LeftChevron from "./icons/left-chevron";
import ProjectIcon from "./icons/project-icon";
import { useLogout } from "@/lib/hooks/use-logout";
import { useSidebarCollapsed } from "@/context/sidebar-context";
import Logo from "./Logo";
import ProjectEpicIcon from "./icons/project-epic-icon";
import ProjectTaskIcon from "./icons/project-task-icon";
import ProjectMemeberIcon from "./icons/project-member-icon";
import ProjectDetailsIcon from "./icons/project-details-icon";
type Tabs = {
  icon: React.ReactElement;
  title: string;
  href: string;
  id: number;
};
 const mainTabsList: Tabs[] = [
  { icon: <ProjectIcon />, title: "Projects", href: "/projects", id: 1 },
];

const projectTabsList: Tabs[] = [
  { icon: <ProjectIcon />, title: "Projects", href: "/projects", id: 1 },

  { icon: <ProjectEpicIcon />, title: "Project Epics", href: "epics", id: 2 },
  { icon: <ProjectTaskIcon />, title: "Project Tasks", href: "tasks", id: 3 },
  {
    icon: <ProjectMemeberIcon />,
    title: "Project Members",
    href: "members",
    id: 4,
  },
  {
    icon: <ProjectDetailsIcon />,
    title: "Project Details",
    href: "edit",
    id: 5,
  },
];
function SidebarContent({
  isCollapsed,
  toggle,
}: {
  isCollapsed: boolean;
  toggle: () => void;
}) {
  const pathname = usePathname();
  const { handleLogout } = useLogout();

  const projectIdMatch = pathname.match(/\/projects\/([^/]+)/);
  const activeProjectId = projectIdMatch ? projectIdMatch[1] : null;

  const tabs = activeProjectId
    ? projectTabsList.map((tab) => ({
        ...tab,
        href: tab.href.startsWith("/")
          ? tab.href
          : `/projects/${activeProjectId}/${tab.href}`,
      }))
    : mainTabsList;

  return (
    <aside className="h-full bg-surface-low px-4 flex flex-col justify-between">
      <div className="overflow-y-auto flex-1">
        {!isCollapsed && <Logo className="mt-4 mb-8" />}

        <ul>
          {tabs.map((li) => {
            const isActive = pathname === li.href;
            return (
              <li key={li.id}>
                <Link
                  href={li.href}
                className={`
  flex gap-3 my-1 font-medium min-w-10 min-h-10 items-center px-2 rounded-sm transition-colors
  ${isActive ? "bg-white text-primary shadow-sm" : "text-slate-dark hover:bg-slate-100"}
  ${isCollapsed && !isActive ? "text-[#041B3C99]" : ""}
  ${isCollapsed ? "mt-6" : ""}
`}
                >
                <span
  className={
    isCollapsed ? "h-12 w-12 flex items-center justify-center" : ""
  }
>
                    {li.icon}
                  </span>
                  {!isCollapsed && <span>{li.title}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col border-t border-slate-light/20 pt-6 pb-4">
        {/* Collapse button — desktop only */}
       <button
       onClick={toggle}
    className=" cursor-pointer mb-5 items-center justify-center  rounded-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none text-slate-container  hidden md:flex"
   
    >
      {/* {leftIcon && (
        <span className="shrink-0 me-3">{leftIcon}</span>
      )} */}
{isCollapsed ? (
  <RightChevron />
) : (
  <div className="flex items-center gap-2">
  <LeftChevron />
    <span>collapse</span>
  </div>
)}
      {/* {rightIcon && (
        <span className="shrink-0 me-3">{rightIcon}</span>
      )} */}
    </button>
        <button
          onClick={handleLogout}
        
        
          className="inline-flex cursor-pointer items-center justify-center rounded-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none text-slate-container "
        >
          {isCollapsed ? <LogOutIcon /> : <div className="flex items-center gap-2">
    <LogOutIcon />
    <span>logout</span>
  </div>}
        </button>
      </div>
    </aside>
  );
}

export default function SideBar() {
  const { isCollapsed, toggle } = useSidebarCollapsed();

  return (
    <>
  {/* ── Desktop: always in flow, collapsible ── */}
  <div
    className={`
      hidden md:flex md:flex-col shrink-0 h-full transition-all duration-300
      ${isCollapsed ? "w-20" : "w-[16rem]"}
    `}
  >
    <SidebarContent isCollapsed={isCollapsed} toggle={toggle} />
  </div>

  {/* ── Mobile: drawer overlay ── */}
  <div
    className={`
      md:hidden fixed inset-0 z-40 transition-all duration-300
      ${isCollapsed ? "pointer-events-none" : "pointer-events-auto"}
    `}
  >
    {/* Backdrop */}
    <div
      onClick={toggle}
      className={`
        absolute inset-0 bg-black/40 transition-opacity duration-300
        ${isCollapsed ? "opacity-0" : "opacity-100"}
      `}
    />

    {/* Drawer panel — always full, never icon-only on mobile */}
    <div
      className={`
        absolute left-0 top-0 h-full w-[16rem] transition-transform duration-300 shadow-xl
        ${isCollapsed ? "-translate-x-full" : "translate-x-0"}
      `}
    >
      <SidebarContent isCollapsed={false} toggle={toggle} />
    </div>
  </div>
</>
  );
}
