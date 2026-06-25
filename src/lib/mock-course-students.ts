// ============================================================
// Smart Learning — Mock Data: Étudiants par Cours
// ============================================================

export type LearningStatus = 'En progression' | 'Terminé' | 'Bloqué' | 'À risque';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface CourseStudent {
  id: string;
  name: string;
  email: string;
  avatar: string; // initials
  avatarColor: string;
  classGroup: string;
  enrolledAt: string;
  progress: number; // 0-100
  completedChapters: number;
  totalChapters: number;
  currentChapter: string;
  quizAverage: number; // 0-100
  lastActivity: string;
  learningStatus: LearningStatus;
  riskLevel: RiskLevel;
  timeSpentMinutes: number;
  // Detail stats
  lessonsCompleted: number;
  totalLessons: number;
  quizSuccessRate: number;
  mistakesCount: number;
  remediationSessions: number;
  difficultConcepts: string[];
  // AI Tutor stats
  conversationsCount: number;
  questionsAsked: number;
  lastDiscussion: string;
  simplifyRequests: number;
  exampleRequests: number;
  repeatRequests: number;
  // Risk indicators
  inactivityDays: number;
  recentErrors: number;
  repeatedDifficulties: string[];
  remediationCycles: number;
}

export interface CourseWithStudents {
  courseId: string;
  title: string;
  subject: string;
  level: string;
  status: 'published' | 'validation' | 'draft';
  studentsCount: number;
  students: CourseStudent[];
}

