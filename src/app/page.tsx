
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) return;

    const params = new URLSearchParams(hash.replace("#", ""));
    const type = params.get("type");

    if (type === "recovery") {
      
      router.push(`/resetPassword${hash}`);
    }
  }, []);
  return (
    <div>
home
    </div>
  );
}
