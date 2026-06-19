"use client";

import React from 'react';
import Link from 'next/link';
import { Users, BookOpen, MessageSquare, Activity, HardDrive, Shield, Clock, Zap, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AnalyticsCard } from '@/components/shared/AnalyticsCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { mockPlatformStats, usageOverTimeData } from '@/lib/mock-data';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const stats = mockPlatformStats;

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Administration</h1>
          <p className="text-slate-600 mt-1">Vue d&apos;ensemble du système</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/users"><Button variant="outline"><Users className="mr-2 h-4 w-4" /> Gérer utilisateurs</Button></Link>
          <Link href="/admin/settings"><Button><Settings className="mr-2 h-4 w-4" /> Paramètres</Button></Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard title="Total utilisateurs" value={stats.totalUsers} change={8} changeLabel="ce mois" icon={<Users className="h-6 w-6 text-blue-600" />} />
        <AnalyticsCard title="Utilisateurs actifs" value={stats.activeUsers} change={5} changeLabel="" icon={<Activity className="h-6 w-6 text-emerald-500" />} iconBgColor="bg-emerald-50" />
        <AnalyticsCard title="Cours total" value={stats.totalCourses} icon={<BookOpen className="h-6 w-6 text-indigo-500" />} iconBgColor="bg-indigo-50" />
        <AnalyticsCard title="Conversations IA" value={stats.totalConversations.toLocaleString()} change={15} changeLabel="ce mois" icon={<MessageSquare className="h-6 w-6 text-amber-500" />} iconBgColor="bg-amber-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage Chart */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-sm">Utilisation de la plateforme</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={usageOverTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="users" name="Utilisateurs" stroke="#2563EB" fill="#DBEAFE" strokeWidth={2} />
                <Area type="monotone" dataKey="conversations" name="Conversations" stroke="#6366F1" fill="#E0E7FF" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Status */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">État du système</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-emerald-500" /><span className="text-sm">Service IA</span></div>
                <StatusBadge status={stats.aiServiceStatus} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-blue-600" /><span className="text-sm">Temps de réponse</span></div>
                <span className="text-sm font-medium">{stats.avgResponseTime}s</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2"><Activity className="h-4 w-4 text-emerald-500" /><span className="text-sm">Uptime</span></div>
                <span className="text-sm font-medium text-emerald-500">{stats.uptime}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><HardDrive className="h-4 w-4 text-slate-400" /> Stockage</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-400">{stats.storageUsed} Go utilisés</span>
                <span className="text-slate-400">{stats.storageTotal} Go total</span>
              </div>
              <Progress value={(stats.storageUsed / stats.storageTotal) * 100} className="h-3" />
              <p className="text-xs text-slate-400 mt-2">{Math.round((stats.storageUsed / stats.storageTotal) * 100)}% utilisé</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Shield className="h-4 w-4 text-slate-400" /> Sécurité</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Dernière sauvegarde</span><span>Aujourd&apos;hui, 06:00</span></div>
              <div className="flex justify-between"><span className="text-slate-400">2FA activé</span><Badge variant="warning" className="text-[10px]">Partiel</Badge></div>
              <div className="flex justify-between"><span className="text-slate-400">Sessions actives</span><span>12</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
