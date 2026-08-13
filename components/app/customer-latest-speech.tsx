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
        'relative flex w-full min-h-[100px] flex-col justify-center items-center rounded-2xl border border-slate-200/80 bg-[#f1f5f9] p-4 text-center shadow-2xs transition-all duration-300',
        hasSpoken && 'ring-2 ring-indigo-500/20 bg-indigo-50/40 border-indigo-200',
        className
      )}
    >
      {/* Spoken Text Centered */}
      <p className="line-clamp-4 leading-relaxed font-normal text-xs md:text-sm text-slate-600">
        "{latestCustomerText}"
      </p>
    </div>
  );
}
