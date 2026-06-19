"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  className?: string;
  iconBgColor?: string;
}

export function AnalyticsCard({ title, value, change, changeLabel, icon, className, iconBgColor = "bg-blue-50" }: AnalyticsCardProps) {
  return (
    <Card className={cn("card-hover", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            {change !== undefined && (
              <div className="flex items-center gap-1">
                {change > 0 ? (
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                ) : change < 0 ? (
                  <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                ) : (
                  <Minus className="h-3.5 w-3.5 text-slate-400" />
                )}
                <span className={cn("text-xs font-medium", change > 0 ? "text-emerald-500" : change < 0 ? "text-red-500" : "text-slate-400")}>
                  {change > 0 ? '+' : ''}{change}%
                </span>
                {changeLabel && <span className="text-xs text-slate-400">{changeLabel}</span>}
              </div>
            )}
          </div>
          <div className={cn("flex items-center justify-center w-12 h-12 rounded-xl", iconBgColor)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
