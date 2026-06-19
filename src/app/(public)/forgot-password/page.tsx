"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Brain, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-white" />
      <Card className="relative w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center">
              <Brain className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg">Smart Learning</span>
          </div>
          {sent ? (
            <>
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>
              <CardTitle className="text-2xl">Email envoyé !</CardTitle>
              <CardDescription>Vérifiez votre boîte de réception pour réinitialiser votre mot de passe.</CardDescription>
            </>
          ) : (
            <>
              <CardTitle className="text-2xl">Mot de passe oublié</CardTitle>
              <CardDescription>Entrez votre email pour recevoir un lien de réinitialisation.</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {!sent ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input id="email" type="email" placeholder="votre@email.com" className="pl-9" />
                </div>
              </div>
              <Button className="w-full" size="lg" onClick={() => setSent(true)}>
                Réinitialiser le mot de passe
              </Button>
            </>
          ) : (
            <Button className="w-full" variant="outline" size="lg" asChild>
              <Link href="/login">Retour à la connexion</Link>
            </Button>
          )}
          <div className="text-center">
            <Link href="/login" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
              <ArrowLeft className="h-3 w-3" /> Retour à la connexion
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