// ============================================================
// Students for course c1 — Intelligence Artificielle
// ============================================================
const studentsC1: CourseStudent[] = [
  {
    id: 'cs1', name: 'Ahmed Benali', email: 'ahmed.benali@univ.ma',
    avatar: 'AB', avatarColor: 'from-blue-500 to-blue-600',
    classGroup: 'L3 Informatique', enrolledAt: '2026-01-20',
    progress: 68, completedChapters: 4, totalChapters: 8,
    currentChapter: 'Chapitre 5 : Réseaux de Neurones',
    quizAverage: 80.6, lastActivity: '2026-06-14T10:30:00',
    learningStatus: 'En progression', riskLevel: 'low',
    timeSpentMinutes: 1840,
    lessonsCompleted: 18, totalLessons: 26, quizSuccessRate: 82,
    mistakesCount: 14, remediationSessions: 3,
    difficultConcepts: ['Rétropropagation', 'Gradient descendant'],
    conversationsCount: 22, questionsAsked: 45, lastDiscussion: '2026-06-14T10:30:00',
    simplifyRequests: 8, exampleRequests: 12, repeatRequests: 5,
    inactivityDays: 0, recentErrors: 3, repeatedDifficulties: ['Rétropropagation'],
    remediationCycles: 1,
  },
  {
    id: 'cs2', name: 'Fatima Zahra Khelifi', email: 'fz.khelifi@univ.ma',
    avatar: 'FZ', avatarColor: 'from-pink-500 to-rose-500',
    classGroup: 'L3 Informatique', enrolledAt: '2026-01-20',
    progress: 91, completedChapters: 7, totalChapters: 8,
    currentChapter: 'Chapitre 8 : Éthique et IA',
    quizAverage: 94.2, lastActivity: '2026-06-14T09:15:00',
    learningStatus: 'En progression', riskLevel: 'low',
    timeSpentMinutes: 2760,
    lessonsCompleted: 24, totalLessons: 26, quizSuccessRate: 95,
    mistakesCount: 5, remediationSessions: 0,
    difficultConcepts: ['Attention Mechanism'],
    conversationsCount: 34, questionsAsked: 72, lastDiscussion: '2026-06-14T09:15:00',
    simplifyRequests: 3, exampleRequests: 18, repeatRequests: 2,
    inactivityDays: 0, recentErrors: 1, repeatedDifficulties: [],
    remediationCycles: 0,
  },
  {
    id: 'cs3', name: 'Amina Boudiaf', email: 'a.boudiaf@univ.ma',
    avatar: 'AM', avatarColor: 'from-amber-500 to-orange-500',
    classGroup: 'L3 Informatique', enrolledAt: '2026-01-20',
    progress: 31, completedChapters: 2, totalChapters: 8,
    currentChapter: 'Chapitre 4 : Apprentissage Automatique',
    quizAverage: 42.5, lastActivity: '2026-06-08T08:00:00',
    learningStatus: 'À risque', riskLevel: 'high',
    timeSpentMinutes: 540,
    lessonsCompleted: 7, totalLessons: 26, quizSuccessRate: 44,
    mistakesCount: 38, remediationSessions: 7,
    difficultConcepts: ['Rétropropagation', 'Descente de gradient', 'Fonctions de perte', 'Régularisation'],
    conversationsCount: 14, questionsAsked: 52, lastDiscussion: '2026-06-08T08:00:00',
    simplifyRequests: 22, exampleRequests: 15, repeatRequests: 11,
    inactivityDays: 6, recentErrors: 8, repeatedDifficulties: ['Rétropropagation', 'Fonctions de perte'],
    remediationCycles: 5,
  },
  {
    id: 'cs4', name: 'Youcef Mebarki', email: 'y.mebarki@univ.ma',
    avatar: 'YM', avatarColor: 'from-violet-500 to-purple-600',
    classGroup: 'M1 IA', enrolledAt: '2026-01-20',
    progress: 100, completedChapters: 8, totalChapters: 8,
    currentChapter: 'Cours terminé',
    quizAverage: 88.0, lastActivity: '2026-06-12T11:00:00',
    learningStatus: 'Terminé', riskLevel: 'low',
    timeSpentMinutes: 3120,
    lessonsCompleted: 26, totalLessons: 26, quizSuccessRate: 90,
    mistakesCount: 11, remediationSessions: 2,
    difficultConcepts: ['Régularisation L2'],
    conversationsCount: 41, questionsAsked: 88, lastDiscussion: '2026-06-12T11:00:00',
    simplifyRequests: 6, exampleRequests: 20, repeatRequests: 4,
    inactivityDays: 2, recentErrors: 2, repeatedDifficulties: [],
    remediationCycles: 0,
  },
  {
    id: 'cs5', name: 'Sara Belkacem', email: 's.belkacem@univ.ma',
    avatar: 'SB', avatarColor: 'from-teal-500 to-emerald-500',
    classGroup: 'L2 Informatique', enrolledAt: '2026-02-01',
    progress: 45, completedChapters: 3, totalChapters: 8,
    currentChapter: 'Chapitre 4 : Apprentissage Automatique',
    quizAverage: 66.0, lastActivity: '2026-06-13T15:00:00',
    learningStatus: 'En progression', riskLevel: 'medium',
    timeSpentMinutes: 1050,
    lessonsCompleted: 11, totalLessons: 26, quizSuccessRate: 67,
    mistakesCount: 22, remediationSessions: 4,
    difficultConcepts: ['Logique des prédicats', 'Systèmes experts'],
    conversationsCount: 18, questionsAsked: 39, lastDiscussion: '2026-06-13T15:00:00',
    simplifyRequests: 14, exampleRequests: 9, repeatRequests: 7,
    inactivityDays: 1, recentErrors: 5, repeatedDifficulties: ['Logique des prédicats'],
    remediationCycles: 3,
  },
  {
    id: 'cs6', name: 'Rachid Amrani', email: 'r.amrani@univ.ma',
    avatar: 'RA', avatarColor: 'from-red-500 to-rose-600',
    classGroup: 'M1 IA', enrolledAt: '2026-01-20',
    progress: 18, completedChapters: 1, totalChapters: 8,
    currentChapter: 'Chapitre 3 : Logique et Raisonnement',
    quizAverage: 35.0, lastActivity: '2026-05-20T10:00:00',
    learningStatus: 'Bloqué', riskLevel: 'high',
    timeSpentMinutes: 320,
    lessonsCompleted: 4, totalLessons: 26, quizSuccessRate: 36,
    mistakesCount: 52, remediationSessions: 9,
    difficultConcepts: ['BFS/DFS', 'Algorithme A*', 'Logique propositionnelle', 'Systèmes experts'],
    conversationsCount: 9, questionsAsked: 28, lastDiscussion: '2026-05-20T10:00:00',
    simplifyRequests: 18, exampleRequests: 8, repeatRequests: 14,
    inactivityDays: 25, recentErrors: 12, repeatedDifficulties: ['Algorithme A*', 'Logique propositionnelle'],
    remediationCycles: 7,
  },
  {
    id: 'cs7', name: 'Mohamed Cherif', email: 'm.cherif@univ.ma',
    avatar: 'MC', avatarColor: 'from-cyan-500 to-sky-500',
    classGroup: 'M1 IA', enrolledAt: '2026-01-20',
    progress: 75, completedChapters: 6, totalChapters: 8,
    currentChapter: 'Chapitre 7 : Vision par Ordinateur',
    quizAverage: 78.4, lastActivity: '2026-06-12T14:00:00',
    learningStatus: 'En progression', riskLevel: 'medium',
    timeSpentMinutes: 2100,
    lessonsCompleted: 20, totalLessons: 26, quizSuccessRate: 79,
    mistakesCount: 18, remediationSessions: 5,
    difficultConcepts: ['Optimisation des requêtes', 'CNN'],
    conversationsCount: 29, questionsAsked: 61, lastDiscussion: '2026-06-12T14:00:00',
    simplifyRequests: 11, exampleRequests: 16, repeatRequests: 6,
    inactivityDays: 2, recentErrors: 4, repeatedDifficulties: ['CNN'],
    remediationCycles: 3,
  },
];

