"use client";

import React, { useState, useMemo } from 'react';
import {
  BookOpen, Users, ChevronDown, Search, Eye, Send, Download, History,
  AlertTriangle, Clock, TrendingUp, CheckCircle2, XCircle, BarChart3,
  Brain, MessageSquare, ChevronRight, Star, Zap, Shield, Filter,
  GraduationCap, Target, Award, Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { AnalyticsCard } from '@/components/shared/AnalyticsCard';
import {
  mockCourseStudentsData, getParticipationData,
  getProgressDistributionData, getDifficultyData,
  type CourseStudent, type LearningStatus, type RiskLevel
} from '@/lib/mock-course-students';

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────
const riskColors: Record<RiskLevel, string> = {
  low:    'bg-emerald-100 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-100   text-amber-700   border-amber-200',
  high:   'bg-red-100     text-red-700     border-red-200',
};
const riskLabels: Record<RiskLevel, string> = {
  low: 'Faible', medium: 'Moyen', high: 'Élevé',
};
const statusColors: Record<LearningStatus, string> = {
  'En progression': 'bg-blue-100   text-blue-700   border-blue-200',
  'Terminé':        'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Bloqué':         'bg-red-100     text-red-700     border-red-200',
  'À risque':       'bg-amber-100   text-amber-700   border-amber-200',
};
const statusDot: Record<LearningStatus, string> = {
  'En progression': 'bg-blue-500',
  'Terminé':        'bg-emerald-500',
  'Bloqué':         'bg-red-500',
  'À risque':       'bg-amber-500',
};

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}
function fmtTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m.toString().padStart(2, '0')}min`;
}
function inactiveDays(iso: string) {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
}

// ──────────────────────────────────────────────
// Student Detail Drawer
// ──────────────────────────────────────────────
function StudentDetailDrawer({ student, onClose }: { student: CourseStudent; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer panel */}
      <div className="w-full max-w-2xl bg-white h-full overflow-y-auto shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${student.avatarColor} flex items-center justify-center text-white font-bold text-base`}>
              {student.avatar}
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-lg leading-tight">{student.name}</h2>
              <p className="text-sm text-slate-400">{student.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${riskColors[student.riskLevel]}`}>
              <AlertTriangle className="h-3 w-3" />
              Risque {riskLabels[student.riskLevel]}
            </span>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 px-6 py-5 space-y-6">

          {/* Infos */}
          <section>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Informations de l'étudiant</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <GraduationCap className="h-4 w-4 text-blue-500" />, label: 'Classe', value: student.classGroup },
                { icon: <Clock className="h-4 w-4 text-slate-400" />,        label: 'Inscrit le', value: fmt(student.enrolledAt) },
                { icon: <Activity className="h-4 w-4 text-emerald-500" />,   label: 'Dernière activité', value: fmt(student.lastActivity) },
                { icon: <Target className="h-4 w-4 text-indigo-500" />,      label: 'Temps total', value: fmtTime(student.timeSpentMinutes) },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 bg-slate-50 rounded-xl">
                  {item.icon}
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide">{item.label}</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Learning Progress */}
          <section>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Progression d'apprentissage</h3>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 space-y-4">
              <div>
                <div className="flex justify-between text-sm font-medium mb-1.5">
                  <span className="text-slate-700">Progression globale du cours</span>
                  <span className="text-blue-600 font-bold">{student.progress}%</span>
                </div>
                <Progress value={student.progress} className="h-2.5" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white rounded-lg p-2.5 shadow-sm">
                  <p className="text-xl font-bold text-slate-900">{student.completedChapters}</p>
                  <p className="text-[10px] text-slate-400">Chapitres terminés</p>
                </div>
                <div className="bg-white rounded-lg p-2.5 shadow-sm">
                  <p className="text-xl font-bold text-slate-900">{student.totalChapters}</p>
                  <p className="text-[10px] text-slate-400">Total chapitres</p>
                </div>
                <div className="bg-white rounded-lg p-2.5 shadow-sm">
                  <p className="text-xl font-bold text-indigo-600">{student.lessonsCompleted}/{student.totalLessons}</p>
                  <p className="text-[10px] text-slate-400">Leçons suivies</p>
                </div>
              </div>
              <div className="bg-white/70 rounded-lg px-3 py-2 flex items-start gap-2">
                <BookOpen className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400">Chapitre en cours</p>
                  <p className="text-sm font-medium text-slate-800">{student.currentChapter}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Performance Analytics */}
          <section>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Analytiques de performance</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Award    className="h-5 w-5 text-emerald-500" />, bg: 'bg-emerald-50', label: 'Taux de réussite quiz', value: `${student.quizSuccessRate}%` },
                { icon: <XCircle  className="h-5 w-5 text-red-500" />,     bg: 'bg-red-50',     label: 'Erreurs commises', value: student.mistakesCount },
                { icon: <Zap      className="h-5 w-5 text-amber-500" />,   bg: 'bg-amber-50',   label: 'Sessions remédiation', value: student.remediationSessions },
                { icon: <Star     className="h-5 w-5 text-blue-500" />,    bg: 'bg-blue-50',    label: 'Moy. quiz', value: `${student.quizAverage}%` },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center gap-3">
                  <div className={`${item.bg} p-2 rounded-lg`}>{item.icon}</div>
                  <div>
                    <p className="text-[10px] text-slate-400">{item.label}</p>
                    <p className="text-lg font-bold text-slate-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            {student.difficultConcepts.length > 0 && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-xs font-semibold text-amber-700 mb-2">📚 Concepts difficiles identifiés :</p>
                <div className="flex flex-wrap gap-1.5">
                  {student.difficultConcepts.map((c, i) => (
                    <span key={i} className="text-[11px] bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full font-medium">{c}</span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* AI Tutor interactions */}
          <section>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Interactions Tuteur IA</h3>
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white rounded-lg p-2.5 shadow-sm">
                  <p className="text-xl font-bold text-violet-600">{student.conversationsCount}</p>
                  <p className="text-[10px] text-slate-400">Conversations</p>
                </div>
                <div className="bg-white rounded-lg p-2.5 shadow-sm">
                  <p className="text-xl font-bold text-violet-600">{student.questionsAsked}</p>
                  <p className="text-[10px] text-slate-400">Questions posées</p>
                </div>
                <div className="bg-white rounded-lg p-2.5 shadow-sm">
                  <p className="text-xl font-bold text-violet-600">{student.simplifyRequests + student.exampleRequests + student.repeatRequests}</p>
                  <p className="text-[10px] text-slate-400">Demandes IA</p>
                </div>
              </div>
              <div className="bg-white/80 rounded-lg p-3 space-y-2">
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Demandes d'explication :</p>
                {[
                  { label: '💡 Explications simplifiées', count: student.simplifyRequests, color: 'bg-violet-500' },
                  { label: '🔍 Exemples demandés',        count: student.exampleRequests,  color: 'bg-blue-500' },
                  { label: '🔁 Répétitions demandées',    count: student.repeatRequests,   color: 'bg-indigo-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs text-slate-600 w-48 shrink-0">{item.label}</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${item.color}`}
                        style={{ width: `${Math.min(100, item.count * 8)}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-700 w-6 text-right">{item.count}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white/60 rounded-lg px-3 py-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-violet-400" />
                <div>
                  <p className="text-[10px] text-slate-400">Dernière discussion</p>
                  <p className="text-sm font-medium text-slate-700">{fmt(student.lastDiscussion)}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Risk Analysis */}
          {student.riskLevel !== 'low' && (
            <section>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Analyse du risque pédagogique</h3>
              <div className={`rounded-xl p-4 border-2 space-y-3 ${student.riskLevel === 'high' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`h-5 w-5 ${student.riskLevel === 'high' ? 'text-red-500' : 'text-amber-500'}`} />
                  <p className={`text-sm font-bold ${student.riskLevel === 'high' ? 'text-red-700' : 'text-amber-700'}`}>
                    Indicateurs de risque détectés
                  </p>
                </div>
                <div className="space-y-2">
                  {[
                    { icon: <Clock    className="h-4 w-4 text-slate-500" />, label: 'Inactivité',             value: `${student.inactivityDays} jour(s) sans connexion`, warn: student.inactivityDays >= 3 },
                    { icon: <XCircle  className="h-4 w-4 text-slate-500" />, label: 'Erreurs récentes',       value: `${student.recentErrors} erreurs dans les 20 dernières questions`, warn: student.recentErrors >= 5 },
                    { icon: <Zap      className="h-4 w-4 text-slate-500" />, label: 'Cycles de remédiation',  value: `${student.remediationCycles} cycle(s) identifiés`, warn: student.remediationCycles >= 3 },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg ${item.warn ? 'bg-white/80' : 'bg-white/40'}`}>
                      {item.icon}
                      <div>
                        <p className="text-[10px] text-slate-500 font-medium">{item.label}</p>
                        <p className={`text-xs font-semibold ${item.warn ? 'text-red-700' : 'text-slate-600'}`}>{item.value}</p>
                      </div>
                      {item.warn && <span className="ml-auto text-red-500"><AlertTriangle className="h-3.5 w-3.5" /></span>}
                    </div>
                  ))}
                </div>
                {student.repeatedDifficulties.length > 0 && (
                  <div className="mt-1">
                    <p className="text-[10px] font-semibold text-slate-500 mb-1.5">Difficultés répétées :</p>
                    <div className="flex flex-wrap gap-1">
                      {student.repeatedDifficulties.map((d, i) => (
                        <span key={i} className="text-[11px] bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded-full font-medium">{d}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex flex-wrap gap-2">
          <Button variant="default" size="sm" className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white">
            <Send className="h-3.5 w-3.5" /> Envoyer recommandation
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-3.5 w-3.5" /> Exporter rapport
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <History className="h-3.5 w-3.5" /> Voir interactions IA
          </Button>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Risk badge cell
// ──────────────────────────────────────────────
function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${riskColors[level]}`}>
      <Shield className="h-3 w-3" /> {riskLabels[level]}
    </span>
  );
}

// ──────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────
export default function CourseStudentsPage() {
  const [selectedCourseId, setSelectedCourseId] = useState(mockCourseStudentsData[0].courseId);
  const [searchQuery, setSearchQuery]           = useState('');
  const [statusFilter, setStatusFilter]         = useState<string>('Tous');
  const [riskFilter, setRiskFilter]             = useState<string>('Tous');
  const [selectedStudent, setSelectedStudent]   = useState<CourseStudent | null>(null);
  const [courseDropOpen, setCourseDropOpen]     = useState(false);

  const course = useMemo(
    () => mockCourseStudentsData.find(c => c.courseId === selectedCourseId)!,
    [selectedCourseId]
  );

  const filtered = useMemo(() => {
    return course.students.filter(s => {
      const q  = searchQuery.toLowerCase();
      const matchQ = !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.classGroup.toLowerCase().includes(q);
      const matchS = statusFilter === 'Tous' || s.learningStatus === statusFilter;
      const matchR = riskFilter  === 'Tous' || s.riskLevel       === riskFilter;
      return matchQ && matchS && matchR;
    });
  }, [course.students, searchQuery, statusFilter, riskFilter]);

  const participationData     = useMemo(() => getParticipationData(course.students),     [course]);
  const progressDistData      = useMemo(() => getProgressDistributionData(course.students), [course]);
  const difficultyData        = useMemo(() => getDifficultyData(course.students),         [course]);

  const highRisk   = course.students.filter(s => s.riskLevel === 'high').length;
  const mediumRisk = course.students.filter(s => s.riskLevel === 'medium').length;
  const avgProgress = course.students.length
    ? Math.round(course.students.reduce((a, s) => a + s.progress, 0) / course.students.length)
    : 0;
  const avgQuiz = course.students.length
    ? +(course.students.reduce((a, s) => a + s.quizAverage, 0) / course.students.length).toFixed(1)
    : 0;

  const RADIAN = Math.PI / 180;
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, name }: any) => {
    if (value === 0) return null;
    const r  = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + r * Math.cos(-midAngle * RADIAN);
    const y  = cy + r * Math.sin(-midAngle * RADIAN);
    return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-[11px] font-bold">{value}</text>;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <BarChart3 className="h-4 w-4" />
            <span>Analytiques</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-600 font-medium">Étudiants du cours</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Étudiants du cours</h1>
          <p className="text-sm text-slate-400 mt-1">Suivi pédagogique et monitoring de la progression par cours</p>
        </div>

        {/* Course Selector */}
        <div className="relative min-w-[280px]">
          <button
            onClick={() => setCourseDropOpen(o => !o)}
            className="w-full flex items-center justify-between gap-3 px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-400 transition-colors text-left"
          >
            <div>
              <p className="text-xs text-slate-400">Cours sélectionné</p>
              <p className="text-sm font-semibold text-slate-900 leading-tight">{course.title}</p>
            </div>
            <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${courseDropOpen ? 'rotate-180' : ''}`} />
          </button>
          {courseDropOpen && (
            <div className="absolute top-full mt-1 left-0 right-0 z-20 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
              {mockCourseStudentsData.map(c => (
                <button
                  key={c.courseId}
                  onClick={() => { setSelectedCourseId(c.courseId); setCourseDropOpen(false); setSearchQuery(''); setStatusFilter('Tous'); setRiskFilter('Tous'); }}
                  className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-blue-50 transition-colors ${c.courseId === selectedCourseId ? 'bg-blue-50' : ''}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{c.title}</p>
                    <p className="text-xs text-slate-400">{c.studentsCount} étudiant{c.studentsCount !== 1 ? 's' : ''} · {c.level}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Course Info Bar ── */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${course.status === 'published' ? 'bg-emerald-400/30 text-emerald-100' : 'bg-amber-400/30 text-amber-100'}`}>
                {course.status === 'published' ? 'Publié' : 'En validation'}
              </span>
              <span className="text-blue-200 text-xs">·</span>
              <span className="text-blue-200 text-xs">{course.subject}</span>
            </div>
            <h2 className="text-xl font-bold leading-tight">{course.title}</h2>
            <p className="text-blue-200 text-sm mt-0.5">Niveau : {course.level}</p>
          </div>
          <div className="flex gap-6 sm:gap-8">
            <div className="text-center">
              <p className="text-3xl font-extrabold">{course.studentsCount}</p>
              <p className="text-blue-200 text-xs">Inscrits</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold">{avgProgress}%</p>
              <p className="text-blue-200 text-xs">Progression moy.</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold">{avgQuiz}%</p>
              <p className="text-blue-200 text-xs">Score moyen quiz</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard title="Total étudiants"   value={course.studentsCount} icon={<Users         className="h-6 w-6 text-blue-500"   />} iconBgColor="bg-blue-50"   />
        <AnalyticsCard title="Risque élevé"       value={highRisk}             icon={<AlertTriangle  className="h-6 w-6 text-red-500"    />} iconBgColor="bg-red-50"    />
        <AnalyticsCard title="Risque moyen"       value={mediumRisk}           icon={<AlertTriangle  className="h-6 w-6 text-amber-500"  />} iconBgColor="bg-amber-50"  />
        <AnalyticsCard title="Progression moy."  value={`${avgProgress}%`}    icon={<TrendingUp     className="h-6 w-6 text-emerald-500"/>} iconBgColor="bg-emerald-50"/>
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Participation Pie */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-500" /> Participation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={participationData} cx="50%" cy="50%" outerRadius={70} labelLine={false} label={renderLabel} dataKey="value">
                  {participationData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                </Pie>
                <Tooltip formatter={(v, n) => [`${v} étudiant(s)`, n]} />
                <Legend iconSize={10} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Progress Distribution Pie */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Distribution progression
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={progressDistData} cx="50%" cy="50%" outerRadius={70} labelLine={false} label={renderLabel} dataKey="value">
                  {progressDistData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                </Pie>
                <Tooltip formatter={(v, n) => [`${v} étudiant(s)`, n]} />
                <Legend iconSize={10} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Difficulty Bar */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Brain className="h-4 w-4 text-violet-500" /> Concepts difficiles
            </CardTitle>
          </CardHeader>
          <CardContent>
            {difficultyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={difficultyData} layout="vertical" margin={{ left: 0, right: 12, top: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(v) => [`${v} étudiant(s)`, 'Affectés']} />
                  <Bar dataKey="count" fill="#7C3AED" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[180px] text-slate-400 text-sm">Aucune donnée</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Students Table ── */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              Liste des étudiants
              <span className="ml-1 text-xs font-normal text-slate-400">({filtered.length}/{course.students.length})</span>
            </CardTitle>
            <div className="flex flex-wrap gap-2 items-center">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <Input
                  placeholder="Rechercher…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-8 h-8 text-sm w-44"
                />
              </div>
              {/* Status filter */}
              <div className="flex items-center gap-1">
                <Filter className="h-3.5 w-3.5 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {['Tous', 'En progression', 'Terminé', 'Bloqué', 'À risque'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              {/* Risk filter */}
              <select
                value={riskFilter}
                onChange={e => setRiskFilter(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {['Tous', 'low', 'medium', 'high'].map(r => (
                  <option key={r} value={r}>{r === 'Tous' ? 'Tous risques' : riskLabels[r as RiskLevel]}</option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Users className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-400 font-medium">Aucun étudiant trouvé</p>
              <p className="text-slate-300 text-sm mt-1">Essayez de modifier vos filtres</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    {['Étudiant', 'Classe', 'Progression', 'Moy. quiz', 'Dernière activité', 'Statut', 'Risque', 'Actions'].map(h => (
                      <th key={h} className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wide px-4 py-3 whitespace-nowrap first:rounded-tl-none last:rounded-tr-none">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map(s => (
                    <tr
                      key={s.id}
                      className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                      onClick={() => setSelectedStudent(s)}
                    >
                      {/* Avatar + Name */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3 min-w-[180px]">
                          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm`}>
                            {s.avatar}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">{s.name}</p>
                            <p className="text-[11px] text-slate-400 truncate">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      {/* Class */}
                      <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{s.classGroup}</td>
                      {/* Progress */}
                      <td className="px-4 py-3 min-w-[130px]">
                        <div className="flex items-center gap-2">
                          <Progress value={s.progress} className="h-1.5 flex-1" />
                          <span className="text-xs font-semibold text-slate-700 w-9 text-right shrink-0">{s.progress}%</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">{s.completedChapters}/{s.totalChapters} chapitres</p>
                      </td>
                      {/* Quiz avg */}
                      <td className="px-4 py-3">
                        <span className={`text-sm font-bold ${s.quizAverage >= 75 ? 'text-emerald-600' : s.quizAverage >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                          {s.quizAverage}%
                        </span>
                      </td>
                      {/* Last activity */}
                      <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-slate-300" />
                          {fmt(s.lastActivity)}
                        </div>
                        <p className="text-[10px] text-slate-300 mt-0.5">Il y a {inactiveDays(s.lastActivity)} jour(s)</p>
                      </td>
                      {/* Status */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusColors[s.learningStatus]}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusDot[s.learningStatus]}`} />
                          {s.learningStatus}
                        </span>
                      </td>
                      {/* Risk */}
                      <td className="px-4 py-3"><RiskBadge level={s.riskLevel} /></td>
                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => { e.stopPropagation(); setSelectedStudent(s); }}>
                            <Eye className="h-3.5 w-3.5 text-blue-500" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => e.stopPropagation()}>
                            <Send className="h-3.5 w-3.5 text-indigo-500" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => e.stopPropagation()}>
                            <Download className="h-3.5 w-3.5 text-slate-400" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Student Detail Drawer ── */}
      {selectedStudent && (
        <StudentDetailDrawer student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}
    </div>
  );
}
