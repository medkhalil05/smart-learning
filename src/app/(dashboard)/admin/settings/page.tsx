"use client";

import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { mockSettings } from '@/lib/mock-data';

export default function SettingsPage() {
  const [settings, setSettings] = useState(mockSettings);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>

      <Tabs defaultValue="ai" className="w-full">
        <TabsList>
          <TabsTrigger value="ai">🤖 IA</TabsTrigger>
          <TabsTrigger value="security">🔒 Sécurité</TabsTrigger>
          <TabsTrigger value="ocr">📄 OCR</TabsTrigger>
          <TabsTrigger value="notifications">🔔 Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="mt-6">
          <Card>
            <CardHeader><CardTitle className="text-sm">Paramètres de l&apos;IA</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Sources maximum affichées</Label>
                  <Input type="number" value={settings.maxSourcesDisplayed} onChange={(e) => setSettings({ ...settings, maxSourcesDisplayed: Number(e.target.value) })} />
                  <p className="text-xs text-slate-400">Nombre de citations affichées par réponse</p>
                </div>
                <div className="space-y-2">
                  <Label>Taille du quiz</Label>
                  <Input type="number" value={settings.quizSize} onChange={(e) => setSettings({ ...settings, quizSize: Number(e.target.value) })} />
                  <p className="text-xs text-slate-400">Nombre de questions par quiz généré</p>
                </div>
              </div>
              <div className="space-y-3">
                <Label>Vitesse TTS ({settings.ttsSpeedMin}x - {settings.ttsSpeedMax}x)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-400">Minimum</span>
                    <Slider value={[settings.ttsSpeedMin * 100]} onValueChange={(v) => setSettings({ ...settings, ttsSpeedMin: v[0] / 100 })} min={25} max={100} step={25} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">Maximum</span>
                    <Slider value={[settings.ttsSpeedMax * 100]} onValueChange={(v) => setSettings({ ...settings, ttsSpeedMax: v[0] / 100 })} min={100} max={300} step={25} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Seuil d&apos;inactivité (heures)</Label>
                  <Input type="number" value={settings.inactivityThreshold} onChange={(e) => setSettings({ ...settings, inactivityThreshold: Number(e.target.value) })} />
                  <p className="text-xs text-slate-400">Durée avant alerte d&apos;inactivité</p>
                </div>
                <div className="space-y-2">
                  <Label>Seuil d&apos;erreurs</Label>
                  <Input type="number" value={settings.errorThreshold} onChange={(e) => setSettings({ ...settings, errorThreshold: Number(e.target.value) })} />
                  <p className="text-xs text-slate-400">Nombre d&apos;erreurs avant alerte</p>
                </div>
              </div>
              <Button><Save className="mr-2 h-4 w-4" /> Sauvegarder les paramètres IA</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader><CardTitle className="text-sm">Paramètres de sécurité</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
                <div><p className="text-sm font-medium">Authentification à deux facteurs (2FA)</p><p className="text-xs text-slate-400">Exiger la 2FA pour tous les comptes administrateurs</p></div>
                <Switch checked={settings.securityTwoFactor} onCheckedChange={(v) => setSettings({ ...settings, securityTwoFactor: v })} />
              </div>
              <div className="space-y-2">
                <Label>Expiration de session (minutes)</Label>
                <Input type="number" defaultValue={60} />
                <p className="text-xs text-slate-400">Durée avant déconnexion automatique</p>
              </div>
              <div className="space-y-2">
                <Label>Longueur minimale du mot de passe</Label>
                <Input type="number" defaultValue={8} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
                <div><p className="text-sm font-medium">Forcer les majuscules et caractères spéciaux</p><p className="text-xs text-slate-400">Dans les mots de passe utilisateur</p></div>
                <Switch defaultChecked />
              </div>
              <Button><Save className="mr-2 h-4 w-4" /> Sauvegarder les paramètres de sécurité</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ocr" className="mt-6">
          <Card>
            <CardHeader><CardTitle className="text-sm">Paramètres OCR</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Qualité OCR minimale ({settings.ocrMinQuality}%)</Label>
                <Slider value={[settings.ocrMinQuality]} onValueChange={(v) => setSettings({ ...settings, ocrMinQuality: v[0] })} min={50} max={100} step={5} />
                <p className="text-xs text-slate-400">Les pages en dessous de ce seuil seront signalées</p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
                <div><p className="text-sm font-medium">Traitement automatique</p><p className="text-xs text-slate-400">Lancer l&apos;OCR automatiquement après l&apos;upload</p></div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
                <div><p className="text-sm font-medium">Détection des formules mathématiques</p><p className="text-xs text-slate-400">Utiliser un modèle spécialisé pour les formules</p></div>
                <Switch defaultChecked />
              </div>
              <Button><Save className="mr-2 h-4 w-4" /> Sauvegarder les paramètres OCR</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader><CardTitle className="text-sm">Paramètres de notifications</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
                <div><p className="text-sm font-medium">Notifications par email</p><p className="text-xs text-slate-400">Recevoir les alertes par email</p></div>
                <Switch checked={settings.emailNotifications} onCheckedChange={(v) => setSettings({ ...settings, emailNotifications: v })} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
                <div><p className="text-sm font-medium">Notifications push</p><p className="text-xs text-slate-400">Notifications dans le navigateur</p></div>
                <Switch checked={settings.notificationsEnabled} onCheckedChange={(v) => setSettings({ ...settings, notificationsEnabled: v })} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
                <div><p className="text-sm font-medium">Alertes étudiants à risque</p><p className="text-xs text-slate-400">Notification immédiate pour les étudiants à risque élevé</p></div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
                <div><p className="text-sm font-medium">Résumé hebdomadaire</p><p className="text-xs text-slate-400">Rapport de synthèse chaque lundi</p></div>
                <Switch defaultChecked />
              </div>
              <Button><Save className="mr-2 h-4 w-4" /> Sauvegarder les paramètres de notifications</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
