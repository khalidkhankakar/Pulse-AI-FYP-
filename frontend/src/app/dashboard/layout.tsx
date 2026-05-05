import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import React from "react";
import { DashboardSidebar } from "./_components/dashboard-sidebar";
import QueryClientWrapper from "@/components/providers/query-client-wrapper";



const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {


  return (
    <QueryClientWrapper>
    
    <SidebarProvider>
      <div className="flex h-screen w-full">

        {/* Sidebar - Full Height */}
        <DashboardSidebar />

        {/* Right Content Area */}
        <SidebarInset className="flex flex-col flex-1 relative">

          {/* Fixed Header (only inside right area) */}
          {/* <header className="sticky top-0 z-50 h-16! border-b bg-background flex items-center px-4">
            <SidebarTrigger className="-ml-1" />
        
          </header> */}

          {/* Scrollable Main */}
          <main className="flex-1 p-4">
            {children}
          </main>

        </SidebarInset>
      </div>
    </SidebarProvider>
      
    </QueryClientWrapper>
  );
};

export default DashboardLayout;
