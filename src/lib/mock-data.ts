import {
  User, Course, Chapter, Section, ChatMessage, QuizQuestion,
  StudentProgress, RiskProfile, LearningEvent, ConceptDifficulty,
  OCRAlert, PlatformStats, AppSettings, ClassGroup, RoleConfig, Citation
} from '@/types';

// ============================================================
// Users
// ============================================================
export const mockUsers: User[] = [
  { id: 'u1', name: 'Ahmed Benali', email: 'ahmed.benali@univ.ma', role: 'student', status: 'active', class: 'L3 Informatique', lastLogin: '2026-06-14T10:30:00', createdAt: '2025-09-01' },
  { id: 'u2', name: 'Fatima Zahra Khelifi', email: 'fz.khelifi@univ.ma', role: 'student', status: 'active', class: 'L3 Informatique', lastLogin: '2026-06-14T09:15:00', createdAt: '2025-09-01' },
  { id: 'u3', name: 'Mohamed Cherif', email: 'm.cherif@univ.ma', role: 'student', status: 'active', class: 'M1 IA', lastLogin: '2026-06-12T14:00:00', createdAt: '2025-09-01' },
  { id: 'u4', name: 'Amina Boudiaf', email: 'a.boudiaf@univ.ma', role: 'student', status: 'inactive', class: 'L3 Informatique', lastLogin: '2026-06-08T08:00:00', createdAt: '2025-09-01' },
  { id: 'u5', name: 'Youcef Mebarki', email: 'y.mebarki@univ.ma', role: 'student', status: 'active', class: 'M1 IA', lastLogin: '2026-06-14T11:00:00', createdAt: '2025-09-01' },
  { id: 'u6', name: 'Dr. Karim Mansouri', email: 'k.mansouri@univ.ma', role: 'designer', status: 'active', lastLogin: '2026-06-14T08:00:00', createdAt: '2024-01-15' },
  { id: 'u7', name: 'Dr. Samira Hadj', email: 's.hadj@univ.ma', role: 'designer', status: 'active', lastLogin: '2026-06-13T16:30:00', createdAt: '2024-03-20' },
  { id: 'u8', name: 'Admin Système', email: 'admin@smartlearning.ma', role: 'admin', status: 'active', lastLogin: '2026-06-14T07:00:00', createdAt: '2024-01-01' },
  { id: 'u9', name: 'Sara Belkacem', email: 's.belkacem@univ.ma', role: 'student', status: 'active', class: 'L2 Informatique', lastLogin: '2026-06-14T12:00:00', createdAt: '2025-09-01' },
  { id: 'u10', name: 'Rachid Amrani', email: 'r.amrani@univ.ma', role: 'student', status: 'disabled', class: 'M1 IA', lastLogin: '2026-05-20T10:00:00', createdAt: '2025-09-01' },
];

