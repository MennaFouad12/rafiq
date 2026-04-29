"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { signup } from "@/lib/auth";
import { useRouter } from "next/navigation";

const schema = z
  .object({
    name: z.string().min(3, "Name is required").max(50,"Name is too long").regex(
    /^[\p{L}]+(?: [\p{L}]+)*$/u,
    "Name can only contain letters and single spaces between words"),
    email: z.string().email("Invalid email"),
    jobTitle: z.string().min(2, "Job title is required"),
    password: z.string().min(8, "Minimum 8 characters").max(64,"Password is too long").regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[^\s]+$/,
    "Password must include uppercase, lowercase, number, special character, and no spaces"
  ),
    confirmPassword: z.string(),
    accountType: z.enum(["business", "personal", "other"], {
        message: "Select account type",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
const [apiError, setApiError] = useState("");
const [success, setSuccess] = useState("");
const router = useRouter();
  const onSubmit = async (data: FormData) => {
  setLoading(true);
  setApiError("");
  setSuccess("");

  try {
    const res = await signup(data.email, data.password, {
      name: data.name,
      department: data.jobTitle || "Not specified",
    });

    console.log("Signup success:", res);

    setSuccess("Account created successfully ");
        router.push("/login");

  } catch (err: any) {
    setApiError(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-125 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-1">
          Create your workspace
        </h2>
        <p className="text-sm text-neutral text-center mb-6">
          Join the editorial approach to tasks management.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="mb-4">
            <label className= " text-neutral text-sm font-bold ">Name</label>
            <input
              {...register("name")}
              placeholder="Enter your full name"
              className="w-full mt-1 p-2 rounded-sm focus:outline-none bg-surface-highest"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
                        <label className= " text-neutral text-sm font-bold ">Email</label>

            <input
              {...register("email")}
              placeholder="yourname@company.com"
                            className="w-full mt-1 p-2 rounded-sm focus:outline-none bg-surface-highest"

            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Job Title */}
          <div>
                        <label className= " text-neutral text-sm font-bold ">Job Title (Optional)</label>

            <input
              {...register("jobTitle")}
              placeholder="e.g. Project Manager"
                            className="w-full mt-1 p-2 rounded-sm focus:outline-none bg-surface-highest"

            />
            {errors.jobTitle && (
              <p className="text-red-500 text-xs">
                {errors.jobTitle.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="grid grid-cols-2 gap-2">
            <div>
                          <label className= " text-neutral text-sm font-bold ">Password</label>

              <input
                type="password"
                {...register("password")}
                placeholder="Minimum 8 characters"
                            className="w-full mt-1 p-2 rounded-sm focus:outline-none bg-surface-highest"

              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
                          <label className= " text-neutral text-sm font-bold ">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Repeat your password"
                              className="w-full mt-1 p-2 rounded-sm focus:outline-none bg-surface-highest"

              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Radio Buttons */}
          <div className="bg-surface-highest p-3 rounded-md space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value="business"
                {...register("accountType")}
              />
              A business account
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value="personal"
                {...register("accountType")}
              />
              One person account
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value="other"
                {...register("accountType")}
              />
              Other
            </label>

            {errors.accountType && (
              <p className="text-red-500 text-xs">
                {errors.accountType.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
             disabled={loading}
            className="w-full bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] shadow-[0px_1px_2px_0px_#0000000D]  text-white py-2 rounded-md "
          >
          {loading ? "Creating..." : "Create Account"}
          </button>
          {apiError && (
  <p className="text-red-500 text-sm text-center mt-2">
    {apiError}
  </p>
)}

{success && (
  <p className="text-green-600 text-sm text-center mt-2">
    {success}
  </p>
)}
        </form>

        <p className="text-sm text-center mt-6 text-neutral">
          Already have an account?{" "}
          <Link href="/login"><span className="text-primary cursor-pointer font-bold">Log in</span></Link>
          
        </p>
      </div>
    </div>
  );
}