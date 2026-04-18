"use client";

import { useEffect } from "react";
import { getAccessToken, fetchWithAuth } from "@/lib/auth";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/user/userSlice";

export default function AuthInitializer({ children }: any) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function loadUser() {
      const token = getAccessToken();

      if (!token) return;

      try {
        const res = await fetchWithAuth(
          "https://lwsctewpcxlvwjixzdky.supabase.co/auth/v1/user"
        );

        const user = await res.json();

        dispatch(
          setUser({
            name: user.user_metadata?.name || null,
            email: user.email || null,
          })
        );
      } catch (err) {
        console.log("Auth restore failed");
      }
    }

    loadUser();
  }, []);

  return children;
}