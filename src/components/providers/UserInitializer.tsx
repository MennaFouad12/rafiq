"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/redux/hooks";
import { setUser, User } from "@/redux/features/user/userSlice";


export default function UserInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userCookie = Cookies.get("user");

    if (userCookie) {
      const user: User = JSON.parse(userCookie);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return null;
}