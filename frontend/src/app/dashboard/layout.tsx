import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import { DashboardSidebar } from "./_components/dashboard-sidebar";
import { Separator } from "@/components/ui/separator";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">

        {/* Sidebar - Full Height */}
        <DashboardSidebar />

        {/* Right Content Area */}
        <SidebarInset className="flex flex-col flex-1 relative">

          {/* Fixed Header (only inside right area) */}
          <header className="sticky top-0 z-50 h-16 border-b bg-background flex items-center px-4">
            <SidebarTrigger className="-ml-1" />
        
          </header>

          {/* Scrollable Main */}
          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>

        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