// ============================================================
// Students for course c2 — Bases de Données Avancées
// ============================================================
const studentsC2: CourseStudent[] = [
  {
    id: 'cs8', name: 'Ahmed Benali', email: 'ahmed.benali@univ.ma',
    avatar: 'AB', avatarColor: 'from-blue-500 to-blue-600',
    classGroup: 'L3 Informatique', enrolledAt: '2026-02-05',
    progress: 42, completedChapters: 2, totalChapters: 6,
    currentChapter: 'Chapitre 3 : Optimisation des Requêtes',
    quizAverage: 71.8, lastActivity: '2026-06-13T15:00:00',
    learningStatus: 'En progression', riskLevel: 'low',
    timeSpentMinutes: 960,
    lessonsCompleted: 9, totalLessons: 22, quizSuccessRate: 73,
    mistakesCount: 10, remediationSessions: 2,
    difficultConcepts: ['Optimisation des requêtes', 'Transactions distribuées'],
    conversationsCount: 16, questionsAsked: 33, lastDiscussion: '2026-06-13T15:00:00',
    simplifyRequests: 7, exampleRequests: 10, repeatRequests: 3,
    inactivityDays: 1, recentErrors: 2, repeatedDifficulties: [],
    remediationCycles: 1,
  },
  {
    id: 'cs9', name: 'Fatima Zahra Khelifi', email: 'fz.khelifi@univ.ma',
    avatar: 'FZ', avatarColor: 'from-pink-500 to-rose-500',
    classGroup: 'L3 Informatique', enrolledAt: '2026-02-05',
    progress: 100, completedChapters: 6, totalChapters: 6,
    currentChapter: 'Cours terminé',
    quizAverage: 96.0, lastActivity: '2026-06-11T10:00:00',
    learningStatus: 'Terminé', riskLevel: 'low',
    timeSpentMinutes: 2280,
    lessonsCompleted: 22, totalLessons: 22, quizSuccessRate: 97,
    mistakesCount: 4, remediationSessions: 0,
    difficultConcepts: [],
    conversationsCount: 28, questionsAsked: 59, lastDiscussion: '2026-06-11T10:00:00',
    simplifyRequests: 2, exampleRequests: 14, repeatRequests: 1,
    inactivityDays: 3, recentErrors: 0, repeatedDifficulties: [],
    remediationCycles: 0,
  },
  {
    id: 'cs10', name: 'Mohamed Cherif', email: 'm.cherif@univ.ma',
    avatar: 'MC', avatarColor: 'from-cyan-500 to-sky-500',
    classGroup: 'M1 IA', enrolledAt: '2026-02-05',
    progress: 55, completedChapters: 3, totalChapters: 6,
    currentChapter: 'Chapitre 4 : NoSQL et MongoDB',
    quizAverage: 61.0, lastActivity: '2026-06-12T14:00:00',
    learningStatus: 'En progression', riskLevel: 'medium',
    timeSpentMinutes: 1320,
    lessonsCompleted: 13, totalLessons: 22, quizSuccessRate: 63,
    mistakesCount: 24, remediationSessions: 6,
    difficultConcepts: ['Optimisation des requêtes', 'Plans d\'exécution', 'Index composites'],
    conversationsCount: 20, questionsAsked: 44, lastDiscussion: '2026-06-12T14:00:00',
    simplifyRequests: 15, exampleRequests: 12, repeatRequests: 8,
    inactivityDays: 2, recentErrors: 5, repeatedDifficulties: ['Optimisation des requêtes'],
    remediationCycles: 3,
  },
  {
    id: 'cs11', name: 'Sara Belkacem', email: 's.belkacem@univ.ma',
    avatar: 'SB', avatarColor: 'from-teal-500 to-emerald-500',
    classGroup: 'L2 Informatique', enrolledAt: '2026-02-10',
    progress: 28, completedChapters: 1, totalChapters: 6,
    currentChapter: 'Chapitre 2 : SQL Avancé',
    quizAverage: 55.5, lastActivity: '2026-06-14T12:00:00',
    learningStatus: 'En progression', riskLevel: 'medium',
    timeSpentMinutes: 620,
    lessonsCompleted: 6, totalLessons: 22, quizSuccessRate: 57,
    mistakesCount: 18, remediationSessions: 3,
    difficultConcepts: ['Sous-requêtes corrélées', 'Fenêtres SQL'],
    conversationsCount: 11, questionsAsked: 27, lastDiscussion: '2026-06-14T12:00:00',
    simplifyRequests: 12, exampleRequests: 8, repeatRequests: 6,
    inactivityDays: 0, recentErrors: 6, repeatedDifficulties: ['Sous-requêtes corrélées'],
    remediationCycles: 2,
  },
];

