"use client";

import { addTaskSchema, TaskFormValues } from "@/lib/schemes/tasks.schema";
import { createProjectTask } from "@/lib/tasks";
import { fetchepics } from "@/redux/features/epics/epic";
import { fetchProjectMembers } from "@/redux/features/project/project";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import Header from "../../../components/header";
import Input from "@/components/shared/shared-input";
import ExclaimMarkIcon from "@/components/icons/exclaim-mark-icon";
import { STATUS_VALUES } from "@/lib/constant/tasks.constants";
import TextArea from "@/components/shared/textarea";
import SubmissionError from "@/components/shared/submission-error";
import Button from "@/components/shared/Button";
import Select from "@/components/shared/shared-select";



export default function AddTaskForm() {
  const params = useParams();
  const projectId = params.projectId as string;
  const searchParams = useSearchParams();
  const defaultEpicId = searchParams.get("epic") ?? undefined;
  const defaultStatus = searchParams.get("status") ?? "TO_DO";

  const router = useRouter();
  // const { members } = useGetProjectMembers({ id: projectId });
  // const { epics } = useGetEpics({ id: projectId });
  const dispatch = useAppDispatch();
  const { projectMembers, loadingMembers } = useAppSelector(
    (state) => state.projects
  );

  const { epics, loadingEpic } = useAppSelector(
    (state) => state.epics
  );



  const { register, handleSubmit, formState, control } =
    useForm<TaskFormValues>({
      resolver: zodResolver(addTaskSchema),
      defaultValues: {
        assignee_id: undefined,
        due_date: undefined,
        project_id: projectId,
        status: defaultStatus,
        epic_id: defaultEpicId ?? "",
      },
    });

  const [error, setError] = useState<string | undefined>();




  const onSubmit = async (data: TaskFormValues) => {
    if (!projectId) return;
    try {
      await createProjectTask(
        data.title,
        data.status ?? "todo",
        data.description ?? null,
        data.due_date ?? null,
        data.epic_id ?? null,
        data.assignee_id ?? null,
        projectId
      );
      toast.success("task created successfully");
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
      <div className="max-w-4xl mx-auto">


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
        <div className="bg-white rounded-2xl shadow p-6">
          <Header
            subTitleClassName="max-w-full"
            title={"Create New Task"}
            subtitle={
              "Initialize a new work item within the Architectural Workspace ecosystem."
            }
          />
          <div className="md:bg-white  mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="md:p-8">
                <Input
                  isRequired
                  label="title"
                  placeholder="e.g. Structural Foundation Phase"
                  {...register("title")}
                  error={formState.errors.title?.message}
                  errorIcon={<ExclaimMarkIcon />}
                />
                <div className="md:grid grid-cols-2 gap-8">
                  <Select
                    error={formState.errors.status?.message}
                    label="status"
                    placeholder="select a status"
                    options={
                      STATUS_VALUES?.map((status) => ({
                        value: status.value,
                        label: status.label.toUpperCase(),
                      })) ?? []
                    }
                    {...register("status")}
                  />
                  <Select
                    error={formState.errors.assignee_id?.message}
                    label="asignee"
                    placeholder="select a team member"
                    options={[
                      { value: "", label: "No assignee" },
                      ...(Array.from(
                        new Map(
                          projectMembers?.map((member) => [member.user_id, member])
                        ).values()
                      ).map((member) => ({
                        value: member.user_id,
                        label: member.metadata.name,
                      })) ?? []),
                    ]}
                    {...register("assignee_id")}
                  />
                </div>

                {/* Epic Select */}
                <Controller
                  control={control}
                  name="epic_id"
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value ?? ""}
                      label="Epic"
                      placeholder="Select Epic Link"
                      error={formState.errors.epic_id?.message}
                      options={
                        epics?.map((epic) => ({
                          value: epic.id,
                          label:
                            epic.title.length > 100
                              ? `${epic.title.slice(0, 100)}…`
                              : epic.title,
                        })) ?? []
                      }
                    />
                  )}
                />
                <Input
                  type="date"
                  label="Due Date"
                  {...register("due_date")}
                  error={formState.errors.due_date?.message}
                />
                <TextArea
                  label="Description"
                  optional
                  className="min-h-37"
                  placeholder="Describe the scope and objectives of this epic..."
                  {...register("description")}
                  error={formState.errors.description?.message}
                  maxLength={500}
                />
                <input type="hidden" {...register("project_id")} />

                {error && <SubmissionError error={error} />}
                <div className="flex justify-end gap-4 items-center md:mt-14 flex-col-reverse md:flex-row mb-8">
                  <Button
                    type="button"
                    disabled={formState.isSubmitting}
                    onClick={() => router.back()}
                    variant="ghost"
                  >
                    Back
                  </Button>
                  <Button
                    className="px-8 w-full md:w-fit"
                    disabled={formState.isSubmitting}
                  >
                    Create Task
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
}