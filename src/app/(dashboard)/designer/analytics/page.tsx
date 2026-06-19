"use client";

import React from 'react';
import { Filter, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { mockConceptDifficulties, mockRiskProfiles, heatmapData, errorFrequencyData, remediationData } from '@/lib/mock-data';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-slate-900">Analytiques Pédagogiques</h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-white border border-slate-200">
        <Filter className="h-4 w-4 text-slate-400" />
        <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white">
          <option>Tous les cours</option><option>Intelligence Artificielle</option><option>Bases de Données</option>
        </select>
        <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white">
          <option>Tous les chapitres</option><option>Chapitre 1</option><option>Chapitre 2</option>
        </select>
        <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white">
          <option>Toutes les classes</option><option>L3 Informatique</option><option>M1 IA</option>
        </select>
        <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white">
          <option>Ce mois</option><option>Cette semaine</option><option>Ce semestre</option>
        </select>
      </div>

      {/* Heatmap */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Carte thermique des pages difficiles</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {heatmapData.slice(0, 40).map((d) => (
              <div
                key={d.page}
                className="heatmap-cell w-8 h-8 rounded flex items-center justify-center text-[9px] font-medium cursor-pointer"
                style={{ backgroundColor: `hsl(${120 - d.difficulty * 1.2}, 70%, ${85 - d.difficulty * 0.3}%)` }}
                title={`Page ${d.page}: ${Math.round(d.difficulty)}% difficulté, ${d.errors} erreurs`}
              >
                {d.page}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
            <div className="flex items-center gap-1"><div className="w-4 h-4 rounded bg-green-200" /> Facile</div>
            <div className="flex items-center gap-1"><div className="w-4 h-4 rounded bg-yellow-200" /> Moyen</div>
            <div className="flex items-center gap-1"><div className="w-4 h-4 rounded bg-red-200" /> Difficile</div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Error Frequency */}
        <Card>
          <CardHeader><CardTitle className="text-sm">Fréquence des erreurs</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={errorFrequencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <Tooltip />
                <Area type="monotone" dataKey="errors" stroke="#EF4444" fill="#FEE2E2" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Remediation Cycles */}
        <Card>
          <CardHeader><CardTitle className="text-sm">Cycles de remédiation</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={remediationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <Tooltip />
                <Line type="monotone" dataKey="cycles" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Difficult Concepts Ranking */}
        <Card>
          <CardHeader><CardTitle className="text-sm">Classement des concepts difficiles</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {mockConceptDifficulties.map((c, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">{i + 1}</span>
                    <span className="text-slate-900 font-medium">{c.concept}</span>
                  </span>
                  <span className="text-xs text-slate-400">{c.errorRate}%</span>
                </div>
                <Progress value={c.errorRate} className="h-1.5" indicatorClassName={c.errorRate > 50 ? 'bg-red-500' : c.errorRate > 35 ? 'bg-amber-500' : 'bg-blue-600'} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Students at Risk */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-red-500" /> Étudiants à risque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <table className="w-full">
                <thead><tr className="bg-slate-50">
                  <th className="px-3 py-2 text-left text-xs font-semibold text-slate-400">Étudiant</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-slate-400">Cours</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-slate-400">Risque</th>
                </tr></thead>
                <tbody className="divide-y divide-slate-200">
                  {mockRiskProfiles.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/50">
                      <td className="px-3 py-2 text-sm font-medium text-slate-900">{r.studentName}</td>
                      <td className="px-3 py-2 text-xs text-slate-400">{r.courseTitle}</td>
                      <td className="px-3 py-2"><StatusBadge status={r.riskLevel} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reformulation stats */}
      <Card className="bg-gradient-to-r from-info-light to-blue-700-50 border-indigo-200">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <span className="text-2xl">🔄</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">127</p>
            <p className="text-sm text-slate-600">Demandes de reformulation ce mois-ci</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
