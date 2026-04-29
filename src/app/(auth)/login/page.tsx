"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { Signin } from "@/lib/auth";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/user/userSlice";
import { useRouter } from "next/navigation";

const schema = z
  .object({

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email"),

    password: z
      .string()
      .min(1, "Password is required"),

  })

type FormData = z.infer<typeof schema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");
  // const [success, setSuccess] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onSubmit = async (data: FormData) => {
    console.log(data);
    setLoading(true);
    setError("");

    try {
      const user = await Signin(data.email, data.password);
      console.log(user);

      dispatch(
        setUser({
          id: user.id,
          name: user.user_metadata.name,
          email: user.email,
          department: user.user_metadata.department,
          role: user.role,
        }),
      );
      
      router.push("/projects");
      console.log("User:", user);

      // redirect


    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-125 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-1">
          Welcome Back
        </h2>
        <p className="text-sm text-neutral text-center mb-6">
          Please enter your details to access your workspace
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">



          {/* Email */}
          <div>
            <label className=" text-neutral text-sm font-bold ">Email</label>

            <input
              {...register("email")}
              placeholder="yourname@company.com"
              className="w-full mt-1 p-2 rounded-sm focus:outline-none bg-surface-highest"

            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>




          {/* Password */}
          <div className="mb-4">
            <div>
              <label className=" text-neutral text-sm font-bold ">Password</label>

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


          </div>
          <div className="flex justify-between">
            <div>
              <input type="checkbox" className="accent-primary sclale-150 " />

              <label className=" text-neutral  mx-3 ">Remember me</label>
            </div>

            <Link href="/forgetPass" className="text-primary">Forgot Password ?</Link>
          </div>



          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] shadow-[0px_1px_2px_0px_#0000000D]  text-white py-2 rounded-md "
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-neutral">
          Don't have an account? {" "}
          <Link href="/signUp">   <span className="text-primary cursor-pointer font-bold">Sign Up</span></Link>

        </p>
      </div>
    </div>
  );
}