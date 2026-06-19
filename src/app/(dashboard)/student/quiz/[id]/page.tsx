"use client";

import React, { useState, use } from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, ArrowRight, BookOpen, FileText, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { mockQuizQuestions } from '@/lib/mock-data';

export default function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const questions = mockQuizQuestions.filter(q => q.status === 'approved');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentIdx];
  const isCorrect = selected === question?.correctAnswer;
  const totalQ = questions.length;

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === question.correctAnswer) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (currentIdx + 1 >= totalQ) {
      setFinished(true);
    } else {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  if (finished) {
    const pct = Math.round((score / totalQ) * 100);
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mx-auto">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Quiz terminé !</h2>
            <div className="space-y-2">
              <p className="text-4xl font-extrabold gradient-text">{pct}%</p>
              <p className="text-slate-600">{score} réponses correctes sur {totalQ}</p>
            </div>
            <Progress value={pct} className="h-3" indicatorClassName={pct >= 70 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'} />
            <p className="text-sm text-slate-400">
              {pct >= 80 ? '🎉 Excellent travail !' : pct >= 60 ? '👍 Bon résultat, continuez !' : '💪 Continuez à vous exercer !'}
            </p>
            <div className="flex gap-3">
              <Link href={`/student/chat/${id}`} className="flex-1">
                <Button variant="outline" className="w-full">Continuer l&apos;apprentissage</Button>
              </Link>
              <Button className="flex-1" onClick={() => { setCurrentIdx(0); setScore(0); setSelected(null); setAnswered(false); setFinished(false); }}>
                Recommencer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Quiz — Intelligence Artificielle</h1>
          <p className="text-sm text-slate-400">Chapitre : {question?.chapterTitle}</p>
        </div>
        <Badge variant="secondary" className="text-sm">Score: {score}/{currentIdx + (answered ? 1 : 0)}</Badge>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <Progress value={((currentIdx + (answered ? 1 : 0)) / totalQ) * 100} className="flex-1 h-2" />
        <span className="text-sm font-medium text-slate-400">Question {currentIdx + 1}/{totalQ}</span>
      </div>

      {/* Question */}
      <Card className="shadow-md">
        <CardContent className="p-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant={question?.type === 'qcm' ? 'info' : 'secondary'}>{question?.type === 'qcm' ? 'QCM' : 'Vrai / Faux'}</Badge>
            <Badge variant={question?.difficulty === 'easy' ? 'success' : question?.difficulty === 'medium' ? 'warning' : 'danger'}>
              {question?.difficulty === 'easy' ? 'Facile' : question?.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
            </Badge>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-6">{question?.question}</h2>

          <div className="space-y-3">
            {question?.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selected === idx;
              const isCorrectAnswer = idx === question.correctAnswer;
              let classes = "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ";
              if (!answered) {
                classes += isSelected ? "border-primary bg-blue-50" : "border-slate-200 hover:border-primary/30 hover:bg-slate-50";
              } else {
                if (isCorrectAnswer) classes += "border-emerald-500 bg-emerald-50";
                else if (isSelected && !isCorrect) classes += "border-red-500 bg-red-50";
                else classes += "border-slate-200 opacity-50";
              }
              return (
                <button key={idx} className={classes} onClick={() => handleAnswer(idx)} disabled={answered}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                    answered && isCorrectAnswer ? 'bg-emerald-500 text-white' :
                    answered && isSelected && !isCorrect ? 'bg-red-500 text-white' :
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {answered && isCorrectAnswer ? <CheckCircle2 className="h-4 w-4" /> :
                     answered && isSelected && !isCorrect ? <XCircle className="h-4 w-4" /> : letter}
                  </div>
                  <span className="text-sm text-left">{opt}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Correction */}
      {answered && (
        <Card className={`border-2 animate-slide-up ${isCorrect ? 'border-emerald-500 bg-emerald-50/30' : 'border-red-500 bg-red-50/30'}`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              {isCorrect ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
              <span className="font-semibold">{isCorrect ? 'Correct ! 🎉' : 'Incorrect 😕'}</span>
            </div>
            <p className="text-sm text-slate-600 mb-2">{question?.explanation}</p>
            {question?.citation && (
              <Badge variant="secondary" className="text-[10px] gap-1">
                <FileText className="h-2.5 w-2.5" /> Source: Page {question.citation.page}
              </Badge>
            )}
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      {answered && (
        <div className="flex gap-3">
          <Link href={`/student/chat/${id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              <BookOpen className="mr-2 h-4 w-4" /> Continuer l&apos;apprentissage
            </Button>
          </Link>
          <Button className="flex-1" onClick={nextQuestion}>
            {currentIdx + 1 >= totalQ ? 'Voir les résultats' : 'Question suivante'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
