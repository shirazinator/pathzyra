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
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            Your Time Horizon & Daily Availability
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            We calibrate the exact weekly volume so your schedule stays human and achievable.
          </p>
        </div>

        {/* Live Hours Stat */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs self-start sm:self-auto shadow-sm">
          <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="text-slate-500 dark:text-slate-400">Total Budget:</span>
          <span className="font-bold text-slate-900 dark:text-white">{feasibility?.totalAvailableHours || 0} Hours</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 1. Profile Type */}
        <div className="space-y-3 min-w-0">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            1. Current Profile Mode
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setIsWorkingProfessional(true)}
              className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer min-w-0 ${
                isWorkingProfessional
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-slate-900 dark:text-white shadow-sm ring-1 ring-emerald-500/20'
                  : 'bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Briefcase className={`w-4 h-4 mb-2 shrink-0 ${isWorkingProfessional ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Working Pro</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Weekdays + Weekends</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setIsWorkingProfessional(false)}
              className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer min-w-0 ${
                !isWorkingProfessional
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-slate-900 dark:text-white shadow-sm ring-1 ring-emerald-500/20'
                  : 'bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <GraduationCap className={`w-4 h-4 mb-2 shrink-0 ${!isWorkingProfessional ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Full-Time Aspirant</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Daily study blocks</div>
              </div>
            </button>
          </div>

          {/* Availability Sliders */}
          {isWorkingProfessional ? (
            <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 space-y-3.5">
              <div>
                <div className="flex justify-between text-xs mb-1 gap-2">
                  <span className="text-slate-700 dark:text-slate-300 font-medium truncate">Weekday (Mon–Fri):</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 shrink-0">{weekdayHours} hrs/eve</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.5"
                  value={weekdayHours}
                  onChange={(e) => setWeekdayHours(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 gap-2">
                  <span className="text-slate-700 dark:text-slate-300 font-medium truncate">Weekend (Sat–Sun):</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400 shrink-0">{weekendHours} hrs/day</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="0.5"
                  value={weekendHours}
                  onChange={(e) => setWeekendHours(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 space-y-2">
              <div className="flex justify-between text-xs mb-1 gap-2">
                <span className="text-slate-700 dark:text-slate-300 font-medium truncate">Daily Study Hours:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 shrink-0">{fulltimeDailyHours} hrs/day</span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                step="0.5"
                value={fulltimeDailyHours}
                onChange={(e) => setFulltimeDailyHours(Number(e.target.value))}
                className="w-full accent-emerald-600 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Weekly commitment: ~{Math.round(fulltimeDailyHours * 6.5)} hrs (with 1 light rest day).
              </p>
            </div>
          )}
        </div>

        {/* 2. Duration Window */}
        <div className="space-y-3 min-w-0">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
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
                    ? 'bg-emerald-600 border-emerald-600 text-white font-extrabold shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="truncate">{m} Months</span>
                <span className="text-[10px] font-normal opacity-80">~{Math.round(m * 4.3)}w</span>
              </button>
            ))}
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5">
            <div className="flex justify-between text-xs mb-1 gap-2">
              <span className="text-slate-700 dark:text-slate-300 font-medium truncate">Custom Duration:</span>
              <span className="font-bold text-slate-900 dark:text-slate-200 shrink-0">{durationMonths} Months</span>
            </div>
            <input
              type="range"
              min="1"
              max="18"
              step="0.5"
              value={durationMonths}
              onChange={(e) => setDurationMonths(Number(e.target.value))}
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* 3. Baseline Level */}
        <div className="space-y-3 min-w-0">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
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
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-slate-900 dark:text-white ring-1 ring-emerald-500/30'
                    : 'bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{lvl.label}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 break-words leading-tight">{lvl.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
