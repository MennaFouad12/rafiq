"use client";

import { useRouter } from "next/navigation";
// import { useAppDispatch } from "@/lib/store/hooks";
// import { clearUser } from "@/lib/store/slices/user-slice";

import { useAppDispatch } from "@/redux/hooks";
import { clearUser } from "@/redux/features/user/userSlice";
import { logout } from "../auth";

export function useLogout() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    dispatch(clearUser());
    router.push("/login");
  };

  return { handleLogout };
}