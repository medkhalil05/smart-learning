"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';

type StatusType = 'draft' | 'processing' | 'validation' | 'published' | 'approved' | 'rejected' | 'edited' | 'active' | 'inactive' | 'disabled' | 'high' | 'medium' | 'low' | 'operational' | 'degraded' | 'down';

const statusConfig: Record<StatusType, { label: string; variant: 'draft' | 'processing' | 'validation' | 'published' | 'approved' | 'rejected' | 'edited' | 'success' | 'warning' | 'danger' | 'info' | 'secondary' }> = {
  draft: { label: 'Brouillon', variant: 'draft' },
  processing: { label: 'Traitement OCR', variant: 'processing' },
  validation: { label: 'En validation', variant: 'validation' },
  published: { label: 'Publié', variant: 'published' },
  approved: { label: 'Approuvé', variant: 'approved' },
  rejected: { label: 'Rejeté', variant: 'rejected' },
  edited: { label: 'Modifié', variant: 'edited' },
  active: { label: 'Actif', variant: 'success' },
  inactive: { label: 'Inactif', variant: 'warning' },
  disabled: { label: 'Désactivé', variant: 'danger' },
  high: { label: 'Élevé', variant: 'danger' },
  medium: { label: 'Moyen', variant: 'warning' },
  low: { label: 'Faible', variant: 'info' },
  operational: { label: 'Opérationnel', variant: 'success' },
  degraded: { label: 'Dégradé', variant: 'warning' },
  down: { label: 'Hors service', variant: 'danger' },
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, variant: 'secondary' as const };
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
