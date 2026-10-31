import React from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

export function FeasibilityBanner({
  feasibility,
  targetTitle,
  onApplyRecommendedMonths,
  onProceedCrunch
}) {
  if (!feasibility) return null;

  const {
    score,
    status,
    totalAvailableHours,
    benchmarkHours,
    verdictTitle,
    verdictDescription,
    consequences,
    recommendations
  } = feasibility;

  const isUnrealistic = status === 'unrealistic';
  const isCrunch = status === 'crunch';
  const isRealistic = status === 'realistic';

  return (
    <div className={`rounded-3xl border p-4 sm:p-6 transition-all shadow-xl min-w-0 ${
      isUnrealistic
        ? 'bg-gradient-to-br from-rose-950/60 via-surface-900 to-surface-950 border-rose-500/40 shadow-rose-950/20'
        : isCrunch
        ? 'bg-gradient-to-br from-amber-950/50 via-surface-900 to-surface-950 border-amber-500/30 shadow-amber-950/20'
        : 'bg-gradient-to-br from-brand-950/50 via-surface-900 to-surface-950 border-brand-500/30 shadow-brand-950/20'
    }`}>
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-800 pb-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
            isUnrealistic
              ? 'bg-rose-500 text-white shadow-rose-500/30'
              : isCrunch
              ? 'bg-gold-500 text-surface-950 shadow-gold-500/30'
              : 'bg-brand-500 text-surface-950 shadow-brand-500/30'
          }`}>
            {isUnrealistic ? (
              <ShieldAlert className="w-5 h-5" />
            ) : isCrunch ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap ${
                isUnrealistic
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : isCrunch
                  ? 'bg-gold-500/20 text-gold-300 border border-gold-500/30'
                  : 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
              }`}>
                {isUnrealistic ? '⚠️ Unrealistic Timeline' : isCrunch ? '⚡ Intensive Crunch' : '✅ Realistic & High Probability'}
              </span>
              <span className="text-xs text-zinc-400 font-medium truncate max-w-xs">Target: {targetTitle}</span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-white break-words">
              {verdictTitle}
            </h2>
          </div>
        </div>

        {/* Gauge / Score Pill */}
        <div className="flex items-center gap-3 bg-surface-950/80 border border-surface-800 rounded-2xl p-2.5 sm:p-3 shrink-0 self-start md:self-auto">
          <div>
            <div className="text-[10px] text-zinc-400 font-medium">Feasibility</div>
            <div className="text-xl sm:text-2xl font-black text-white flex items-baseline gap-1">
              <span className={isUnrealistic ? 'text-rose-400' : isCrunch ? 'text-gold-400' : 'text-brand-400'}>
                {score}%
              </span>
            </div>
          </div>

          <div className="border-l border-surface-800 pl-3 text-right">
            <div className="text-[10px] text-zinc-400">Hours Ratio</div>
            <div className="text-xs font-bold text-zinc-200">
              <span className={isUnrealistic ? 'text-rose-400' : 'text-brand-400'}>{totalAvailableHours}h</span>
              <span className="text-zinc-500"> / ~{benchmarkHours}h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-3.5 break-words">
        {verdictDescription}
      </p>

      {/* UNREALISTIC DETAIL VIEW: Consequences & The Honest Prescription */}
      {isUnrealistic && (
        <div className="mt-4 space-y-4">
          {/* Why this fails (Consequences) */}
          <div>
            <h4 className="text-[11px] font-bold text-rose-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>Why This Fails: Guaranteed Bottlenecks & Consequences</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {consequences.map((c, idx) => (
                <div
                  key={idx}
                  className="bg-surface-950/70 border border-rose-900/30 rounded-xl p-2.5 text-xs min-w-0"
                >
                  <div className="font-bold text-rose-200 mb-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                    <span className="truncate">{c.title}</span>
                  </div>
                  <div className="text-zinc-400 text-[11px] leading-relaxed break-words">{c.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* The Honest Prescription (Prescribed Realistic Plan) */}
          <div className="bg-surface-950 border border-brand-500/40 rounded-2xl p-4 sm:p-5 shadow-lg min-w-0">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-1.5 text-brand-400 text-[11px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>The Honest Prescription for Guaranteed Success</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white break-words">
                  Extend to <span className="text-brand-400 underline decoration-brand-500/50 decoration-2">{recommendations.healthyMonths} Months</span> at your current daily hours
                </h3>
                <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed break-words">
                  At your current hours, extending to {recommendations.healthyMonths} months provides the ~{benchmarkHours} hours required to finish the syllabus, build full-scale portfolio projects, and take 15+ full-length mock tests.
                  Alternatively, keeping your chosen window requires dedicating <strong>{recommendations.neededDailyAvgHours}</strong>.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto shrink-0">
                <button
                  onClick={() => onApplyRecommendedMonths(recommendations.healthyMonths)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-surface-950 font-bold text-xs transition cursor-pointer shadow-lg shadow-brand-500/20 active:scale-95 whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  Auto-Apply {recommendations.healthyMonths} Months
                </button>

                <button
                  onClick={onProceedCrunch}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-surface-900 hover:bg-surface-850 border border-surface-700 text-zinc-300 font-medium text-xs transition cursor-pointer active:scale-95 whitespace-nowrap"
                >
                  Proceed with 80/20 Sprint
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CRUNCH VIEW */}
      {isCrunch && (
        <div className="mt-3.5 bg-surface-950/60 border border-amber-900/30 rounded-2xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-xs text-zinc-300 break-words">
            <strong className="text-gold-300">Strict Pareto 80/20 Mode Enabled:</strong> Low-yield topics and non-critical electives are tagged as optional. Concentrate all your energy on Tier-1 questions that carry 75% of actual exam weightage.
          </div>
          <button
            onClick={() => onApplyRecommendedMonths(recommendations.healthyMonths)}
            className="text-xs font-semibold text-gold-400 hover:text-gold-300 whitespace-nowrap cursor-pointer flex items-center gap-1 shrink-0"
          >
            Add +{recommendations.healthyMonths - (feasibility.weeks / 4.3)} months for safety <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* REALISTIC VIEW */}
      {isRealistic && (
        <div className="mt-3.5 bg-surface-950/60 border border-brand-900/30 rounded-2xl p-3 flex items-center gap-2 text-xs text-brand-300">
          <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
          <span className="break-words">
            <strong>Optimal Pace:</strong> You have allocated enough hours to complete topic study, active recall revision, and mock test analysis. Follow this week-by-week roadmap consistently.
          </span>
        </div>
      )}
    </div>
  );
}
