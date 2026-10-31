import React, { useState } from 'react';
import { Flame, Clock, PlusCircle, Check } from 'lucide-react';

export function DailyTracker({
  streak,
  totalHoursStudied,
  onLogStudyHours
}) {
  const [loggedInput, setLoggedInput] = useState(2);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLog = (e) => {
    e.preventDefault();
    if (loggedInput <= 0) return;
    onLogStudyHours(Number(loggedInput));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2200);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 min-w-0">
      {/* Stats Summary */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-center justify-center shrink-0">
          <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">{streak} Day Streak</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20 whitespace-nowrap">
              Consistency Over Intensity
            </span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2 flex-wrap">
            <span>Total Logged: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{totalHoursStudied}h</strong></span>
            <span>•</span>
            <span className="truncate">2 focused hours daily beats 10 hours once a week.</span>
          </div>
        </div>
      </div>

      {/* Quick Log Form */}
      <form onSubmit={handleLog} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-1.5 sm:p-2 shrink-0 self-start md:self-auto shadow-sm">
        <Clock className="w-4 h-4 text-slate-400 ml-1.5 shrink-0" />
        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">Log today:</span>
        <input
          type="number"
          min="0.5"
          max="16"
          step="0.5"
          value={loggedInput}
          onChange={(e) => setLoggedInput(e.target.value)}
          className="w-14 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-1 text-xs text-slate-900 dark:text-white text-center font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-sm"
        />
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">hrs</span>

        <button
          type="submit"
          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1 shadow-sm active:scale-95 whitespace-nowrap"
        >
          {showSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Logged!</span>
            </>
          ) : (
            <>
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Log Session</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
