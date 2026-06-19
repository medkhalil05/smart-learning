"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Brain, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function RegisterPage() {
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState('student');

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-32 right-12 w-28 h-28 rounded-full bg-white/10 animate-float" />
        <div className="absolute bottom-24 left-16 w-20 h-20 rounded-full bg-white/5 animate-float" style={{ animationDelay: '1s' }} />
        <div className="relative flex flex-col items-center justify-center w-full p-12 text-white text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-8">
            <Brain className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Rejoignez Smart Learning</h1>
          <p className="text-lg text-blue-100 max-w-md">
            Créez votre compte et accédez à une expérience d&apos;apprentissage révolutionnaire propulsée par l&apos;IA.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center gap-2 mb-4 lg:hidden">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center">
                <Brain className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg">Smart Learning</span>
            </div>
            <CardTitle className="text-2xl">Créer un compte</CardTitle>
            <CardDescription>Commencez votre parcours d&apos;apprentissage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs value={role} onValueChange={setRole} className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="student" className="flex-1 text-xs">Étudiant</TabsTrigger>
                <TabsTrigger value="designer" className="flex-1 text-xs">Concepteur Pédagogique</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input id="name" placeholder="Votre nom complet" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input id="email" type="email" placeholder="votre@email.com" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input id="password" type={showPw ? 'text' : 'password'} placeholder="••••••••" className="pl-9 pr-10" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input id="confirmPassword" type="password" placeholder="••••••••" className="pl-9" />
                </div>
              </div>

              <label className="flex items-start gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-200 mt-0.5" />
                <span>J&apos;accepte les <a href="#" className="text-blue-600 hover:underline">conditions d&apos;utilisation</a> et la <a href="#" className="text-blue-600 hover:underline">politique de confidentialité</a></span>
              </label>

              <Button className="w-full" size="lg">Créer un compte</Button>
            </div>

            <div className="text-center text-sm text-slate-400">
              Déjà un compte ?{' '}
              <Link href="/login" className="text-blue-600 font-medium hover:underline">Se connecter</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
