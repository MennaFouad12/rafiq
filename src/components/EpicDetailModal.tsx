




// "use client";

// import React, { useEffect } from "react";
// import Avatar from "./Avatar";
// import MetaField from "./MetaField";
// import { updateProjectEpic } from "@/lib/epics";
// import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { fetchEpicTasks } from "@/redux/features/tasks/task";
// import { useForm } from "react-hook-form";
// import { fetchProjectMembers } from "@/redux/features/project/project";
// import TrueIcon from "./icons/true-icon";
// import { fetchepics, fetchSingleEpic, updateEpicThunk } from "@/redux/features/epics/epic";

// /* ───── Helpers ───── */
// const formatDate = (date?: string | null) => {
//   if (!date) return "";
//   return new Date(date).toISOString().split("T")[0];
// };

// type Props = {
//   isOpen: boolean;
//   onClose: () => void;
//   epicId: string | null;
//   projectId: string | undefined;
// };

// export default function EpicDetailsModal({
//   isOpen,
//   onClose,
//   epicId,
//   projectId,
// }: Props) {
//   const router = useRouter();
//   const dispatch = useAppDispatch();


//   const { singleEpic, loadingSingleEpic } = useAppSelector(
//     (state) => state.epics
//   );

//   const { epicTasks } = useAppSelector((state) => state.tasks);
//   const { projectMembers } = useAppSelector((state) => state.projects);

//   /* ───── Form ───── */
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { isSubmitting },
//   } = useForm({
//     defaultValues: {
//       title: "",
//       description: "",
//       assignee_id: "",
//       deadline: "",
//     },
//   });

//   /* ───── Fetch Epic from Redux ───── */
//   useEffect(() => {
//     if (!isOpen || !projectId || !epicId) return;

//     dispatch(fetchSingleEpic({ projectId, id: epicId }));
//     console.log("singleEpic", singleEpic);
//     dispatch(fetchEpicTasks({ epicId }));
//   }, [projectId, epicId, isOpen, dispatch]);

//   /* ───── Reset form from Redux ───── */
//   useEffect(() => {
//     if (singleEpic) {
//       reset({
//         title: singleEpic.title || "",
//         description: singleEpic.description || "",
//         assignee_id: singleEpic.assignee_id || "",
//         deadline: formatDate(singleEpic.deadline),
//       });
//     }
//   }, [singleEpic, reset]);

//   /* ───── Members ───── */
//   useEffect(() => {
//     if (projectId) {
//       dispatch(fetchProjectMembers(projectId));
//     }
//   }, [projectId, dispatch]);

//   /* ───── Submit FIXED ───── */
//   const onSubmit = async (data: any) => {
//     if (!epicId || !projectId) return;

//     const payload = {
//       title: data.title,
//       description: data.description,
//       assignee_id: data.assignee_id || null,
//       deadline: data.deadline || null,
//     };

//     try {
//     await dispatch(updateEpicThunk({ epicId, data: payload }));


//       dispatch(fetchSingleEpic({ projectId, id: epicId }));
//       console.log("singleEpic", singleEpic);
//       dispatch(fetchepics({ projectId }));
//     } catch (err) {
//       console.log(err);
//       alert("Failed to update epic");
//     }
//   };
//   useEffect(() => {
//     console.log("singleEpic updated:", singleEpic);
//   }, [singleEpic]);
//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Overlay */}
//       <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />

//       {/* Modal */}
//       <div className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-lg">

//         {/* Header */}
//         <div className="flex justify-between mb-4">
//           <div>
//             <p className="text-xs text-primary mb-2">
//               {loadingSingleEpic ? "loading..." : singleEpic?.epic_id}
//             </p>

//             <input
//               {...register("title", { required: true })}
//               onBlur={handleSubmit(onSubmit)}
//               disabled={isSubmitting}
//               className="font-bold text-2xl rounded-sm focus:outline-none"
//             />
//           </div>

//           <button onClick={onClose}>✕</button>
//         </div>

//         {/* Description */}
//         <textarea
//           {...register("description")}
//           onBlur={handleSubmit(onSubmit)}
//           disabled={isSubmitting}
//           className="w-full rounded-sm focus:outline-none text-gray-400"
//         />

//         {/* Meta */}
//         <div className="flex justify-between items-center gap-6 pb-4 mb-4">

