"use client";

import React from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle2, Clock, AlertTriangle, Upload, FileText, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AnalyticsCard } from '@/components/shared/AnalyticsCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { mockCourses, mockOCRAlerts, mockConceptDifficulties, engagementChartData } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function DesignerDashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tableau de bord</h1>
          <p className="text-slate-600 mt-1">Bienvenue, Dr. Mansouri</p>
        </div>
        <Link href="/designer/upload">
          <Button><Upload className="mr-2 h-4 w-4" /> Importer un nouveau cours</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard title="Total cours" value={7} icon={<BookOpen className="h-6 w-6 text-blue-600" />} />
        <AnalyticsCard title="Cours publiés" value={4} change={1} changeLabel="ce mois" icon={<CheckCircle2 className="h-6 w-6 text-emerald-500" />} iconBgColor="bg-emerald-50" />
        <AnalyticsCard title="En attente de validation" value={1} icon={<Clock className="h-6 w-6 text-amber-500" />} iconBgColor="bg-amber-50" />
        <AnalyticsCard title="Étudiants à risque" value={3} change={-1} changeLabel="" icon={<AlertTriangle className="h-6 w-6 text-red-500" />} iconBgColor="bg-red-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement Chart */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-sm">Engagement des étudiants cette semaine</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={engagementChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <Tooltip />
                <Legend />
                <Bar dataKey="conversations" name="Conversations" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="quiz" name="Quiz" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="connexions" name="Connexions" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* OCR Alerts */}
        <Card>
          <CardHeader><CardTitle className="text-sm flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-500" /> Alertes OCR</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {mockOCRAlerts.map((a) => (
              <div key={a.id} className="p-3 rounded-lg bg-amber-50/30 border border-amber-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-900 truncate">{a.courseTitle}</span>
                  <Badge variant={a.quality < 65 ? 'danger' : 'warning'} className="text-[10px]">{a.quality}%</Badge>
                </div>
                <p className="text-xs text-slate-400">Page {a.page} — {a.issue}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Uploads */}
        <Card>
          <CardHeader><CardTitle className="text-sm">Documents récents</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {mockCourses.slice(0, 4).map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><FileText className="h-5 w-5 text-red-500" /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 line-clamp-1">{c.title}</p>
                    <p className="text-xs text-slate-400">{c.chaptersCount} chapitres • {c.subject}</p>
                  </div>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Difficult Concepts */}
        <Card>
          <CardHeader><CardTitle className="text-sm">Concepts difficiles (Top 5)</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {mockConceptDifficulties.slice(0, 5).map((c, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-900 font-medium">{c.concept}</span>
                  <span className="text-slate-400 text-xs">{c.errorRate}% erreurs</span>
                </div>
                <Progress value={c.errorRate} className="h-2" indicatorClassName={c.errorRate > 50 ? 'bg-red-500' : c.errorRate > 35 ? 'bg-amber-500' : 'bg-blue-600'} />
                <p className="text-[10px] text-slate-400">{c.chapter} • {c.questionsCount} questions</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
