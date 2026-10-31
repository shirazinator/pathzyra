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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-900 border border-surface-700 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 animate-in fade-in duration-200 min-w-0">
        <div className="flex items-center justify-between border-b border-surface-800 pb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-white truncate">Life Happened / Recalibrate</h3>
              <p className="text-[11px] text-zinc-400">Guilt-free schedule recovery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-sm p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Psychological Reassurance Callout */}
        <div className="bg-brand-950/40 border border-brand-500/30 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-brand-200">
          <HeartHandshake className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed text-[11px]">
            <strong>Rule #1 of Exam & Career Prep:</strong> Missing 3 or 4 days because of office pressure, illness, or family is completely normal. <strong>Never abandon the plan or restart from Day 1.</strong> We recalculate your runway right here.
          </div>
        </div>

        <form onSubmit={handleApply} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">
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
                      ? 'bg-brand-500 border-brand-400 text-surface-950 font-extrabold'
                      : 'bg-surface-950 border-surface-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">
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
                      ? 'bg-brand-950/40 border-brand-500 text-white'
                      : 'bg-surface-950/60 border-surface-800 text-zinc-400 hover:border-surface-700'
                  }`}
                >
                  <div className="text-xs font-bold text-zinc-200 mb-0.5 truncate">{opt.title}</div>
                  <div className="text-[11px] text-zinc-400 leading-snug break-words">{opt.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-zinc-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-surface-950 text-xs font-bold transition cursor-pointer shadow-lg shadow-brand-500/20 flex items-center gap-1.5"
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
