
// "use client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function Home() {
//     const router = useRouter();

//   useEffect(() => {
//     const hash = window.location.hash;

//     if (!hash) return;

//     const params = new URLSearchParams(hash.replace("#", ""));
//     const type = params.get("type");

//     if (type === "recovery") {
      
//       router.push(`/resetPassword${hash}`);
//     }
//   }, []);
//   return (
//     <div>
// home
//     </div>
//   );
// }



"use client";
import { getAccessToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;

    // No hash = normal visit, redirect based on auth
    if (!hash) {
      const accessToken = getAccessToken()
      router.replace(accessToken ? "/projects" : "/login");
      return;
    }

    const params = new URLSearchParams(hash.replace("#", ""));

    const error = params.get("error");
    const errorCode = params.get("error_code");
    const errorDescription = params.get("error_description");

    if (error || errorCode) {
      const message = errorDescription
        ? decodeURIComponent(errorDescription.replace(/\+/g, " "))
        : "Invalid or expired reset link.";
      router.replace(`/reset-password?error=${encodeURIComponent(message)}`);
      return;
    }

    if (params.get("type") === "recovery") {
      const accessToken = params.get("access_token");
      if (accessToken) {
        router.replace(`/reset-password?access_token=${accessToken}`);
      } else {
        router.replace(
          `/reset-password?error=${encodeURIComponent("Invalid or expired reset link.")}`,
        );
      }
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null;
}