"use client";

import { LoginFormValues, loginSchema } from "@/lib/schemes/auth.schema";
import { useAppDispatch } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
// import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../../components/shared/shared-input";
import SharedTitle from "@/components/shared/shared-title";
import Link from "next/link";
import SubmissionError from "@/components/shared/submission-error";
import FormFooter from "../../_components/form-footer";
import Button from "@/components/shared/Button";
import { setUser } from "@/redux/features/user/userSlice";
import { Signin } from "@/lib/auth";
import RightChevron from "@/components/icons/right-chevron";
import LockIcon from "@/components/icons/LockIcon";
import MailIcon from "@/components/icons/MailIcon";

// import Input from "@/components/ui/shared-input";
// import SharedTitle from "@/components/shared/shared-title";
// import Button from "@/components/ui/button";
// import FormFooter from "../../_components/form-footer";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { LoginFormValues, loginSchema } from "@/lib/schemes/auth.schema";
// import { useForm } from "react-hook-form";
// import { loginAction } from "@/lib/actions/auth.actions";
// import { useState } from "react";
// import SubmissionError from "@/components/shared/submission-error";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import MailIcon from "@/components/icons/mail-icon";
// import LockIcon from "@/components/icons/lock-icon";
// import RightArrow from "@/components/icons/right-arrow";
// import { useAppDispatch } from "@/lib/store/hooks";
// import { setUser } from "@/lib/store/slices/user-slice";

export default function LoginForm() {
  const { register, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onSubmit = async (data: LoginFormValues) => {


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
          
  const callbackUrl = searchParams.get("callbackUrl") || "/projects";
      router.replace(callbackUrl);
    
          // redirect
    
    
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
    
  };

  return (
    <div className="max-w-120 mx-auto md:bg-white mt-12 px-12 mb-28 rounded-lg">
      <SharedTitle
        title="Welcome Back"
        subtitle="Please enter your details to access your workspace"
        className="text-center pt-12 pb-4"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          mobileLabel="email address"
          label="email"
          placeholder="yourname@company.com"
          error={formState.errors.email?.message}
          rightIcon={<MailIcon />}
          iconClassName="lg:hidden"
          {...register("email")}
        />

        <Input
          label="password"
          placeholder="Enter your password"
          type="password"
          link="forgot?"
          href="/forgot-password"
          rightIcon={<LockIcon />}
          iconClassName="lg:hidden"
          error={formState.errors.password?.message}
          {...register("password")}
        />

        <div className="flex items-center my-8 justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="
    appearance-auto
    w-4 h-4
    border-2 border-gray-300  
    rounded-xs
    bg-surface-low                   
    checked:bg-surface-highest    
    cursor-pointer transition-colors
  "
              {...register("rememberMe")}
            />

            <label className="ms-2">Remember Me</label>
          </div>

          <Link
            className="text-primary font-medium text-sm hidden md:block"
            href={"/forgetPass"}
          >
            Forgot Password?
          </Link>
        </div>

        {errorMsg && <SubmissionError error={errorMsg} />}
        <Button
          rightIcon={<RightChevron />}
          iconClassName="sm:hidden"
          disabled={formState.isSubmitting}
          className="w-full gap-2"
        >
          <span className="sm:hidden">Sign in</span>{" "}
          <span className="hidden sm:inline">Log in</span>
        </Button>
        <FormFooter
          className="py-12"
          title="Don't have an account?"
          link="Sign Up"
          href="/signUp"
        />
      </form>
    </div>
  );
}