import SideBar from "@/components/Sidebar";
// import { SidebarProvider } from "../../context/sidebar-context";
import Topbar from "@/components/Topbar";
import { SidebarProvider } from "@/context/sidebar-context";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <SideBar />

        <div className="flex flex-col flex-1 h-full overflow-hidden">
        
          <Topbar />

          {/* Page Content */}
          <main className="flex-1 p-8 bg-background overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
      {/* <BottomNav /> */}
    </SidebarProvider>
  );
}