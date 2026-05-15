"use client";

import Logo from "@/components/Logo";
import { acceptInvite } from "@/lib/projects";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function InviteContent() {
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAccept = async () => {
    try {
      setLoading(true);
      setError("");

      await acceptInvite(token as string);

      alert("Invitation accepted");

      router.push("/projects");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <p>Invalid invitation link</p>;
  }

  return (
    <div className="flex flex-col bg-surface-low items-center justify-center h-screen">
      <Logo />

      <div className="bg-white border-t-4 mt-5 border-primary p-8 text-center">
        <p className="text-sm mb-5 font-medium mx-auto text-gray-600 bg-surface-highest px-4 w-fit py-1 rounded-xl">
          New Project Invitation
        </p>

        <h3 className="font-bold text-xl mb-6">
          You've been invited to join new project
        </h3>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          onClick={handleAccept}
          disabled={loading}
          className="bg-[linear-gradient(95.71deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] text-white w-full px-6 py-2"
        >
          {loading ? "Accepting..." : "Accept Invitation"}
        </button>
      </div>
    </div>
  );
}