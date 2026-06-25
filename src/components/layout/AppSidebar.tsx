"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarItem } from './SidebarItem';
import { SidebarToggle } from './SidebarToggle';
import { navConfig, roleLabels, type UserRole } from './nav-config';

// ──────────────────────────────────────────────────────────────
// Width constants (kept in sync with the layout margin logic)
// ──────────────────────────────────────────────────────────────
export const SIDEBAR_EXPANDED_WIDTH  = 260;  // px
export const SIDEBAR_COLLAPSED_WIDTH =  72;  // px

interface AppSidebarProps {
  role: UserRole;
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ role, collapsed, onToggle }: AppSidebarProps) {
  const pathname  = usePathname();
  const navItems  = navConfig[role];
  const roleInfo  = roleLabels[role];

  return (
    <aside
      className={cn(
        // Layout
        'fixed left-0 top-0 z-40 flex h-screen flex-col',
        // Visual
        'border-r border-slate-100 bg-white',
        'shadow-[2px_0_12px_rgba(0,0,0,0.04)]',
        // Transition
        'transition-all duration-300 ease-in-out',
        // Width
        collapsed
          ? `w-[${SIDEBAR_COLLAPSED_WIDTH}px]`
          : `w-[${SIDEBAR_EXPANDED_WIDTH}px]`,
      )}
      // Also drive the width via inline style so Tailwind JIT doesn't purge dynamic values
      style={{ width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH }}
    >
      {/* ── Toggle button (floats on right edge) ── */}
      <SidebarToggle collapsed={collapsed} onToggle={onToggle} />

      {/* ── Logo / Brand ── */}
      <div
        className={cn(
          'flex h-16 shrink-0 items-center border-b border-slate-100 transition-all duration-300',
          collapsed ? 'justify-center px-3' : 'gap-3 px-5',
        )}
      >
        {/* Icon mark */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-md shadow-blue-200">
          <Brain className="h-5 w-5 text-white" />
        </div>

        {/* Word-mark — fades out when collapsed */}
        <div
          className={cn(
            'min-w-0 transition-all duration-300',
            collapsed ? 'w-0 overflow-hidden opacity-0' : 'opacity-100',
          )}
        >
          <span className="block truncate text-[15px] font-bold leading-tight text-slate-900">
            Smart Learning
          </span>
          <span className="block truncate text-[10px] uppercase tracking-wide text-slate-400">
            {roleInfo.label}
          </span>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav
        className={cn(
          'flex-1 overflow-x-hidden overflow-y-auto py-4 space-y-0.5',
          collapsed ? 'px-2' : 'px-3',
        )}
      >
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={isActive}
              collapsed={collapsed}
              badge={item.badge}
            />
          );
        })}
      </nav>

      {/* ── User footer ── */}
      <div
        className={cn(
          'shrink-0 border-t border-slate-100 transition-all duration-300',
          collapsed ? 'px-2 py-3' : 'px-4 py-3',
        )}
      >
        <div
          className={cn(
            'flex items-center rounded-xl p-2 transition-colors hover:bg-slate-50 cursor-pointer',
            collapsed ? 'justify-center' : 'gap-3',
          )}
        >
          {/* Avatar */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-[11px] font-bold text-blue-700 ring-2 ring-white shadow-sm">
            {roleInfo.initials}
          </div>

          {/* Name + role */}
          <div
            className={cn(
              'min-w-0 flex-1 transition-all duration-300',
              collapsed ? 'w-0 overflow-hidden opacity-0' : 'opacity-100',
            )}
          >
            <p className="truncate text-[13px] font-semibold text-slate-800">{roleInfo.name}</p>
            <p className="truncate text-[10px] text-slate-400">{roleInfo.label}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
