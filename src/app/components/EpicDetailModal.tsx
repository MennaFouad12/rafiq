


// import React, { useState, useRef, use, useEffect } from "react";
// import Avatar from "./Avatar";
// import MetaField from "./MetaField";
// import { getSingleEpic } from "@/lib/epics";
// import { useParams } from "next/navigation";



// type Props = {
//   isOpen: boolean;
//   onClose: () => void;
//   epicId: number | null;
//   projectId: string | undefined;
// };

// export default function EpicDetailsModal({
//   isOpen,
//   onClose,
//   epicId,
//   projectId,
// }: Props) {
//   const [addingTask, setAddingTask] = useState(false);
//   const [newTaskTitle, setNewTaskTitle] = useState("");

//   const [epic, setEpic] = useState([]);
// ;

//   const inputRef = useRef<HTMLInputElement>(null);

//   if (!isOpen) return null;



//   const handleAddTask = () => {
//     setNewTaskTitle("");
//     setAddingTask(false);
//   };
//   useEffect(() => {
//   getSingleEpic(projectId, epicId);
//   }, []);

//   return (
//     <>
    
//       <div
//         onClick={onClose}
//         className="fixed inset-0 bg-black/40 z-40"
//       />

//       {/* Modal */}
//       <div className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-lg">

//         {/* Header */}
//         <div className="flex justify-between mb-4">
//           <div>
//             <p className="text-xs text-blue-600">{epic.code}</p>
//             <h2 className="text-lg font-bold">{epic.title}</h2>
//           </div>

//           <button onClick={onClose}>✕</button>
//         </div>

//         {/* Description */}
//         <p className="text-sm text-gray-500 mb-4">
//           {epic.description}
//         </p>

//         {/* Meta */}
//         <div className="flex gap-6 border-b pb-4 mb-4">
//           <MetaField label="Created By">
//             <Avatar initials={epic.createdBy.initials} />
//             {epic.createdBy.name}
//           </MetaField>

//           <MetaField label="Assignee">
//             <Avatar initials={epic.assignee.initials} />
//             {epic.assignee.name}
//           </MetaField>

//           <MetaField label="Date">
//             {epic.createdAt}
//           </MetaField>
//         </div>

//         {/* Tasks */}
//         <div>
//           <div className="flex justify-between mb-3">
//             <h3 className="font-semibold">Tasks ({tasks.length})</h3>

//             <button
//               onClick={() => setAddingTask(true)}
//               className="text-blue-600 text-sm"
//             >
//               + Add
//             </button>
//           </div>

//           {addingTask && (
//             <div className="flex gap-2 mb-3">
//               <input
//                 ref={inputRef}
//                 value={newTaskTitle}
//                 onChange={(e) => setNewTaskTitle(e.target.value)}
//                 className="border p-2 flex-1 rounded"
//                 placeholder="Task title"
//               />
//               <button
//                 onClick={handleAddTask}
//                 className="bg-blue-600 text-white px-3 rounded"
//               >
//                 Add
//               </button>
//             </div>
//           )}

        
//         </div>
//       </div>
//     </>
//   );
// }




"use client";

import React, { useState, useRef, useEffect } from "react";
import Avatar from "./Avatar";
import MetaField from "./MetaField";
import { getSingleEpic } from "@/lib/epics";
import { useParams } from "next/navigation";

