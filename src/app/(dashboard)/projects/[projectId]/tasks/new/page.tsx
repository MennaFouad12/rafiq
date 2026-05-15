"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProject, fetchProjectMembers } from "@/redux/features/project/project";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { createProjectTask } from "@/lib/tasks";
import { useEffect } from "react";
import { fetchepics } from "@/redux/features/epics/epic";
const TASK_STATUS = [
  "TO_DO",
  "IN_PROGRESS",
  "BLOCKED",
  "IN_REVIEW",
  "READY_FOR_QA",
  "REOPENED",
  "READY_FOR_PRODUCTION",
  "DONE",
]
// Zod Schema
const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Project name must be at least 3 characters."),
  status: z.enum([
    "TO_DO",
    "IN_PROGRESS",
    "BLOCKED",
    "IN_REVIEW",
    "READY_FOR_QA",
    "REOPENED",
    "READY_FOR_PRODUCTION",
    "DONE",
  ]),
  assignee_id: z.string().uuid().optional().nullable(),
  epic_id: z.string().uuid().optional().nullable(),

  due_date: z
    .string()
    .optional()
    .refine((date) => {
      if (!date) return true; // optional
      const today = new Date();
      const selected = new Date(date);

      // نخلي الوقت 0 عشان نقارن صح
      today.setHours(0, 0, 0, 0);
      selected.setHours(0, 0, 0, 0);

      return selected >= today;
    }, "Deadline must be today or a future date"),
  description: z.string().max(500).optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

