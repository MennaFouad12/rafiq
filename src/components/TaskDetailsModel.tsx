


"use client";

import {
  useEffect,
  useRef,
  useCallback,
  memo,
} from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Avatar from "./Avatar";

import {
  getTaskDetails,
  updateTaskDetails,
} from "@/lib/tasks";

import { useAppDispatch } from "@/redux/hooks";

import { updateTaskInState } from "@/redux/features/tasks/task";

/* ───────────────── SCHEMA ───────────────── */

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  status: z.string(),
  due_date: z.string().nullable().optional(),
  assignee_id: z.string().nullable().optional(),
});

type FormValues = z.infer<typeof taskSchema>;

type TaskDetails = {
  id: string;
  task_id: string;
  title: string;
  description: string;
  status: string;

  epic?: {
    epic_id?: string;
    title?: string;
  };

  assignee?: {
    id?: string;
    name?: string;
    role?: string;
  };

  assignee_id?: string | null;

  created_by?: {
    name?: string;
  };

  due_date?: string;
  created_at?: string;
};

/* ───────────────── HELPERS ───────────────── */

const formatDate = (date?: string) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* ───────────────── COMPONENT ───────────────── */

function TaskDetailsModal({
  taskId,
  projectId,
  onClose,
}: {
  taskId: string;
  projectId: string;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();

  const originalTaskRef =
    useRef<TaskDetails | null>(null);

  const {
    register,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(taskSchema),

    defaultValues: {
      title: "",
      description: "",
      status: "TO_DO",
      due_date: "",
      assignee_id: null,
    },
  });

  const task = originalTaskRef.current;

  /* ───────────────── FETCH ───────────────── */

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskDetails(
          projectId,
          taskId
        );

        if (!data) return;

        originalTaskRef.current = data;

        reset({
          title: data.title || "",
          description:
            data.description || "",
          status: data.status || "TO_DO",

          due_date: data.due_date
            ? data.due_date.split("T")[0]
            : "",

          assignee_id:
            data.assignee?.id || null,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchTask();
  }, [projectId, reset, taskId]);

  /* ───────────────── UPDATE ───────────────── */

  const handleFieldUpdate = useCallback(
    async (
      field: keyof FormValues,
      value: string | null
    ) => {
      if (!task) return;

      const oldValue =
        field === "assignee_id"
          ? task.assignee?.id ?? null
          : (task[
              field as keyof TaskDetails
            ] as string | null);

      // skip if same
      if (oldValue === value) return;

      // optimistic ref update
      originalTaskRef.current = {
        ...task,
        [field]: value,
      };

      try {
        const res = await updateTaskDetails(
          taskId,
          {
            [field]: value,
          }
        );

        console.log("UPDATED:", res);

        // redux update
        dispatch(
          updateTaskInState({
            taskId,
            updates: {
              [field]: value,
            },
          })
        );
      } catch (error) {
        console.log(error);

        // rollback
        setValue(
          field,
          oldValue as never
        );

        originalTaskRef.current = {
          ...task,
          [field]: oldValue,
        };

        alert("Update failed");
      }
    },
    [dispatch, setValue, task, taskId]
  );

  /* ───────────────── LOADING ───────────────── */

  if (!task) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl">
          Loading...
        </div>
      </div>
    );
  }

  /* ───────────────── VALUES ───────────────── */

  const status = watch("status");
  const assigneeId = watch("assignee_id");

  /* ───────────────── UI ───────────────── */

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[900px] h-[600px] max-w-[95%] rounded-2xl shadow-xl overflow-hidden flex relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3"
        >
          X
        </button>

        {/* LEFT */}
        <div className="w-2/3">

          <div className="flex flex-col h-full justify-between">

            {/* CONTENT */}
            <div className="p-6 space-y-4">

              {/* META */}
              <div className="text-xs text-primary font-semibold">

                <span className="bg-blue-100 px-2 py-1 rounded">
                  {task.task_id}
                </span>

                <span className="ml-2">
                  {task.epic?.title}
                </span>
              </div>

              {/* TITLE */}
              <input
                className="text-2xl font-bold w-full outline-none"
                {...register("title")}
                onBlur={(e) =>
                  handleFieldUpdate(
                    "title",
                    e.target.value
                  )
                }
              />

              {errors.title && (
                <p className="text-red-500 text-sm">
                  Title is required
                </p>
              )}

              {/* DESCRIPTION */}
              <textarea
                className="w-full text-gray-700 mt-4 outline-none resize-none"
                {...register("description")}
                onBlur={(e) =>
                  handleFieldUpdate(
                    "description",
                    e.target.value || null
                  )
                }
              />
            </div>

            {/* FOOTER */}
            <div className="bg-indigo-50 p-6 flex justify-between">

              <button className="text-gray-600 cursor-pointer">
                copy link
              </button>

              <button
                onClick={onClose}
                className="p-2 bg-surface-highest cursor-pointer rounded-md"
              >
                cancel
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-1/3 bg-indigo-50 p-6 space-y-6">

          {/* STATUS */}
          <div>
            <p className="text-xs text-gray-500">
              STATUS
            </p>

            <select
              className="font-semibold bg-white p-2 rounded w-full"
              {...register("status")}
              value={status}
              onChange={(e) => {
                setValue(
                  "status",
                  e.target.value
                );

                handleFieldUpdate(
                  "status",
                  e.target.value
                );
              }}
            >
              <option value="TO_DO">
                TO_DO
              </option>

              <option value="IN_PROGRESS">
                IN_PROGRESS
              </option>

              <option value="DONE">
                DONE
              </option>
            </select>
          </div>

          {/* ASSIGNEE */}
          <div>

            <p className="text-xs text-gray-500 mb-2">
              ASSIGNEE
            </p>

            <div className="flex items-center gap-2 mb-2">

              <Avatar
                name={
                  task.assignee?.name || "U"
                }
              />

              <span>
                {task.assignee?.name ||
                  "Unassigned"}
              </span>
            </div>

            <select
              className="w-full p-2 rounded bg-white"
              value={
                assigneeId || "unassigned"
              }
              onChange={(e) => {
                const value =
                  e.target.value ===
                  "unassigned"
                    ? null
                    : e.target.value;

                setValue(
                  "assignee_id",
                  value
                );

                handleFieldUpdate(
                  "assignee_id",
                  value
                );
              }}
            >
              <option value="unassigned">
                Unassigned
              </option>
            </select>
          </div>

          {/* CREATED BY */}
          <div>

            <p className="text-xs text-gray-500 mb-2">
              CREATED BY
            </p>

            <span>
              {task.created_by?.name}
            </span>
          </div>

          {/* DATES */}
          <div className="text-sm space-y-3">

            {/* DUE DATE */}
            <div className="flex justify-between items-center">

              <span className="text-gray-500">
                Due Date
              </span>

              <input
                type="date"
                {...register("due_date")}
                onChange={(e) => {
                  const value =
                    e.target.value || null;

                  setValue(
                    "due_date",
                    value
                  );

                  handleFieldUpdate(
                    "due_date",
                    value
                  );
                }}
              />
            </div>

            {/* CREATED */}
            <div className="flex justify-between">

              <span className="text-gray-500">
                Created At
              </span>

              <span>
                {formatDate(
                  task.created_at
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(TaskDetailsModal);