//           <MetaField label="Created By">
//             <Avatar name={singleEpic?.created_by?.name} />
//             {singleEpic?.created_by?.name}
//           </MetaField>

//           {/* Assignee */}
//           <MetaField label="Assignee">
//             <select
//               {...register("assignee_id")}
//               onChange={handleSubmit(onSubmit)}
//               disabled={isSubmitting}
//               className="focus:outline-none p-1"
//             >
//               <option value="">Unassigned</option>
//               {projectMembers?.map((member: any, i: number) => (
//                 <option key={i} value={member.user_id}>
//                   {member.metadata.name || member.metadata.email}
//                 </option>
//               ))}
//             </select>
//           </MetaField>

//           {/* Deadline */}
//           <MetaField label="Deadline">
//             <input
//               type="date"
//               {...register("deadline")}
//               onChange={handleSubmit(onSubmit)}
//               disabled={isSubmitting}
//               className="focus:outline-none p-1"
//             />
//           </MetaField>

//         </div>

//         {/* Tasks */}
//         <div>
//           <div className="flex justify-between mb-3">
//             <h3 className="font-semibold">Tasks</h3>

//             <button
//               onClick={() =>
//                 router.push(
//                   `/projects/${projectId}/tasks/new?epicId=${epicId}`
//                 )
//               }
//               className="text-primary text-sm"
//             >
//               + Add
//             </button>
//           </div>

//           {epicTasks?.length > 0 ? (
//             <ul className="space-y-2 border border-gray-200">
//               {epicTasks.map((task) => (
//                 <li
//                   key={task.id}
//                   className="flex justify-between items-center border-b border-gray-200 px-4 py-2"
//                 >
//                   <div className="flex items-center gap-3">
//                     <TrueIcon />

//                     <div className="ms-3">
//                       <h3 className="font-medium text-xl mb-1">
//                         {task.title}
//                       </h3>
//                       <div className="flex items-center text-sm">
//                         <Avatar name={task.assignee?.name} />
//                         <span className="pl-3">
//                           {task.assignee?.name}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="text-sm font-medium">
//                     <span className="text-neutral-light">Due Date</span>
//                     <p className="text-neutral-dark">
//                       {task.due_date &&
//                         new Date(task.due_date).toLocaleDateString("en-GB")}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-center text-gray-400">No tasks yet</p>
//           )}
//         </div>

//       </div>
//     </>
//   );
// }









// "use client";

// import React, { useEffect, useRef } from "react";
// import Avatar from "./Avatar";
// import MetaField from "./MetaField";
// import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { fetchEpicTasks } from "@/redux/features/tasks/task";
// import { useForm } from "react-hook-form";
// import { fetchProjectMembers } from "@/redux/features/project/project";
// import TrueIcon from "./icons/true-icon";
// import {
//   fetchepics,
//   fetchSingleEpic,
//   updateEpicThunk,
// } from "@/redux/features/epics/epic";

// /* ───── Helpers ───── */
// const formatDate = (date?: string | null) => {
//   if (!date) return "";
//   return new Date(date).toISOString().split("T")[0];
// };

// type Props = {
//   isOpen: boolean;
//   onClose: () => void;
//   epicId: string | null;
//   projectId: string | undefined;
// };

// export default function EpicDetailsModal({
//   isOpen,
//   onClose,
//   epicId,
//   projectId,
// }: Props) {
//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   const { singleEpic, loadingSingleEpic, loadingUpdate } = useAppSelector(
//     (state) => state.epics
//   );

//   const { epicTasks } = useAppSelector((state) => state.tasks);
//   const { projectMembers } = useAppSelector((state) => state.projects);

//   /* ───── Form ───── */
//   const {
//     register,
//     reset,
//     watch,
//   } = useForm({
//     defaultValues: {
//       title: "",
//       description: "",
//       assignee_id: "",
//       deadline: "",
//     },
//   });

//   const formValues = watch();
//   const debounceRef = useRef<NodeJS.Timeout | null>(null);

//   /* ───── Fetch Epic ───── */
//   useEffect(() => {
//     if (!isOpen || !projectId || !epicId) return;

//     dispatch(fetchSingleEpic({ projectId, id: epicId }));
//     dispatch(fetchEpicTasks({ epicId }));
//   }, [projectId, epicId, isOpen, dispatch]);