export default function AddTaskPage() {
  const searchParams = useSearchParams();

  const defaultEpicId = searchParams.get("epicId");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      status: "TO_DO",
      assignee_id: null,
      epic_id: defaultEpicId || null,
      due_date: "",
      description: "",
    },
  });
  const descriptionLength = watch("description")?.length || 0;
  const dispatch = useAppDispatch();

  const params = useParams();


  const projectId = Array.isArray(params.projectId)
    ? params.projectId[0]
    : params.projectId;

  const { projectMembers, loadingMembers } = useAppSelector(
    (state) => state.projects
  );
  console.log("projectMembers", projectMembers);
  const { epics, loadingEpic } = useAppSelector(
    (state) => state.epics
  );
  console.log("epics", epics);
  const router = useRouter();
  const onSubmit = async (data: TaskFormData) => {
     if (!projectId) return; 
    try {
      await createProjectTask(
        data.title,
        data.status,
        data.description ?? null,
        data.due_date ?? null,
        data.epic_id ?? null,
        data.assignee_id ?? null,
        projectId
      );

  router.push(`/projects/${projectId}/tasks`);
    } catch (err) {
      console.log("Add project error:", err);
    }
  };
  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectMembers(projectId));
      dispatch(fetchepics({ projectId }));
    }
  }, [projectId, dispatch]);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm mb-5 font-medium text-gray-500">PROJECTS &gt;<span className="text-primary"> ADD NEW TASK</span> </p>
            <h1 className="text-2xl font-semibold text-gray-900">Add New tak</h1>
          </div>

          <button className=" hidden md:flex items-center  bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] shadow-[0px_1px_2px_0px_#0000000D]  text-white py-2 px-6 rounded-md ">
            <svg className="me-2" width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.1667 8.33333V5.83333H11.6667V4.16667H14.1667V1.66667H15.8333V4.16667H18.3333V5.83333H15.8333V8.33333H14.1667ZM6.66667 6.66667C5.75 6.66667 4.96528 6.34028 4.3125 5.6875C3.65972 5.03472 3.33333 4.25 3.33333 3.33333C3.33333 2.41667 3.65972 1.63194 4.3125 0.979167C4.96528 0.326389 5.75 0 6.66667 0C7.58333 0 8.36806 0.326389 9.02083 0.979167C9.67361 1.63194 10 2.41667 10 3.33333C10 4.25 9.67361 5.03472 9.02083 5.6875C8.36806 6.34028 7.58333 6.66667 6.66667 6.66667ZM0 13.3333V11C0 10.5278 0.121528 10.0938 0.364583 9.69792C0.607639 9.30208 0.930556 9 1.33333 8.79167C2.19444 8.36111 3.06944 8.03819 3.95833 7.82292C4.84722 7.60764 5.75 7.5 6.66667 7.5C7.58333 7.5 8.48611 7.60764 9.375 7.82292C10.2639 8.03819 11.1389 8.36111 12 8.79167C12.4028 9 12.7257 9.30208 12.9688 9.69792C13.2118 10.0938 13.3333 10.5278 13.3333 11V13.3333H0ZM1.66667 11.6667H11.6667V11C11.6667 10.8472 11.6285 10.7083 11.5521 10.5833C11.4757 10.4583 11.375 10.3611 11.25 10.2917C10.5 9.91667 9.74306 9.63542 8.97917 9.44792C8.21528 9.26042 7.44444 9.16667 6.66667 9.16667C5.88889 9.16667 5.11806 9.26042 4.35417 9.44792C3.59028 9.63542 2.83333 9.91667 2.08333 10.2917C1.95833 10.3611 1.85764 10.4583 1.78125 10.5833C1.70486 10.7083 1.66667 10.8472 1.66667 11V11.6667ZM6.66667 5C7.125 5 7.51736 4.83681 7.84375 4.51042C8.17014 4.18403 8.33333 3.79167 8.33333 3.33333C8.33333 2.875 8.17014 2.48264 7.84375 2.15625C7.51736 1.82986 7.125 1.66667 6.66667 1.66667C6.20833 1.66667 5.81597 1.82986 5.48958 2.15625C5.16319 2.48264 5 2.875 5 3.33333C5 3.79167 5.16319 4.18403 5.48958 4.51042C5.81597 4.83681 6.20833 5 6.66667 5Z" fill="white" />
            </svg>

            Invite Member
          </button>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Create New Task
            </h2>
            <p className="text-sm text-gray-500">
              Initialize a new work item within the Architectural Workspace ecosystem.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Project Title */}
            <div>
              <label className=" text-neutral text-sm font-bold ">
                Project Title *
              </label>
              <input
                {...register("title")}
                className="w-full mt-1 p-2 rounded-sm focus:outline-none bg-surface-highest"

                placeholder="Enter project name"
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>


            <div className="flex flex-col md:flex-row   justify-between   gap-3">
              <div className="flex-1">
                <label className=" text-neutral text-sm font-bold ">
                  Assignee
                </label>
                <select
                  {...register("assignee_id")}

                  className="w-full mt-1 p-2 rounded-sm focus:outline-none bg-surface-highest"
                >
                  <option value="">Unassigned</option>

                  {projectMembers?.map((member: any, index: number) => (
                    <option key={`${member.user_id}-${index}`} value={member.user_id}>
                      {member.metadata.name}
                    </option>
                  ))}
                </select>
                {errors.assignee_id && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.assignee_id.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className=" text-neutral text-sm font-bold ">
                  status
                </label>

                <select
                  {...register("status")}

                  className="w-full mt-1 p-2 rounded-sm focus:outline-none bg-surface-highest"
                >
                  {/* <option value="">Unassigned</option> */}

                  {TASK_STATUS?.map((task: any, index: number) => (
                    <option key={`${index}`} value={task}>
                      {task}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>




            </div>

            <div>
              <label className=" text-neutral text-sm font-bold ">
                Epic
              </label>
              <select
                {...register("epic_id")}

                className="w-full mt-1 p-2 rounded-sm focus:outline-none bg-surface-highest"
              >
                {epics?.map((epic: any, index: number) => (
                  <option key={`${epic.id}-${index}`} value={epic.id}>
                    {epic.title}
                  </option>
                ))}
              </select>

              {errors.epic_id && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.epic_id.message}
                </p>
              )}
            </div>

            <div >
              <div>
                <label className=" text-neutral text-sm font-bold ">
                  Deadline
                </label>
                <input
                  type="date"
                  {...register("due_date")}
                  className="w-full mt-1 p-2 rounded-sm focus:outline-none bg-surface-highest"

                  placeholder="Enter project deadline"
                />
                {errors.due_date && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.due_date.message}
                  </p>
                )}
              </div>
            </div>
            {/* Description */}
            <div>
              <div className="flex justify-between items-center">
                <label className=" text-neutral text-sm font-bold ">
                  Description
                </label>
                <span className="text-xs text-gray-400">Optional</span>
              </div>

              <textarea
                {...register("description")}
                rows={4}
                className="w-full mt-1 p-2 rounded-sm focus:outline-none bg-surface-highest"

                placeholder="Provide a high-level overview of the project's architectural objectives and key milestones..."
              />

              <div className="flex justify-between items-center mt-1">
                <div>
                  {errors.description && (
                    <p className="text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <span className="text-xs text-gray-400">
                  {descriptionLength} / 500 characters
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>

              <button
                type="submit"
                className=" block  bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] shadow-[0px_1px_2px_0px_#0000000D]  text-white py-2 px-6 rounded-md "
              >
                Create Task
              </button>
            </div>
          </form>
        </div>

        {/* Footer Tip */}
        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
          Pro Tip: You can invite project members and assign epics immediately after the initial creation process.
        </div>
      </div>
    </div>
  );
}