// ============================================================
// Courses
// ============================================================
export const mockCourses: Course[] = [
  {
    id: 'c1', title: 'Intelligence Artificielle - Fondamentaux', subject: 'Informatique',
    level: 'Licence 3', description: 'Introduction aux concepts fondamentaux de l\'intelligence artificielle : recherche, logique, apprentissage automatique.',
    keywords: ['IA', 'Machine Learning', 'Recherche', 'Logique'], class: 'L3 Informatique',
    status: 'published', progress: 68, chaptersCount: 8, studentsCount: 45, ocrScore: 94,
    createdAt: '2026-01-15', updatedAt: '2026-06-10', designerId: 'u6'
  },
  {
    id: 'c2', title: 'Bases de Données Avancées', subject: 'Informatique',
    level: 'Licence 3', description: 'Systèmes de gestion de bases de données, optimisation des requêtes, NoSQL et bases de données distribuées.',
    keywords: ['SQL', 'NoSQL', 'Optimisation', 'MongoDB'], class: 'L3 Informatique',
    status: 'published', progress: 42, chaptersCount: 6, studentsCount: 38, ocrScore: 91,
    createdAt: '2026-02-01', updatedAt: '2026-06-08', designerId: 'u6'
  },
  {
    id: 'c3', title: 'Réseaux et Protocoles', subject: 'Informatique',
    level: 'Licence 3', description: 'Architecture des réseaux, protocoles TCP/IP, sécurité réseau et administration système.',
    keywords: ['TCP/IP', 'Sécurité', 'Routage', 'DNS'], class: 'L3 Informatique',
    status: 'published', progress: 25, chaptersCount: 7, studentsCount: 42, ocrScore: 88,
    createdAt: '2026-02-15', updatedAt: '2026-06-05', designerId: 'u7'
  },
  {
    id: 'c4', title: 'Deep Learning et Réseaux de Neurones', subject: 'Intelligence Artificielle',
    level: 'Master 1', description: 'Réseaux de neurones profonds, CNN, RNN, Transformers et applications en vision et NLP.',
    keywords: ['Deep Learning', 'CNN', 'RNN', 'Transformers'], class: 'M1 IA',
    status: 'published', progress: 55, chaptersCount: 10, studentsCount: 28, ocrScore: 96,
    createdAt: '2026-01-20', updatedAt: '2026-06-12', designerId: 'u7'
  },
  {
    id: 'c5', title: 'Traitement du Langage Naturel', subject: 'Intelligence Artificielle',
    level: 'Master 1', description: 'NLP : tokenization, embeddings, modèles de langue, analyse de sentiment, chatbots.',
    keywords: ['NLP', 'Tokenization', 'BERT', 'GPT'], class: 'M1 IA',
    status: 'validation', chaptersCount: 8, studentsCount: 0, ocrScore: 87,
    createdAt: '2026-05-01', updatedAt: '2026-06-13', designerId: 'u6'
  },
  {
    id: 'c6', title: 'Algorithmique Avancée', subject: 'Informatique',
    level: 'Licence 2', description: 'Algorithmes de tri, graphes, programmation dynamique, complexité algorithmique.',
    keywords: ['Algorithmes', 'Graphes', 'Complexité', 'Tri'], class: 'L2 Informatique',
    status: 'processing', chaptersCount: 9, studentsCount: 0, ocrScore: 72,
    createdAt: '2026-06-01', updatedAt: '2026-06-14', designerId: 'u6'
  },
  {
    id: 'c7', title: 'Systèmes d\'Exploitation', subject: 'Informatique',
    level: 'Licence 2', description: 'Gestion des processus, mémoire virtuelle, systèmes de fichiers, concurrence.',
    keywords: ['OS', 'Processus', 'Mémoire', 'Linux'], class: 'L2 Informatique',
    status: 'draft', chaptersCount: 7, studentsCount: 0,
    createdAt: '2026-06-10', updatedAt: '2026-06-14', designerId: 'u7'
  },
];

