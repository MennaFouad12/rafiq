


// "use client";

// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { fetchProjectMembers } from "@/redux/features/project/project";
// import { useParams, useRouter } from "next/navigation";
// import AddMemberModel from "@/components/AddMemberModel";

// const roleStyles: Record<string, string> = {
//   owner: "bg-blue-100 text-blue-800",
//   admin: "bg-indigo-100 text-indigo-800",
//   member: "bg-gray-100 text-gray-600",
//   viewer: "bg-blue-50 text-blue-700",
// };

// const getInitials = (name: string) => {
//   return name
//     ?.split(" ")
//     ?.map((n: string) => n[0])
//     ?.join("")
//     ?.toUpperCase();
// };

// // Skeleton للشاشات الكبيرة (table row)
// const SkeletonRow = () => (
//   <div className="hidden lg:grid grid-cols-4 items-center px-6 py-4 border-b animate-pulse">
//     <div className="flex items-center gap-3">
//       <div className="w-10 h-10 rounded-xl bg-gray-200" />
//       <div className="space-y-2">
//         <div className="w-32 h-3 bg-gray-200 rounded" />
//         <div className="w-40 h-3 bg-gray-200 rounded" />
//       </div>
//     </div>
//     <div><div className="w-20 h-6 bg-gray-200 rounded-full" /></div>
//     <div><div className="w-24 h-3 bg-gray-200 rounded" /></div>
//     <div className="flex justify-end"><div className="w-6 h-6 bg-gray-200 rounded" /></div>
//   </div>
// );

// // Skeleton للشاشات الصغيرة (card)
// const SkeletonCard = () => (
//   <div className="lg:hidden flex items-center justify-between px-4 py-4 border-b animate-pulse">
//     <div className="flex items-center gap-3">
//       <div className="w-11 h-11 rounded-2xl bg-gray-200" />
//       <div className="space-y-2">
//         <div className="flex items-center gap-2">
//           <div className="w-28 h-3 bg-gray-200 rounded" />
//           <div className="w-16 h-5 bg-gray-200 rounded-full" />
//         </div>
//         <div className="w-36 h-3 bg-gray-200 rounded" />
//       </div>
//     </div>
//     <div className="w-6 h-6 bg-gray-200 rounded" />
//   </div>
// );

// export default function MembersPage() {
//   const dispatch = useAppDispatch();
//   const params = useParams();
//   const router = useRouter();

//   const projectId = Array.isArray(params.projectId)
//     ? params.projectId[0]
//     : params.projectId;

//   const { projectMembers, loadingMembers } = useAppSelector(
//     (state) => state.projects
//   );
// const [open, setOpen] = useState(false);
//   useEffect(() => {
//     if (projectId) {
//       dispatch(fetchProjectMembers(projectId));
//     }
//   }, [projectId, dispatch]);

//   return (
//     <div className="p-4 lg:p-6 bg-gray-50 min-h-screen">
//       {/* Page Title - visible on mobile */}

//         <div className="mb-6">
//           <p  className=" hidden lg:block text-sm mb-5 font-medium text-gray-500">
//             PROJECTS &gt;


//             <span className="text-primary"> Project Members</span>
//           </p>
//           <div className="flex items-center justify-between mb-8">
//                 <div>
//                   <h1 className="text-2xl font-semibold text-gray-900">Project Members</h1>
                
//                 </div>
//                 <div className="flex items-center">
        
                  
//                   <button
//                    onClick={() => setOpen(true)}
//                     className="hidden md:block ms-3  bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] text-white py-2 px-6 rounded-md"
//                   >
//                     Add New Member
//                   </button>
//                 </div>
//               </div>
//         </div>

//       {/* <h1 className="lg:hidden text-2xl font-bold text-gray-900 mb-4 text-center">
//         Project Members
//       </h1> */}

//       <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
//         {/* Header - شاشات كبيرة بس */}
//         <div className="hidden lg:grid grid-cols-4 px-6 py-4 text-sm font-semibold text-gray-500 border-b">
//           <span>Member</span>
//           <span>Role</span>
//           <span>Joined At</span>
//           <span className="text-right">Actions</span>
//         </div>

//         {/* Content */}
//         {loadingMembers ? (
//           <>
//             {Array.from({ length: 4 }).map((_, i) => (
//               <React.Fragment key={i}>
//                 <SkeletonRow />
//                 <SkeletonCard />
//               </React.Fragment>
//             ))}
//           </>
//         ) : projectMembers.length === 0 ? (
//           <p className="p-6 text-gray-500">No members found</p>
//         ) : (
//           projectMembers.map((member: any) => (
//             <React.Fragment key={member.member_id}>
//               {/* ── Desktop Row (lg+) ── */}
//               <div className="hidden lg:grid grid-cols-4 items-center px-6 py-4 border-b last:border-none hover:bg-gray-50">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-highest text-primary-container font-bold text-sm">
//                     {getInitials(member.metadata.name || member.metadata.email)}
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-800">
//                       {member.metadata.name || "No Name"}
//                     </p>
//                     <p className="text-sm text-gray-500">{member.metadata.email}</p>
//                   </div>
//                 </div>
//                 <div>
//                   <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
//                     roleStyles[member.role?.toLowerCase()] || "bg-gray-100 text-gray-600"
//                   }`}>
//                     {member.role?.toUpperCase() || "MEMBER"}
//                   </span>
//                 </div>
//                 <div className="text-gray-600 text-sm">Oct 12, 2023</div>
//                 <div className="flex justify-end">
//                   <button className="p-2 rounded-lg hover:bg-gray-100">⋮</button>
//                 </div>
//               </div>

//               {/* ── Mobile Card (أقل من lg) ── */}
//               <div className="lg:hidden flex items-center justify-between px-4 py-4 border-b last:border-none hover:bg-gray-50">
//                 <div className="flex items-center gap-3">
//                   <div className="w-11 h-11 flex items-center justify-center rounded-2xl bg-surface-highest text-primary-container font-bold text-sm flex-shrink-0">
//                     {getInitials(member.metadata.name || member.metadata.email)}
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2 flex-wrap">
//                       <p className="font-semibold text-gray-900 text-sm">
//                         {member.metadata.name || "No Name"}
//                       </p>
//                       <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-full ${
//                         roleStyles[member.role?.toLowerCase()] || "bg-gray-100 text-gray-600"
//                       }`}>
//                         {member.role?.toUpperCase() || "MEMBER"}
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-0.5">
//                       {member.metadata.email}
//                     </p>
//                   </div>
//                 </div>
//                 <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 flex-shrink-0">
//                   ⋮
//                 </button>
//               </div>
//             </React.Fragment>
//           ))
//         )}
//       </div>

    
//       <button   onClick={() => setOpen(true)} className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-2xl shadow-lg flex items-center justify-center text-2xl hover:bg-blue-700 active:scale-95 transition-all">
//         +
//       </button>


//       {open && (
//   <AddMemberModel
//     onClose={() => setOpen(false)}
//   />
// )}
//     </div>
//   );
// }

import { Suspense } from "react";
import MemberCard from "./_components/member-card";
import MembersTableSkeleton from "@/components/skeletons/members-table-skeleton";

export default async function page({ params }: { params: { id: string } }) {
  const param = await params;
  const id = param.id;
  return (
    <Suspense fallback={<MembersTableSkeleton />}>
      <MemberCard id={id} />
    </Suspense>
  );
}
