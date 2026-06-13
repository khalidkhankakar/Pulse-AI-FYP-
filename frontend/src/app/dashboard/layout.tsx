import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import React from "react";
import { DashboardSidebar } from "./_components/dashboard-sidebar";
import QueryClientWrapper from "@/components/providers/query-client-wrapper";
import DashboardHeader from "./_components/dashboard-header";
import { ProtectedLayout } from "@/components/protected-layout";



const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {


  return (
    <ProtectedLayout>
      <QueryClientWrapper>
      
      <SidebarProvider>
        <div className="flex h-screen w-full">

          {/* Sidebar - Full Height */}
          <DashboardSidebar />

          {/* Right Content Area */}
          <SidebarInset className="flex flex-col flex-1 relative">
            <DashboardHeader />

            {/* Fixed Header (only inside right area) */}
            {/* <header className="sticky top-0 z-50 h-16! border-b bg-background flex items-center px-4">
              <SidebarTrigger className="-ml-1" />
          
            </header> */}

            {/* Scrollable Main */}
            <main className="flex-1 p-4 md:p-6 lg:p-8 xl:p-10 max-w-7xl mx-auto w-full">
              {children}
            </main>

          </SidebarInset>
        </div>
      </SidebarProvider>
        
      </QueryClientWrapper>
    </ProtectedLayout>
  );
};

export default DashboardLayout;
