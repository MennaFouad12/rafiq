
// "use client";

// import Pagination from "@/components/Pagination";
// import ProjectCard from "@/components/ProjectCard";
// import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
// import { fetchProjects } from "@/redux/features/project/project";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useEffect } from "react";
// // import ProjectCard from "../../components/ProjectCard";
// // import Pagination from "../../components/Pagination";
// // import ProjectCardSkeleton from "../../components/ProjectCardSkeleton";

// type Project = {
//   id: number;
//   name: string;
//   description: string;
//   created_at: string;
//   created_by: string;
// };


// export default function page() {


//   const { projects, loadingProjects, error, totalCount } = useAppSelector(
//     (state) => state.projects
//   );
//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   const [currentPage, setCurrentPage] = React.useState(1);
// const [limit, setLimit] = React.useState(6);

// useEffect(() => {
//   const handleResize = () => {
//     if (window.innerWidth < 768) {
//       setLimit(1000); // أو totalCount لو متاح
//     } else {
//       setLimit(6);
//     }
//   };

//   handleResize();

//   window.addEventListener("resize", handleResize);

//   return () => window.removeEventListener("resize", handleResize);
// }, []);
//   const totalPages = Math.ceil(totalCount / limit);
//   useEffect(() => {
//     dispatch(fetchProjects({ page: currentPage, limit }));

//   }, [dispatch, currentPage, limit  ]);


//   return (
//     <div className="min-h-screen bg-gray-50 p-8">

//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
//           <p className="text-sm text-gray-500">
//             Manage and curate your projects
//           </p>
//         </div>

//         <button
//           onClick={() => router.push("/addProject")}
//           className="hidden md:block bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] text-white py-2 px-6 rounded-md"
//         >
//           + Create New Project
//         </button>
//       </div>
//       {error && (
//         <div className="flex justify-center items-center mt-20">
//           <div className="flex flex-col justify-center items-center mt-20">
//             <div className="p-4 bg-[#FFDAD6] rounded-lg">
//               <svg width="28" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M23.5 24.75L20.1875 21.5H6.875C4.95833 21.5 3.33333 20.8333 2 19.5C0.666667 18.1667 0 16.5417 0 14.625C0 13.0208 0.494792 11.5938 1.48438 10.3438C2.47396 9.09375 3.75 8.29167 5.3125 7.9375C5.375 7.77083 5.4375 7.60938 5.5 7.45312C5.5625 7.29688 5.625 7.125 5.6875 6.9375L0.5 1.75L2.25 0L25.25 23L23.5 24.75ZM6.875 19H17.6875L7.625 8.9375C7.58333 9.16667 7.55208 9.38542 7.53125 9.59375C7.51042 9.80208 7.5 10.0208 7.5 10.25H6.875C5.66667 10.25 4.63542 10.6771 3.78125 11.5312C2.92708 12.3854 2.5 13.4167 2.5 14.625C2.5 15.8333 2.92708 16.8646 3.78125 17.7188C4.63542 18.5729 5.66667 19 6.875 19ZM25.75 19.9375L23.9375 18.1875C24.2917 17.8958 24.5573 17.5573 24.7344 17.1719C24.9115 16.7865 25 16.3542 25 15.875C25 15 24.6979 14.2604 24.0938 13.6562C23.4896 13.0521 22.75 12.75 21.875 12.75H20V10.25C20 8.52083 19.3906 7.04688 18.1719 5.82812C16.9531 4.60938 15.4792 4 13.75 4C13.1875 4 12.6458 4.06771 12.125 4.20312C11.6042 4.33854 11.1042 4.55208 10.625 4.84375L8.8125 3.03125C9.54167 2.53125 10.3177 2.15104 11.1406 1.89062C11.9635 1.63021 12.8333 1.5 13.75 1.5C16.1875 1.5 18.2552 2.34896 19.9531 4.04688C21.651 5.74479 22.5 7.8125 22.5 10.25C23.9375 10.4167 25.1302 11.0365 26.0781 12.1094C27.026 13.1823 27.5 14.4375 27.5 15.875C27.5 16.6875 27.3438 17.4427 27.0312 18.1406C26.7188 18.8385 26.2917 19.4375 25.75 19.9375Z" fill="#BA1A1A" />
//               </svg>
//             </div>


//             <h3 className="text-lg font-semibold text-gray-900 mt-4">
//               Something went wrong
//             </h3>

//             <p className="text-gray-500 max-w-md mx-auto mt-2">
//               We're having trouble retrieving your
//               projects right now. Please try
//               again in a moment.
//             </p>

//             <button

//               className="mt-4  bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] text-white py-2 px-6 rounded-md"
//             >
//               Retry Connection
//             </button>
//           </div>
//         </div>
//       )}
//       {/* LOADING STATE */}
//       {loadingProjects && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {Array.from({ length: 6 }).map((_, i) => (
//             <ProjectCardSkeleton key={i} />
//           ))}
//         </div>
//       )}

//       {/* EMPTY STATE */}
//       {!loadingProjects && !error && projects.length === 0 && (
//         <div className="flex justify-center items-center mt-20">
//           <div className="text-center">
//             <Image
//               src="/images/noprojects.png"
//               alt="No projects"
//               width={200}
//               height={200}
//             />

//             <h3 className="text-lg font-semibold text-gray-900 mt-4">
//               No projects found
//             </h3>

//             <p className="text-gray-500 max-w-md mx-auto mt-2">
//               You don’t have any projects yet...
//             </p>

//             <button
//               onClick={() => router.push("/addProject")}
//               className="mt-4 hidden md:block bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] text-white py-2 px-6 rounded-md"
//             >
//               + Create New Project
//             </button>
//           </div>
//         </div>
//       )}

//       {/* DATA */}
//       {!loadingProjects && !error && projects.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {projects.map((project) => (
//             <ProjectCard key={project.id} project={project} />
//           ))}
//         </div>
//       )}

//       {/* MOBILE BUTTON */}
//       <span className="flex md:hidden justify-center mt-5">
//         <button
//           onClick={() => router.push("/addProject")}
//           className="px-6 py-3 text-white bg-primary rounded-2xl text-3xl"
//         >
//           +
//         </button>
//       </span>

    
//     <div className="hidden md:flex justify-end mt-6">
//   <Pagination
//     currentPage={currentPage}
//     totalCount={totalCount}
//     limit={limit}
//     onPageChange={(page) => setCurrentPage(page)}
//   />
// </div>
//     </div>
//   );

// }


import { Suspense } from "react";
import ProjectsList from "./components/project-list";
import ProjectsListSkeleton from "@/components/skeletons/project-card-skeleton";
// import ProjectsList from "./_components/projects-list";
// import ProjectsListSkeleton from "@/components/skeletons/project-card.skeleton";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = resolvedParams?.page ?? "1";

  return (
    <Suspense key={page} fallback={<ProjectsListSkeleton />}>
      <ProjectsList searchParams={resolvedParams} />
    </Suspense>
  );
}
