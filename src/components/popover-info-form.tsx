'use client';

import { Info } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface PopoverInfoFormProps {
  title: string;
  description: string;
}

export function PopoverInfoForm({ title, description }: PopoverInfoFormProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-1 text-cyan-300/70 transition hover:text-cyan-200 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
          aria-label="More information"
        >
          <Info className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 rounded-2xl border border-white/20 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl"
        align="start"
        sideOffset={8}
      >
        <div className="space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-200">
            {title}
          </h4>
          <p className="text-xs leading-relaxed text-slate-300">
            {description}
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}