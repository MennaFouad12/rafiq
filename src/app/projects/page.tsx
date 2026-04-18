
"use client";

import { fetchProjects } from "@/redux/features/project/project";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Project = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  created_by: string;
};


export default function page() {


const { projects, loading, error } = useAppSelector(
  (state) => state.projects
) as {
  projects: Project[];
  loading: boolean;
  error: string | null;
};
const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
// console.log(projects)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-500">
            Manage and curate your projects
          </p>
        </div>

        <button onClick={() =>{ console.log("click"); router.push("/addProject")}}   className=" hidden md:block  bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] shadow-[0px_1px_2px_0px_#0000000D]  text-white py-2 px-6 rounded-md "
>
          + Create New Project
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 && !loading && (
          <div className="flex justify-center items-center">
          <div >
          <Image src="/images/noprojects.png" alt="No projects" width={200} height={200}></Image>
  <h3 className="text-lg font-semibold text-gray-900">No projects found</h3>
  <p className="text-gray-500">You don’t have any projects yet. Start by defining
your first architectural workspace to begin tracking
tasks and epics.</p>
  <button  onClick={() =>{  router.push("/addProject")}}    className=" hidden md:block relative z-50  bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] shadow-[0px_1px_2px_0px_#0000000D]  text-white py-2 px-6 rounded-md "
>

          + Create New Project
        
        </button>

  </div>
          </div>
)}
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg p-5  shadow-sm transition"
          >
            <h2 className="font-semibold text-gray-900 mb-2">
              {project.name}
            </h2>

            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              {project.description}
            </p>
<hr className="my-4 text-gray-200" />
            <div className="text-xs flex justify-between text-gray-400">
              <span className="uppercase font-bold tracking-wide text-[#737685]">Created at</span>
              <div className="text-gray-600 mt-1 font-semibold">{new Date(project.created_at).toLocaleDateString("en-GB")}</div>
            </div>
          </div>
        ))}

        {/* Add Project Card */}
        <div className="hidden md:flex items-center justify-center rounded-lg shadow-sm border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer transition">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center bg-surface-low rounded-2xl p-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 15H11V11H15V9H11V5H9V9H5V11H9V15ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="#041B3C"/>
</svg>

            </div>
            <p className="text-sm font-medium text-gray-600">ADD PROJECT</p>
          </div>
        </div>
      </div>

<span className="flex md:hidden justify-center ms-auto mt-5 items-center px-6 py-3 text-white bg-primary w-fit rounded-2xl text-3xl ">
<button onClick={() =>{  router.push("/addProject")}}>+</button>
</span>

      {/* Footer / Pagination */}
      <div className=" hidden  md:flex items-center justify-between mt-10 text-sm text-gray-500">
        <p>Showing 5 of 24 active projects</p>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
            {"<"}
          </button>

          <button className="px-3 py-1 bg-primary text-white rounded-md">
            1
          </button>

          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
            2
          </button>

          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
