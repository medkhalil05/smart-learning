"use client";

import React, { useState } from 'react';
import { Plus, GraduationCap, Users, BookOpen, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { DataTable } from '@/components/shared/DataTable';
import { mockClasses } from '@/lib/mock-data';
import type { ClassGroup } from '@/types';

export default function ClassesPage() {
  const [showCreate, setShowCreate] = useState(false);

  const columns = [
    { key: 'name', header: 'Nom de la classe', render: (c: ClassGroup) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center"><GraduationCap className="h-4 w-4 text-blue-600" /></div>
        <span className="text-sm font-medium text-slate-900">{c.name}</span>
      </div>
    )},
    { key: 'level', header: 'Niveau', render: (c: ClassGroup) => <Badge variant="secondary">{c.level}</Badge> },
    { key: 'studentsCount', header: 'Étudiants', render: (c: ClassGroup) => <span className="flex items-center gap-1 text-sm"><Users className="h-3.5 w-3.5 text-slate-400" /> {c.studentsCount}</span> },
    { key: 'coursesCount', header: 'Cours', render: (c: ClassGroup) => <span className="flex items-center gap-1 text-sm"><BookOpen className="h-3.5 w-3.5 text-slate-400" /> {c.coursesCount}</span> },
    { key: 'createdAt', header: 'Créée le', className: 'hidden md:table-cell', render: (c: ClassGroup) => <span className="text-xs text-slate-400">{new Date(c.createdAt).toLocaleDateString('fr-FR')}</span> },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Gestion des Classes</h1>
        <Button onClick={() => setShowCreate(true)}><Plus className="mr-2 h-4 w-4" /> Créer une classe</Button>
      </div>

      <DataTable<ClassGroup & Record<string, unknown>>
        data={mockClasses as (ClassGroup & Record<string, unknown>)[]}
        columns={columns as { key: string; header: string; render?: (item: ClassGroup & Record<string, unknown>) => React.ReactNode; className?: string }[]}
        searchKey="name"
        searchPlaceholder="Rechercher une classe..."
      />

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent>
          <DialogHeader><DialogTitle>Créer une classe</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Nom de la classe</Label><Input placeholder="Ex: L3 Informatique" /></div>
            <div className="space-y-2"><Label>Niveau</Label>
              <select className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                <option>Licence 2</option><option>Licence 3</option><option>Master 1</option><option>Master 2</option>
              </select>
            </div>
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