/* ───── Types ───── */
type Epic = {
  id?: number;
epic_id?: string;
  title?: string;
  description?: string;
  created_at?: string;
  created_by?: { name: string; initials: string };
  assignee?: { name: string; initials: string };
};

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
  // const [addingTask, setAddingTask] = useState(false);
  // const [newTaskTitle, setNewTaskTitle] = useState("");
  const [epic, setEpic] = useState<Epic | null>(null);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  /* ───── Fetch Epic ───── */
  useEffect(() => {
    const fetchEpic = async () => {
       if (!isOpen || !projectId || !epicId) return;

      try {
        setLoading(true);

        const data = await getSingleEpic(projectId, epicId);

        setEpic(data); 
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEpic();
  }, [projectId, epicId]);

  if (!isOpen) return null;

  // const handleAddTask = () => {
  //   setNewTaskTitle("");
  //   setAddingTask(false);
  // };

  return (
    <>
    
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-lg">

        {/* Header */}
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-xs flex gap-2 mb-3 text-blue-600">
              <span>
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 10V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2C2.55 2 3.02083 2.19583 3.4125 2.5875C3.80417 2.97917 4 3.45 4 4V10C4 10.55 3.80417 11.0208 3.4125 11.4125C3.02083 11.8042 2.55 12 2 12C1.45 12 0.979167 11.8042 0.5875 11.4125C0.195833 11.0208 0 10.55 0 10ZM7 14C6.45 14 5.97917 13.8042 5.5875 13.4125C5.19583 13.0208 5 12.55 5 12V2C5 1.45 5.19583 0.979167 5.5875 0.5875C5.97917 0.195833 6.45 0 7 0H13C13.55 0 14.0208 0.195833 14.4125 0.5875C14.8042 0.979167 15 1.45 15 2V12C15 12.55 14.8042 13.0208 14.4125 13.4125C14.0208 13.8042 13.55 14 13 14H7ZM16 10V4C16 3.45 16.1958 2.97917 16.5875 2.5875C16.9792 2.19583 17.45 2 18 2C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V10C20 10.55 19.8042 11.0208 19.4125 11.4125C19.0208 11.8042 18.55 12 18 12C17.45 12 16.9792 11.8042 16.5875 11.4125C16.1958 11.0208 16 10.55 16 10Z" fill="#003D9B"/>
</svg>
</span>
              {loading ? "..." : epic?.epic_id}
            </p>
            <h2 className="text-lg font-bold">
              {loading ? "Loading..." : epic?.title}
            </h2>
          </div>

          <button onClick={onClose}>✕</button>
        </div>

      
        <p className="text-sm text-gray-500 mb-4">
          {epic?.description}
        </p>

      
        <div className="flex justify-between items-center gap-6  pb-4 mb-4">
          <MetaField label="Created By">
            <Avatar name={epic?.created_by?.name} />
            {epic?.created_by?.name}
          </MetaField>

          <MetaField label="Assignee">
            <Avatar name={epic?.assignee?.name} />
            {epic?.assignee?.name}
          </MetaField>

          <MetaField label="Date">
        {epic?.created_at && new Date(epic.created_at).toLocaleDateString("en-GB")}
          </MetaField>
        </div>

    
        <div>
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold">Tasks</h3>

            <button
            
              className="text-primary text-sm"
            >
              + Add
            </button>
          </div>


          {/* {addingTask && (
            <div className="flex gap-2 mb-3">
              <input
                ref={inputRef}
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="border p-2 flex-1 rounded"
                placeholder="Task title"
              />
              <button
                onClick={handleAddTask}
                className="bg-blue-600 text-white px-3 rounded"
              >
                Add
              </button>
            </div>
          )} */}

{/* <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-gray-50 p-2 rounded"
              >
                <span>{task.title}</span>
                <StatusBadge status={task.status} />
              </li>
            ))}
          </ul> */}

          <div className="hidden md:flex items-center py-5 justify-center rounded-lg shadow-sm border border-dashed border-gray-300 bg-surface-highest hover:bg-gray-100 cursor-pointer transition">
          <div className="text-center mx-auto">
            <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center bg-surface-low rounded-2xl p-3">
            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 15V13H18V15H6ZM6 9V7H18V9H6ZM6 3V1H18V3H6ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14C0 13.45 0.195833 12.9792 0.5875 12.5875C0.979167 12.1958 1.45 12 2 12C2.55 12 3.02083 12.1958 3.4125 12.5875C3.80417 12.9792 4 13.45 4 14C4 14.55 3.80417 15.0208 3.4125 15.4125C3.02083 15.8042 2.55 16 2 16ZM2 10C1.45 10 0.979167 9.80417 0.5875 9.4125C0.195833 9.02083 0 8.55 0 8C0 7.45 0.195833 6.97917 0.5875 6.5875C0.979167 6.19583 1.45 6 2 6C2.55 6 3.02083 6.19583 3.4125 6.5875C3.80417 6.97917 4 7.45 4 8C4 8.55 3.80417 9.02083 3.4125 9.4125C3.02083 9.80417 2.55 10 2 10ZM2 4C1.45 4 0.979167 3.80417 0.5875 3.4125C0.195833 3.02083 0 2.55 0 2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0C2.55 0 3.02083 0.195833 3.4125 0.5875C3.80417 0.979167 4 1.45 4 2C4 2.55 3.80417 3.02083 3.4125 3.4125C3.02083 3.80417 2.55 4 2 4Z" fill="#041B3C" fillOpacity="0.3"/>
</svg>


            </div>
            <p className="font-bold my-4">No tasks have been added to this epic yet</p>
            <button  className="  bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] shadow-[0px_1px_2px_0px_#0000000D]  text-white py-2 px-6 rounded-md "
        >
          + add task
        </button>
          </div>
        </div>

        </div>
      </div>
    </>
  );
}