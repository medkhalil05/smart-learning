"use client";

import React, { useState } from 'react';
import { CheckCircle2, XCircle, Edit3, Plus, AlertTriangle, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AnalyticsCard } from '@/components/shared/AnalyticsCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { mockQuizQuestions } from '@/lib/mock-data';
import type { QuizQuestion } from '@/types';

export default function QuizValidationPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>(mockQuizQuestions);
  const [filter, setFilter] = useState('all');
  const [editQ, setEditQ] = useState<QuizQuestion | null>(null);

  const filtered = filter === 'all' ? questions : questions.filter(q => q.chapterId === filter);
  const counts = { total: questions.length, approved: questions.filter(q => q.status === 'approved').length, rejected: questions.filter(q => q.status === 'rejected').length, pending: questions.filter(q => q.status === 'draft' || q.status === 'edited').length };

  const updateStatus = (id: string, status: QuizQuestion['status']) => {
    setQuestions(qs => qs.map(q => q.id === id ? { ...q, status } : q));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Validation des Quiz</h1>
        <Button><Plus className="mr-2 h-4 w-4" /> Ajouter une question</Button>
      </div>

      {/* Warning */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
        <p className="text-sm text-amber-800">Un quiz ne peut être lancé que si toutes les questions sont validées.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <AnalyticsCard title="Total questions" value={counts.total} icon={<span className="text-lg">📝</span>} />
        <AnalyticsCard title="Approuvées" value={counts.approved} icon={<CheckCircle2 className="h-6 w-6 text-emerald-500" />} iconBgColor="bg-emerald-50" />
        <AnalyticsCard title="Rejetées" value={counts.rejected} icon={<XCircle className="h-6 w-6 text-red-500" />} iconBgColor="bg-red-50" />
        <AnalyticsCard title="En attente" value={counts.pending} icon={<Edit3 className="h-6 w-6 text-amber-500" />} iconBgColor="bg-amber-50" />
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-slate-400" />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white">
          <option value="all">Tous les chapitres</option>
          <option value="ch1">Introduction à l&apos;IA</option>
          <option value="ch2">Recherche et Exploration</option>
          <option value="ch3">Logique et Raisonnement</option>
          <option value="ch4">Apprentissage Automatique</option>
          <option value="ch5">Réseaux de Neurones</option>
        </select>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {filtered.map((q) => (
          <Card key={q.id} className="card-hover">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant={q.type === 'qcm' ? 'info' : 'secondary'} className="text-[10px]">{q.type === 'qcm' ? 'QCM' : 'Vrai/Faux'}</Badge>
                    <Badge variant={q.difficulty === 'easy' ? 'success' : q.difficulty === 'medium' ? 'warning' : 'danger'} className="text-[10px]">
                      {q.difficulty === 'easy' ? 'Facile' : q.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
                    </Badge>
                    <StatusBadge status={q.status} />
                    <span className="text-[10px] text-slate-400">{q.chapterTitle}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-900 mb-2">{q.question}</p>
                  <div className="flex flex-wrap gap-1">
                    {q.options.map((opt, i) => (
                      <span key={i} className={`text-xs px-2 py-1 rounded ${i === q.correctAnswer ? 'bg-emerald-50 text-emerald-700 font-medium' : 'bg-slate-100 text-slate-400'}`}>
                        {String.fromCharCode(65 + i)}. {opt}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {q.status !== 'approved' && (
                    <Button variant="outline" size="sm" className="text-emerald-500 border-emerald-500 hover:bg-emerald-50" onClick={() => updateStatus(q.id, 'approved')}>
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Approuver
                    </Button>
                  )}
                  {q.status !== 'rejected' && (
                    <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-50" onClick={() => updateStatus(q.id, 'rejected')}>
                      <XCircle className="h-3.5 w-3.5 mr-1" /> Rejeter
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => setEditQ(q)}>
                    <Edit3 className="h-3.5 w-3.5 mr-1" /> Modifier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editQ} onOpenChange={() => setEditQ(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Modifier la question</DialogTitle></DialogHeader>
          {editQ && (
            <div className="space-y-4">
              <div className="space-y-2"><Label>Question</Label><Textarea defaultValue={editQ.question} rows={3} /></div>
              {editQ.options.map((opt, i) => (
                <div key={i} className="space-y-1">
                  <Label>Option {String.fromCharCode(65 + i)} {i === editQ.correctAnswer && '✓'}</Label>
                  <Input defaultValue={opt} />
                </div>
              ))}
              <div className="space-y-2"><Label>Explication</Label><Textarea defaultValue={editQ.explanation} rows={2} /></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditQ(null)}>Annuler</Button>
            <Button onClick={() => { if (editQ) updateStatus(editQ.id, 'edited'); setEditQ(null); }}>Sauvegarder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
