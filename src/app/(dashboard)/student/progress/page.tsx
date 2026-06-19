"use client";

import React from 'react';
import { TrendingUp, BookOpen, HelpCircle, Clock, CheckCircle2, AlertTriangle, Brain, Calendar, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AnalyticsCard } from '@/components/shared/AnalyticsCard';
import { mockStudentProgress, mockLearningEvents, progressOverTimeData } from '@/lib/mock-data';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const progress = mockStudentProgress[0];
const quizData = progress.quizScores.map((s, i) => ({ name: `Q${i + 1}`, score: s }));

export default function StudentProgressPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Ma Progression</h1>
        <p className="text-slate-600 mt-1">{progress.courseTitle}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard title="Progression globale" value={`${progress.globalProgress}%`} icon={<TrendingUp className="h-6 w-6 text-blue-600" />} />
        <AnalyticsCard title="Chapitres terminés" value={`${progress.completedChapters}/${progress.totalChapters}`} icon={<BookOpen className="h-6 w-6 text-emerald-500" />} iconBgColor="bg-emerald-50" />
        <AnalyticsCard title="Score moyen" value={`${progress.averageScore}%`} icon={<HelpCircle className="h-6 w-6 text-indigo-500" />} iconBgColor="bg-indigo-50" />
        <AnalyticsCard title="Temps total" value="30h 40min" icon={<Clock className="h-6 w-6 text-amber-500" />} iconBgColor="bg-amber-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Progression dans le temps</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={progressOverTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <Tooltip />
                <Line type="monotone" dataKey="progress" stroke="#2563EB" strokeWidth={2} dot={{ fill: '#2563EB', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quiz Scores */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Scores des quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={quizData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <Tooltip />
                <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strong Concepts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Concepts maîtrisés
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {progress.strongConcepts.map((c, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50/50">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-sm text-slate-900">{c}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Difficult Concepts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> Concepts difficiles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {progress.difficultConcepts.map((c, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-amber-50/50">
                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                <span className="text-sm text-slate-900">{c}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Brain className="h-4 w-4 text-blue-600" /> Recommandations IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2 text-sm">
              <Target className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span className="text-slate-600">Revoir le chapitre sur la rétropropagation avec des exemples pratiques.</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <Target className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span className="text-slate-600">Pratiquer plus de quiz sur la descente de gradient.</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <Target className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span className="text-slate-600">Vous êtes prêt pour le chapitre 6 : Traitement du Langage.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400" /> Historique d&apos;apprentissage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockLearningEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full shrink-0 ${
                    event.type === 'chapter_completed' ? 'bg-emerald-500' : event.type === 'quiz_taken' ? 'bg-indigo-500' : event.type === 'conversation' ? 'bg-blue-600' : 'bg-text-muted'
                  }`} />
                  <div className="w-px h-8 bg-border" />
                </div>
                <div className="flex-1 -mt-0.5">
                  <p className="text-sm text-slate-900">{event.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">{new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</span>
                    {event.score !== undefined && <Badge variant="info" className="text-[10px]">{event.score}%</Badge>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