// ============================================================
// Chapters
// ============================================================
export const mockChapters: Chapter[] = [
  {
    id: 'ch1', courseId: 'c1', title: 'Introduction à l\'IA', order: 1, progress: 100,
    sections: [
      { id: 's1', chapterId: 'ch1', title: 'Historique de l\'IA', order: 1 },
      { id: 's2', chapterId: 'ch1', title: 'Définitions et concepts clés', order: 2 },
      { id: 's3', chapterId: 'ch1', title: 'Applications actuelles', order: 3 },
    ]
  },
  {
    id: 'ch2', courseId: 'c1', title: 'Recherche et Exploration', order: 2, progress: 100,
    sections: [
      { id: 's4', chapterId: 'ch2', title: 'Recherche en largeur (BFS)', order: 1 },
      { id: 's5', chapterId: 'ch2', title: 'Recherche en profondeur (DFS)', order: 2 },
      { id: 's6', chapterId: 'ch2', title: 'Algorithme A*', order: 3 },
      { id: 's7', chapterId: 'ch2', title: 'Recherche heuristique', order: 4 },
    ]
  },
  {
    id: 'ch3', courseId: 'c1', title: 'Logique et Raisonnement', order: 3, progress: 85,
    sections: [
      { id: 's8', chapterId: 'ch3', title: 'Logique propositionnelle', order: 1 },
      { id: 's9', chapterId: 'ch3', title: 'Logique des prédicats', order: 2 },
      { id: 's10', chapterId: 'ch3', title: 'Systèmes experts', order: 3 },
    ]
  },
  {
    id: 'ch4', courseId: 'c1', title: 'Apprentissage Automatique', order: 4, progress: 60,
    sections: [
      { id: 's11', chapterId: 'ch4', title: 'Apprentissage supervisé', order: 1 },
      { id: 's12', chapterId: 'ch4', title: 'Apprentissage non supervisé', order: 2 },
      { id: 's13', chapterId: 'ch4', title: 'Régression et classification', order: 3 },
    ]
  },
  {
    id: 'ch5', courseId: 'c1', title: 'Réseaux de Neurones', order: 5, progress: 40,
    sections: [
      { id: 's14', chapterId: 'ch5', title: 'Perceptron', order: 1 },
      { id: 's15', chapterId: 'ch5', title: 'Rétropropagation', order: 2 },
      { id: 's16', chapterId: 'ch5', title: 'Architectures modernes', order: 3 },
    ]
  },
  {
    id: 'ch6', courseId: 'c1', title: 'Traitement du Langage', order: 6, progress: 20,
    sections: [
      { id: 's17', chapterId: 'ch6', title: 'Tokenization', order: 1 },
      { id: 's18', chapterId: 'ch6', title: 'Modèles de langue', order: 2 },
    ]
  },
  {
    id: 'ch7', courseId: 'c1', title: 'Vision par Ordinateur', order: 7, progress: 0,
    sections: [
      { id: 's19', chapterId: 'ch7', title: 'Filtrage d\'images', order: 1 },
      { id: 's20', chapterId: 'ch7', title: 'Détection d\'objets', order: 2 },
    ]
  },
  {
    id: 'ch8', courseId: 'c1', title: 'Éthique et IA Responsable', order: 8, progress: 0,
    sections: [
      { id: 's21', chapterId: 'ch8', title: 'Biais algorithmiques', order: 1 },
      { id: 's22', chapterId: 'ch8', title: 'IA et société', order: 2 },
    ]
  },
];

// ============================================================
// Chat Messages
// ============================================================
export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg1', role: 'student', content: 'Bonjour ! Pouvez-vous m\'expliquer l\'algorithme A* ?',
    timestamp: '2026-06-14T10:30:00'
  },
  {
    id: 'msg2', role: 'teacher',
    content: 'Bien sûr ! L\'algorithme A* est un algorithme de recherche de chemin qui combine les avantages de la recherche en largeur (BFS) et de la recherche gloutonne. Il utilise une fonction d\'évaluation f(n) = g(n) + h(n), où :\n\n• **g(n)** est le coût réel depuis le nœud initial jusqu\'au nœud n\n• **h(n)** est l\'estimation heuristique du coût de n jusqu\'au but\n\nL\'algorithme explore toujours le nœud avec la plus petite valeur f(n), ce qui garantit de trouver le chemin optimal si l\'heuristique est admissible.',
    timestamp: '2026-06-14T10:30:15',
    citations: [
      { id: 'cit1', page: 42, text: 'L\'algorithme A* utilise une fonction d\'évaluation f(n) = g(n) + h(n) pour guider la recherche vers la solution optimale.', relevance: 95 },
      { id: 'cit2', page: 43, text: 'Une heuristique est dite admissible si elle ne surestime jamais le coût réel pour atteindre le but.', relevance: 88 },
    ]
  },
  {
    id: 'msg3', role: 'student', content: 'Qu\'est-ce qu\'une heuristique admissible exactement ?',
    timestamp: '2026-06-14T10:31:00'
  },
  {
    id: 'msg4', role: 'teacher',
    content: 'Une heuristique **admissible** est une fonction h(n) qui ne surestime **jamais** le vrai coût pour atteindre le but depuis le nœud n.\n\nPar exemple, dans un problème de navigation :\n- La **distance à vol d\'oiseau** (distance euclidienne) est une heuristique admissible car elle est toujours ≤ à la distance réelle par la route\n- La **distance de Manhattan** est admissible pour un quadrillage\n\nCette propriété est cruciale car elle garantit que A* trouvera toujours le chemin le plus court.',
    timestamp: '2026-06-14T10:31:20',
    citations: [
      { id: 'cit3', page: 44, text: 'Une heuristique h est admissible si pour tout nœud n : h(n) ≤ h*(n), où h*(n) est le coût optimal réel de n au but.', relevance: 96 },
    ]
  },
  {
    id: 'msg5', role: 'student', content: 'Pouvez-vous me donner un exemple concret avec des chiffres ?',
    timestamp: '2026-06-14T10:32:00'
  },
  {
    id: 'msg6', role: 'teacher',
    content: 'Bien sûr ! Imaginons un graphe simple avec 4 nœuds : A (départ), B, C, D (arrivée)\n\n**Arêtes et coûts :**\n- A → B : coût 1\n- A → C : coût 4\n- B → D : coût 6\n- C → D : coût 1\n\n**Heuristique h(n) :**\n- h(A) = 5, h(B) = 4, h(C) = 1, h(D) = 0\n\n**Déroulement de A* :**\n1. File : {A}, f(A) = 0 + 5 = 5\n2. Expansion A → {B, C}, f(B) = 1+4 = 5, f(C) = 4+1 = 5\n3. Expansion B → {C, D}, f(D) = 1+6+0 = 7\n4. Expansion C → {D}, f(D) = 4+1+0 = 5 ✅\n\nChemin optimal trouvé : **A → C → D** avec un coût de **5** !',
    timestamp: '2026-06-14T10:32:30',
    citations: [
      { id: 'cit4', page: 45, text: 'Exemple : soit le graphe G avec les nœuds A, B, C, D et les arêtes pondérées...', relevance: 90 },
    ]
  },
];

