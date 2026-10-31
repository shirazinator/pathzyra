import React from 'react';
import { Clock, Briefcase, GraduationCap, Zap } from 'lucide-react';

export function ProfileForm({
  durationMonths,
  setDurationMonths,
  isWorkingProfessional,
  setIsWorkingProfessional,
  weekdayHours,
  setWeekdayHours,
  weekendHours,
  setWeekendHours,
  fulltimeDailyHours,
  setFulltimeDailyHours,
  baselineLevel,
  setBaselineLevel,
  feasibility
}) {
  const durationPresets = [2, 3, 4, 6, 8, 12];

  return (
    <div className="bg-surface-900/90 border border-surface-800 rounded-3xl p-4 sm:p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-800 pb-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-400 shrink-0" />
            Your Time Horizon & Daily Availability
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            We calibrate the exact weekly volume so your schedule stays human and achievable.
          </p>
        </div>

        {/* Live Hours Stat */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-950 border border-surface-800 text-xs self-start sm:self-auto">
          <Zap className="w-3.5 h-3.5 text-gold-400 shrink-0" />
          <span className="text-zinc-400">Total Budget:</span>
          <span className="font-bold text-white">{feasibility?.totalAvailableHours || 0} Hours</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 1. Profile Type */}
        <div className="space-y-3 min-w-0">
          <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
            1. Current Profile Mode
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setIsWorkingProfessional(true)}
              className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer min-w-0 ${
                isWorkingProfessional
                  ? 'bg-brand-500/15 border-brand-500 text-white shadow-lg shadow-brand-950/20'
                  : 'bg-surface-950 hover:bg-surface-850 border-surface-800 text-zinc-400'
              }`}
            >
              <Briefcase className={`w-4 h-4 mb-2 shrink-0 ${isWorkingProfessional ? 'text-brand-400' : 'text-zinc-500'}`} />
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">Working Pro</div>
                <div className="text-[10px] text-zinc-400 truncate">Weekdays + Weekends</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setIsWorkingProfessional(false)}
              className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer min-w-0 ${
                !isWorkingProfessional
                  ? 'bg-brand-500/15 border-brand-500 text-white shadow-lg shadow-brand-950/20'
                  : 'bg-surface-950 hover:bg-surface-850 border-surface-800 text-zinc-400'
              }`}
            >
              <GraduationCap className={`w-4 h-4 mb-2 shrink-0 ${!isWorkingProfessional ? 'text-brand-400' : 'text-zinc-500'}`} />
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">Full-Time Aspirant</div>
                <div className="text-[10px] text-zinc-400 truncate">Daily study blocks</div>
              </div>
            </button>
          </div>

          {/* Availability Sliders */}
          {isWorkingProfessional ? (
            <div className="bg-surface-950/70 border border-surface-800 rounded-2xl p-3.5 space-y-3.5">
              <div>
                <div className="flex justify-between text-xs mb-1 gap-2">
                  <span className="text-zinc-300 font-medium truncate">Weekday (Mon–Fri):</span>
                  <span className="font-bold text-brand-400 shrink-0">{weekdayHours} hrs/eve</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.5"
                  value={weekdayHours}
                  onChange={(e) => setWeekdayHours(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-surface-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 gap-2">
                  <span className="text-zinc-300 font-medium truncate">Weekend (Sat–Sun):</span>
                  <span className="font-bold text-gold-400 shrink-0">{weekendHours} hrs/day</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="0.5"
                  value={weekendHours}
                  onChange={(e) => setWeekendHours(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-surface-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <div className="bg-surface-950/70 border border-surface-800 rounded-2xl p-3.5 space-y-2">
              <div className="flex justify-between text-xs mb-1 gap-2">
                <span className="text-zinc-300 font-medium truncate">Daily Study Hours:</span>
                <span className="font-bold text-brand-400 shrink-0">{fulltimeDailyHours} hrs/day</span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                step="0.5"
                value={fulltimeDailyHours}
                onChange={(e) => setFulltimeDailyHours(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-surface-800 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-zinc-400">
                Weekly commitment: ~{Math.round(fulltimeDailyHours * 6.5)} hrs (with 1 light rest day).
              </p>
            </div>
          )}
        </div>

        {/* 2. Duration Window */}
        <div className="space-y-3 min-w-0">
          <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
            2. Available Preparation Window
          </label>
          <div className="grid grid-cols-3 gap-2">
            {durationPresets.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setDurationMonths(m)}
                className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition cursor-pointer flex flex-col items-center min-w-0 ${
                  durationMonths === m
                    ? 'bg-brand-500 border-brand-400 text-surface-950 font-extrabold shadow-md shadow-brand-500/25'
                    : 'bg-surface-950 hover:bg-surface-850 border-surface-800 text-zinc-300'
                }`}
              >
                <span className="truncate">{m} Months</span>
                <span className="text-[10px] font-normal opacity-80">~{Math.round(m * 4.3)}w</span>
              </button>
            ))}
          </div>

          <div className="bg-surface-950/70 border border-surface-800 rounded-2xl p-3.5">
            <div className="flex justify-between text-xs mb-1 gap-2">
              <span className="text-zinc-300 font-medium truncate">Custom Duration:</span>
              <span className="font-bold text-zinc-200 shrink-0">{durationMonths} Months</span>
            </div>
            <input
              type="range"
              min="1"
              max="18"
              step="0.5"
              value={durationMonths}
              onChange={(e) => setDurationMonths(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-surface-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* 3. Baseline Level */}
        <div className="space-y-3 min-w-0">
          <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
            3. Current Baseline Level
          </label>
          <div className="space-y-2">
            {[
              {
                id: 'beginner',
                label: 'Beginner / Zero Baseline',
                desc: 'Starting from scratch, non-CS or first-time exam taker'
              },
              {
                id: 'intermediate',
                label: 'Intermediate / Career Switcher',
                desc: 'Know syntax or basic concepts; need problem-solving rigor & mocks'
              },
              {
                id: 'advanced',
                label: 'Advanced / Repeater',
                desc: 'Prepared before; targeting 99%ile or Tier-1 company interview polish'
              }
            ].map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setBaselineLevel(lvl.id)}
                className={`w-full p-2.5 rounded-xl border text-left transition cursor-pointer min-w-0 ${
                  baselineLevel === lvl.id
                    ? 'bg-brand-950/40 border-brand-500 text-white ring-1 ring-brand-500/40'
                    : 'bg-surface-950 hover:bg-surface-850 border-surface-800 text-zinc-300'
                }`}
              >
                <div className="text-xs font-bold text-white truncate">{lvl.label}</div>
                <div className="text-[11px] text-zinc-400 break-words leading-tight">{lvl.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
