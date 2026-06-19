"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { mockCourses } from '@/lib/mock-data';

const publishedCourses = mockCourses.filter(c => c.status === 'published');

export default function StudentCoursesPage() {
  const [tab, setTab] = useState('all');

  const filtered = tab === 'all' ? publishedCourses :
    tab === 'in-progress' ? publishedCourses.filter(c => (c.progress || 0) > 0 && (c.progress || 0) < 100) :
    publishedCourses.filter(c => (c.progress || 0) === 100);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mes Cours</h1>
          <p className="text-slate-600 mt-1">{publishedCourses.length} cours disponibles</p>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">Tous ({publishedCourses.length})</TabsTrigger>
          <TabsTrigger value="in-progress">En cours</TabsTrigger>
          <TabsTrigger value="completed">Terminés</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <Card key={course.id} className="card-hover overflow-hidden group">
                <div className="h-32 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 relative p-5 flex flex-col justify-end">
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/20 text-white border-0 text-[10px]">{course.level}</Badge>
                  </div>
                  <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">{course.title}</h3>
                </div>
                <CardContent className="p-5 space-y-3">
                  <Badge variant="secondary" className="text-[10px]">{course.subject}</Badge>
                  <p className="text-sm text-slate-600 line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {course.chaptersCount} chapitres</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {course.studentsCount} étudiants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={course.progress || 0} className="flex-1" />
                    <span className="text-xs font-semibold text-slate-600">{course.progress || 0}%</span>
                  </div>
                  <Link href={`/student/courses/${course.id}`} className="block">
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {(course.progress || 0) > 0 ? 'Continuer' : 'Commencer'} <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">Aucun cours dans cette catégorie</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