//   /* ───── Reset form ───── */
//   useEffect(() => {
//     if (singleEpic) {
//       reset({
//         title: singleEpic.title || "",
//         description: singleEpic.description || "",
//         assignee_id: singleEpic.assignee_id || "",
//         deadline: formatDate(singleEpic.deadline),
//       });
//     }
//   }, [singleEpic, reset]);

//   /* ───── Fetch Members ───── */
//   useEffect(() => {
//     if (projectId) {
//       dispatch(fetchProjectMembers(projectId));
//     }
//   }, [projectId, dispatch]);

//   /* ───── Debounced Auto Save 🔥 ───── */
//   useEffect(() => {
//     if (!epicId || !projectId) return;

//     if (debounceRef.current) {
//       clearTimeout(debounceRef.current);
//     }

//     debounceRef.current = setTimeout(() => {
//       const payload = {
//         title: formValues.title,
//         description: formValues.description,
//         assignee_id: formValues.assignee_id || null,
//         deadline: formValues.deadline || null,
//       };

//       dispatch(updateEpicThunk({ epicId, data: payload }));
//     }, 800);

//     return () => {
//       if (debounceRef.current) {
//         clearTimeout(debounceRef.current);
//       }
//     };
//   }, [formValues, epicId, projectId, dispatch]);

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Overlay */}
//       <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />

//       {/* Modal */}
//       <div className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-lg">

//         {/* Header */}
//         <div className="flex justify-between mb-4">
//           <div>
//             <p className="text-xs text-primary mb-2">
//               {loadingSingleEpic ? "loading..." : singleEpic?.epic_id}
//             </p>

//             <input
//               {...register("title")}
//               className="font-bold text-2xl rounded-sm focus:outline-none"
//             />

//             {loadingUpdate && (
//               <p className="text-xs text-gray-400">Saving...</p>
//             )}
//           </div>

//           <button onClick={onClose}>✕</button>
//         </div>

//         {/* Description */}
//         <textarea
//           {...register("description")}
//           className="w-full rounded-sm focus:outline-none text-gray-400"
//         />

//         {/* Meta */}
//         <div className="flex justify-between items-center gap-6 pb-4 mb-4">

//           <MetaField label="Created By">
//             <Avatar name={singleEpic?.created_by?.name} />
//             {singleEpic?.created_by?.name}
//           </MetaField>

//           {/* Assignee */}
//           <MetaField label="Assignee">
//             <select
//               {...register("assignee_id")}
//               className="focus:outline-none p-1"
//             >
//               <option value="">Unassigned</option>
//               {projectMembers?.map((member: any, i: number) => (
//                 <option key={i} value={member.user_id}>
//                   {member.metadata.name || member.metadata.email}
//                 </option>
//               ))}
//             </select>
//           </MetaField>

//           {/* Deadline */}
//           <MetaField label="Deadline">
//             <input
//               type="date"
//               {...register("deadline")}
//               className="focus:outline-none p-1"
//             />
//           </MetaField>

//         </div>

//         {/* Tasks */}
//         <div>
//           <div className="flex justify-between mb-3">
//             <h3 className="font-semibold">Tasks</h3>

//             <button
//               onClick={() =>
//                 router.push(
//                   `/projects/${projectId}/tasks/new?epicId=${epicId}`
//                 )
//               }
//               className="text-primary text-sm"
//             >
//               + Add
//             </button>
//           </div>

//           {epicTasks?.length > 0 ? (
//             <ul className="space-y-2 border border-gray-200">
//               {epicTasks.map((task) => (
//                 <li
//                   key={task.id}
//                   className="flex justify-between items-center border-b border-gray-200 px-4 py-2"
//                 >
//                   <div className="flex items-center gap-3">
//                     <TrueIcon />

//                     <div className="ms-3">
//                       <h3 className="font-medium text-xl mb-1">
//                         {task.title}
//                       </h3>
//                       <div className="flex items-center text-sm">
//                         <Avatar name={task.assignee?.name} />
//                         <span className="pl-3">
//                           {task.assignee?.name}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="text-sm font-medium">
//                     <span className="text-neutral-light">Due Date</span>
//                     <p className="text-neutral-dark">
//                       {task.due_date &&
//                         new Date(task.due_date).toLocaleDateString("en-GB")}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-center text-gray-400">No tasks yet</p>
//           )}
//         </div>

