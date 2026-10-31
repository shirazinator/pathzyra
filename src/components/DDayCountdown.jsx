import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Rocket, Edit2, Check, Briefcase, GraduationCap } from 'lucide-react';

export function DDayCountdown({
  durationMonths = 6,
  targetTitle = 'Target Goal',
  targetCategory = 'tech',
  targetDate,
  onUpdateTargetDate
}) {
  const [isEditing, setIsEditing] = useState(false);

  // Determine if target is a competitive exam or a job role
  const isCompetitiveExam = targetCategory === 'govt' || targetCategory === 'grad_mba';

  // Dynamic context-aware terminology
  const config = useMemo(() => {
    if (isCompetitiveExam) {
      return {
        badgeTitle: '⏳ Exam D-Day Countdown',
        pillLabel: 'Exam Countdown',
        dateLabel: 'Target Exam Date',
        editPrompt: 'Set Exact Exam Date',
        description: 'Days left until the official examination hall.',
        subtext: 'Every mock test & revision cycle counts',
        icon: <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
      };
    } else {
      return {
        badgeTitle: '🚀 Interview-Ready Launch Target',
        pillLabel: 'Hiring Runway',
        dateLabel: 'Target Application Launch Date',
        editPrompt: 'Set Target Interview Date',
        description: 'Days until you start referrals & technical interviews.',
        subtext: 'Target date to finish projects & DSA problem sets',
        icon: <Rocket className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
      };
    }
  }, [isCompetitiveExam]);

  // Compute default target date based on duration in months if not explicitly set
  const computedTargetDate = useMemo(() => {
    if (targetDate) return new Date(targetDate);
    const d = new Date();
    d.setMonth(d.getMonth() + Math.round(durationMonths));
    return d;
  }, [durationMonths, targetDate]);

  const [dateInput, setDateInput] = useState(() => {
    const d = computedTargetDate;
    return d.toISOString().split('T')[0];
  });

  // Calculate days remaining
  const daysRemaining = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(computedTargetDate);
    target.setHours(0, 0, 0, 0);
    const diffTime = target - today;
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }, [computedTargetDate]);

  const weeksRemaining = Math.max(1, Math.round(daysRemaining / 7));

  const handleSaveDate = (e) => {
    e.preventDefault();
    if (dateInput) {
      onUpdateTargetDate(dateInput);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-sm min-w-0 w-full max-w-full overflow-hidden transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
            {config.icon}
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {config.badgeTitle}
              </span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                isCompetitiveExam
                  ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-500/20'
                  : 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/20'
              }`}>
                {config.pillLabel}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {config.description}
            </p>
          </div>
        </div>

        {/* Date Edit Trigger */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-[11px] font-medium text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 cursor-pointer transition p-1"
        >
          <Edit2 className="w-3 h-3" />
          <span>{isEditing ? 'Cancel' : config.editPrompt}</span>
        </button>
      </div>

      {/* Date Picker Form if Editing */}
      {isEditing && (
        <form onSubmit={handleSaveDate} className="mb-3 p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-2 flex-wrap animate-in fade-in duration-150">
          <label className="text-xs text-slate-600 dark:text-slate-400 font-medium">Select Target Date:</label>
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1 shadow-sm"
          >
            <Check className="w-3 h-3" />
            <span>Save</span>
          </button>
        </form>
      )}

      {/* Countdown Visual Numbers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 text-center">
          <div className={`text-2xl sm:text-3xl font-black font-mono ${
            isCompetitiveExam
              ? 'text-amber-600 dark:text-amber-400'
              : 'text-emerald-600 dark:text-emerald-400'
          }`}>
            {daysRemaining}
          </div>
          <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
            Days Runway
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 text-center">
          <div className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-200 font-mono">
            {weeksRemaining}
          </div>
          <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
            Weeks Remaining
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 text-center col-span-2 sm:col-span-2 flex flex-col justify-center text-left px-3.5">
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
            {config.dateLabel}:
          </div>
          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
            {computedTargetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>{config.subtext}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
