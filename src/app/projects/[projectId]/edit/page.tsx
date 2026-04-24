// "use client";

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { addProject } from "@/redux/features/project/project";
// import { useAppDispatch } from "@/redux/hooks";
// import { useRouter } from "next/navigation";

// // Zod Schema
// const projectSchema = z.object({
//   title: z
//     .string()
//     .min(3, "Project name must be at least 3 characters."),
//   description: z.string().max(500).optional(),
// });

// type ProjectFormData = z.infer<typeof projectSchema>;

// export default function EditProjectPage() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm<ProjectFormData>({
//     resolver: zodResolver(projectSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//     },
//   });

//   const descriptionLength = watch("description")?.length || 0;
// const dispatch = useAppDispatch();
// const router = useRouter();
// const onSubmit = async (data: ProjectFormData) => {

// };
//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-3xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <p className="text-sm mb-5 font-medium text-gray-500">PROJECTS &gt;<span className="text-primary"> EDIT  PROJECT</span> </p>
//             <h1 className="text-2xl font-semibold text-gray-900">Edit New Project</h1>
//           </div>

//           <button className=" hidden md:flex items-center  bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] shadow-[0px_1px_2px_0px_#0000000D]  text-white py-2 px-6 rounded-md ">
//             <svg className="me-2" width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M14.1667 8.33333V5.83333H11.6667V4.16667H14.1667V1.66667H15.8333V4.16667H18.3333V5.83333H15.8333V8.33333H14.1667ZM6.66667 6.66667C5.75 6.66667 4.96528 6.34028 4.3125 5.6875C3.65972 5.03472 3.33333 4.25 3.33333 3.33333C3.33333 2.41667 3.65972 1.63194 4.3125 0.979167C4.96528 0.326389 5.75 0 6.66667 0C7.58333 0 8.36806 0.326389 9.02083 0.979167C9.67361 1.63194 10 2.41667 10 3.33333C10 4.25 9.67361 5.03472 9.02083 5.6875C8.36806 6.34028 7.58333 6.66667 6.66667 6.66667ZM0 13.3333V11C0 10.5278 0.121528 10.0938 0.364583 9.69792C0.607639 9.30208 0.930556 9 1.33333 8.79167C2.19444 8.36111 3.06944 8.03819 3.95833 7.82292C4.84722 7.60764 5.75 7.5 6.66667 7.5C7.58333 7.5 8.48611 7.60764 9.375 7.82292C10.2639 8.03819 11.1389 8.36111 12 8.79167C12.4028 9 12.7257 9.30208 12.9688 9.69792C13.2118 10.0938 13.3333 10.5278 13.3333 11V13.3333H0ZM1.66667 11.6667H11.6667V11C11.6667 10.8472 11.6285 10.7083 11.5521 10.5833C11.4757 10.4583 11.375 10.3611 11.25 10.2917C10.5 9.91667 9.74306 9.63542 8.97917 9.44792C8.21528 9.26042 7.44444 9.16667 6.66667 9.16667C5.88889 9.16667 5.11806 9.26042 4.35417 9.44792C3.59028 9.63542 2.83333 9.91667 2.08333 10.2917C1.95833 10.3611 1.85764 10.4583 1.78125 10.5833C1.70486 10.7083 1.66667 10.8472 1.66667 11V11.6667ZM6.66667 5C7.125 5 7.51736 4.83681 7.84375 4.51042C8.17014 4.18403 8.33333 3.79167 8.33333 3.33333C8.33333 2.875 8.17014 2.48264 7.84375 2.15625C7.51736 1.82986 7.125 1.66667 6.66667 1.66667C6.20833 1.66667 5.81597 1.82986 5.48958 2.15625C5.16319 2.48264 5 2.875 5 3.33333C5 3.79167 5.16319 4.18403 5.48958 4.51042C5.81597 4.83681 6.20833 5 6.66667 5Z" fill="white"/>
// </svg>

//             Invite Member
//           </button>
//         </div>

//         {/* Card */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-800">
//             Edit Project
//             </h2>
//             <p className="text-sm text-gray-500">
//               Define the scope and foundational details of your project.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Project Title */}
//             <div>
//               <label className= " text-neutral text-sm font-bold ">
//                 Project Title *
//               </label>
//               <input
//                 {...register("title")}
//                 className="w-full mt-1 p-2 rounded-sm focus:outline-none bg-surface-highest"

