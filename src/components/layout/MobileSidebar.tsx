"use client";

import React from 'react';
import { X, Brain } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SidebarItem } from './SidebarItem';
import { navConfig, type UserRole } from './nav-config';

interface MobileSidebarProps {
  role: UserRole;
  open: boolean;
  onClose: () => void;
}

export function MobileSidebar({ role, open, onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  const navItems = navConfig[role];

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      />

      {/* Drawer */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-[280px] flex flex-col',
          'bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-md shadow-blue-200">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-900">Smart Learning</span>
              <span className="block text-[10px] text-slate-400 uppercase tracking-wide">
                {role === 'student' ? 'Étudiant' : role === 'designer' ? 'Concepteur' : 'Administrateur'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer le menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <SidebarItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={isActive}
                collapsed={false}
                badge={item.badge}
                onClick={onClose}
              />
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-100 px-4 py-4">
          <p className="text-[10px] text-slate-300 text-center">© 2026 Smart Learning</p>
        </div>
      </aside>
    </>
  );
}
