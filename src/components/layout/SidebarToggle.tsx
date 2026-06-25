"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarToggleProps {
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export function SidebarToggle({ collapsed, onToggle, className }: SidebarToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={collapsed ? 'Développer le menu' : 'Réduire le menu'}
      className={cn(
        // Floating pill button on the right edge of the sidebar
        "absolute -right-3 top-[72px] z-50",
        "flex h-6 w-6 items-center justify-center",
        "rounded-full border border-slate-200 bg-white shadow-md",
        "text-slate-500 transition-all duration-200",
        "hover:border-blue-400 hover:text-blue-600 hover:shadow-blue-100 hover:shadow-lg",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        className
      )}
    >
      {collapsed
        ? <ChevronRight className="h-3.5 w-3.5" />
        : <ChevronLeft  className="h-3.5 w-3.5" />
      }
    </button>
  );
}