//       </div>
//     </>
//   );
// }









// "use client";

// import React, { useEffect, useRef } from "react";
// import Avatar from "./Avatar";
// import MetaField from "./MetaField";
// import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { fetchEpicTasks } from "@/redux/features/tasks/task";
// import { useForm } from "react-hook-form";
// import { fetchProjectMembers } from "@/redux/features/project/project";
// import TrueIcon from "./icons/true-icon";
// import {
//   fetchSingleEpic,
//   updateEpicThunk,
// } from "@/redux/features/epics/epic";

// /* ───── Helpers ───── */
// const formatDate = (date?: string | null) => {
//   if (!date) return "";
//   return new Date(date).toISOString().split("T")[0];
// };

// type Props = {
//   isOpen: boolean;
//   onClose: () => void;
//   epicId: string | null;
//   projectId: string | undefined;
// };

// export default function EpicDetailsModal({
//   isOpen,
//   onClose,
//   epicId,
//   projectId,
// }: Props) {
//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   const { singleEpic, loadingSingleEpic, loadingUpdate } = useAppSelector(
//     (state) => state.epics
//   );

//   const { epicTasks } = useAppSelector((state) => state.tasks);
//   const { projectMembers } = useAppSelector((state) => state.projects);

//   /* ───── Form ───── */
//   const { register, reset, watch } = useForm({
//     defaultValues: {
//       title: "",
//       description: "",
//       assignee_id: "",
//       deadline: "",
//     },
//   });

//   const formValues = watch();

//   /* ───── Refs ───── */
//   const debounceRef = useRef<NodeJS.Timeout | null>(null);
//   const fetchedRef = useRef(false);
//   const prevValuesRef = useRef<any>(null);

//   /* ───── Fetch once only ───── */
//   useEffect(() => {
//     if (!isOpen || !projectId || !epicId || fetchedRef.current) return;

//     fetchedRef.current = true;

//     dispatch(fetchSingleEpic({ projectId, id: epicId }));
//     dispatch(fetchEpicTasks({ epicId }));
//   }, [projectId, epicId, isOpen, dispatch]);

//   /* ───── Reset fetch flag on close ───── */
//   useEffect(() => {
//     if (!isOpen) {
//       fetchedRef.current = false;
//     }
//   }, [isOpen]);

//   /* ───── Reset form from redux ───── */
//   useEffect(() => {
//     if (singleEpic) {
//       const values = {
//         title: singleEpic.title || "",
//         description: singleEpic.description || "",
//         assignee_id: singleEpic.assignee_id || "",
//         deadline: formatDate(singleEpic.deadline),
//       };

//       reset(values);
//       prevValuesRef.current = values; // مهم علشان compare
//     }
//   }, [singleEpic, reset]);

//   /* ───── Fetch Members ───── */
//   useEffect(() => {
//     if (projectId) {
//       dispatch(fetchProjectMembers(projectId));
//     }
//   }, [projectId, dispatch]);

//   /* ───── Debounced Auto Save 🔥 ───── */
//   useEffect(() => {
//     if (!epicId || !projectId || !prevValuesRef.current) return;

//     // لو مفيش تغيير متحفظش
//     if (
//       JSON.stringify(prevValuesRef.current) ===
//       JSON.stringify(formValues)
//     ) {
//       return;
//     }

//     // update previous
//     prevValuesRef.current = formValues;

//     // debounce
//     if (debounceRef.current) {
//       clearTimeout(debounceRef.current);
//     }

//     debounceRef.current = setTimeout(() => {
//       dispatch(
//         updateEpicThunk({
//           epicId,
//           data: {
//             title: formValues.title,
//             description: formValues.description,
//             assignee_id: formValues.assignee_id || null,
//             deadline: formValues.deadline || null,
//           },
//         })
//       );
//     }, 800);

//     return () => {
//       if (debounceRef.current) {
//         clearTimeout(debounceRef.current);
//       }
//     };
//   }, [formValues, epicId, projectId, dispatch]);

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Overlay */}
//       <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />

//       {/* Modal */}
//       <div className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-lg">

//         {/* Header */}
//         <div className="flex justify-between mb-4">
//           <div>
//             <p className="text-xs text-primary mb-2">
//               {loadingSingleEpic ? "loading..." : singleEpic?.epic_id}
//             </p>

