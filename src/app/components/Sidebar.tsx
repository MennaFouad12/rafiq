"use client";

import { logout } from "@/lib/auth";
import { clearUser } from "@/redux/features/user/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useParams } from "next/navigation";
const menuItems = (projectId: string) => [
  {
    title: "Projects",
      href: "/projects",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path
          d="M0 8V0H8V8H0ZM0 18V10H8V18H0ZM10 8V0H18V8H10ZM10 18V10H18V18H10Z"
          fill="currentColor"
        />
      </svg>
    ),
      requireProject: false,
  
  },
  {
    title: "Project Epics",
    href:`/projects/${projectId}/epics`,
    icon: (
      <svg width="20" height="18" viewBox="0 0 20 18">
        <path
          d="M13 18V15H9V5H7V8H0V0H7V3H13V0H20V8H13V5H11V13H13V10H20V18H13ZM2 6H5V2H2V6ZM15 6H18V2H15V6ZM15 16H18V12H15V16Z"
          fill="currentColor"
          opacity="0.6"
        />
      </svg>
    ),
      requireProject: true,
  },
  {
    title: "Project Tasks",
    href:`/projects/${projectId}/tasks`,
    icon: (
      <svg width="20" height="16" viewBox="0 0 20 16">
        <path
          d="M14.375 15.075L10.825 11.525L12.225 10.125L14.35 12.25L18.6 8L20 9.425L14.375 15.075ZM14.375 7.075L10.825 3.525L12.225 2.125L14.35 4.25L18.6 0L20 1.425L14.375 7.075ZM0 13.075V11.075H9V13.075H0ZM0 5.075V3.075H9V5.075H0Z"
          fill="currentColor"
          opacity="0.6"
        />
      </svg>
    ),
      requireProject: true,
  },
  {
    title: "Project Members",
    href:`/projects/${projectId}/members`,
    icon: (
      <svg width="22" height="16" viewBox="0 0 22 16">
        <path
          d="M0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0ZM18 16V13C18 12.2667 17.7958 11.5625 17.3875 10.8875C16.9792 10.2125 16.4 9.63333 15.65 9.15C16.5 9.25 17.3 9.42083 18.05 9.6625C18.8 9.90417 19.5 10.2 20.15 10.55C20.75 10.8833 21.2083 11.2542 21.525 11.6625C21.8417 12.0708 22 12.5167 22 13V16H18ZM8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8Z"
          fill="currentColor"
          opacity="0.6"
        />
      </svg>
    ),
      requireProject: true,
  },
    {
    title: "Project details",
    href:`/projects/${projectId}/edit`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9 15H11V9H9V15ZM10 7C10.2833 7 10.5208 6.90417 10.7125 6.7125C10.9042 6.52083 11 6.28333 11 6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6C9 6.28333 9.09583 6.52083 9.2875 6.7125C9.47917 6.90417 9.71667 7 10 7ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="currentColor"/>
</svg>

    ),
      requireProject: true,
  }
];

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: any) {



  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const params = useParams();
  const projectId = params?.projectId as string | undefined;

  const items = menuItems(projectId);

  async function signOut() {
    await logout();
    dispatch(clearUser());
    router.push("/login");
  }

  return (
    
    <>
      {/* Overlay (Mobile) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          bg-surface-low  h-full z-50 transition-all duration-300
          fixed md:static
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "left-0" : "-left-full md:left-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {/* {!collapsed && <h1 className="font-bold">TASKLY</h1>} */}

          {/* Close (Mobile) */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden"
          >
          X
          </button>
        </div>

        {/* Menu */}
        <nav className="px-2 space-y-2">
    

          {items.map((item, index) => {
            const isProjectRoute = item.requireProject;

            // ⛔ لو محتاج projectId ومفيش id => نخفيه
            if (isProjectRoute && !projectId) return null;

            const isActive = pathname.startsWith(item.href)
  // const isActive = pathname.startsWith(item.href);

  return (
    <Link
      key={index}
      href={item.href}
      className={`flex items-center font-bold gap-3 p-3 rounded transition
        ${isActive 
          ? "bg-white text-primary" 
          : "text-neutral-dark  hover:bg-gray-100 hover:text-primary"}
      `}
    >
      <span className="text-lg">
        {item.icon}
      </span>

      {!collapsed && (
        <span className="text-sm font-medium">
          {item.title}
        </span>
      )}
    </Link>
  );
})}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-4 w-full px-2">
          {/* Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center md:justify-between p-2 rounded "
          >
            {/* {!collapsed && <span>Collapse</span>} */}

            {collapsed ? (<svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.7836 0.000769106L11.7793 10.0051L1.775 20.0008L0.000763107 18.225L8.2293 10.0035L0.00783528 1.77501L1.7836 0.000769106Z" fill="#041B3C"/>
</svg>
) : (<div className="flex items-center gap-2">
    <svg width="12" height="20" viewBox="0 0 12 20" fill="currentColor">
      <path d="M10 20L0 10L10 0L11.775 1.775L3.55 10L11.775 18.225L10 20Z" />
    </svg>
    <span>Collapse</span>
  </div>)}
          </button>

          {/* Logout */}
          <button onClick={() => signOut()} className="mt-2 w-full text-red-500 text-left p-2">
            {!collapsed ?(<div className="flex items-center gap-2">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H9V2H2V16H9V18H2ZM13 14L11.625 12.55L14.175 10H6V8H14.175L11.625 5.45L13 4L18 9L13 14Z" fill="#BA1A1A"/>
</svg>

    <span>Logout</span>
  </div>): (<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H9V2H2V16H9V18H2ZM13 14L11.625 12.55L14.175 10H6V8H14.175L11.625 5.45L13 4L18 9L13 14Z" fill="#BA1A1A"/>
</svg>
)  }
          </button>
        </div>
      </aside>
    </>
  );
}




// "use client";

// import { logout } from "@/lib/auth";
// import { clearUser } from "@/redux/features/user/userSlice";
// import { useAppDispatch } from "@/redux/hooks";
// import Link from "next/link";
// import { usePathname, useRouter, useParams } from "next/navigation";

// const menuItems = (projectId?: string) => [
//   {
//     title: "Projects",
//     href: "/projects",
//     icon: (
//       <svg width="18" height="18" viewBox="0 0 18 18">
//         <path d="M0 8V0H8V8H0ZM0 18V10H8V18H0ZM10 8V0H18V8H10ZM10 18V10H18V18H10Z" />
//       </svg>
//     ),
//     requireProject: false,
//   },
//   {
//     title: "Project Epics",
//     href: projectId ? `/projects/${projectId}/epics` : "#",
//     icon: (
//       <svg width="20" height="18" viewBox="0 0 20 18">
//         <path d="M13 18V15H9V5H7V8H0V0H7V3H13V0H20V8H13V5H11V13H13V10H20V18H13Z" />
//       </svg>
//     ),
//     requireProject: true,
//   },
//   {
//     title: "Project Tasks",
//     href: projectId ? `/projects/${projectId}/tasks` : "#",
//     icon: (
//       <svg width="20" height="16" viewBox="0 0 20 16">
//         <path d="M14.375 15.075L10.825 11.525L12.225 10.125L14.35 12.25L18.6 8L20 9.425L14.375 15.075Z" />
//       </svg>
//     ),
//     requireProject: true,
//   },
//   {
//     title: "Project Members",
//     href: projectId ? `/projects/${projectId}/members` : "#",
//     icon: (
//       <svg width="22" height="16" viewBox="0 0 22 16">
//         <path d="M0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55Z" />
//       </svg>
//     ),
//     requireProject: true,
//   },
//   {
//     title: "Project details",
//     href: projectId ? `/projects/${projectId}/edit` : "#",
//     icon: (
//       <svg width="20" height="20" viewBox="0 0 20 20">
//         <path d="M9 15H11V9H9V15Z" />
//       </svg>
//     ),
//     requireProject: true,
//   },
// ];

// export default function Sidebar({
//   collapsed,
//   setCollapsed,
//   mobileOpen,
//   setMobileOpen,
// }: any) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   const params = useParams();
//   const projectId = params?.projectId as string | undefined;

//   const items = menuItems(projectId);

//   async function signOut() {
//     await logout();
//     dispatch(clearUser());
//     router.push("/login");
//   }

//   return (
//     <>
//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 z-40 md:hidden"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       <aside
//         className={`
//           bg-surface-low h-full z-50 transition-all duration-300
//           fixed md:static
//           ${collapsed ? "w-20" : "w-64"}
//           ${mobileOpen ? "left-0" : "-left-full md:left-0"}
//         `}
//       >
//         <nav className="px-2 space-y-2">
//           {items.map((item, index) => {
//             const isProjectRoute = item.requireProject;

//             // ⛔ لو محتاج projectId ومفيش id => نخفيه
//             if (isProjectRoute && !projectId) return null;

//             const isActive = pathname.startsWith(item.href);

//             return (
//               <Link
//                 key={index}
//                 href={item.href}
//                 className={`flex items-center gap-3 p-3 rounded transition
//                   ${
//                     isActive
//                       ? "bg-white text-primary"
//                       : "text-neutral-dark hover:bg-gray-100 hover:text-primary"
//                   }`}
//               >
//                 <span>{item.icon}</span>

//                 {!collapsed && (
//                   <span className="text-sm font-medium">{item.title}</span>
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Logout */}
//         <div className="absolute bottom-4 w-full px-2">
//           <button
//             onClick={signOut}
//             className="w-full text-red-500 p-2 text-left"
//           >
//             Logout
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }