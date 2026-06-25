"use client";

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  collapsed: boolean;
  badge?: number;
  onClick?: () => void;
}

export function SidebarItem({
  href,
  icon,
  label,
  isActive,
  collapsed,
  badge,
  onClick,
}: SidebarItemProps) {
  const linkContent = (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        // Base layout
        'relative flex items-center gap-3 rounded-xl px-3 py-2.5',
        'text-sm font-medium transition-all duration-200',
        // Default state
        'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900',
        // Active state
        isActive && [
          'bg-blue-50 text-blue-700',
          'shadow-[inset_0_0_0_1px_rgba(59,130,246,0.3)]',
          'hover:bg-blue-50 hover:text-blue-700',
        ],
        // Collapsed: center icon
        collapsed && 'justify-center px-0',
      )}
    >
      {/* Icon */}
      <span
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center transition-colors duration-200',
          isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600',
        )}
      >
        {icon}
      </span>

      {/* Label — fade out when collapsed */}
      <span
        className={cn(
          'truncate transition-all duration-300',
          collapsed ? 'w-0 overflow-hidden opacity-0' : 'opacity-100',
        )}
      >
        {label}
      </span>

      {/* Badge */}
      {badge !== undefined && badge > 0 && (
        <span
          className={cn(
            'ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full',
            'bg-red-500 px-1 text-[10px] font-bold text-white',
            'transition-all duration-300',
            collapsed && 'absolute -right-1 -top-1 ml-0 h-4 min-w-[16px]',
          )}
        >
          {badge}
        </span>
      )}

      {/* Active left indicator */}
      {isActive && (
        <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-blue-600" />
      )}
    </Link>
  );

  // In collapsed mode, wrap the item in a tooltip
  if (collapsed) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {label}
            {badge !== undefined && badge > 0 && (
              <span className="ml-1.5 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                {badge}
              </span>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return linkContent;
}
