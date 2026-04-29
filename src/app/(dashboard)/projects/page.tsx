
"use client";

import Pagination from "@/components/Pagination";
import ProjectCard from "@/components/ProjectCard";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
import { fetchProjects } from "@/redux/features/project/project";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
// import ProjectCard from "../../components/ProjectCard";
// import Pagination from "../../components/Pagination";
// import ProjectCardSkeleton from "../../components/ProjectCardSkeleton";

type Project = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  created_by: string;
};


export default function page() {


const { projects, loadingProjects, error, totalCount } = useAppSelector(
  (state) => state.projects
);
const router = useRouter();
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = React.useState(1);
const limit = 6;
const totalPages = Math.ceil(totalCount / limit);
  useEffect(() => {
    dispatch(fetchProjects( { page: currentPage, limit }));
  // const timer = setTimeout(() => {
  //   dispatch(fetchProjects({ page: currentPage, limit }));
  // }, 2000); // 2 seconds loading test

  // return () => clearTimeout(timer);
  }, [dispatch, currentPage]);
// console.log(projects)

   
//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
//           <p className="text-sm text-gray-500">
//             Manage and curate your projects
//           </p>
//         </div>

//         <button onClick={() =>{ console.log("click"); router.push("/addProject")}}   className=" hidden md:block  bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] shadow-[0px_1px_2px_0px_#0000000D]  text-white py-2 px-6 rounded-md "
// >
//           + Create New Project
//         </button>
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {projects.length === 0 && !loading && (
//           <div className="flex justify-center items-center">
//           <div >
//           <Image src="/images/noprojects.png" alt="No projects" width={200} height={200}></Image>
//   <h3 className="text-lg font-semibold text-gray-900">No projects found</h3>
//   <p className="text-gray-500">You don’t have any projects yet. Start by defining
// your first architectural workspace to begin tracking
// tasks and epics.</p>
//   <button  onClick={() =>{  router.push("/addProject")}}    className=" hidden md:block relative z-50  bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] shadow-[0px_1px_2px_0px_#0000000D]  text-white py-2 px-6 rounded-md "
// >

//           + Create New Project
        
//         </button>

//   </div>
//           </div>
// )}
//         {projects.map((project) => (
//           <ProjectCard key={project.id}  project={project} />
//         ))}

//         {/* Add Project Card */}
//         <div className="hidden md:flex items-center justify-center rounded-lg shadow-sm border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer transition">
//           <div className="text-center">
//             <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center bg-surface-low rounded-2xl p-3">
//             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M9 15H11V11H15V9H11V5H9V9H5V11H9V15ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="#041B3C"/>
// </svg>

//             </div>
//             <p className="text-sm font-medium text-gray-600">ADD PROJECT</p>
//           </div>
//         </div>
//       </div>

// <span className="flex md:hidden justify-center ms-auto mt-5 items-center px-6 py-3 text-white bg-primary w-fit rounded-2xl text-3xl ">
// <button onClick={() =>{  router.push("/addProject")}}>+</button>
// </span>

//       {/* Footer / Pagination */}
      


//       <Pagination
//         currentPage={currentPage}
//         totalCount={totalCount}
//         limit={limit}

//         onPageChange={(page) => setCurrentPage(page)}
//       />
//     </div>
//   );

return (
  <div className="min-h-screen bg-gray-50 p-8">

    {/* HEADER */}
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
        <p className="text-sm text-gray-500">
          Manage and curate your projects
        </p>
      </div>

      <button
        onClick={() => router.push("/addProject")}
        className="hidden md:block bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] text-white py-2 px-6 rounded-md"
      >
        + Create New Project
      </button>
    </div>
{error && (
<div className="flex justify-center items-center mt-20">
        <div className="flex flex-col justify-center items-center mt-20">
          <div className="p-4 bg-[#FFDAD6] rounded-lg">
        <svg width="28" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.5 24.75L20.1875 21.5H6.875C4.95833 21.5 3.33333 20.8333 2 19.5C0.666667 18.1667 0 16.5417 0 14.625C0 13.0208 0.494792 11.5938 1.48438 10.3438C2.47396 9.09375 3.75 8.29167 5.3125 7.9375C5.375 7.77083 5.4375 7.60938 5.5 7.45312C5.5625 7.29688 5.625 7.125 5.6875 6.9375L0.5 1.75L2.25 0L25.25 23L23.5 24.75ZM6.875 19H17.6875L7.625 8.9375C7.58333 9.16667 7.55208 9.38542 7.53125 9.59375C7.51042 9.80208 7.5 10.0208 7.5 10.25H6.875C5.66667 10.25 4.63542 10.6771 3.78125 11.5312C2.92708 12.3854 2.5 13.4167 2.5 14.625C2.5 15.8333 2.92708 16.8646 3.78125 17.7188C4.63542 18.5729 5.66667 19 6.875 19ZM25.75 19.9375L23.9375 18.1875C24.2917 17.8958 24.5573 17.5573 24.7344 17.1719C24.9115 16.7865 25 16.3542 25 15.875C25 15 24.6979 14.2604 24.0938 13.6562C23.4896 13.0521 22.75 12.75 21.875 12.75H20V10.25C20 8.52083 19.3906 7.04688 18.1719 5.82812C16.9531 4.60938 15.4792 4 13.75 4C13.1875 4 12.6458 4.06771 12.125 4.20312C11.6042 4.33854 11.1042 4.55208 10.625 4.84375L8.8125 3.03125C9.54167 2.53125 10.3177 2.15104 11.1406 1.89062C11.9635 1.63021 12.8333 1.5 13.75 1.5C16.1875 1.5 18.2552 2.34896 19.9531 4.04688C21.651 5.74479 22.5 7.8125 22.5 10.25C23.9375 10.4167 25.1302 11.0365 26.0781 12.1094C27.026 13.1823 27.5 14.4375 27.5 15.875C27.5 16.6875 27.3438 17.4427 27.0312 18.1406C26.7188 18.8385 26.2917 19.4375 25.75 19.9375Z" fill="#BA1A1A"/>
</svg>
</div>


          <h3 className="text-lg font-semibold text-gray-900 mt-4">
          Something went wrong
          </h3>

          <p className="text-gray-500 max-w-md mx-auto mt-2">
          We're having trouble retrieving your
 projects right now. Please try
again in a moment.
          </p>

          <button
          
            className="mt-4  bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] text-white py-2 px-6 rounded-md"
          >
          Retry Connection
          </button>
        </div>
      </div>
)}
    {/* LOADING STATE */}
    { loadingProjects && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    )}

    {/* EMPTY STATE */}
    {! loadingProjects  && !error&& projects.length === 0 && (
      <div className="flex justify-center items-center mt-20">
        <div className="text-center">
          <Image
            src="/images/noprojects.png"
            alt="No projects"
            width={200}
            height={200}
          />

          <h3 className="text-lg font-semibold text-gray-900 mt-4">
            No projects found
          </h3>

          <p className="text-gray-500 max-w-md mx-auto mt-2">
            You don’t have any projects yet...
          </p>

          <button
            onClick={() => router.push("/addProject")}
            className="mt-4 hidden md:block bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] text-white py-2 px-6 rounded-md"
          >
            + Create New Project
          </button>
        </div>
      </div>
    )}

    {/* DATA */}
    {! loadingProjects && !error && projects.length > 0 && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    )}

    {/* MOBILE BUTTON */}
    <span className="flex md:hidden justify-center mt-5">
      <button
        onClick={() => router.push("/addProject")}
        className="px-6 py-3 text-white bg-primary rounded-2xl text-3xl"
      >
        +
      </button>
    </span>

    {/* PAGINATION */}
    <Pagination
      currentPage={currentPage}
      totalCount={totalCount}
      limit={limit}
      onPageChange={(page) => setCurrentPage(page)}
    />
  </div>
);

}