// ============================================================
// Students for course c4 — Deep Learning
// ============================================================
const studentsC4: CourseStudent[] = [
  {
    id: 'cs12', name: 'Youcef Mebarki', email: 'y.mebarki@univ.ma',
    avatar: 'YM', avatarColor: 'from-violet-500 to-purple-600',
    classGroup: 'M1 IA', enrolledAt: '2026-01-25',
    progress: 82, completedChapters: 8, totalChapters: 10,
    currentChapter: 'Chapitre 9 : Transformers',
    quizAverage: 85.3, lastActivity: '2026-06-14T11:00:00',
    learningStatus: 'En progression', riskLevel: 'low',
    timeSpentMinutes: 2950,
    lessonsCompleted: 30, totalLessons: 38, quizSuccessRate: 87,
    mistakesCount: 16, remediationSessions: 2,
    difficultConcepts: ['Attention Mechanism', 'BERT'],
    conversationsCount: 38, questionsAsked: 82, lastDiscussion: '2026-06-14T11:00:00',
    simplifyRequests: 5, exampleRequests: 22, repeatRequests: 4,
    inactivityDays: 0, recentErrors: 3, repeatedDifficulties: [],
    remediationCycles: 1,
  },
  {
    id: 'cs13', name: 'Mohamed Cherif', email: 'm.cherif@univ.ma',
    avatar: 'MC', avatarColor: 'from-cyan-500 to-sky-500',
    classGroup: 'M1 IA', enrolledAt: '2026-01-25',
    progress: 55, completedChapters: 5, totalChapters: 10,
    currentChapter: 'Chapitre 6 : RNN et LSTM',
    quizAverage: 72.0, lastActivity: '2026-06-12T14:00:00',
    learningStatus: 'En progression', riskLevel: 'medium',
    timeSpentMinutes: 1860,
    lessonsCompleted: 20, totalLessons: 38, quizSuccessRate: 73,
    mistakesCount: 28, remediationSessions: 5,
    difficultConcepts: ['Backpropagation', 'Batch Normalization'],
    conversationsCount: 27, questionsAsked: 56, lastDiscussion: '2026-06-12T14:00:00',
    simplifyRequests: 13, exampleRequests: 14, repeatRequests: 9,
    inactivityDays: 2, recentErrors: 5, repeatedDifficulties: ['Backpropagation'],
    remediationCycles: 3,
  },
  {
    id: 'cs14', name: 'Rachid Amrani', email: 'r.amrani@univ.ma',
    avatar: 'RA', avatarColor: 'from-red-500 to-rose-600',
    classGroup: 'M1 IA', enrolledAt: '2026-01-25',
    progress: 22, completedChapters: 2, totalChapters: 10,
    currentChapter: 'Chapitre 4 : CNN',
    quizAverage: 38.5, lastActivity: '2026-05-20T10:00:00',
    learningStatus: 'Bloqué', riskLevel: 'high',
    timeSpentMinutes: 480,
    lessonsCompleted: 7, totalLessons: 38, quizSuccessRate: 39,
    mistakesCount: 60, remediationSessions: 12,
    difficultConcepts: ['CNN', 'Backpropagation', 'Optimiseurs Adam', 'Batch Normalization', 'Dropout'],
    conversationsCount: 12, questionsAsked: 35, lastDiscussion: '2026-05-20T10:00:00',
    simplifyRequests: 25, exampleRequests: 10, repeatRequests: 18,
    inactivityDays: 36, recentErrors: 12, repeatedDifficulties: ['CNN', 'Backpropagation'],
    remediationCycles: 9,
  },
];