//             <input
//               {...register("title")}
//               className="font-bold text-2xl rounded-sm focus:outline-none"
//             />

//             {loadingUpdate && (
//               <p className="text-xs text-gray-400">Saving...</p>
//             )}
//           </div>

//           <button onClick={onClose}>✕</button>
//         </div>

//         {/* Description */}
//         <textarea
//           {...register("description")}
//           className="w-full rounded-sm focus:outline-none text-gray-400"
//         />

//         {/* Meta */}
//         <div className="flex justify-between items-center gap-6 pb-4 mb-4">

//           <MetaField label="Created By">
//             <Avatar name={singleEpic?.created_by?.name} />
//             {singleEpic?.created_by?.name}
//           </MetaField>

//           {/* Assignee */}
//           <MetaField label="Assignee">
//             <select {...register("assignee_id")} className="p-1">
//               <option value="">Unassigned</option>
//               {projectMembers?.map((member: any, i: number) => (
//                 <option key={i} value={member.user_id}>
//                   {member.metadata.name || member.metadata.email}
//                 </option>
//               ))}
//             </select>
//           </MetaField>

//           {/* Deadline */}
//           <MetaField label="Deadline">
//             <input type="date" {...register("deadline")} className="p-1" />
//           </MetaField>

//         </div>

//         {/* Tasks */}
//         <div>
//           <div className="flex justify-between mb-3">
//             <h3 className="font-semibold">Tasks</h3>

//             <button
//               onClick={() =>
//                 router.push(
//                   `/projects/${projectId}/tasks/new?epicId=${epicId}`
//                 )
//               }
//               className="text-primary text-sm"
//             >
//               + Add
//             </button>
//           </div>

//           {epicTasks?.length > 0 ? (
//             <ul className="space-y-2 border border-gray-200">
//               {epicTasks.map((task) => (
//                 <li
//                   key={task.id}
//                   className="flex justify-between items-center border-b border-gray-200 px-4 py-2"
//                 >
//                   <div className="flex items-center gap-3">
//                     <TrueIcon />

//                     <div className="ms-3">
//                       <h3 className="font-medium text-xl mb-1">
//                         {task.title}
//                       </h3>
//                       <div className="flex items-center text-sm">
//                         <Avatar name={task.assignee?.name} />
//                         <span className="pl-3">
//                           {task.assignee?.name}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="text-sm font-medium">
//                     <span className="text-neutral-light">Due Date</span>
//                     <p className="text-neutral-dark">
//                       {task.due_date &&
//                         new Date(task.due_date).toLocaleDateString("en-GB")}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-center text-gray-400">No tasks yet</p>
//           )}
//         </div>

//       </div>
//     </>
//   );
// }

















"use client";

import React, { useEffect, useRef } from "react";
import Avatar from "./Avatar";
import MetaField from "./MetaField";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchEpicTasks } from "@/redux/features/tasks/task";
import { useForm } from "react-hook-form";
import { fetchProjectMembers } from "@/redux/features/project/project";
import TrueIcon from "./icons/true-icon";
import {
  fetchSingleEpic,
  updateEpicThunk,
} from "@/redux/features/epics/epic";

/* ───── Helpers ───── */
const formatDate = (date?: string | null) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

const getSnapshot = (data: any) => ({
  title: data.title,
  description: data.description,
  assignee_id: data.assignee_id,
  deadline: data.deadline,
});

type Props = {
  isOpen: boolean;
  onClose: () => void;
  epicId: string | null;
  projectId: string | undefined;
};

