"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Brain, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState('student');

  return (
    <div className="min-h-screen flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10 animate-float" />
        <div className="absolute bottom-32 right-16 w-24 h-24 rounded-full bg-white/5 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="relative flex flex-col items-center justify-center w-full p-12 text-white text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-8">
            <Brain className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Smart Learning</h1>
          <p className="text-lg text-blue-100 max-w-md">
            Transformez vos cours en professeurs virtuels intelligents grâce à l&apos;intelligence artificielle.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div><p className="text-2xl font-bold">2,500+</p><p className="text-xs text-blue-200">Étudiants</p></div>
            <div><p className="text-2xl font-bold">150+</p><p className="text-xs text-blue-200">Cours</p></div>
            <div><p className="text-2xl font-bold">98%</p><p className="text-xs text-blue-200">Satisfaction</p></div>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center gap-2 mb-4 lg:hidden">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center">
                <Brain className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg">Smart Learning</span>
            </div>
            <CardTitle className="text-2xl">Connexion</CardTitle>
            <CardDescription>Accédez à votre espace d&apos;apprentissage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Role Selector */}
            <Tabs value={role} onValueChange={setRole} className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="student" className="flex-1 text-xs">Étudiant</TabsTrigger>
                <TabsTrigger value="designer" className="flex-1 text-xs">Concepteur</TabsTrigger>
                <TabsTrigger value="admin" className="flex-1 text-xs">Administrateur</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-4">
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

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-200" />
                  Se souvenir de moi
                </label>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>

              <Link href={role === 'student' ? '/student/dashboard' : role === 'designer' ? '/designer/dashboard' : '/admin/dashboard'}>
                <Button className="w-full" size="lg">Se connecter</Button>
              </Link>
            </div>

            <div className="text-center text-sm text-slate-400">
              Pas encore de compte ?{' '}
              <Link href="/register" className="text-blue-600 font-medium hover:underline">Créer un compte</Link>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <p className="font-semibold text-slate-800 mb-2">Comptes de test disponibles :</p>
              <ul className="space-y-1.5 font-mono">
                <li><span className="font-semibold text-slate-700">Étudiant:</span> ahmed@univ.ma <span className="text-slate-400">|</span> test1234</li>
                <li><span className="font-semibold text-slate-700">Concepteur:</span> karim@univ.ma <span className="text-slate-400">|</span> test1234</li>
                <li><span className="font-semibold text-slate-700">Admin:</span> admin@univ.ma <span className="text-slate-400">|</span> test1234</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