// ============================================================
// Quiz Questions
// ============================================================
export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 'q1', courseId: 'c1', chapterId: 'ch2', chapterTitle: 'Recherche et Exploration',
    question: 'Quelle est la fonction d\'évaluation utilisée par l\'algorithme A* ?',
    type: 'qcm', options: ['f(n) = g(n) × h(n)', 'f(n) = g(n) + h(n)', 'f(n) = g(n) - h(n)', 'f(n) = max(g(n), h(n))'],
    correctAnswer: 1, explanation: 'A* utilise f(n) = g(n) + h(n), combinant le coût réel g(n) et l\'estimation heuristique h(n).',
    citation: { id: 'cit1', page: 42, text: 'L\'algorithme A* utilise f(n) = g(n) + h(n)', relevance: 95 },
    status: 'approved', difficulty: 'medium'
  },
  {
    id: 'q2', courseId: 'c1', chapterId: 'ch2', chapterTitle: 'Recherche et Exploration',
    question: 'L\'algorithme BFS explore les nœuds en profondeur avant d\'explorer en largeur.',
    type: 'true_false', options: ['Vrai', 'Faux'],
    correctAnswer: 1, explanation: 'Faux. BFS (Breadth-First Search) explore d\'abord tous les nœuds au même niveau avant de passer au niveau suivant.',
    citation: { id: 'cit5', page: 38, text: 'BFS explore les nœuds niveau par niveau', relevance: 92 },
    status: 'approved', difficulty: 'easy'
  },
  {
    id: 'q3', courseId: 'c1', chapterId: 'ch3', chapterTitle: 'Logique et Raisonnement',
    question: 'Quel type de logique utilise des quantificateurs (∀, ∃) ?',
    type: 'qcm', options: ['Logique propositionnelle', 'Logique des prédicats', 'Logique floue', 'Logique modale'],
    correctAnswer: 1, explanation: 'La logique des prédicats (ou logique du premier ordre) étend la logique propositionnelle avec des quantificateurs universels (∀) et existentiels (∃).',
    citation: { id: 'cit6', page: 56, text: 'La logique des prédicats introduit les quantificateurs ∀ et ∃', relevance: 94 },
    status: 'approved', difficulty: 'medium'
  },
  {
    id: 'q4', courseId: 'c1', chapterId: 'ch4', chapterTitle: 'Apprentissage Automatique',
    question: 'Le clustering K-Means est un algorithme d\'apprentissage supervisé.',
    type: 'true_false', options: ['Vrai', 'Faux'],
    correctAnswer: 1, explanation: 'Faux. K-Means est un algorithme d\'apprentissage non supervisé qui regroupe les données en K clusters sans labels.',
    status: 'draft', difficulty: 'easy'
  },
  {
    id: 'q5', courseId: 'c1', chapterId: 'ch4', chapterTitle: 'Apprentissage Automatique',
    question: 'Quel algorithme est le plus adapté pour la classification binaire ?',
    type: 'qcm', options: ['K-Means', 'Régression logistique', 'ACP', 'K plus proches voisins (KNN)'],
    correctAnswer: 1, explanation: 'La régression logistique est spécialement conçue pour la classification binaire, produisant des probabilités entre 0 et 1.',
    citation: { id: 'cit7', page: 78, text: 'La régression logistique est l\'algorithme de référence pour la classification binaire', relevance: 91 },
    status: 'approved', difficulty: 'medium'
  },
  {
    id: 'q6', courseId: 'c1', chapterId: 'ch5', chapterTitle: 'Réseaux de Neurones',
    question: 'Quelle fonction d\'activation est la plus utilisée dans les réseaux modernes ?',
    type: 'qcm', options: ['Sigmoïde', 'Tanh', 'ReLU', 'Softmax'],
    correctAnswer: 2, explanation: 'ReLU (Rectified Linear Unit) est la plus utilisée car elle résout le problème du gradient qui disparaît et est efficace à calculer.',
    status: 'edited', difficulty: 'medium'
  },
  {
    id: 'q7', courseId: 'c1', chapterId: 'ch5', chapterTitle: 'Réseaux de Neurones',
    question: 'La rétropropagation utilise la règle de la chaîne pour calculer les gradients.',
    type: 'true_false', options: ['Vrai', 'Faux'],
    correctAnswer: 0, explanation: 'Vrai. La rétropropagation (backpropagation) utilise la règle de la chaîne du calcul différentiel pour propager l\'erreur depuis la sortie vers les couches cachées.',
    status: 'rejected', difficulty: 'hard'
  },
  {
    id: 'q8', courseId: 'c1', chapterId: 'ch1', chapterTitle: 'Introduction à l\'IA',
    question: 'Qui est considéré comme le père de l\'intelligence artificielle ?',
    type: 'qcm', options: ['Alan Turing', 'John McCarthy', 'Marvin Minsky', 'Herbert Simon'],
    correctAnswer: 1, explanation: 'John McCarthy a inventé le terme "intelligence artificielle" en 1956 lors de la conférence de Dartmouth.',
    status: 'approved', difficulty: 'easy'
  },
];

