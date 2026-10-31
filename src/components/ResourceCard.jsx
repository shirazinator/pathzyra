import React from 'react';
import { ExternalLink, PlaySquare, BookOpen, CheckCircle, Globe } from 'lucide-react';

export function ResourceCard({ resource }) {
  if (!resource) return null;

  const getIcon = (type = '') => {
    const t = type.toLowerCase();
    if (t.includes('youtube') || t.includes('video') || t.includes('series')) {
      return <PlaySquare className="w-4 h-4 text-rose-400 shrink-0" />;
    }
    if (t.includes('sheet') || t.includes('course') || t.includes('interactive')) {
      return <BookOpen className="w-4 h-4 text-brand-400 shrink-0" />;
    }
    if (t.includes('portal') || t.includes('mock') || t.includes('test')) {
      return <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />;
    }
    return <Globe className="w-4 h-4 text-teal-400 shrink-0" />;
  };

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-3.5 rounded-2xl bg-surface-900/90 hover:bg-surface-850 border border-surface-800 hover:border-brand-500/50 transition-all text-left shadow-sm min-w-0"
    >
      <div className="flex items-start justify-between gap-2 mb-1.5 flex-wrap">
        <div className="flex items-center gap-1.5 min-w-0">
          {getIcon(resource.type)}
          <span className="text-[10px] font-semibold text-zinc-400 truncate">{resource.type}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20 whitespace-nowrap">
            100% Free
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-brand-400 transition-colors" />
        </div>
      </div>

      <div className="font-bold text-white text-xs group-hover:text-brand-300 transition-colors mb-1 break-words">
        {resource.name}
      </div>

      {resource.note && (
        <p className="text-[11px] text-zinc-400 leading-snug break-words">
          {resource.note}
        </p>
      )}
    </a>
  );
}
