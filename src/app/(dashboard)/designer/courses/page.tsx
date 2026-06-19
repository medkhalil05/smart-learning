"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Upload, BookOpen, Users, Eye, Layers, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { mockCourses } from '@/lib/mock-data';

export default function DesignerCoursesPage() {
  const [tab, setTab] = useState('all');
  const filtered = tab === 'all' ? mockCourses :
    tab === 'published' ? mockCourses.filter(c => c.status === 'published') :
    tab === 'validation' ? mockCourses.filter(c => c.status === 'validation') :
    mockCourses.filter(c => c.status === 'draft' || c.status === 'processing');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Gestion des Cours</h1>
        <Link href="/designer/upload"><Button><Upload className="mr-2 h-4 w-4" /> Importer un nouveau cours</Button></Link>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">Tous ({mockCourses.length})</TabsTrigger>
          <TabsTrigger value="published">Publiés ({mockCourses.filter(c => c.status === 'published').length})</TabsTrigger>
          <TabsTrigger value="validation">En validation ({mockCourses.filter(c => c.status === 'validation').length})</TabsTrigger>
          <TabsTrigger value="draft">Brouillons ({mockCourses.filter(c => c.status === 'draft' || c.status === 'processing').length})</TabsTrigger>
        </TabsList>
        <TabsContent value={tab} className="mt-6">
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Cours</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase hidden md:table-cell">Matière</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase hidden lg:table-cell">Niveau</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Statut</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase hidden lg:table-cell">OCR</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase hidden md:table-cell">Étudiants</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Actions</th>
                </tr></thead>
                <tbody className="divide-y divide-slate-200">
                  {filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-slate-900">{c.title}</p>
                        <p className="text-xs text-slate-400">{c.chaptersCount} chapitres</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 hidden md:table-cell">{c.subject}</td>
                      <td className="px-4 py-3 hidden lg:table-cell"><Badge variant="secondary" className="text-[10px]">{c.level}</Badge></td>
                      <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                      <td className="px-4 py-3 text-sm hidden lg:table-cell">{c.ocrScore ? `${c.ocrScore}%` : '—'}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 hidden md:table-cell"><span className="flex items-center gap-1"><Users className="h-3 w-3" /> {c.studentsCount}</span></td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Eye className="h-4 w-4" /></Button>
                          <Link href={`/designer/structure/${c.id}`}><Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Layers className="h-4 w-4" /></Button></Link>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
