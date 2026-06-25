// ============================================================
// Centralised navigation configuration for all roles.
// All sidebar components (desktop + mobile) import from here.
// ============================================================

import React from 'react';
import {
  LayoutDashboard, BookOpen, MessageSquare, HelpCircle, TrendingUp,
  Upload, Layers, ClipboardCheck, BarChart3, AlertTriangle,
  Users, Shield, GraduationCap, Settings, UserCheck, User,
} from 'lucide-react';

export type UserRole = 'student' | 'designer' | 'admin';

export interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export const navConfig: Record<UserRole, NavItem[]> = {
  student: [
    { href: '/student/dashboard', label: 'Tableau de bord',  icon: <LayoutDashboard className="h-[18px] w-[18px]" /> },
    { href: '/student/courses',   label: 'Mes Cours',         icon: <BookOpen         className="h-[18px] w-[18px]" /> },
    { href: '/student/chat/c1',   label: 'Tuteur Virtuel',   icon: <MessageSquare     className="h-[18px] w-[18px]" /> },
    { href: '/student/quiz/c1',   label: 'Quiz',              icon: <HelpCircle        className="h-[18px] w-[18px]" /> },
    { href: '/student/progress',  label: 'Progression',       icon: <TrendingUp        className="h-[18px] w-[18px]" /> },
  ],

  designer: [
    { href: '/designer/dashboard',        label: 'Tableau de bord',     icon: <LayoutDashboard  className="h-[18px] w-[18px]" /> },
    { href: '/designer/courses',          label: 'Cours',               icon: <BookOpen          className="h-[18px] w-[18px]" /> },
    { href: '/designer/upload',           label: 'Importer un cours',   icon: <Upload            className="h-[18px] w-[18px]" /> },
    { href: '/designer/structure/c1',     label: 'Structurer le contenu', icon: <Layers          className="h-[18px] w-[18px]" /> },
    { href: '/designer/quiz-validation',  label: 'Valider les quiz',    icon: <ClipboardCheck    className="h-[18px] w-[18px]" />, badge: 3 },
    { href: '/designer/course-students',  label: 'Étudiants par cours', icon: <UserCheck         className="h-[18px] w-[18px]" /> },
    { href: '/designer/analytics',        label: 'Analytiques',         icon: <BarChart3         className="h-[18px] w-[18px]" /> },
    { href: '/designer/students-risk',    label: 'Étudiants à risque',  icon: <AlertTriangle     className="h-[18px] w-[18px]" />, badge: 2 },
    { href: '/designer/settings',         label: 'Paramètres',          icon: <Settings          className="h-[18px] w-[18px]" /> },
  ],

  admin: [
    { href: '/admin/dashboard', label: 'Tableau de bord', icon: <LayoutDashboard className="h-[18px] w-[18px]" /> },
    { href: '/admin/users',     label: 'Utilisateurs',    icon: <Users            className="h-[18px] w-[18px]" /> },
    { href: '/admin/roles',     label: 'Rôles',           icon: <Shield           className="h-[18px] w-[18px]" /> },
    { href: '/admin/classes',   label: 'Classes',         icon: <GraduationCap    className="h-[18px] w-[18px]" /> },
    { href: '/admin/settings',  label: 'Paramètres',      icon: <Settings         className="h-[18px] w-[18px]" /> },
  ],
};

export const roleLabels: Record<UserRole, { label: string; name: string; initials: string }> = {
  student:  { label: 'Étudiant',                name: 'Ahmed Benali',        initials: 'AB' },
  designer: { label: 'Concepteur Pédagogique',  name: 'Dr. Karim Mansouri',  initials: 'KM' },
  admin:    { label: 'Administrateur',           name: 'Admin Système',       initials: 'AS' },
};
