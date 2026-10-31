import React, { useState } from 'react';
import { RefreshCw, HeartHandshake } from 'lucide-react';

export function RecalibrateModal({
  isOpen,
  onClose,
  onRecalibrate
}) {
  if (!isOpen) return null;

  const [missedDays, setMissedDays] = useState(3);
  const [strategy, setStrategy] = useState('trim_backlog');

  const handleApply = (e) => {
    e.preventDefault();
    onRecalibrate({
      missedDays: Number(missedDays),
      strategy
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 animate-in fade-in duration-200 min-w-0">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">Life Happened / Recalibrate</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Guilt-free schedule recovery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-sm p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Psychological Reassurance Callout */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-emerald-800 dark:text-emerald-200">
          <HeartHandshake className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed text-[11px]">
            <strong>Rule #1 of Exam & Career Prep:</strong> Missing 3 or 4 days because of office pressure, illness, or family is completely normal. <strong>Never abandon the plan or restart from Day 1.</strong> We recalculate your runway right here.
          </div>
        </div>

        <form onSubmit={handleApply} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              How many days did you miss?
            </label>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {[2, 3, 5, 7, 10].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setMissedDays(d)}
                  className={`flex-1 py-1.5 sm:py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    missedDays === d
                      ? 'bg-emerald-600 border-emerald-600 text-white font-extrabold shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Choose Recovery Strategy:
            </label>
            <div className="space-y-2">
              {[
                {
                  id: 'trim_backlog',
                  title: 'Pareto 80/20 Backlog Trim (Recommended)',
                  desc: 'Drop low-weightage Tier 2/Optional tasks from missed days. Move forward immediately without feeling buried.'
                },
                {
                  id: 'buffer_spread',
                  title: 'Buffer Absorption (+20 mins/day)',
                  desc: 'Distribute the missed study hours evenly as a small +20-30 min addition to remaining weekday evenings.'
                },
                {
                  id: 'extend_weeks',
                  title: 'Gentle Timeline Extension (+1 Week)',
                  desc: 'Add 1 additional week at the end so your daily workload stays relaxed.'
                }
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setStrategy(opt.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition min-w-0 ${
                    strategy === opt.id
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-slate-900 dark:text-white ring-1 ring-emerald-500/20'
                      : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900 dark:text-zinc-200 mb-0.5 truncate">{opt.title}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug break-words">{opt.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Apply Recalibration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