// ============================================================
// Student Progress
// ============================================================
export const mockStudentProgress: StudentProgress[] = [
  {
    courseId: 'c1', courseTitle: 'Intelligence Artificielle - Fondamentaux',
    globalProgress: 68, completedChapters: 4, totalChapters: 8,
    quizScores: [85, 90, 75, 80, 65, 70, 88, 92],
    averageScore: 80.6,
    strongConcepts: ['Algorithme A*', 'BFS/DFS', 'Logique propositionnelle', 'Recherche heuristique'],
    difficultConcepts: ['Rétropropagation', 'Gradient descendant', 'Régularisation L2'],
    lastActivity: '2026-06-14T10:30:00', learningStreak: 7, totalTimeSpent: 1840
  },
  {
    courseId: 'c2', courseTitle: 'Bases de Données Avancées',
    globalProgress: 42, completedChapters: 2, totalChapters: 6,
    quizScores: [70, 65, 80, 72],
    averageScore: 71.8,
    strongConcepts: ['SQL Joins', 'Normalisation', 'Index B-Tree'],
    difficultConcepts: ['Optimisation des requêtes', 'Transactions distribuées', 'Consensus Paxos'],
    lastActivity: '2026-06-13T15:00:00', learningStreak: 3, totalTimeSpent: 960
  },
  {
    courseId: 'c3', courseTitle: 'Réseaux et Protocoles',
    globalProgress: 25, completedChapters: 1, totalChapters: 7,
    quizScores: [60, 55],
    averageScore: 57.5,
    strongConcepts: ['Modèle OSI'],
    difficultConcepts: ['Routage dynamique', 'BGP', 'Configuration pare-feu'],
    lastActivity: '2026-06-10T10:00:00', learningStreak: 0, totalTimeSpent: 420
  },
];

