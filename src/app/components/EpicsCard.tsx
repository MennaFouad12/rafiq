import React from 'react'
import { useRouter } from "next/navigation";
export default function EpicsCard({epic,onClick}: any) {
  const getInitials = (name: string) => {
  return name
    ?.split(" ")
    ?.map((n: string) => n[0])
    ?.join("")
    ?.toUpperCase();
};
  const router = useRouter();
  return (
    
    <div  onClick={onClick} 
          
            className="bg-white rounded-lg p-5  shadow-sm transition"
          >
            <span className='bg-surface-highest px-2 5 py-1' >{epic.epic_id}</span>
          
            <h2 className="font-semibold text-gray-900 mt-3 mb-2">
              {epic.title}
            </h2>
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-highest text-primary-container font-bold text-sm">
                    {getInitials(epic.assignee.name ||epic.assignee.email)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-500 ">
                      Assignee
                    </p>
                    <p className="text-sm font-medium ">{epic.assignee.name}</p>
                  </div>
                </div>
                <div>
<p className='bg-surface-highest px-2 5 py-1 '>TO DO</p>
                </div>
                </div>

            {/* <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              {epic.description}
            </p> */}
<hr className="my-4 text-gray-200" />
            <div className="text-xs flex justify-between text-gray-400">
              <span className="uppercase font-bold tracking-wide text-[#737685]">Created at</span>
              <div className="text-gray-600 mt-1 font-semibold">{new Date(epic.created_at).toLocaleDateString("en-GB")}</div>
            </div>
          </div>
  )
}
