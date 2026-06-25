"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AppSidebar, SIDEBAR_EXPANDED_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from '@/components/layout/AppSidebar';
import { MobileSidebar } from '@/components/layout/MobileSidebar';
import { TopNavbar } from '@/components/layout/TopNavbar';
import { type UserRole } from '@/components/layout/nav-config';
import { roleLabels } from '@/components/layout/nav-config';

// ── Breakpoints ──────────────────────────────────────────────
const TABLET_BP = 1024; // lg  — below this: auto-collapse
const MOBILE_BP =  768; // md  — below this: use overlay drawer

function getRoleFromPath(pathname: string): UserRole {
  if (pathname.startsWith('/designer')) return 'designer';
  if (pathname.startsWith('/admin'))    return 'admin';
  return 'student';
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const role     = getRoleFromPath(pathname);

  // ── Sidebar state ────────────────────────────────────────
  // Start collapsed on tablet, expanded on desktop
  const [collapsed,   setCollapsed]   = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [isMobile,    setIsMobile]    = useState(false);
  const [isTablet,    setIsTablet]    = useState(false);

  useEffect(() => {
    function onResize() {
      const w = window.innerWidth;
      const mobile = w < MOBILE_BP;
      const tablet = w >= MOBILE_BP && w < TABLET_BP;
      setIsMobile(mobile);
      setIsTablet(tablet);
      // Auto-collapse on tablet
      if (tablet) setCollapsed(true);
      // On desktop, restore expanded
      if (w >= TABLET_BP) setCollapsed(prev => {
        // Only auto-expand if we were previously in tablet mode
        return prev;  // keep user's preference
      });
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close mobile drawer when navigating
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH;
  const roleInfo     = roleLabels[role];

  return (
    <div className="min-h-screen bg-slate-50/60">

      {/* ── Desktop sidebar (hidden on mobile) ── */}
      <div className="hidden md:block">
        <AppSidebar
          role={role}
          collapsed={collapsed}
          onToggle={() => setCollapsed(c => !c)}
        />
      </div>

      {/* ── Mobile / tablet drawer ── */}
      <MobileSidebar
        role={role}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* ── Main content — offset by sidebar width on md+ ── */}
      <div
        className="flex flex-col transition-all duration-300 ease-in-out"
        style={{ marginLeft: isMobile ? 0 : sidebarWidth }}
      >
        <TopNavbar
          onMenuToggle={() => setMobileOpen(o => !o)}
          userName={roleInfo.name}
          userRole={roleInfo.label}
          collapsed={collapsed}
          onSidebarToggle={() => setCollapsed(c => !c)}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
