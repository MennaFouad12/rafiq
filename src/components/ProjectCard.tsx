import React from 'react'
import { useRouter } from "next/navigation";
export default function ProjectCard({project}: any) {
  const router = useRouter();
  return (
    <div  onClick={() => router.push(`/projects/${project.id}/epics`)}
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
  )
}
