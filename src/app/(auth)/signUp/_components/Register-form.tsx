"use client";

import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { signup } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { RegisterFormValues, registerSchema } from "@/lib/schemes/auth.schema";
import SharedTitle from "@/components/shared/shared-title";
import Input from "../../_components/shared-input";
import { ValidationChecker } from "../../_components/validation-checker";
import Button from "@/components/shared/Button";
import SubmissionError from "@/components/shared/submission-error";
import FormFooter from "../../_components/form-footer";
import { registerRules } from "@/lib/constant/auth.constants";




export default function RegisterForm() {
  const { register, handleSubmit, formState, control } =
    useForm<RegisterFormValues>({
      resolver: zodResolver(registerSchema),
    });


  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [errorMsg, setErrorMsg] = useState<string>("");
  const router = useRouter();


  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    setApiError("");


    try {
      const res = await signup(data.email, data.password, {
        name: data.name,
        department: data.jobTitle || "Not specified",
      });

      console.log("Signup success:", res);
      if ("error_code" in res) {
        setErrorMsg(res.msg);
        return;
      }

      setErrorMsg("");
      router.push("/login");

    } catch (err: any) {
      setApiError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };



  const passwordValue = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  return (
    <div className="max-w-xl mx-auto md:bg-white mt-12 md:px-12 px-6 mb-28 rounded-lg">
      <SharedTitle
        title="Create your workspace"
        subtitle={
          <>
            <span className="md:hidden">
              Join the curated environment for institutional trust and task
              precision.
            </span>
            <span className="hidden md:inline">
              Join the editorial approach to task management.
            </span>
          </>
        }
        className="md:text-center pt-12 pb-4"
        titleClassName="text-[1.75rem] md:text-3xl"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          mobileLabel="full name"
          label="name"
          placeholder="Enter your full name"
          hint="3-50 characters, letters only."
          error={formState.errors.name?.message}
          {...register("name")}
        />
        <Input
          type="email"
          label="email"
          placeholder="yourname@company.com"
          error={formState.errors.email?.message}
          {...register("email")}
        />
        <Input
          optional
          label="job title"
          placeholder="e.g. Project Manager"
          error={formState.errors.jobTitle?.message}
          {...register("jobTitle")}
        />
        <div className="md:grid md:grid-cols-2 gap-4">
          <Input
            label="password"
            placeholder="Minimum 8 characters"
            type="password"
            error={formState.errors.password?.message}
            {...register("password")}
          />
          <Input
            label="Confirm Password"
            placeholder="Minimum 8 characters"
            type="password"
            error={formState.errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>
        <ValidationChecker
          rules={registerRules}
          className="hidden md:block"
          password={passwordValue ?? ""}
        />
        {errorMsg && <SubmissionError error={errorMsg} />}
        <Button disabled={formState.isSubmitting} className="w-full mt-6">
          Create Account
        </Button>
        <FormFooter
          className="py-12"
          title="Already have an account?"
          link="Log in"
          href="/login"
        />
      </form>
    </div>
  );
}