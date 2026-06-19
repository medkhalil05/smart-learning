"use client";

import React, { useState, useRef, useEffect, use } from 'react';
import Link from 'next/link';
import {
  Send, Mic, BookOpen, FileText, ChevronRight, Play, Pause,
  Volume2, VolumeX, SkipForward, Lightbulb, Code, RotateCcw,
  HelpCircle, Sparkles, Bot, CheckCircle2, UserCheck, Languages, Check, ArrowRight, Video, FileSearch,
  ArrowLeft, Volume1, Minimize2, Maximize2, Settings, ExternalLink, HelpCircle as HelpIcon, FileText as FileIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { mockChapters, mockCourses } from '@/lib/mock-data';

interface AvatarProf {
  id: string;
  name: string;
  avatarPlaceholder: string; 
  teachingStyle: string;
  voiceType: string;
  language: string;
  accent: string;
  description: string;
}

const professors: AvatarProf[] = [
  {
    id: 'prof-adam',
    name: 'Professeur Adam',
    avatarPlaceholder: 'from-cyan-500 to-blue-600',
    teachingStyle: 'Calme et pédagogique',
    voiceType: 'Voix claire',
    language: 'Français',
    accent: 'Standard',
    description: 'Privilégie les explications claires et structurées, idéal pour consolider les bases théoriques.'
  },
  {
    id: 'prof-lina',
    name: 'Professeure Lina',
    avatarPlaceholder: 'from-pink-500 to-rose-600',
    teachingStyle: 'Dynamique et motivante',
    voiceType: 'Voix douce',
    language: 'Français / Arabe',
    accent: 'Chaleureux',
    description: 'Adopte une approche interactive avec beaucoup d\'énergie et d\'exemples pratiques.'
  }
];

const mockExplanations = [
  {
    title: "Algorithme de recherche",
    steps: [
      { 
        text: "Aujourd'hui, nous allons comprendre comment fonctionne un algorithme de recherche et comment trouver le meilleur chemin dans un graphe.", 
        shortText: "Un algorithme de recherche permet de trouver une solution optimale ou satisfaisante dans un espace d'états en explorant différents nœuds.",
        citation: 15,
        boardTitle: "Algorithme de recherche",
        boardImage: true 
      },
      { 
        text: "Dans un graphe, chaque point est un 'nœud' (ou état) et les lignes reliant ces points sont des transitions qui possèdent souvent un coût spécifique.", 
        shortText: "Les nœuds représentent les états intermédiaires de résolution, tandis que les arcs représentent les actions possibles.",
        citation: 16,
        boardTitle: "Structure d'un Graphe",
        boardImage: true 
      },
      { 
        text: "Nous évaluons les nœuds à l'aide d'une fonction d'évaluation f(n) afin de guider le choix du chemin le plus rapide et le plus efficace.", 
        shortText: "La fonction d'évaluation permet de prioriser les nœuds à explorer pour accélérer la convergence vers la solution.",
        citation: 18,
        boardTitle: "Fonction d'évaluation f(n)",
        boardImage: false 
      },
      { 
        text: "En combinant le coût réel g(n) et une estimation heuristique h(n), l'algorithme A* garantit de trouver le plus court chemin optimal.", 
        shortText: "Heuristique : estimation optimale sous-estimant le coût restant pour garantir l'admissibilité.",
        citation: 20,
        boardTitle: "A* : f(n) = g(n) + h(n)",
        boardImage: false 
      }
    ]
  }
];

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const course = mockCourses.find(c => c.id === id) || mockCourses[0];
  const chapters = mockChapters.filter(ch => ch.courseId === course.id);

  // Selection states
  const [selectedProfId, setSelectedProfId] = useState<string>('prof-adam');
  const [isClassroomStarted, setIsClassroomStarted] = useState<boolean>(true);

  // Classroom states
  const [avatarState, setAvatarState] = useState<'idle' | 'explaining' | 'thinking'>('explaining');
  const [activeChapter, setActiveChapter] = useState(chapters[1]?.id || chapters[0]?.id || '');
  const [activeSectionId, setActiveSectionId] = useState('s2.2');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState([75]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Concept interaction states
  const [conceptIndex, setConceptIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState<string[]>([
    "Comprendre la différence entre recherche non informée et informée.",
    "Les heuristiques améliorent significativement les performances."
  ]);
  const [teacherSpeech, setTeacherSpeech] = useState("");

  const selectedProf = professors.find(p => p.id === selectedProfId) || professors[0];
  const currentConcept = mockExplanations[conceptIndex] || mockExplanations[0];
  const currentStep = currentConcept.steps[stepIndex] || currentConcept.steps[0];

  // Sync speech with step
  useEffect(() => {
    if (isClassroomStarted) {
      setAvatarState('explaining');
      setTeacherSpeech(currentStep.text);
      
      const timer = setTimeout(() => {
        setAvatarState('idle');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [stepIndex, conceptIndex, isClassroomStarted, currentStep.text]);

  // Audio Speech Synthesis Effect (Mock Audio)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Annuler toute lecture en cours lors d'un changement de texte
      window.speechSynthesis.cancel();
      
      if (isPlaying && !isMuted && teacherSpeech) {
        const utterance = new SpeechSynthesisUtterance(teacherSpeech);
        utterance.lang = selectedProf.language.includes('Anglais') ? 'en-US' : 'fr-FR';
        utterance.rate = speed;
        utterance.volume = volume[0] / 100;
        
        // Simuler un pitch différent selon le professeur
        if (selectedProf.name.includes('Lina') || selectedProf.name.includes('Nora')) {
          utterance.pitch = 1.2; // Voix féminine (pitch plus aigu)
        } else {
          utterance.pitch = 0.9; // Voix masculine (pitch plus grave)
        }
        
        // Charger les voix disponibles si possible
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          const frVoices = voices.filter(v => v.lang.startsWith('fr'));
          if (frVoices.length > 0) utterance.voice = frVoices[0];
        }
        
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [teacherSpeech, isPlaying, isMuted, speed, volume, selectedProf]);

  // Nettoyage lors du démontage du composant
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleNextStep = () => {
    if (stepIndex < currentConcept.steps.length - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      setAvatarState('thinking');
      setTeacherSpeech("Vous avez terminé toutes les étapes de cette explication ! Nous allons passer au concept suivant.");
      setTimeout(() => {
        setStepIndex(0);
        setAvatarState('explaining');
      }, 2000);
    }
  };

  const handleSimpler = () => {
    setAvatarState('thinking');
    setTeacherSpeech("Laissez-moi vous expliquer cela plus simplement. Imaginez que vous cherchez votre chemin dans un labyrinthe en marquant les intersections déjà visitées.");
  };

  const handleExample = () => {
    setAvatarState('thinking');
    setTeacherSpeech("Par exemple, le GPS de votre voiture utilise ce type d'algorithme pour calculer le trajet le plus rapide vers votre destination en évitant les embouteillages.");
  };

  const handleMetaphor = () => {
    setAvatarState('thinking');
    setTeacherSpeech("C'est comme un détective qui suit des indices : chaque indice (heuristique) le rapproche du coupable (objectif) sans devoir interroger toute la ville.");
  };

  const handleAskQuestion = () => {
    setAvatarState('thinking');
    setTeacherSpeech("D'accord, testons votre intuition. À votre avis, que se passe-t-il si notre estimation heuristique h(n) est supérieure au coût réel ?");
  };

  const handleSendQuestion = () => {
    if (!input.trim()) return;
    const studentMsg = input;
    setInput("");
    setAvatarState('thinking');
    setTeacherSpeech(`J'analyse votre question... En ce qui concerne "${studentMsg}", il est important de noter que l'admissibilité de l'heuristique garantit l'optimalité.`);
  };

  // 1. Selection Screen (if not started)
  if (!isClassroomStarted) {
    return (
      <div className="max-w-6xl mx-auto py-8 px-4 animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Choisissez votre professeur virtuel</h1>
          <p className="text-slate-500 mt-2">Sélectionnez l&apos;avatar qui vous accompagnera dans votre apprentissage.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
          {professors.map((prof) => {
            const isSelected = selectedProfId === prof.id;
            return (
              <Card
                key={prof.id}
                onClick={() => setSelectedProfId(prof.id)}
                className={`cursor-pointer transition-all duration-300 relative border-2 ${
                  isSelected ? 'border-blue-600 bg-blue-50/20' : 'border-slate-200 bg-white'
                }`}
              >
                <CardContent className="p-6 flex flex-col items-center">
                  <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${prof.avatarPlaceholder} flex items-center justify-center text-white mb-4 relative shadow-lg`}>
                    <Bot className="h-16 w-16" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{prof.name}</h3>
                  <p className="text-xs text-slate-500 text-center mt-2">{prof.description}</p>
                  <Button variant={isSelected ? 'default' : 'outline'} className="w-full mt-4 cursor-pointer">
                    {isSelected ? 'Sélectionné' : 'Choisir'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="flex justify-center">
          <Button size="lg" onClick={() => setIsClassroomStarted(true)} className="px-10 cursor-pointer">
            Commencer le cours
          </Button>
        </div>
      </div>
    );
  }

  // 2. Classroom Screen (Fully Matching the Provided Design Screenshot)
  return (
    <div className="flex gap-4 h-[calc(100vh-8rem)] animate-fade-in -m-4 md:-m-6 lg:-m-8 p-4 md:p-6 lg:p-8 overflow-hidden bg-[#f8fafc]">
      
      {/* LEFT SIDEBAR: Course Plan (Plan du cours) */}
      <div className="hidden xl:flex flex-col w-[280px] bg-white rounded-2xl border border-slate-200 overflow-hidden shrink-0 shadow-sm">
        <div className="p-4 border-b border-slate-200/80 bg-slate-50/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <Bot className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Smart Learning</h3>
              <p className="text-[10px] text-slate-400">Classe Virtuelle IA</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-slate-100">
          <p className="text-xs font-semibold text-slate-800">Plan du cours</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Chapitre 2 sur 8</p>
          <Progress value={25} className="mt-2 h-1.5 bg-slate-100" />
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {/* Chapter 1 */}
          <div className="rounded-lg">
            <button className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded-lg">
              <span className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-500 bg-emerald-50 rounded-full p-0.5" />
                1. Introduction à l&apos;IA
              </span>
            </button>
          </div>

          {/* Chapter 2 */}
          <div className="bg-blue-50/40 rounded-xl border border-blue-100/50 p-1">
            <button className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-semibold text-blue-600">
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-blue-100 rounded-full flex items-center justify-center text-[8px] font-bold">2</span>
                2. Recherche et Exploration
              </span>
            </button>
            
            <div className="ml-5 space-y-0.5 mt-1 border-l border-slate-100 pl-2">
              <button className="w-full text-left px-2 py-1 text-[11px] text-slate-600 hover:text-blue-600 flex items-center justify-between">
                <span>2.1 Concepts de base</span>
                <Check className="h-3 w-3 text-emerald-500" />
              </button>
              <button className="w-full text-left px-2 py-1 text-[11px] text-blue-600 font-semibold bg-blue-50/80 rounded-md flex items-center justify-between">
                <span>2.2 Algorithme de recherche</span>
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
              </button>
              <button className="w-full text-left px-2 py-1 text-[11px] text-slate-500 hover:text-blue-600">
                2.3 Heuristiques
              </button>
              <button className="w-full text-left px-2 py-1 text-[11px] text-slate-500 hover:text-blue-600">
                2.4 Graphes et espaces d&apos;états
              </button>
            </div>
          </div>

          {/* Chapters 3 to 8 */}
          <div className="space-y-0.5 pt-1 text-slate-500">
            {["3. Logique et Raisonnement", "4. Apprentissage Automatique", "5. Réseaux de Neurones", "6. Traitement du Langage", "7. Vision par Ordinateur", "8. Éthique et IA Responsable"].map((cTitle, idx) => (
              <button key={idx} className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium hover:bg-slate-50 rounded-lg text-slate-600">
                <span>{cTitle}</span>
                <span className="text-slate-300 text-[10px]">›</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <button onClick={() => setIsClassroomStarted(false)} className="w-full text-center py-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
            ‹ Réduire le plan
          </button>
        </div>
      </div>

      {/* CENTER: Virtual Classroom Screen */}
      <div className={`flex-1 flex flex-col gap-4 overflow-y-auto min-w-0 ${isFullscreen ? 'fixed inset-0 z-50 bg-[#f8fafc] p-4 md:p-6 lg:p-8' : ''}`}>
        
        {/* Top bar with Breadcrumbs & Actions */}
        <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsClassroomStarted(false)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Intelligence Artificielle - Fondamentaux</p>
              <p className="text-xs font-semibold text-slate-700">Chapitre 2 : Recherche et Exploration &gt; 2.2 Algorithme de recherche</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-lg">
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-lg">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsFullscreen(!isFullscreen)} className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* 3D Classroom Environment Area (Main Teacher Screen) */}
        <div className="relative rounded-3xl overflow-hidden aspect-[16/9] min-h-[400px] bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 shadow-sm flex items-end justify-center">
          {/* Subtle virtual background mimicking bright classroom decor */}
          <div className="absolute inset-0 z-0 flex items-center justify-between pointer-events-none">
            {/* Wall panels mock */}
            <div className="w-1/3 h-full border-r border-slate-300/30 bg-slate-50/40" />
            <div className="w-1/3 h-full border-l border-slate-300/30 bg-slate-50/40" />
            {/* Floor line */}
            <div className="absolute bottom-0 inset-x-0 h-1/4 bg-slate-300/20 border-t border-slate-300/40" />
          </div>

          {/* Teacher Badge overlay */}
          <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur px-3 py-1.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${selectedProf.avatarPlaceholder} flex items-center justify-center text-white text-[10px]`}>
              <Bot className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-800">{selectedProf.name}</p>
              <p className="text-[9px] text-emerald-500 font-medium">En ligne</p>
            </div>
          </div>

          {/* Dynamic Whiteboard (Tableau Blanc) displaying Concept & Diagram */}
          <div className="absolute top-8 right-8 w-[40%] aspect-[4/3] bg-white rounded-xl border-8 border-slate-300 shadow-md z-10 p-4 flex flex-col justify-between">
            <div className="text-center pb-2 border-b border-slate-100 mb-2">
              <span className="text-xs font-bold text-slate-800 tracking-wide">{currentStep.boardTitle}</span>
            </div>

            {currentStep.boardImage ? (
              /* Illustrated node grid representing Search Algorithm state */
              <div className="flex-1 flex items-center justify-center relative p-2">
                <svg className="w-full h-full" viewBox="0 0 100 60">
                  {/* Edges */}
                  <line x1="20" y1="30" x2="45" y2="15" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="20" y1="30" x2="45" y2="45" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="45" y1="15" x2="70" y2="15" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="45" y1="45" x2="70" y2="15" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="70" y1="15" x2="90" y2="35" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="45" y1="45" x2="90" y2="35" stroke="#cbd5e1" strokeWidth="1" />
                  
                  {/* Nodes */}
                  <circle cx="20" cy="30" r="4.5" fill="#3b82f6" />
                  <text x="20" y="31.5" fontSize="3.5" fill="white" fontWeight="bold" textAnchor="middle">A</text>
                  
                  <circle cx="45" cy="15" r="4.5" fill="white" stroke="#94a3b8" strokeWidth="1" />
                  <text x="45" y="16.5" fontSize="3.5" fill="#334155" fontWeight="bold" textAnchor="middle">B</text>
                  
                  <circle cx="45" cy="45" r="4.5" fill="white" stroke="#94a3b8" strokeWidth="1" />
                  <text x="45" y="46.5" fontSize="3.5" fill="#334155" fontWeight="bold" textAnchor="middle">C</text>

                  <circle cx="70" cy="15" r="4.5" fill="white" stroke="#94a3b8" strokeWidth="1" />
                  <text x="70" y="16.5" fontSize="3.5" fill="#334155" fontWeight="bold" textAnchor="middle">D</text>

                  <circle cx="90" cy="35" r="4.5" fill="white" stroke="#94a3b8" strokeWidth="1" />
                  <text x="90" y="36.5" fontSize="3.5" fill="#334155" fontWeight="bold" textAnchor="middle">E</text>
                </svg>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-2 text-center">
                <p className="text-sm text-slate-600 mt-2 font-medium">f(n) = g(n) + h(n)</p>
              </div>
            )}
          </div>

          {/* Central Illustrated Teacher Character */}
          <div className="relative z-20 flex flex-col items-center justify-end h-full pt-10">
            {/* Using DiceBear Micah API for a beautiful illustrated 3D-like avatar */}
            <div className={`relative transition-all duration-500 transform ${
              avatarState === 'explaining' ? 'scale-105 -translate-y-2' : 'scale-100'
            }`}>
              {/* Avatar Image */}
              <img 
                src={`https://api.dicebear.com/7.x/micah/svg?seed=${selectedProf.name}&backgroundColor=transparent&baseColor=f9c9b6`} 
                alt="Professeur Virtuel" 
                className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl"
              />
              
              {/* Classroom Subtitle State Overlay - Placed at the bottom of the avatar */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-30">
                <div className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200 flex items-center gap-2 text-xs font-semibold shadow-md whitespace-nowrap">
                  <Bot className={`h-4 w-4 ${avatarState === 'explaining' ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className="text-slate-700">
                    {avatarState === 'explaining' ? "En train d'expliquer" : avatarState === 'thinking' ? "En réflexion" : "En ligne"}
                  </span>
                  {avatarState === 'explaining' && (
                    <div className="flex gap-1 ml-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Speech bubble overlaying the classroom screen next to the teacher */}
          <div className="absolute top-1/2 -translate-y-1/2 left-8 z-30 max-w-xs drop-shadow-xl transition-opacity duration-300">
            <div className="bg-white text-slate-800 text-sm font-medium px-5 py-4 rounded-2xl rounded-br-sm border border-slate-200 relative">
              {teacherSpeech}
              <div className="absolute -right-2 bottom-4 w-4 h-4 bg-white border-r border-b border-slate-200 rotate-[-45deg]" />
            </div>
          </div>
        </div>

        {/* Current Concept Card */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Concept actuel</p>
                <h4 className="text-lg font-bold text-slate-900">{currentStep.boardTitle}</h4>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 text-xs gap-1 border-slate-200 bg-slate-50 text-slate-600 cursor-pointer">
                  <FileIcon className="h-3.5 w-3.5 text-slate-400" />
                  Source : page {currentStep.citation}
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs gap-1 border-slate-200 bg-slate-50 text-slate-600 cursor-pointer">
                  Voir dans le PDF
                </Button>
              </div>
            </div>

            <div className="text-xs text-slate-500 font-medium mb-3">
              Étape {stepIndex + 1} sur {currentConcept.steps.length}
              <div className="flex gap-1.5 mt-1.5">
                {currentConcept.steps.map((_, i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= stepIndex ? 'bg-blue-600' : 'bg-slate-100'}`} />
                ))}
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
              {currentStep.shortText}
            </p>
          </CardContent>
        </Card>

        {/* Classroom Quick Actions Bar */}
        <div className="flex flex-wrap gap-2 justify-start">
          <Button variant="outline" size="sm" onClick={handleNextStep} className="h-9 text-xs gap-1 bg-white hover:bg-slate-50 border-slate-200 text-slate-700 cursor-pointer">
            <ArrowRight className="h-3.5 w-3.5 text-slate-400" /> Étape suivante
          </Button>
          <Button variant="outline" size="sm" onClick={handleSimpler} className="h-9 text-xs gap-1 bg-white hover:bg-slate-50 border-slate-200 text-slate-700 cursor-pointer">
            <Lightbulb className="h-3.5 w-3.5 text-slate-400" /> Explique plus simplement
          </Button>
          <Button variant="outline" size="sm" onClick={handleExample} className="h-9 text-xs gap-1 bg-white hover:bg-slate-50 border-slate-200 text-slate-700 cursor-pointer">
            <Sparkles className="h-3.5 w-3.5 text-slate-400" /> Donne un exemple
          </Button>
          <Button variant="outline" size="sm" onClick={handleMetaphor} className="h-9 text-xs gap-1 bg-white hover:bg-slate-50 border-slate-200 text-slate-700 cursor-pointer">
            <Code className="h-3.5 w-3.5 text-slate-400" /> Donne une métaphore
          </Button>
          <Button variant="outline" size="sm" className="h-9 text-xs gap-1 bg-white hover:bg-slate-50 border-slate-200 text-slate-700 cursor-pointer">
            <RotateCcw className="h-3.5 w-3.5 text-slate-400" /> Répète
          </Button>
          <Button variant="outline" size="sm" onClick={handleAskQuestion} className="h-9 text-xs gap-1 bg-white hover:bg-slate-50 border-slate-200 text-slate-700 cursor-pointer">
            <HelpIcon className="h-3.5 w-3.5 text-slate-400" /> Pose-moi une question
          </Button>
          <Button variant="outline" size="sm" className="h-9 text-xs gap-1 bg-white hover:bg-slate-50 border-slate-200 text-slate-700 cursor-pointer">
            <BookOpen className="h-3.5 w-3.5 text-slate-400" /> Générer un quiz
          </Button>
        </div>

        {/* Guided Interaction / Search Panel (Chat Area secondary) */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm mt-auto">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-slate-600 cursor-pointer">
            <Mic className="h-4.5 w-4.5" />
          </Button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendQuestion()}
            placeholder="Posez une question au professeur virtuel..."
            className="flex-1 bg-transparent px-3 py-1.5 text-xs sm:text-sm outline-none text-slate-800"
          />
          <Button size="icon" onClick={handleSendQuestion} disabled={!input.trim()} className="h-9 w-9 rounded-xl bg-blue-600 hover:bg-blue-700 shrink-0 cursor-pointer">
            <Send className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>

      {/* RIGHT SIDEBAR: Progress Metrics, Citations & Settings */}
      <div className="hidden lg:flex flex-col w-[300px] gap-4 shrink-0 overflow-y-auto">
        
        {/* Progress Card */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-800">Progression</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-500">Progression globale</span>
                <span className="font-bold text-slate-800">{course.progress || 68}%</span>
              </div>
              <Progress value={course.progress || 68} className="h-1.5 bg-slate-100" />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-500">Chapitre en cours</span>
                <span className="font-bold text-slate-800">35%</span>
              </div>
              <Progress value={35} className="h-1.5 bg-slate-100" />
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Prêt pour le quiz :</span>
              <Badge className="bg-emerald-500 text-white text-[10px] font-bold">70%</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Sources Cited Card */}
        <Card className="flex-1 min-h-[160px] overflow-hidden flex flex-col border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-800">Sources citées</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-3 p-3">
            <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100/50">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="default" className="text-[10px] bg-blue-600">Page 15</Badge>
                <span className="text-[9px] text-slate-400">Pertinence : 95%</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed italic">
                &ldquo;Un algorithme de recherche explore les nœuds pour trouver une solution...&rdquo;
              </p>
              <button className="text-[10px] text-blue-600 hover:underline mt-2 flex items-center gap-1">
                Voir dans le PDF <ExternalLink className="h-2.5 w-2.5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100/50">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="default" className="text-[10px] bg-blue-600">Page 18</Badge>
                <span className="text-[9px] text-slate-400">Pertinence : 90%</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed italic">
                &ldquo;Les heuristiques permettent de guider la recherche efficacement...&rdquo;
              </p>
              <button className="text-[10px] text-blue-600 hover:underline mt-2 flex items-center gap-1">
                Voir dans le PDF <ExternalLink className="h-2.5 w-2.5" />
              </button>
            </div>

            <div className="text-center pt-1 border-t border-slate-100">
              <button className="text-xs text-blue-600 hover:underline">
                Voir toutes les sources (4)
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Notes from the Professor */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-800">Notes du professeur</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 max-h-[160px] overflow-y-auto">
            {notes.map((note, i) => (
              <div key={i} className="flex gap-2 items-start text-xs text-slate-600 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{note}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Audio Controls Panel */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-800">Contrôles audio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Lecture vocale</span>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-600 hover:bg-slate-100 cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Vitesse de lecture</span>
              <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="text-xs border border-slate-200 rounded p-1 bg-white">
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
              </select>
            </div>

            <div className="space-y-1.5 pt-1 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Volume1 className="h-3 w-3" /> Volume
                </span>
                <span>{volume[0]}%</span>
              </div>
              <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="flex-1" />
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
