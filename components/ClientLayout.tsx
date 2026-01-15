"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <main 
      className={`flex-1 h-screen overflow-y-auto bg-white dark:bg-black relative transition-all duration-300 ease-in-out ${
        isCollapsed ? 'md:ml-[80px]' : 'md:ml-[280px]'
      }`}
    >
      <div className="p-8 md:p-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        {children}
      </div>
    </main>
  );
}
