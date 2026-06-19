// ============================================================
// Smart Learning - TypeScript Type Definitions
// ============================================================

export type UserRole = 'student' | 'designer' | 'admin';
export type CourseStatus = 'draft' | 'processing' | 'validation' | 'published';
export type QuestionStatus = 'draft' | 'approved' | 'rejected' | 'edited';
export type QuestionType = 'qcm' | 'true_false';
export type AvatarState = 'idle' | 'talking' | 'thinking';
export type RiskReason = 'inactivity' | 'errors' | 'remediation';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: 'active' | 'inactive' | 'disabled';
  class?: string;
  lastLogin?: string;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  subject: string;
  level: string;
  description: string;
  keywords: string[];
  class: string;
  status: CourseStatus;
  progress?: number;
  chaptersCount: number;
  studentsCount: number;
  ocrScore?: number;
  createdAt: string;
  updatedAt: string;
  designerId: string;
  imageUrl?: string;
}

export interface Chapter {
  id: string;
  courseId: string;
  title: string;
  order: number;
  progress?: number;
  sections: Section[];
}

export interface Section {
  id: string;
  chapterId: string;
  title: string;
  order: number;
  subsections?: Subsection[];
}

export interface Subsection {
  id: string;
  sectionId: string;
  title: string;
  order: number;
}

export interface ChatMessage {
  id: string;
  role: 'student' | 'teacher';
  content: string;
  timestamp: string;
  citations?: Citation[];
  isTyping?: boolean;
}

export interface Citation {
  id: string;
  page: number;
  text: string;
  relevance: number;
}

export interface QuizQuestion {
  id: string;
  courseId: string;
  chapterId: string;
  chapterTitle: string;
  question: string;
  type: QuestionType;
  options: string[];
  correctAnswer: number;
  explanation: string;
  citation?: Citation;
  status: QuestionStatus;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizAttempt {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
}

export interface StudentProgress {
  courseId: string;
  courseTitle: string;
  globalProgress: number;
  completedChapters: number;
  totalChapters: number;
  quizScores: number[];
  averageScore: number;
  strongConcepts: string[];
  difficultConcepts: string[];
  lastActivity: string;
  learningStreak: number;
  totalTimeSpent: number;
}

export interface RiskProfile {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  riskLevel: 'high' | 'medium' | 'low';
  reasons: RiskReason[];
  reasonDetails: string[];
  lastInteraction: string;
  difficultConcepts: string[];
  errorHistory: { date: string; count: number }[];
  remediationsProposed: string[];
  recommendedIntervention: string;
}

export interface AnalyticsStat {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: string;
}

export interface LearningEvent {
  id: string;
  date: string;
  type: 'chapter_completed' | 'quiz_taken' | 'conversation' | 'login';
  description: string;
  score?: number;
}

export interface ConceptDifficulty {
  concept: string;
  chapter: string;
  errorRate: number;
  questionsCount: number;
}

export interface OCRAlert {
  id: string;
  courseTitle: string;
  page: number;
  quality: number;
  issue: string;
}

export interface PlatformStats {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  totalConversations: number;
  storageUsed: number;
  storageTotal: number;
  aiServiceStatus: 'operational' | 'degraded' | 'down';
  avgResponseTime: number;
  uptime: number;
}

export interface AppSettings {
  maxSourcesDisplayed: number;
  quizSize: number;
  ttsSpeedMin: number;
  ttsSpeedMax: number;
  inactivityThreshold: number;
  errorThreshold: number;
  ocrMinQuality: number;
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  securityTwoFactor: boolean;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface ClassGroup {
  id: string;
  name: string;
  level: string;
  studentsCount: number;
  coursesCount: number;
  createdAt: string;
}

export interface RoleConfig {
  id: string;
  name: string;
  permissions: string[];
  usersCount: number;
}
