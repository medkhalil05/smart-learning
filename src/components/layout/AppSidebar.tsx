"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, BookOpen, MessageSquare, HelpCircle, TrendingUp,
  Upload, FileText, ClipboardCheck, BarChart3, AlertTriangle,
  Users, Shield, GraduationCap, Settings, ChevronLeft, ChevronRight,
  Brain, Layers, UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type UserRole = 'student' | 'designer' | 'admin';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const studentNav: NavItem[] = [
  { title: 'Tableau de bord', href: '/student/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { title: 'Mes Cours', href: '/student/courses', icon: <BookOpen className="h-5 w-5" /> },
  { title: 'Tuteur Virtuel', href: '/student/chat/c1', icon: <MessageSquare className="h-5 w-5" /> },
  { title: 'Quiz', href: '/student/quiz/c1', icon: <HelpCircle className="h-5 w-5" /> },
  { title: 'Progression', href: '/student/progress', icon: <TrendingUp className="h-5 w-5" /> },
];

const designerNav: NavItem[] = [
  { title: 'Tableau de bord', href: '/designer/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { title: 'Cours', href: '/designer/courses', icon: <BookOpen className="h-5 w-5" /> },
  { title: 'Importer un cours', href: '/designer/upload', icon: <Upload className="h-5 w-5" /> },
  { title: 'Structurer le contenu', href: '/designer/structure/c1', icon: <Layers className="h-5 w-5" /> },
  { title: 'Valider les quiz', href: '/designer/quiz-validation', icon: <ClipboardCheck className="h-5 w-5" />, badge: 3 },
  { title: 'Analytiques', href: '/designer/analytics', icon: <BarChart3 className="h-5 w-5" /> },
  { title: 'Étudiants par cours', href: '/designer/course-students', icon: <UserCheck className="h-5 w-5" /> },
  { title: 'Étudiants à risque', href: '/designer/students-risk', icon: <AlertTriangle className="h-5 w-5" />, badge: 2 },
];

const adminNav: NavItem[] = [
  { title: 'Tableau de bord', href: '/admin/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { title: 'Utilisateurs', href: '/admin/users', icon: <Users className="h-5 w-5" /> },
  { title: 'Rôles', href: '/admin/roles', icon: <Shield className="h-5 w-5" /> },
  { title: 'Classes', href: '/admin/classes', icon: <GraduationCap className="h-5 w-5" /> },
  { title: 'Paramètres', href: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
];

const roleLabels: Record<UserRole, string> = {
  student: 'Étudiant',
  designer: 'Concepteur Pédagogique',
  admin: 'Administrateur',
};

interface AppSidebarProps {
  role: UserRole;
  collapsed?: boolean;
  onToggle?: () => void;
}

export function AppSidebar({ role, collapsed = false, onToggle }: AppSidebarProps) {
  const pathname = usePathname();

  const navItems = role === 'student' ? studentNav : role === 'designer' ? designerNav : adminNav;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-slate-200 bg-white transition-all duration-300 flex flex-col",
        collapsed ? "w-[70px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-200 shrink-0">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white shrink-0">
          <Brain className="h-5 w-5" />
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-base text-slate-900 truncate">Smart Learning</span>
            <span className="text-[10px] text-slate-400 truncate">{roleLabels[role]}</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                isActive
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <span className={cn("shrink-0", isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")}>
                {item.icon}
              </span>
              {!collapsed && (
                <>
                  <span className="truncate">{item.title}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && item.badge && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="shrink-0 border-t border-slate-200 p-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span className="text-xs text-slate-400">Réduire</span>}
        </Button>
      </div>
    </aside>
  );
}