//                 placeholder="Enter project name"
//               />
//               {errors.title && (
//                 <p className="text-sm text-red-500 mt-1">
//                   {errors.title.message}
//                 </p>
//               )}
//             </div>

//             {/* Description */}
//             <div>
//               <div className="flex justify-between items-center">
//                 <label className= " text-neutral text-sm font-bold ">
//                   Description
//                 </label>
//                 <span className="text-xs text-gray-400">Optional</span>
//               </div>

//               <textarea
//                 {...register("description")}
//                 rows={4}
//               className="w-full mt-1 p-2 rounded-sm focus:outline-none bg-surface-highest"

//                 placeholder="Provide a high-level overview of the project's architectural objectives and key milestones..."
//               />

//               <div className="flex justify-between items-center mt-1">
//                 <div>
//                   {errors.description && (
//                     <p className="text-sm text-red-500">
//                       {errors.description.message}
//                     </p>
//                   )}
//                 </div>
//                 <span className="text-xs text-gray-400">
//                   {descriptionLength} / 500 characters
//                 </span>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex justify-between items-center pt-4">
//               <button
//                 type="button"
//                 className="text-gray-600 hover:underline"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 className=" block  bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] shadow-[0px_1px_2px_0px_#0000000D]  text-white py-2 px-6 rounded-md "
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Footer Tip */}
//         <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
//            Pro Tip: You can invite project members and assign epics immediately after the initial creation process.
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams, useRouter } from "next/navigation";
import { clearSingleProject, editProject, fetchSingleProject } from "@/redux/features/project/project";
// import { clearSingleProject } from "@/redux/features/project/projectSlice";
// import { updateProject } from "@/redux/features/project/project"; // لو عندك update

// ================= ZOD =================
const projectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters."),
  description: z.string().max(500).optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function EditProjectPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { projectId } = useParams();

  const { singleProject, loadingSingleProject } = useAppSelector(
    (state) => state.projects
  );

  // ================= FORM =================
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const descriptionLength = watch("description")?.length || 0;

  // ================= FETCH SINGLE =================
  useEffect(() => {
    if (!projectId) return;

    dispatch(fetchSingleProject(projectId as string));

    return () => {
      dispatch(clearSingleProject());
    };
  }, [projectId, dispatch]);

  // ================= FILL FORM =================
  useEffect(() => {
    if (singleProject) {
      reset({
        name: singleProject.name || "",
        description: singleProject.description || "",
      });
    }
  }, [singleProject, reset]);

  // ================= SUBMIT =================
  const onSubmit = async (data: ProjectFormData) => {
  try {
    await dispatch(
      editProject({
        projectId: projectId as string,
        name: data.name,
        description: data.description || "",
      })
    );

    router.push("/projects");
  } catch (err) {
    console.log(err);
  }
  };

  // ================= LOADING =================
  if (loadingSingleProject) {
    return <p className="p-6">Loading project...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <p className="text-sm mb-5 font-medium text-gray-500">
            PROJECTS &gt;
            <span className="text-primary"> EDIT PROJECT</span>
          </p>
          <h1 className="text-2xl font-semibold text-gray-900">
            Edit Project
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Title */}
            <div>
              <label className="text-sm font-bold text-neutral">
                Project Title *
              </label>

              <input
                {...register("name")}
                className="w-full mt-1 p-2 rounded-sm bg-surface-highest focus:outline-none"
                placeholder="Enter project name"
              />

              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <div className="flex justify-between">
                <label className="text-sm font-bold text-neutral">
                  Description
                </label>
                <span className="text-xs text-gray-400">Optional</span>
              </div>

              <textarea
                {...register("description")}
                rows={4}
                className="w-full mt-1 p-2 rounded-sm bg-surface-highest focus:outline-none"
                placeholder="Project description..."
              />

              <div className="flex justify-between mt-1">
                {errors.description ? (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                ) : (
                  <span></span>
                )}

                <span className="text-xs text-gray-400">
                  {descriptionLength} / 500
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-gradient-to-r from-primary to-primary-container text-white py-2 px-6 rounded-md"
              >
                Save Changes
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
