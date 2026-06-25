"use client";

import React from 'react';
import { Bell, Search, Menu, LogOut, User, Settings, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TopNavbarProps {
  /** Opens the mobile drawer */
  onMenuToggle?: () => void;
  /** Toggles collapsed state on desktop (shows a PanelLeft icon button) */
  onSidebarToggle?: () => void;
  collapsed?: boolean;
  userName?: string;
  userRole?: string;
}

export function TopNavbar({
  onMenuToggle,
  onSidebarToggle,
  collapsed = false,
  userName  = 'Ahmed Benali',
  userRole  = 'Étudiant',
}: TopNavbarProps) {
  const initials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur-sm md:px-6">

      {/* ── Mobile hamburger ── */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden shrink-0"
        onClick={onMenuToggle}
        aria-label="Ouvrir le menu"
      >
        <Menu className="h-5 w-5 text-slate-600" />
      </Button>

      {/* ── Desktop sidebar panel toggle ── */}
      <Button
        variant="ghost"
        size="icon"
        className="hidden md:flex shrink-0 text-slate-400 hover:text-slate-700"
        onClick={onSidebarToggle}
        aria-label={collapsed ? 'Développer le menu' : 'Réduire le menu'}
      >
        <PanelLeft className="h-5 w-5" />
      </Button>

      {/* ── Search bar ── */}
      <div className="hidden flex-1 max-w-md sm:flex">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Rechercher un cours, un chapitre…"
            className="w-full rounded-xl border-0 bg-slate-100 pl-9 text-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 sm:hidden" />

      {/* ── Right section ── */}
      <div className="flex items-center gap-2">

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative text-slate-600">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm">
            3
          </span>
        </Button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 rounded-xl px-2 hover:bg-slate-50">
              <Avatar className="h-8 w-8 ring-2 ring-blue-100">
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-[11px] font-bold text-blue-700">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start sm:flex">
                <span className="text-sm font-semibold text-slate-900 leading-tight">{userName}</span>
                <span className="text-[10px] text-slate-400 leading-tight">{userRole}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-lg">
            <DropdownMenuLabel className="font-semibold text-slate-800">Mon Compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer">
              <User className="h-4 w-4 text-slate-500" />
              <span>Profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer">
              <Settings className="h-4 w-4 text-slate-500" />
              <span>Paramètres</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
              <LogOut className="h-4 w-4" />
              <span>Déconnexion</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
