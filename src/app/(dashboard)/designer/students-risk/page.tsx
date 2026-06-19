"use client";

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, Eye, Clock, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnalyticsCard } from '@/components/shared/AnalyticsCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { mockRiskProfiles } from '@/lib/mock-data';

const reasonIcons: Record<string, React.ReactNode> = {
  inactivity: <Clock className="h-4 w-4 text-amber-500" />,
  errors: <XCircle className="h-4 w-4 text-red-500" />,
  remediation: <AlertTriangle className="h-4 w-4 text-indigo-500" />,
};
const reasonLabels: Record<string, string> = {
  inactivity: 'Inactivité', errors: 'Erreurs fréquentes', remediation: 'Cycles de remédiation',
};

export default function StudentsRiskPage() {
  const high = mockRiskProfiles.filter(r => r.riskLevel === 'high').length;
  const medium = mockRiskProfiles.filter(r => r.riskLevel === 'medium').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-slate-900">Étudiants à Risque</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AnalyticsCard title="Risque élevé" value={high} icon={<AlertTriangle className="h-6 w-6 text-red-500" />} iconBgColor="bg-red-50" />
        <AnalyticsCard title="Risque moyen" value={medium} icon={<AlertTriangle className="h-6 w-6 text-amber-500" />} iconBgColor="bg-amber-50" />
        <AnalyticsCard title="Total alertes" value={mockRiskProfiles.length} icon={<AlertTriangle className="h-6 w-6 text-indigo-500" />} iconBgColor="bg-indigo-50" />
      </div>

      <div className="space-y-4">
        {mockRiskProfiles.map((r) => (
          <Card key={r.id} className={`card-hover border-l-4 ${r.riskLevel === 'high' ? 'border-l-danger' : r.riskLevel === 'medium' ? 'border-l-warning' : 'border-l-info'}`}>
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-slate-900">{r.studentName}</h3>
                    <StatusBadge status={r.riskLevel} />
                  </div>
                  <p className="text-sm text-slate-400">{r.courseTitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {r.reasons.map((reason) => (
                      <Badge key={reason} variant="secondary" className="gap-1 text-[10px]">
                        {reasonIcons[reason]} {reasonLabels[reason]}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                    {r.reasonDetails.map((d, i) => (<span key={i}>• {d}</span>))}
                  </div>
                  <p className="text-xs text-slate-400">Dernière interaction : {new Date(r.lastInteraction).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <Link href={`/designer/students-risk/${r.id}`}>
                  <Button variant="outline" size="sm"><Eye className="mr-1 h-3.5 w-3.5" /> Voir détails</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
