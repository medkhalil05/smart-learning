"use client";

import React from 'react';
import { Shield, Edit3, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockRoles } from '@/lib/mock-data';

const roleColors: Record<string, string> = {
  'Étudiant': 'from-blue-500 to-blue-600',
  'Concepteur Pédagogique': 'from-indigo-500 to-purple-600',
  'Administrateur': 'from-amber-500 to-orange-600',
};

export default function RolesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-slate-900">Gestion des Rôles</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockRoles.map((role) => (
          <Card key={role.id} className="card-hover overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${roleColors[role.name] || 'from-gray-400 to-gray-500'}`} />
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  {role.name}
                </CardTitle>
                <Badge variant="secondary" className="gap-1">
                  <Users className="h-3 w-3" /> {role.usersCount}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Permissions</p>
                <div className="flex flex-wrap gap-1.5">
                  {role.permissions.map((p, i) => (
                    <Badge key={i} variant="outline" className="text-[10px]">{p}</Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Edit3 className="mr-2 h-3.5 w-3.5" /> Modifier les permissions
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
