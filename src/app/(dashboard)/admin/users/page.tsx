"use client";

import React, { useState } from 'react';
import { Plus, Edit3, Ban, Shield, Users, BookOpen, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AnalyticsCard } from '@/components/shared/AnalyticsCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { DataTable } from '@/components/shared/DataTable';
import { mockUsers } from '@/lib/mock-data';
import type { User } from '@/types';

const roleLabels: Record<string, string> = { student: 'Étudiant', designer: 'Concepteur', admin: 'Administrateur' };
const roleBadgeVariant: Record<string, 'default' | 'info' | 'warning'> = { student: 'default', designer: 'info', admin: 'warning' };

export default function UsersPage() {
  const [showCreate, setShowCreate] = useState(false);
  const students = mockUsers.filter(u => u.role === 'student').length;
  const designers = mockUsers.filter(u => u.role === 'designer').length;
  const admins = mockUsers.filter(u => u.role === 'admin').length;

  const columns = [
    {
      key: 'name', header: 'Nom',
      render: (user: User) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-slate-900">{user.name}</p>
            <p className="text-xs text-slate-400">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role', header: 'Rôle',
      render: (user: User) => <Badge variant={roleBadgeVariant[user.role]}>{roleLabels[user.role]}</Badge>,
    },
    {
      key: 'status', header: 'Statut',
      render: (user: User) => <StatusBadge status={user.status} />,
    },
    {
      key: 'class', header: 'Classe', className: 'hidden lg:table-cell',
      render: (user: User) => <span className="text-sm text-slate-400">{user.class || '—'}</span>,
    },
    {
      key: 'lastLogin', header: 'Dernière connexion', className: 'hidden md:table-cell',
      render: (user: User) => <span className="text-xs text-slate-400">{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'}</span>,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Gestion des Utilisateurs</h1>
        <Button onClick={() => setShowCreate(true)}><Plus className="mr-2 h-4 w-4" /> Créer un utilisateur</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <AnalyticsCard title="Total" value={mockUsers.length} icon={<Users className="h-6 w-6 text-blue-600" />} />
        <AnalyticsCard title="Étudiants" value={students} icon={<BookOpen className="h-6 w-6 text-emerald-500" />} iconBgColor="bg-emerald-50" />
        <AnalyticsCard title="Concepteurs" value={designers} icon={<Settings className="h-6 w-6 text-indigo-500" />} iconBgColor="bg-indigo-50" />
        <AnalyticsCard title="Admins" value={admins} icon={<Shield className="h-6 w-6 text-amber-500" />} iconBgColor="bg-amber-50" />
      </div>

      <DataTable<User & Record<string, unknown>>
        data={mockUsers as (User & Record<string, unknown>)[]}
        columns={columns as { key: string; header: string; render?: (item: User & Record<string, unknown>) => React.ReactNode; className?: string }[]}
        searchKey="name"
        searchPlaceholder="Rechercher un utilisateur..."
        actions={(user: User & Record<string, unknown>) => (
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Edit3 className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500"><Ban className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Shield className="h-4 w-4" /></Button>
          </div>
        )}
      />

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent>
          <DialogHeader><DialogTitle>Créer un utilisateur</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Nom complet</Label><Input placeholder="Nom de l'utilisateur" /></div>
            <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="email@univ.dz" /></div>
            <div className="space-y-2"><Label>Rôle</Label>
              <select className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                <option>Étudiant</option><option>Concepteur Pédagogique</option><option>Administrateur</option>
              </select>
            </div>
            <div className="space-y-2"><Label>Classe</Label>
              <select className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                <option>—</option><option>L2 Informatique</option><option>L3 Informatique</option><option>M1 IA</option>
              </select>
            </div>
            <div className="space-y-2"><Label>Mot de passe</Label><Input type="password" placeholder="••••••••" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Annuler</Button>
            <Button onClick={() => setShowCreate(false)}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
