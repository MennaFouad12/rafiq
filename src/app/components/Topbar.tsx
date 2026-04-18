import { getAccessToken } from "@/lib/auth";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Topbar({ setMobileOpen }: any) {
  const user = useAppSelector((state) => state.user);


  return (
    <header className="bg-white border-b border-b-gray-200 p-4 flex items-center justify-between">
      {/* Burger يظهر في tablet + mobile */}
      <button
        className="md:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Image src="/images/Button.svg" alt="menu" width={24} height={24}></Image>
{/* <img src="/images/Button.svg" alt="menu" className="w-6 h-6" /> */}
      </button>

      {/* <h2 className="font-semibold">Dashboard</h2> */}
<Image src="/images/Logo.svg" alt="logo" width={100} height={100}></Image>
{user?.email  ?(
<div className="flex items-center gap-3">
  <div>
    <p className="font-medium text-sm">{user.name}</p>
    <p className="text-primary font-medium text-sm">Project Manager</p>
  </div>
      <div className="w-10 h-10 bg-primary font-bold text-white flex items-center justify-center rounded">
        {user.name?.charAt(0)} {user.name?.charAt(1)}
      </div>
      </div>): null
}
    </header>
  );
}