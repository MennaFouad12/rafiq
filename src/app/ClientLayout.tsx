"use client";

import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { get } from "http";
import { getAccessToken } from "@/lib/auth";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = useAppSelector((state) => state.user);
const router = useRouter();
  const isLoggedIn = !!user?.email; // أو user.id



  const [token, setToken] = useState<string | null>(null);


  useEffect(() => {
  setToken(getAccessToken() ?? null);

    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <div className="min-h-full flex flex-col">
      
    
    
        <Topbar setMobileOpen={setMobileOpen} />
      

      <div className="flex h-screen">
        
        
        {isLoggedIn && (
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <main className="overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}