export default function EpicDetailsModal({
  isOpen,
  onClose,
  epicId,
  projectId,
}: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { singleEpic, loadingSingleEpic } = useAppSelector(
    (state) => state.epics
  );

  console.log(" epicId",epicId);
  const { epicTasks } = useAppSelector((state) => state.tasks);
  const { projectMembers } = useAppSelector((state) => state.projects);

  /* ───── Form ───── */
  const { register, reset, watch } = useForm({
    defaultValues: {
      title: "",
      description: "",
      assignee_id: "",
      deadline: "",
    },
  });

  const formValues = watch();

  /* ───── Refs ───── */
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const fetchedRef = useRef(false);
  const prevValuesRef = useRef<any>(null);

  /* ───── Fetch once ───── */
  useEffect(() => {
    if (!isOpen || !projectId || !epicId || fetchedRef.current) return;

    fetchedRef.current = true;

    dispatch(fetchSingleEpic({ projectId, id: epicId }));
    dispatch(fetchEpicTasks({ epicId }));
  }, [isOpen, projectId, epicId, dispatch]);

  useEffect(() => {
    if (!isOpen) fetchedRef.current = false;
  }, [isOpen]);

  /* ───── Reset form ───── */
  useEffect(() => {
    if (!singleEpic) return;

    const values = {
      title: singleEpic.title || "",
      description: singleEpic.description || "",
      assignee_id: singleEpic.assignee_id || "",
      deadline: formatDate(singleEpic.deadline),
    };

    reset(values);
    prevValuesRef.current = values;
  }, [singleEpic, reset]);

  /* ───── Members ───── */
  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectMembers(projectId));
    }
  }, [projectId, dispatch]);

  /* ───── Stable Debounced Auto Save (FIXED) ───── */
  useEffect(() => {
    if (!epicId || !projectId) return;

    const newValues = getSnapshot(formValues);
    const oldValues = prevValuesRef.current;

    if (!oldValues) {
      prevValuesRef.current = newValues;
      return;
    }

    const isSame = JSON.stringify(oldValues) === JSON.stringify(newValues);
    if (isSame) return;

    prevValuesRef.current = newValues;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

  debounceRef.current = setTimeout(() => {
  const cleanPayload = {
    title: newValues.title,
    description: newValues.description,
    assignee_id: newValues.assignee_id || null,
    deadline: newValues.deadline || null,
  };
console.log("CLEAN PAYLOAD:", cleanPayload);
  dispatch(
    updateEpicThunk({
      epicId,
      data: cleanPayload,
    })
  );
}, 800);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [formValues, epicId, projectId, dispatch]);

  if (!isOpen) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />

      <div className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-lg">

        <div className="flex justify-between mb-4">
          <div>
            <p className="text-xs text-primary mb-2">
              {loadingSingleEpic ? "loading..." : singleEpic?.epic_id}
            </p>

            <input
              {...register("title")}
              className="font-bold text-2xl rounded-sm focus:outline-none"
            />

            {/* {loadingUpdate && (
              <p className="text-xs text-gray-400">Saving...</p>
            )} */}
          </div>

          <button onClick={onClose}>✕</button>
        </div>

        <textarea
          {...register("description")}
          className="w-full rounded-sm focus:outline-none text-gray-400"
        />

        <div className="flex justify-between items-center gap-6 pb-4 mb-4">

          <MetaField label="Created By">
            <Avatar name={singleEpic?.created_by?.name} />
            {singleEpic?.created_by?.name}
          </MetaField>

          <MetaField label="Assignee">
            <select {...register("assignee_id")} className="p-1">
              <option value="">Unassigned</option>
              {projectMembers?.map((member: any, i: number) => (
                <option key={i} value={member.user_id}>
                  {member.metadata.name || member.metadata.email}
                </option>
              ))}
            </select>
          </MetaField>

          <MetaField label="Deadline">
            <input type="date" {...register("deadline")} className="p-1" />
          </MetaField>

        </div>

        <div>
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold">Tasks</h3>

            <button
              onClick={() =>
                router.push(
                  `/projects/${projectId}/tasks/new?epicId=${epicId}`
                )
              }
              className="text-primary text-sm"
            >
              + Add
            </button>
          </div>

          {epicTasks?.length > 0 ? (
            <ul className="space-y-2 border border-gray-200">
              {epicTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex justify-between items-center border-b border-gray-200 px-4 py-2"
                >
                  <div className="flex items-center gap-3">
                    <TrueIcon />

                    <div className="ms-3">
                      <h3 className="font-medium text-xl mb-1">
                        {task.title}
                      </h3>
                      <div className="flex items-center text-sm">
                        <Avatar name={task.assignee?.name} />
                        <span className="pl-3">{task.assignee?.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm font-medium">
                    <span className="text-neutral-light">Due Date</span>
                    <p className="text-neutral-dark">
                      {task.due_date &&
                        new Date(task.due_date).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-400">No tasks yet</p>
          )}
        </div>

      </div>
    </>
  );
}


















