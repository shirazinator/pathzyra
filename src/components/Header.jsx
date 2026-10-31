import React, { useState } from 'react';
import { Compass, Flame, RefreshCw, BookOpenCheck, SlidersHorizontal, Sparkles, Sun, Moon, Info } from 'lucide-react';

export function Header({
  streak = 0,
  completedTasksCount = 0,
  totalTasksCount = 0,
  theme = 'light',
  onToggleTheme,
  onRecalibrateClick,
  onEditProfileClick,
  hasActivePlan = false
}) {
  const [showRecalibrateTooltip, setShowRecalibrateTooltip] = useState(false);
  const progressPercent = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  return (
    <header className="border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand & Designer Attribution */}
        <div className="flex items-center gap-3 min-w-0 shrink">
          {/* Logo Icon */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
            <Compass className="w-5 h-5 text-white stroke-[2.5]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">Pathzyra</span>
              {/* Designer Attribution Badge */}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 whitespace-nowrap">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Designed by Shiraz</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate hidden md:block">
              Honest timelines, 80/20 Pareto prioritization & free gold-standard study materials
            </p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 shrink-0">
          {hasActivePlan && (
            <>
              {/* Streak Pill */}
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold whitespace-nowrap">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
                <span>{streak}d</span>
              </div>

              {/* Progress Count (Hidden on mobile) */}
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs whitespace-nowrap">
                <BookOpenCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-slate-600 dark:text-slate-300 font-medium">{completedTasksCount}/{totalTasksCount}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">({progressPercent}%)</span>
              </div>

              {/* Recalibrate Schedule Button with Hover Explanation Tooltip */}
              <div className="relative">
                <button
                  onClick={onRecalibrateClick}
                  onMouseEnter={() => setShowRecalibrateTooltip(true)}
                  onMouseLeave={() => setShowRecalibrateTooltip(false)}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition cursor-pointer active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="hidden sm:inline">Recalibrate</span>
                  <Info className="w-3 h-3 text-slate-400" />
                </button>

                {/* Hover Tooltip explaining Recalibrate */}
                {showRecalibrateTooltip && (
                  <div className="absolute right-0 top-full mt-2 w-72 p-3 bg-slate-900 text-white text-xs rounded-2xl shadow-2xl border border-slate-700 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5" />
                      What is "Recalibrate"?
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      If you missed 2–5 days due to office overtime, illness, or travel, click here! It automatically redistributes your remaining study hours without guilt, so you never have to quit or restart from Day 1.
                    </p>
                  </div>
                )}
              </div>

              {/* Configure Target & Hours Button */}
              <button
                onClick={onEditProfileClick}
                className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold transition cursor-pointer active:scale-95 whitespace-nowrap"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Adjust Schedule</span>
                <span className="sm:hidden">Edit</span>
              </button>
            </>
          )}

          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 transition cursor-pointer active:scale-90"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