// ============================================================
// Risk Profiles
// ============================================================
export const mockRiskProfiles: RiskProfile[] = [
  {
    id: 'r1', studentId: 'u4', studentName: 'Amina Boudiaf', courseId: 'c1',
    courseTitle: 'Intelligence Artificielle - Fondamentaux',
    riskLevel: 'high',
    reasons: ['inactivity', 'errors'],
    reasonDetails: ['Inactivité > 72h', '8 erreurs sur les 20 dernières questions'],
    lastInteraction: '2026-06-08T08:00:00',
    difficultConcepts: ['Rétropropagation', 'Descente de gradient', 'Fonctions de perte', 'Régularisation'],
    errorHistory: [
      { date: '2026-06-01', count: 3 }, { date: '2026-06-03', count: 2 },
      { date: '2026-06-05', count: 4 }, { date: '2026-06-07', count: 3 },
    ],
    remediationsProposed: [
      'Explication simplifiée de la rétropropagation avec analogie',
      'Exercice guidé sur la descente de gradient',
      'Vidéo recommandée sur les fonctions de perte',
    ],
    recommendedIntervention: 'Contacter l\'étudiante par email pour vérifier sa situation et proposer une session de tutorat individuel.'
  },
  {
    id: 'r2', studentId: 'u3', studentName: 'Mohamed Cherif', courseId: 'c2',
    courseTitle: 'Bases de Données Avancées',
    riskLevel: 'medium',
    reasons: ['remediation'],
    reasonDetails: ['3 cycles de remédiation sur le chapitre "Optimisation"'],
    lastInteraction: '2026-06-12T14:00:00',
    difficultConcepts: ['Optimisation des requêtes', 'Plans d\'exécution', 'Index composites'],
    errorHistory: [
      { date: '2026-06-08', count: 2 }, { date: '2026-06-10', count: 3 },
      { date: '2026-06-12', count: 2 },
    ],
    remediationsProposed: [
      'Reformulation de l\'optimisation des requêtes avec exemples concrets',
      'Quiz adaptatif sur les plans d\'exécution',
    ],
    recommendedIntervention: 'Proposer des exercices pratiques supplémentaires sur PostgreSQL.'
  },
  {
    id: 'r3', studentId: 'u10', studentName: 'Rachid Amrani', courseId: 'c4',
    courseTitle: 'Deep Learning et Réseaux de Neurones',
    riskLevel: 'high',
    reasons: ['inactivity', 'errors', 'remediation'],
    reasonDetails: ['Inactivité > 3 semaines', '12 erreurs sur 20 questions', '5 cycles de remédiation'],
    lastInteraction: '2026-05-20T10:00:00',
    difficultConcepts: ['CNN', 'Backpropagation', 'Optimiseurs Adam', 'Batch Normalization', 'Dropout'],
    errorHistory: [
      { date: '2026-05-10', count: 4 }, { date: '2026-05-15', count: 5 },
      { date: '2026-05-18', count: 3 }, { date: '2026-05-20', count: 4 },
    ],
    remediationsProposed: [
      'Explication simplifiée des CNN avec visualisations',
      'Tutoriel interactif sur la backpropagation',
      'Exercice guidé pas à pas sur Adam optimizer',
      'Session de remédiation sur Batch Normalization',
    ],
    recommendedIntervention: 'Intervention urgente requise. Contacter l\'étudiant et envisager un plan de rattrapage personnalisé.'
  },
];