// ============================================================
// Exported aggregated dataset
// ============================================================
export const mockCourseStudentsData: CourseWithStudents[] = [
  {
    courseId: 'c1', title: 'Intelligence Artificielle - Fondamentaux',
    subject: 'Informatique', level: 'Licence 3', status: 'published',
    studentsCount: studentsC1.length, students: studentsC1,
  },
  {
    courseId: 'c2', title: 'Bases de Données Avancées',
    subject: 'Informatique', level: 'Licence 3', status: 'published',
    studentsCount: studentsC2.length, students: studentsC2,
  },
  {
    courseId: 'c4', title: 'Deep Learning et Réseaux de Neurones',
    subject: 'Intelligence Artificielle', level: 'Master 1', status: 'published',
    studentsCount: studentsC4.length, students: studentsC4,
  },
  {
    courseId: 'c3', title: 'Réseaux et Protocoles',
    subject: 'Informatique', level: 'Licence 3', status: 'published',
    studentsCount: 0, students: [],
  },
];

// ============================================================
// Chart helpers
// ============================================================
export function getParticipationData(students: CourseStudent[]) {
  const active = students.filter(s => s.inactivityDays <= 3).length;
  const inactive = students.length - active;
  return [
    { name: 'Actifs', value: active, fill: '#3B82F6' },
    { name: 'Inactifs', value: inactive, fill: '#EF4444' },
  ];
}

export function getProgressDistributionData(students: CourseStudent[]) {
  const done = students.filter(s => s.learningStatus === 'Terminé').length;
  const inProg = students.filter(s => s.learningStatus === 'En progression').length;
  const late = students.filter(s => s.learningStatus === 'Bloqué' || s.learningStatus === 'À risque').length;
  return [
    { name: 'Terminé', value: done, fill: '#10B981' },
    { name: 'En cours', value: inProg, fill: '#3B82F6' },
    { name: 'En retard', value: late, fill: '#F59E0B' },
  ];
}

export function getDifficultyData(students: CourseStudent[]) {
  const freq: Record<string, number> = {};
  students.forEach(s => s.difficultConcepts.forEach(c => { freq[c] = (freq[c] || 0) + 1; }));
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count }));
}
