"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, Clock, XCircle, CheckCircle2, Brain, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { mockRiskProfiles } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const reasonIcons: Record<string, React.ReactNode> = {
  inactivity: <Clock className="h-5 w-5 text-amber-500" />,
  errors: <XCircle className="h-5 w-5 text-red-500" />,
  remediation: <AlertTriangle className="h-5 w-5 text-indigo-500" />,
};

export default function StudentRiskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const risk = mockRiskProfiles.find(r => r.id === id) || mockRiskProfiles[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <Link href="/designer/students-risk" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-blue-600 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Retour à la liste
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-surface to-surface-secondary border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-7 w-7 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{risk.studentName}</h1>
            <p className="text-sm text-slate-400">{risk.courseTitle}</p>
          </div>
        </div>
        <StatusBadge status={risk.riskLevel} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Reasons */}
          <Card>
            <CardHeader><CardTitle className="text-sm">Raisons du risque</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {risk.reasonDetails.map((d, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-red-50/20 border border-red-200">
                  {reasonIcons[risk.reasons[i]] || <AlertTriangle className="h-5 w-5 text-red-500" />}
                  <span className="text-sm text-slate-900">{d}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Error History Chart */}
          <Card>
            <CardHeader><CardTitle className="text-sm">Historique des erreurs</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={risk.errorHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#94A3B8" tickFormatter={(v) => new Date(v).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} />
                  <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#EF4444" radius={[4, 4, 0, 0]} name="Erreurs" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Difficult Concepts */}
          <Card>
            <CardHeader><CardTitle className="text-sm">Concepts difficiles</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {risk.difficultConcepts.map((c, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-amber-50/30">
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                  <span className="text-sm text-slate-900">{c}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Remediations */}
          <Card>
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Brain className="h-4 w-4 text-blue-600" /> Remédiations proposées</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {risk.remediationsProposed.map((r, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-slate-600">{r}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommended Intervention */}
          <Card className="bg-gradient-to-br from-danger-light/50 to-warning-light/50 border-red-200">
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-red-500" /> Intervention recommandée</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-slate-900 leading-relaxed">{risk.recommendedIntervention}</p>
              <Button className="w-full mt-4" variant="destructive">Contacter l&apos;étudiant</Button>
            </CardContent>
          </Card>

          {/* Last Interaction */}
          <Card>
            <CardHeader><CardTitle className="text-sm">Dernière interaction</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-slate-900">{new Date(risk.lastInteraction).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              <p className="text-xs text-slate-400 mt-1">Il y a {Math.ceil((Date.now() - new Date(risk.lastInteraction).getTime()) / (1000 * 60 * 60 * 24))} jours</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
