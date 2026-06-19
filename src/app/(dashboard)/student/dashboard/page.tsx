"use client";

import React from 'react';
import Link from 'next/link';
import { BookOpen, TrendingUp, HelpCircle, Flame, MessageSquare, Clock, ArrowRight, Sparkles, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AnalyticsCard } from '@/components/shared/AnalyticsCard';
import { mockCourses, mockLearningEvents } from '@/lib/mock-data';

const enrolledCourses = mockCourses.filter(c => c.status === 'published' && c.progress !== undefined);

export default function StudentDashboardPage() {
  const streakDays = [true, true, true, false, true, true, true];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bonjour Ahmed 👋</h1>
          <p className="text-slate-600 mt-1">Bienvenue sur votre espace d&apos;apprentissage intelligent</p>
        </div>
        <Link href="/student/courses">
          <Button>
            <BookOpen className="mr-2 h-4 w-4" /> Mes cours
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard title="Cours inscrits" value={3} change={0} changeLabel="" icon={<BookOpen className="h-6 w-6 text-blue-600" />} />
        <AnalyticsCard title="Progression globale" value="45%" change={12} changeLabel="ce mois" icon={<TrendingUp className="h-6 w-6 text-emerald-500" />} iconBgColor="bg-emerald-50" />
        <AnalyticsCard title="Quiz réussis" value={12} change={3} changeLabel="cette semaine" icon={<HelpCircle className="h-6 w-6 text-indigo-500" />} iconBgColor="bg-indigo-50" />
        <AnalyticsCard title="Jours consécutifs" value={7} change={40} changeLabel="" icon={<Flame className="h-6 w-6 text-amber-500" />} iconBgColor="bg-amber-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrolled Courses */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Cours en cours</h2>
            <Link href="/student/courses" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              Voir tout <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="card-hover overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-500" />
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="text-[10px]">{course.subject}</Badge>
                    <Badge variant="outline" className="text-[10px]">{course.level}</Badge>
                  </div>
                  <h3 className="font-semibold text-slate-900 mt-2 mb-1 line-clamp-2">{course.title}</h3>
                  <p className="text-xs text-slate-400 mb-3">{course.chaptersCount} chapitres</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Progress value={course.progress} className="flex-1" />
                    <span className="text-xs font-medium text-slate-600">{course.progress}%</span>
                  </div>
                  <Link href={`/student/courses/${course.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Continuer <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Learning Streak */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Flame className="h-4 w-4 text-amber-500" /> Série d&apos;apprentissage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-2 mb-3">
                {streakDays.map((active, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${active ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]}
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-slate-400">🔥 7 jours consécutifs !</p>
            </CardContent>
          </Card>

          {/* Encouragement */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-600">Encouragement</span>
              </div>
              <p className="text-sm text-slate-600">
                Vous êtes en bonne voie ! Continuez comme ça 🎯 Votre progression a augmenté de 12% ce mois-ci.
              </p>
            </CardContent>
          </Card>

          {/* Upcoming Quizzes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-500" /> Quiz à venir
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <div>
                  <p className="text-sm font-medium">Apprentissage Automatique</p>
                  <p className="text-xs text-slate-400">Chapitre 4 • 10 questions</p>
                </div>
                <Badge variant="warning">Demain</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <div>
                  <p className="text-sm font-medium">Réseaux de Neurones</p>
                  <p className="text-xs text-slate-400">Chapitre 5 • 8 questions</p>
                </div>
                <Badge variant="secondary">Dans 3 jours</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" /> Activité récente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockLearningEvents.slice(0, 4).map((event) => (
                <div key={event.id} className="flex items-start gap-3">
                  <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${event.type === 'chapter_completed' ? 'bg-emerald-500' : event.type === 'quiz_taken' ? 'bg-indigo-500' : event.type === 'conversation' ? 'bg-blue-600' : 'bg-text-muted'}`} />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-900 truncate">{event.description}</p>
                    <p className="text-[10px] text-slate-400">{new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
