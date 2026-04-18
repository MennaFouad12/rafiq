"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { forgetPass } from "@/lib/auth";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPassword() {
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(300);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

const onSubmit = async (data: FormData) => {
  setLoading(true);
  setError("");

  try {
    await forgetPass(data.email); // 🔥 هنا الربط

    setSuccess(true); // يظهر success UI

    // countdown
    let t = 300;
    setTimer(t);

    const interval = setInterval(() => {
      t--;
      setTimer(t);
      if (t <= 0) clearInterval(interval);
    }, 1000);

  } catch (err: any) {
    setError(err.message); // ❌ لو فيه error
  } finally {
    setLoading(false);
  }
};

  const formatTime = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FB] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-md">
        
        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-1">
          Forgot password?
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          No worries, we’ll send you reset instructions.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-gray-500">
              EMAIL ADDRESS
            </label>
            <input
              {...register("email")}
              placeholder="Enter your email"
              className="w-full mt-1 p-2 rounded-sm focus:outline-none bg-surface-highest"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
                      className="w-full bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] shadow-[0px_1px_2px_0px_#0000000D]  text-white py-2 rounded-md "

          >
           {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back */}
        <p className="text-center text-sm mt-4 text-primary font-medium cursor-pointer">
          ←  Back to log in
        </p>

        {/* Success Message */}
        {success && (
          <div className="mt-6 space-y-3">
            <div className="bg-green-100 text-green-700 text-sm p-3 rounded-md flex items-start">
              <Image src="/images/true.svg" className="mx-3" width={20} height={20} alt="check"></Image>
               If an account exists with this email, we’ve sent a password reset link.
            </div>

            <div className="text-center mt-5 font-bold text-xs text-gray-500">
              DIDN’T RECEIVE THE EMAIL?
            </div>

            <button
              disabled={timer > 0}
                          className="w-full flex justify-center bg-surface-low  text-gray-500 font-medium py-2 rounded-md "

            >
              <Image src="/images/container.svg" className="mx-3" width={20} height={20} alt="reload"></Image>
              <p>
              {timer > 0
                ? `Resend in ${formatTime(timer)}`
                : "Resend Email"}
                </p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}