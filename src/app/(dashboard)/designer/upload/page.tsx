"use client";

import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, Loader2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockOCRAlerts } from '@/lib/mock-data';

const steps = ['Brouillon', 'Traitement OCR', 'En validation', 'Publié'];

export default function UploadPage() {
  const [step, setStep] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const simulateUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(p => {
        if (p >= 100) { clearInterval(interval); setUploading(false); setStep(1); return 100; }
        return p + 10;
      });
    }, 300);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-slate-900">Importer un nouveau cours</h1>

      {/* Status Workflow */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              i <= step ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {i < step ? <CheckCircle2 className="h-4 w-4" /> : i === step && uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs">{i+1}</span>}
              {s}
            </div>
            {i < steps.length - 1 && <div className={`h-0.5 w-8 ${i < step ? 'bg-blue-600' : 'bg-border'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Zone */}
          <Card>
            <CardContent className="p-6">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); simulateUpload(); }}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
                  dragOver ? 'border-primary bg-blue-50' : 'border-slate-200 hover:border-primary/30 hover:bg-slate-50'
                }`}
                onClick={simulateUpload}
              >
                <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-slate-900 mb-1">Glissez votre PDF ici ou cliquez pour sélectionner</p>
                <p className="text-sm text-slate-400">Format PDF uniquement • Taille maximale : 50 Mo</p>
              </div>
              {uploading && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Cours_Algorithmique.pdf</span>
                    <span className="font-medium text-blue-600">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
              {step >= 1 && (
                <div className="mt-4 flex items-center gap-3 p-3 rounded-lg bg-emerald-50/30 border border-emerald-200">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Fichier importé avec succès</p>
                    <p className="text-xs text-slate-400">Score OCR : 92% — Bonne qualité</p>
                  </div>
                  <Badge variant="success" className="ml-auto">92%</Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Metadata Form */}
          <Card>
            <CardHeader><CardTitle className="text-sm">Métadonnées du cours</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Titre du cours</Label><Input placeholder="Ex: Intelligence Artificielle" /></div>
                <div className="space-y-2"><Label>Matière</Label><Input placeholder="Ex: Informatique" /></div>
                <div className="space-y-2"><Label>Niveau</Label>
                  <select className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                    <option>Licence 2</option><option>Licence 3</option><option>Master 1</option><option>Master 2</option>
                  </select>
                </div>
                <div className="space-y-2"><Label>Classe / Groupe</Label><Input placeholder="Ex: L3 Informatique" /></div>
              </div>
              <div className="space-y-2"><Label>Description</Label><Textarea placeholder="Description du cours..." rows={3} /></div>
              <div className="space-y-2"><Label>Mots-clés</Label><Input placeholder="IA, Machine Learning, Recherche (séparés par des virgules)" /></div>
              <Button className="w-full sm:w-auto">Lancer le traitement</Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {step >= 1 && (
            <Card>
              <CardHeader><CardTitle className="text-sm">Score OCR</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="92, 100" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-slate-900">92%</span>
                  </div>
                </div>
                <p className="text-center text-sm text-slate-400">Qualité globale du document</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-500" /> Pages à risque</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {mockOCRAlerts.slice(0, 3).map((a) => (
                <div key={a.id} className="p-2 rounded-lg bg-amber-50/30 border border-amber-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Page {a.page}</span>
                    <Badge variant={a.quality < 65 ? 'danger' : 'warning'} className="text-[10px]">{a.quality}%</Badge>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">{a.issue}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
