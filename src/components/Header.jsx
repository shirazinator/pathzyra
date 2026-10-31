import React from 'react';
import { Compass, Flame, RefreshCw, BookOpenCheck, SlidersHorizontal, Sparkles } from 'lucide-react';

export function Header({
  streak = 0,
  completedTasksCount = 0,
  totalTasksCount = 0,
  onRecalibrateClick,
  onEditProfileClick,
  hasActivePlan = false
}) {
  const progressPercent = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  return (
    <header className="border-b border-surface-800/80 bg-surface-950/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand & Designer Attribution */}
        <div className="flex items-center gap-3 min-w-0 shrink">
          {/* Logo Icon */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-emerald-300 flex items-center justify-center shadow-lg shadow-brand-500/20 shrink-0">
            <Compass className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-base sm:text-lg text-white tracking-tight">Pathzyra</span>
              {/* Designer Attribution Badge */}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Designed by Shiraz</span>
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 truncate hidden md:block">
              Honest timelines, 80/20 Pareto prioritization & free gold-standard study materials
            </p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 shrink-0">
          {hasActivePlan && (
            <>
              {/* Streak Pill */}
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold whitespace-nowrap">
                <Flame className="w-3.5 h-3.5 fill-gold-500 text-gold-500 animate-pulse" />
                <span>{streak}d</span>
              </div>

              {/* Progress Count (Hidden on very small screens to avoid crowding) */}
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-900 border border-surface-800 text-xs whitespace-nowrap">
                <BookOpenCheck className="w-3.5 h-3.5 text-brand-400" />
                <span className="text-zinc-300 font-medium">{completedTasksCount}/{totalTasksCount}</span>
                <span className="text-brand-400 font-bold">({progressPercent}%)</span>
              </div>

              {/* Recalibrate Schedule Button */}
              <button
                onClick={onRecalibrateClick}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-surface-850 hover:bg-surface-800 border border-surface-700/80 text-zinc-200 text-xs font-medium transition cursor-pointer active:scale-95"
                title="Missed days? Recalculate remaining schedule without guilt"
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="hidden sm:inline">Recalibrate</span>
              </button>

              {/* Configure Target & Hours Button */}
              <button
                onClick={onEditProfileClick}
                className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-brand-500/15 hover:bg-brand-500/25 border border-brand-500/30 text-brand-300 text-xs font-semibold transition cursor-pointer active:scale-95 whitespace-nowrap"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Adjust Schedule</span>
                <span className="sm:hidden">Edit</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
