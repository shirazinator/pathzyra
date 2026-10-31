import React, { useState } from 'react';
import { ResourceCard } from './ResourceCard';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Printer, 
  Layers,
  BookOpen,
  HelpCircle,
  Eye,
  ListFilter
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function RoadmapView({
  roadmap,
  completedTasks,
  onToggleTask,
  onOpenExport,
  onOpenRecalibrate
}) {
  if (!roadmap || !roadmap.phases) return null;

  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [expandedWeeks, setExpandedWeeks] = useState({ 1: true });
  const [showGuide, setShowGuide] = useState(false);
  const [viewFilter, setViewFilter] = useState('all'); // 'all' | 'uncompleted'

  const toggleWeek = (weekNumber) => {
    setExpandedWeeks((prev) => ({
      ...prev,
      [weekNumber]: !prev[weekNumber]
    }));
  };

  const handleTaskCheck = (taskId) => {
    const isNowCompleted = !completedTasks[taskId];
    onToggleTask(taskId);

    if (isNowCompleted) {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.85, x: 0.5 },
        colors: ['#10b981', '#34d399', '#f59e0b', '#ec4899']
      });
    }
  };

  // Calculate phase progress
  const getPhaseProgress = (phase) => {
    let total = 0;
    let completed = 0;
    phase.weeks.forEach((w) => {
      w.tasks.forEach((t) => {
        total++;
        if (completedTasks[t.id]) completed++;
      });
    });
    return {
      total,
      completed,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };

  const activePhase = roadmap.phases[activePhaseIndex] || roadmap.phases[0];
  const activePhaseProgress = getPhaseProgress(activePhase);

  // Filter weeks if user wants to see only pending or all
  const displayedWeeks = activePhase.weeks.filter((week) => {
    if (viewFilter === 'uncompleted') {
      const allDone = week.tasks.every((t) => completedTasks[t.id]);
      return !allDone;
    }
    return true;
  });

  return (
    <div className="space-y-5 min-w-0">
      {/* Top Controls / Export Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-surface-900/80 border border-surface-800 rounded-2xl p-4 min-w-0">
        <div className="min-w-0">
          <div className="text-[11px] text-zinc-400 font-medium flex items-center gap-1.5 mb-0.5">
            <Layers className="w-3.5 h-3.5 text-brand-400 shrink-0" />
            <span className="truncate">Actionable Preparation Blueprint</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white break-words">
            {roadmap.targetTitle} — {roadmap.totalWeeks} Weeks Plan
          </h2>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 flex-wrap">
          {/* Help / What is this guide button */}
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-850 hover:bg-surface-800 border border-surface-700 text-zinc-300 text-xs font-medium cursor-pointer transition"
          >
            <HelpCircle className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>{showGuide ? 'Hide Guide' : 'What are these sections?'}</span>
          </button>

          <button
            onClick={onOpenExport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500/15 hover:bg-brand-500/25 border border-brand-500/30 text-brand-300 text-xs font-semibold cursor-pointer transition"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>Export Notion / MD</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-surface-850 hover:bg-surface-800 border border-surface-700 text-zinc-400 text-xs font-medium cursor-pointer transition"
            title="Print printable planner"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Guide Callout (Explains all sections so the user never feels lost!) */}
      {showGuide && (
        <div className="bg-surface-900 border border-brand-500/30 rounded-2xl p-4 space-y-3 animate-in fade-in duration-200">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-400"></span>
            Understanding Your Prep Blueprint:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-surface-950 p-2.5 rounded-xl border border-surface-800">
              <strong className="text-brand-300 block mb-0.5">1. Phases (1 to 4)</strong>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Breaks preparation into Foundations $\to$ Core Problem Sets $\to$ Advanced $\to$ Timed Mocks.
              </p>
            </div>
            <div className="bg-surface-950 p-2.5 rounded-xl border border-surface-800">
              <strong className="text-brand-300 block mb-0.5">2. Weekday vs Weekend</strong>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Light theory on Mon–Fri evenings, heavy deep-work & full mock tests on Sat–Sun.
              </p>
            </div>
            <div className="bg-surface-950 p-2.5 rounded-xl border border-surface-800">
              <strong className="text-gold-300 block mb-0.5">3. Tier-1 Pareto Tags</strong>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Identifies high-yield topics that make up 70% of exam questions. Never skip Tier 1!
              </p>
            </div>
            <div className="bg-surface-950 p-2.5 rounded-xl border border-surface-800">
              <strong className="text-teal-300 block mb-0.5">4. Free Resources</strong>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Curated 100% free YouTube courses, sheets & question banks with direct clickable links.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Phase Selection Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {roadmap.phases.map((phase, idx) => {
          const isSelected = activePhaseIndex === idx;
          const prog = getPhaseProgress(phase);

          return (
            <button
              key={phase.phaseId}
              onClick={() => setActivePhaseIndex(idx)}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between min-w-0 ${
                isSelected
                  ? 'bg-brand-950/40 border-brand-500 ring-2 ring-brand-500/30'
                  : 'bg-surface-900/60 hover:bg-surface-850 border-surface-800 text-zinc-400'
              }`}
            >
              <div className="min-w-0 mb-2">
                <div className="flex items-center justify-between text-[10px] mb-1 gap-1">
                  <span className={`font-bold truncate ${isSelected ? 'text-brand-300' : 'text-zinc-400'}`}>
                    Phase {phase.phaseNumber}
                  </span>
                  <span className="text-zinc-500 font-mono text-[10px] shrink-0">
                    {prog.completed}/{prog.total}
                  </span>
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {phase.title.replace(/Phase \d+: /, '')}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-surface-950 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-brand-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${prog.percent}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Phase Details Card */}
      <div className="bg-surface-900/90 border border-surface-800 rounded-3xl p-4 sm:p-6 space-y-5 min-w-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-surface-800 pb-4 min-w-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 whitespace-nowrap">
                Phase {activePhase.phaseNumber} of 4
              </span>
              <span className="text-[10px] text-gold-300 font-bold px-2 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/20 whitespace-nowrap">
                {activePhase.weight}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-white break-words">
              {activePhase.title}
            </h3>
            <p className="text-xs text-zinc-300 mt-1 break-words leading-relaxed">
              <strong>Core Focus:</strong> {activePhase.focus}
            </p>
          </div>

          <div className="text-left md:text-right shrink-0">
            <div className="text-[10px] text-zinc-400">Phase Completion</div>
            <div className="text-sm font-bold text-brand-400">
              {activePhaseProgress.percent}% ({activePhaseProgress.completed}/{activePhaseProgress.total} tasks)
            </div>
          </div>
        </div>

        {/* Curated Gold Standard Free Resources */}
        {activePhase.resources && activePhase.resources.length > 0 && (
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2.5">
              <BookOpen className="w-3.5 h-3.5 text-brand-400 shrink-0" />
              <span>Recommended Free Resources for this Phase</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {activePhase.resources.map((res, rIdx) => (
                <ResourceCard key={rIdx} resource={res} />
              ))}
            </div>
          </div>
        )}

        {/* Weekly Breakdown Header */}
        <div className="space-y-3 pt-2 min-w-0">
          <div className="flex items-center justify-between gap-2 text-xs font-bold text-zinc-300 uppercase tracking-wider flex-wrap">
            <span>Weekly Action Targets ({activePhase.weeks.length} Weeks)</span>
            <div className="flex items-center gap-2 font-normal lowercase text-zinc-400">
              <button
                onClick={() => setViewFilter(viewFilter === 'all' ? 'uncompleted' : 'all')}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-950 border border-surface-800 text-[11px] hover:text-white cursor-pointer"
              >
                <ListFilter className="w-3 h-3 text-brand-400" />
                <span>{viewFilter === 'all' ? 'Filter: Pending Only' : 'Show All'}</span>
              </button>
            </div>
          </div>

          {/* Week Accordion Cards */}
          <div className="space-y-2.5">
            {displayedWeeks.map((week) => {
              const isExpanded = expandedWeeks[week.weekNumber] ?? false;
              const weekCompletedCount = week.tasks.filter((t) => completedTasks[t.id]).length;
              const isWeekFullyDone = weekCompletedCount === week.tasks.length && week.tasks.length > 0;

              return (
                <div
                  key={week.weekNumber}
                  className={`border rounded-2xl transition-all overflow-hidden min-w-0 ${
                    isWeekFullyDone
                      ? 'bg-surface-900/50 border-brand-500/40'
                      : 'bg-surface-950/70 border-surface-800'
                  }`}
                >
                  {/* Week Header */}
                  <div
                    onClick={() => toggleWeek(week.weekNumber)}
                    className="p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-surface-900 transition min-w-0"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isWeekFullyDone
                          ? 'bg-brand-500 text-surface-950 font-black'
                          : 'bg-brand-500/15 text-brand-300 border border-brand-500/30'
                      }`}>
                        W{week.weekNumber}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-white text-xs sm:text-sm truncate">{week.title}</h4>
                          {isWeekFullyDone && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 flex items-center gap-1 shrink-0">
                              <CheckCircle className="w-3 h-3" /> Done
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-zinc-400 truncate">
                          Focus: {week.focus}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-[11px] font-mono text-zinc-400">
                        {weekCompletedCount}/{week.tasks.length}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-zinc-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Week Content */}
                  {isExpanded && (
                    <div className="p-3.5 pt-1 border-t border-surface-800 space-y-3 bg-surface-900/40 min-w-0">
                      {/* Guidance Callout */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-surface-950/80 border border-surface-800 rounded-xl p-2.5">
                        <div className="text-brand-300 min-w-0">
                          <strong className="text-brand-400 block mb-0.5">📅 Weekday Routine:</strong>
                          <span className="text-zinc-300 break-words leading-relaxed text-[11px]">{week.weekdayGuidance}</span>
                        </div>
                        <div className="text-gold-300 min-w-0">
                          <strong className="text-gold-400 block mb-0.5">⚡ Weekend Surge / Mocks:</strong>
                          <span className="text-zinc-300 break-words leading-relaxed text-[11px]">{week.weekendGuidance}</span>
                        </div>
                      </div>

                      {/* Tasks Checklist */}
                      <div className="space-y-1.5">
                        {week.tasks.map((task) => {
                          const isDone = !!completedTasks[task.id];
                          const isMock = task.type === 'mock';

                          return (
                            <div
                              key={task.id}
                              onClick={() => handleTaskCheck(task.id)}
                              className={`p-2.5 rounded-xl border flex items-start justify-between gap-2.5 cursor-pointer transition min-w-0 ${
                                isDone
                                  ? 'bg-surface-950/40 border-surface-800 text-zinc-500 line-through'
                                  : isMock
                                  ? 'bg-brand-950/30 border-brand-500/40 hover:border-brand-400'
                                  : 'bg-surface-950/70 border-surface-800 hover:border-surface-700'
                              }`}
                            >
                              <div className="flex items-start gap-2.5 min-w-0">
                                <button
                                  type="button"
                                  className="mt-0.5 shrink-0 focus:outline-none"
                                >
                                  {isDone ? (
                                    <CheckCircle className="w-4 h-4 text-brand-400 fill-brand-400/20" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-zinc-500 hover:text-brand-400" />
                                  )}
                                </button>
                                <div className="min-w-0">
                                  <div className={`text-xs font-semibold break-words ${isDone ? 'text-zinc-500' : 'text-zinc-200'}`}>
                                    {task.title}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap ${
                                  task.pareto === 'Tier 1'
                                    ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                                    : task.pareto === 'Optional'
                                    ? 'bg-surface-800 text-zinc-400'
                                    : 'bg-gold-500/10 text-gold-300 border border-gold-500/20'
                                }`}>
                                  {task.pareto}
                                </span>
                                <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-0.5">
                                  <Clock className="w-3 h-3 text-zinc-500" />
                                  {task.estimatedHours}h
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