// ============================================================
// Learning Events / Timeline
// ============================================================
export const mockLearningEvents: LearningEvent[] = [
  { id: 'e1', date: '2026-06-14T10:30:00', type: 'conversation', description: 'Conversation avec le tuteur IA - Chapitre 4 : Apprentissage Automatique' },
  { id: 'e2', date: '2026-06-14T09:00:00', type: 'quiz_taken', description: 'Quiz - Chapitre 3 : Logique et Raisonnement', score: 85 },
  { id: 'e3', date: '2026-06-13T16:00:00', type: 'chapter_completed', description: 'Chapitre 3 terminé : Logique et Raisonnement' },
  { id: 'e4', date: '2026-06-13T14:30:00', type: 'conversation', description: 'Conversation avec le tuteur IA - Systèmes experts' },
  { id: 'e5', date: '2026-06-12T11:00:00', type: 'quiz_taken', description: 'Quiz - Chapitre 2 : Recherche et Exploration', score: 90 },
  { id: 'e6', date: '2026-06-11T10:00:00', type: 'chapter_completed', description: 'Chapitre 2 terminé : Recherche et Exploration' },
  { id: 'e7', date: '2026-06-10T09:00:00', type: 'login', description: 'Connexion à la plateforme' },
  { id: 'e8', date: '2026-06-09T15:00:00', type: 'quiz_taken', description: 'Quiz - Chapitre 1 : Introduction à l\'IA', score: 92 },
  { id: 'e9', date: '2026-06-08T10:00:00', type: 'chapter_completed', description: 'Chapitre 1 terminé : Introduction à l\'IA' },
  { id: 'e10', date: '2026-06-07T14:00:00', type: 'conversation', description: 'Première conversation avec le tuteur IA' },
];

// ============================================================
// Concept Difficulties
// ============================================================
export const mockConceptDifficulties: ConceptDifficulty[] = [
  { concept: 'Rétropropagation', chapter: 'Réseaux de Neurones', errorRate: 68, questionsCount: 45 },
  { concept: 'Descente de gradient', chapter: 'Apprentissage Automatique', errorRate: 55, questionsCount: 38 },
  { concept: 'Régularisation L2', chapter: 'Apprentissage Automatique', errorRate: 52, questionsCount: 30 },
  { concept: 'Fonctions de perte', chapter: 'Réseaux de Neurones', errorRate: 48, questionsCount: 42 },
  { concept: 'Complexité algorithmique', chapter: 'Recherche et Exploration', errorRate: 42, questionsCount: 50 },
  { concept: 'Logique des prédicats', chapter: 'Logique et Raisonnement', errorRate: 38, questionsCount: 35 },
  { concept: 'Unification', chapter: 'Logique et Raisonnement', errorRate: 35, questionsCount: 28 },
  { concept: 'Optimisation des requêtes', chapter: 'Bases de Données', errorRate: 45, questionsCount: 40 },
];

// ============================================================
// OCR Alerts
// ============================================================
export const mockOCRAlerts: OCRAlert[] = [
  { id: 'ocr1', courseTitle: 'Algorithmique Avancée', page: 12, quality: 65, issue: 'Formules mathématiques mal reconnues' },
  { id: 'ocr2', courseTitle: 'Algorithmique Avancée', page: 23, quality: 58, issue: 'Schéma d\'arbre binaire non détecté' },
  { id: 'ocr3', courseTitle: 'Algorithmique Avancée', page: 45, quality: 71, issue: 'Tableau de complexité partiellement illisible' },
  { id: 'ocr4', courseTitle: 'Réseaux et Protocoles', page: 8, quality: 69, issue: 'Diagramme réseau non reconnu' },
];

// ============================================================
// Platform Stats (Admin)
// ============================================================
export const mockPlatformStats: PlatformStats = {
  totalUsers: 156,
  activeUsers: 89,
  totalCourses: 7,
  totalConversations: 1247,
  storageUsed: 12.4,
  storageTotal: 50,
  aiServiceStatus: 'operational',
  avgResponseTime: 1.2,
  uptime: 99.7,
};

// ============================================================
// App Settings
// ============================================================
export const mockSettings: AppSettings = {
  maxSourcesDisplayed: 5,
  quizSize: 10,
  ttsSpeedMin: 0.5,
  ttsSpeedMax: 2.0,
  inactivityThreshold: 48,
  errorThreshold: 5,
  ocrMinQuality: 70,
  notificationsEnabled: true,
  emailNotifications: true,
  securityTwoFactor: false,
};

