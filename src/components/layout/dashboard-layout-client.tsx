"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function DashboardLayoutClient({
  children,
  defaultCollapsed = false,
}: {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(defaultCollapsed);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleSidebar = () => {
    // On mobile, the toggle button should close the mobile menu
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      return;
    }

    // On desktop, toggle the collapsed state
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    document.cookie = `sidebar:state=${newState}; path=/; max-age=31536000`;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background relative">
      {/* Mobile Menu Trigger */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-3 z-40 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={cn(
          "h-full z-40 transition-transform duration-300 ease-in-out md:translate-x-0 md:bg-transparent md:static",
          // Mobile styles
          "fixed inset-y-0 left-0 bg-background shadow-xl md:shadow-none border-r",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar
          // On mobile, always show full sidebar (never collapsed)
          // On desktop, respect the user's preference
          isCollapsed={isMobileMenuOpen ? false : sidebarCollapsed}
          onToggle={toggleSidebar}
        />
      </div>

      <main className="flex-1 overflow-hidden relative flex flex-col w-full">
        {/* Mobile Header Spacer - ensure content doesn't go under the button if needed, 
            though usually header handles this. 
            For now, we let children handle their top spacing or existing headers. */}
        {children}
      </main>
    </div>
  );
}
