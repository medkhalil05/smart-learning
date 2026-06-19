"use client";

import React, { useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, MessageSquare, CheckCircle2, ChevronDown, ChevronRight, FileText, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { mockCourses, mockChapters } from '@/lib/mock-data';

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const course = mockCourses.find(c => c.id === id) || mockCourses[0];
  const chapters = mockChapters.filter(ch => ch.courseId === course.id);
  const [expanded, setExpanded] = useState<string | null>(chapters[0]?.id || null);

  const objectives = [
    "Comprendre les fondements de l'intelligence artificielle",
    "Maîtriser les algorithmes de recherche (BFS, DFS, A*)",
    "Appliquer la logique propositionnelle et des prédicats",
    "Implémenter des algorithmes d'apprentissage automatique",
    "Concevoir des réseaux de neurones simples",
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back */}
      <Link href="/student/courses" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-blue-600 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Retour aux cours
      </Link>

      {/* Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-white/20 text-white border-0">{course.subject}</Badge>
            <Badge className="bg-white/20 text-white border-0">{course.level}</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-blue-100 max-w-2xl mb-4">{course.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200">
            <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {course.chaptersCount} chapitres</span>
            <span className="flex items-center gap-1"><MessageSquare className="h-4 w-4" /> Tuteur IA disponible</span>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <Progress value={course.progress || 0} className="flex-1 max-w-xs bg-white/20" indicatorClassName="bg-white" />
            <span className="text-sm font-semibold">{course.progress || 0}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chapters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" /> Chapitres du cours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {chapters.map((ch) => (
                <div key={ch.id} className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpanded(expanded === ch.id ? null : ch.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${(ch.progress || 0) === 100 ? 'bg-emerald-50 text-emerald-500' : 'bg-blue-50 text-blue-600'}`}>
                        {(ch.progress || 0) === 100 ? <CheckCircle2 className="h-4 w-4" /> : ch.order}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{ch.title}</p>
                        <p className="text-xs text-slate-400">{ch.sections.length} sections</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:flex items-center gap-2 w-24">
                        <Progress value={ch.progress || 0} className="flex-1" />
                        <span className="text-xs text-slate-400">{ch.progress || 0}%</span>
                      </div>
                      {expanded === ch.id ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
                    </div>
                  </button>
                  {expanded === ch.id && (
                    <div className="px-4 pb-4 space-y-1 border-t border-slate-200 pt-2">
                      {ch.sections.map((s) => (
                        <div key={s.id} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-50 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600/30" />
                          <span className="text-slate-600">{s.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Start Learning Button */}
          <Link href={`/student/chat/${course.id}`}>
            <Button size="lg" className="w-full text-base shadow-lg shadow-blue-600/25">
              <MessageSquare className="mr-2 h-5 w-5" />
              Commencer l&apos;apprentissage avec le Tuteur IA
            </Button>
          </Link>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Objectives */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" /> Objectifs d&apos;apprentissage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600">{obj}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* PDF Reference */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-400" /> Source PDF
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Cours_IA_Fondamentaux.pdf</p>
                  <p className="text-xs text-slate-400">156 pages • Score OCR: {course.ocrScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