// ============================================================
// Classes
// ============================================================
export const mockClasses: ClassGroup[] = [
  { id: 'cl1', name: 'L2 Informatique', level: 'Licence 2', studentsCount: 52, coursesCount: 2, createdAt: '2025-09-01' },
  { id: 'cl2', name: 'L3 Informatique', level: 'Licence 3', studentsCount: 45, coursesCount: 3, createdAt: '2025-09-01' },
  { id: 'cl3', name: 'M1 Intelligence Artificielle', level: 'Master 1', studentsCount: 28, coursesCount: 2, createdAt: '2025-09-01' },
  { id: 'cl4', name: 'M2 Data Science', level: 'Master 2', studentsCount: 22, coursesCount: 0, createdAt: '2025-09-01' },
];

// ============================================================
// Roles
// ============================================================
export const mockRoles: RoleConfig[] = [
  { id: 'role1', name: 'Étudiant', permissions: ['Voir cours', 'Chat IA', 'Passer quiz', 'Voir progrès'], usersCount: 125 },
  { id: 'role2', name: 'Concepteur Pédagogique', permissions: ['Créer cours', 'Importer PDF', 'Valider quiz', 'Voir analytics', 'Gérer structure'], usersCount: 8 },
  { id: 'role3', name: 'Administrateur', permissions: ['Gérer utilisateurs', 'Gérer rôles', 'Gérer classes', 'Paramètres système', 'Voir statistiques'], usersCount: 3 },
];

// ============================================================
// Chart Data for Analytics
// ============================================================
export const engagementChartData = [
  { name: 'Lun', conversations: 45, quiz: 12, connexions: 38 },
  { name: 'Mar', conversations: 52, quiz: 18, connexions: 42 },
  { name: 'Mer', conversations: 38, quiz: 15, connexions: 35 },
  { name: 'Jeu', conversations: 65, quiz: 22, connexions: 48 },
  { name: 'Ven', conversations: 48, quiz: 14, connexions: 40 },
  { name: 'Sam', conversations: 22, quiz: 8, connexions: 18 },
  { name: 'Dim', conversations: 15, quiz: 5, connexions: 12 },
];

export const errorFrequencyData = [
  { name: 'Sem 1', errors: 45 },
  { name: 'Sem 2', errors: 38 },
  { name: 'Sem 3', errors: 52 },
  { name: 'Sem 4', errors: 35 },
  { name: 'Sem 5', errors: 28 },
  { name: 'Sem 6', errors: 42 },
  { name: 'Sem 7', errors: 30 },
  { name: 'Sem 8', errors: 25 },
];

export const remediationData = [
  { name: 'Sem 1', cycles: 12 },
  { name: 'Sem 2', cycles: 18 },
  { name: 'Sem 3', cycles: 15 },
  { name: 'Sem 4', cycles: 22 },
  { name: 'Sem 5', cycles: 10 },
  { name: 'Sem 6', cycles: 14 },
  { name: 'Sem 7', cycles: 8 },
  { name: 'Sem 8', cycles: 11 },
];

export const progressOverTimeData = [
  { name: 'Jan', progress: 10 },
  { name: 'Fév', progress: 18 },
  { name: 'Mar', progress: 28 },
  { name: 'Avr', progress: 38 },
  { name: 'Mai', progress: 52 },
  { name: 'Juin', progress: 68 },
];

export const quizScoreDistribution = [
  { range: '0-20', count: 2 },
  { range: '21-40', count: 5 },
  { range: '41-60', count: 12 },
  { range: '61-80', count: 28 },
  { range: '81-100', count: 18 },
];

export const heatmapData = Array.from({ length: 50 }, (_, i) => ({
  page: i + 1,
  difficulty: Math.random() * 100,
  errors: Math.floor(Math.random() * 30),
}));

export const usageOverTimeData = [
  { name: 'Jan', users: 45, conversations: 120 },
  { name: 'Fév', users: 62, conversations: 180 },
  { name: 'Mar', users: 78, conversations: 250 },
  { name: 'Avr', users: 85, conversations: 320 },
  { name: 'Mai', users: 92, conversations: 410 },
  { name: 'Juin', users: 89, conversations: 380 },
];
