"use client";

import React, { useState, use } from 'react';
import { GripVertical, ChevronRight, ChevronDown, Plus, Trash2, Edit3, CheckCircle2, ArrowUp, ArrowDown, FileText, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockChapters, mockCourses } from '@/lib/mock-data';

export default function StructurePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const course = mockCourses.find(c => c.id === id) || mockCourses[0];
  const [chapters, setChapters] = useState(mockChapters.filter(ch => ch.courseId === course.id));
  const [activeChapter, setActiveChapter] = useState(chapters[0]?.id || '');
  const [activeSection, setActiveSection] = useState('');
  const [pdfPage, setPdfPage] = useState(1);

  const activeChapterData = chapters.find(ch => ch.id === activeChapter);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Structurer le contenu</h1>
          <p className="text-slate-600 text-sm">{course.title}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Save className="mr-2 h-4 w-4" /> Sauvegarder</Button>
          <Button><CheckCircle2 className="mr-2 h-4 w-4" /> Valider la structure</Button>
        </div>
      </div>

      <div className="flex gap-4 h-[calc(100vh-12rem)]">
        {/* LEFT: Outline */}
        <div className="w-72 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shrink-0">
          <div className="p-3 border-b border-slate-200 flex items-center justify-between">
            <span className="text-sm font-semibold">Plan du cours</span>
            <Button variant="ghost" size="sm" className="h-7"><Plus className="h-3 w-3 mr-1" /> Chapitre</Button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {chapters.map((ch) => (
              <div key={ch.id}>
                <button
                  onClick={() => { setActiveChapter(ch.id); setActiveSection(''); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all cursor-pointer ${
                    activeChapter === ch.id ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <GripVertical className="h-3 w-3 text-slate-400 shrink-0" />
                  {activeChapter === ch.id ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                  <span className="truncate text-left">{ch.title}</span>
                </button>
                {activeChapter === ch.id && (
                  <div className="ml-8 space-y-0.5 mt-0.5">
                    {ch.sections.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => { setActiveSection(s.id); setPdfPage(s.order * 5 + 1); }}
                        className={`w-full text-left px-3 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                          activeSection === s.id ? 'bg-blue-100 text-blue-600 font-medium' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                        }`}
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CENTER: Editor */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col min-w-0">
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="text-[10px]">Chapitre {activeChapterData?.order}</Badge>
              <h2 className="text-lg font-semibold text-slate-900">{activeChapterData?.title || 'Sélectionnez un chapitre'}</h2>
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm"><Edit3 className="h-3 w-3 mr-1" /> Renommer</Button>
              <Button variant="outline" size="sm"><Plus className="h-3 w-3 mr-1" /> Ajouter section</Button>
              <Button variant="outline" size="sm" className="text-red-500"><Trash2 className="h-3 w-3 mr-1" /> Supprimer</Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeChapterData?.sections.map((s, i) => (
              <Card key={s.id} className={`card-hover ${activeSection === s.id ? 'ring-2 ring-blue-500' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-slate-400 shrink-0 cursor-grab" />
                    <div className="flex-1">
                      <Input defaultValue={s.title} className="border-0 bg-transparent p-0 h-auto text-sm font-medium focus-visible:ring-0" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" disabled={i === 0}><ArrowUp className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" disabled={i === (activeChapterData?.sections.length || 0) - 1}><ArrowDown className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500"><Trash2 className="h-3 w-3" /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {!activeChapterData && (
              <div className="flex items-center justify-center h-full text-slate-400">
                <p>Sélectionnez un chapitre pour modifier sa structure</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: PDF Preview */}
        <div className="w-80 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shrink-0 hidden xl:flex">
          <div className="p-3 border-b border-slate-200 flex items-center justify-between">
            <span className="text-sm font-semibold flex items-center gap-2"><FileText className="h-4 w-4" /> Aperçu PDF</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setPdfPage(p => Math.max(1, p - 1))}>‹</Button>
              <span className="text-xs text-slate-400">Page {pdfPage}</span>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setPdfPage(p => p + 1)}>›</Button>
            </div>
          </div>
          <div className="flex-1 bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full aspect-[3/4] bg-white rounded-lg shadow-md border border-slate-200 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-medium">Aperçu PDF</p>
                <p className="text-xs">Page {pdfPage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
