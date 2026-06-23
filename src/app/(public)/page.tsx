"use client";

import React from 'react';
import Link from 'next/link';
import {
  Brain, Bot, FileText, HelpCircle, BarChart3, Mic, ShieldCheck,
  Upload, Search, Cpu, MessageSquare, ArrowRight, CheckCircle2, Star,
  Zap, Clock, Users, GraduationCap, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  { icon: <Bot className="h-7 w-7" />, title: "Tuteur IA Virtuel", desc: "Un professeur virtuel intelligent qui s'adapte au rythme de chaque étudiant et répond à toutes les questions." },
  { icon: <FileText className="h-7 w-7" />, title: "PDF vers Cours Interactif", desc: "Transformez automatiquement vos documents PDF en cours structurés et interactifs grâce à l'OCR avancé." },
  { icon: <HelpCircle className="h-7 w-7" />, title: "Quiz Adaptatifs", desc: "Des quiz générés par l'IA qui s'adaptent au niveau de l'étudiant pour une évaluation continue et personnalisée." },
  { icon: <BarChart3 className="h-7 w-7" />, title: "Analytiques d'Apprentissage", desc: "Tableaux de bord détaillés pour suivre la progression, identifier les difficultés et optimiser l'enseignement." },
  { icon: <Mic className="h-7 w-7" />, title: "Interaction Vocale et Avatar", desc: "Interagissez naturellement avec votre tuteur par la voix et visualisez un avatar animé pendant les sessions." },
  { icon: <ShieldCheck className="h-7 w-7" />, title: "Anti-Hallucination avec Citations", desc: "Chaque réponse est sourcée avec des citations précises du cours original pour garantir la fiabilité." },
];

const steps = [
  { num: "01", icon: <Upload className="h-8 w-8" />, title: "Importez votre PDF", desc: "Uploadez vos documents de cours en format PDF sur la plateforme." },
  { num: "02", icon: <Search className="h-8 w-8" />, title: "OCR et Structuration", desc: "Notre IA analyse, extrait et structure automatiquement le contenu du cours." },
  { num: "03", icon: <Cpu className="h-8 w-8" />, title: "Interaction avec le Tuteur IA", desc: "Les étudiants conversent avec un tuteur virtuel intelligent basé sur le cours." },
  { num: "04", icon: <BarChart3 className="h-8 w-8" />, title: "Quiz et Analytiques", desc: "Évaluation automatique et suivi détaillé de la progression de chaque étudiant." },
];

const stats = [
  { value: "98%", label: "Précision des réponses", icon: <CheckCircle2 className="h-6 w-6" /> },
  { value: "3x", label: "Plus rapide que l'apprentissage traditionnel", icon: <Zap className="h-6 w-6" /> },
  { value: "+40%", label: "Taux de rétention amélioré", icon: <Star className="h-6 w-6" /> },
  { value: "24/7", label: "Disponibilité permanente", icon: <Clock className="h-6 w-6" /> },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                <Brain className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg text-slate-900">Smart Learning</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Fonctionnalités</a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Comment ça marche</a>
              <a href="#advantages" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Avantages</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">Connexion</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Commencer</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-white" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        {/* Floating elements */}
        <div className="absolute top-40 left-10 w-20 h-20 rounded-full bg-blue-600/10 animate-float" />
        <div className="absolute top-60 right-20 w-14 h-14 rounded-full bg-indigo-500/10 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-16 h-16 rounded-full bg-blue-400/10 animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6 animate-slide-up">
            Transformez vos cours en{' '}
            <span className="gradient-text">professeurs virtuels</span>{' '}
            intelligents
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Smart Learning utilise l&apos;IA pour convertir vos documents PDF en expériences d&apos;apprentissage interactives avec un tuteur virtuel, des quiz adaptatifs et des analytiques en temps réel.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link href="/register">
              <Button size="lg" className="text-base px-8 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/student/chat/c1">
              <Button variant="outline" size="lg" className="text-base px-8">
                <MessageSquare className="mr-2 h-5 w-5" />
                Voir la démo
              </Button>
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span><strong className="text-slate-900">2,500+</strong> étudiants</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-blue-600" />
              <span><strong className="text-slate-900">150+</strong> cours créés</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <span><strong className="text-slate-900">50,000+</strong> conversations IA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Fonctionnalités</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Tout ce dont vous avez besoin pour enseigner avec l&apos;IA</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Une plateforme complète qui révolutionne l&apos;enseignement supérieur grâce à l&apos;intelligence artificielle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="card-hover group border-slate-200/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Comment ça marche</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Quatre étapes simples</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              De l&apos;import du PDF à l&apos;apprentissage interactif en quelques minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative text-center group">
                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-md mx-auto mb-6 group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">
                  <span className="text-blue-600">{step.icon}</span>
                </div>
                <span className="text-xs font-bold text-blue-600/40 uppercase tracking-widest">{step.num}</span>
                <h3 className="text-lg font-semibold text-slate-900 mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.desc}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-4 text-border">
                    <ChevronRight className="h-6 w-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages / Benchmark Section */}
      <section id="advantages" className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-3">Avantages</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Des résultats qui parlent d&apos;eux-mêmes</h2>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Smart Learning améliore significativement l&apos;expérience d&apos;apprentissage et les résultats académiques.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 mx-auto mb-4 text-white">
                  {stat.icon}
                </div>
                <p className="text-4xl font-extrabold mb-2">{stat.value}</p>
                <p className="text-sm text-blue-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
            Prêt à révolutionner votre enseignement ?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Rejoignez les universités qui ont déjà adopté Smart Learning pour offrir une expérience d&apos;apprentissage personnalisée et intelligente.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="text-base px-10 shadow-lg shadow-blue-600/25">
                Créer un compte gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                  <Brain className="h-4 w-4" />
                </div>
                <span className="font-bold text-slate-900">Smart Learning</span>
              </div>
              <p className="text-sm text-slate-400">Plateforme d&apos;apprentissage intelligente propulsée par l&apos;IA pour l&apos;enseignement supérieur.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Produit</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#features" className="hover:text-blue-600 transition-colors">Fonctionnalités</a></li>
                <li><a href="#how-it-works" className="hover:text-blue-600 transition-colors">Comment ça marche</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Tarifs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Ressources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Guide d&apos;utilisation</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>contact@smartlearning.ma</li>
                <li>+212 522 123 456</li>
                <li>Casablanca, Maroc</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-400">
            <p>© 2026 Smart Learning. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
