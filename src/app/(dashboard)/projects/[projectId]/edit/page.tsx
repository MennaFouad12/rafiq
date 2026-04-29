


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
