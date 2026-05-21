"use client";


import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { useState } from "react";
import SubmissionError from "@/components/shared/submission-error";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import AddMemberIcon from "@/components/icons/AddMember-icon";
import Input from "@/components/shared/shared-input";
import Button from "@/components/shared/Button";
import TextArea from "@/components/shared/textarea";
import { addProjectSchema, ProjectFormValues } from "@/lib/schemes/projects.schema";
import ExclaimMarkIcon from "@/components/icons/exclaim-mark-icon";
import Header from "./header";
import FormHeader from "../addProject/_components/form-header";
import FormFooter from "../addProject/_components/form-footer";
import { createProject, updateProject } from "@/lib/projects";

type Mode = "add" | "edit";

interface ProjectFormProps {
  mode?: Mode;
  defaultValues?: Partial<ProjectFormValues>;
  projectId?: string;
}

const config = {
  add: {
    title: "Add New Project",
    submitLabel: "Create Project",
    successMessage: "Project created successfully",
    redirectPath: "/projects",
  },
  edit: {
    title: "Edit Project",
    submitLabel: "Save Changes",
    successMessage: "Project updated successfully",
    redirectPath: "/projects",
  },
} satisfies Record<Mode, object>;

export default function ProjectForm({
  mode = "add",
  defaultValues,
  projectId,
}: ProjectFormProps) {
  const router = useRouter();
  const { title, submitLabel, successMessage, redirectPath } = config[mode];

  const { register, handleSubmit, formState } = useForm<ProjectFormValues>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? undefined,
    },
  });

  const [error, setError] = useState<string | undefined>();

const onSubmit = async (data: ProjectFormValues) => {
  try {
    if (mode === "edit" && projectId) {
      await updateProject(data, projectId);
    } else {
      await createProject(data);
    }

    toast.success(successMessage);

    setTimeout(() => {
      router.push(redirectPath);
    }, 1000);
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : "Something went wrong"
    );
  }
};

  return (
    <div>
      <Header
        className="md:flex hidden"
        title={title}
        buttonText="Invite Member"
        leftIcon={<AddMemberIcon />}
      />
      <div className="md:bg-white max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormHeader
            title={mode == "edit" ? "Edit Project" : "Initialize New Project"}
          />

          <div className="md:p-8 p-6">
            <Input
              label="Project TITLE"
              placeholder="project title"
              {...register("name")}
              error={formState.errors.name?.message}
              errorIcon={<ExclaimMarkIcon />}
            />
            <TextArea
              label="Description"
              optional
              className="min-h-37"
              placeholder="Provide a high-level overview..."
              {...register("description")}
              error={formState.errors.description?.message}
              maxLength={500}
            />
            {error && <SubmissionError error={error} />}
            <div className="flex justify-between items-center mt-14 flex-col-reverse md:flex-row">
              <Button
                type="button"
                disabled={formState.isSubmitting}
                onClick={() => router.back()}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                className="px-8 w-full md:w-fit"
                disabled={formState.isSubmitting}
              >
                {submitLabel}
              </Button>
            </div>
          </div>

          <FormFooter />
        </form>
      </div>
    </div>
  );
}