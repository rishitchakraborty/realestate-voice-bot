'use client';

import React from 'react';
import { Mic, User } from 'lucide-react';
import { useCustomerSpeech } from '@/hooks/useCustomerSpeech';
import { cn } from '@/lib/shadcn/utils';

interface CustomerLatestSpeechProps {
  className?: string;
  fallbackText?: string;
}

export function CustomerLatestSpeech({ className, fallbackText }: CustomerLatestSpeechProps) {
  const { latestCustomerText } = useCustomerSpeech({ fallbackText });

  const hasSpoken = latestCustomerText !== 'Listening...' && latestCustomerText !== fallbackText;

  return (
    <div
      className={cn(
        'relative flex w-full min-h-[125px] flex-col justify-between rounded-xl border-r-4 border-r-slate-700 border border-slate-200 bg-slate-50/90 p-4 text-right shadow-xs transition-all duration-300',
        hasSpoken && 'border-r-indigo-600 border-indigo-200 bg-indigo-50/60 shadow-sm ring-2 ring-indigo-500/20',
        className
      )}
    >
      {/* Header Status Badge */}
      <div className="flex items-center justify-between w-full mb-2 text-xs font-mono uppercase tracking-widest font-bold text-slate-700 flex-row-reverse">
        <span className="flex items-center gap-2">
          <User className="h-4 w-4 text-slate-700" />
          <span>Customer Speech</span>
        </span>
        {hasSpoken && <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 animate-ping" />}
      </div>

      {/* Spoken Text */}
      <p className="line-clamp-4 leading-relaxed font-semibold text-xs md:text-sm text-slate-800">
        "{latestCustomerText}"
      </p>
    </div>
  );
}
