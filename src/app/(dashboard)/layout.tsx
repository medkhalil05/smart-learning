"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { TopNavbar } from '@/components/layout/TopNavbar';
import { cn } from '@/lib/utils';

type UserRole = 'student' | 'designer' | 'admin';

function getRoleFromPath(pathname: string): UserRole {
  if (pathname.startsWith('/designer')) return 'designer';
  if (pathname.startsWith('/admin')) return 'admin';
  return 'student';
}

const roleNames: Record<UserRole, { name: string; label: string }> = {
  student: { name: 'Ahmed Benali', label: 'Étudiant' },
  designer: { name: 'Dr. Karim Mansouri', label: 'Concepteur Pédagogique' },
  admin: { name: 'Admin Système', label: 'Administrateur' },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const role = getRoleFromPath(pathname);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile by default */}
      <div className={cn("hidden lg:block", mobileOpen && "!block")}>
        <AppSidebar
          role={role}
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* Main Content */}
      <div className={cn("transition-all duration-300", collapsed ? "lg:ml-[70px]" : "lg:ml-[260px]")}>
        <TopNavbar
          onMenuToggle={() => setMobileOpen(!mobileOpen)}
          userName={roleNames[role].name}
          userRole={roleNames[role].label}
        />
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
