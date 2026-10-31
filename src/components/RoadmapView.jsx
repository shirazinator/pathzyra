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
        colors: ['#059669', '#10b981', '#f59e0b', '#ec4899']
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 min-w-0 shadow-sm">
        <div className="min-w-0">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5 mb-0.5">
            <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="truncate">Actionable Preparation Blueprint</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white break-words">
            {roadmap.targetTitle} — {roadmap.totalWeeks} Weeks Plan
          </h2>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 flex-wrap">
          {/* Help / What is this guide button */}
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium cursor-pointer transition shadow-sm"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="hidden sm:inline">{showGuide ? 'Hide Guide' : 'What are these sections?'}</span>
            <span className="sm:hidden">{showGuide ? 'Hide' : 'Guide'}</span>
          </button>

          <button
            onClick={onOpenExport}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold cursor-pointer transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Export Notion / MD</span>
            <span className="sm:hidden">Export</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-medium cursor-pointer transition shadow-sm"
            title="Print printable planner"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Guide Callout (Explains all sections so the user never feels lost!) */}
      {showGuide && (
        <div className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl p-4 space-y-3 shadow-sm animate-in fade-in duration-200">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Understanding Your Prep Blueprint:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <strong className="text-emerald-700 dark:text-emerald-400 block mb-0.5">1. Phases (1 to 4)</strong>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Breaks preparation into Foundations $\to$ Core Problem Sets $\to$ Advanced $\to$ Timed Mocks.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <strong className="text-emerald-700 dark:text-emerald-400 block mb-0.5">2. Weekday vs Weekend</strong>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Light theory on Mon–Fri evenings, heavy deep-work & full mock tests on Sat–Sun.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <strong className="text-amber-700 dark:text-amber-400 block mb-0.5">3. Tier-1 Pareto Tags</strong>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Identifies high-yield topics that make up 70% of exam questions. Never skip Tier 1!
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <strong className="text-teal-700 dark:text-teal-400 block mb-0.5">4. Free Resources</strong>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Curated 100% free YouTube courses, sheets & question banks with direct clickable links.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Phase Selection Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 w-full">
        {roadmap.phases.map((phase, idx) => {
          const isSelected = activePhaseIndex === idx;
          const prog = getPhaseProgress(phase);

          return (
            <button
              key={phase.phaseId}
              onClick={() => setActivePhaseIndex(idx)}
              className={`p-2.5 sm:p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between min-w-0 overflow-hidden shadow-sm ${
                isSelected
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className="min-w-0 mb-2">
                <div className="flex items-center justify-between text-[10px] mb-1 gap-1">
                  <span className={`font-bold truncate ${isSelected ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-500 dark:text-slate-400'}`}>
                    Phase {phase.phaseNumber}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 font-mono text-[10px] shrink-0">
                    {prog.completed}/{prog.total}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {phase.title.replace(/Phase \d+: /, '')}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-950 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-600 dark:bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${prog.percent}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Phase Details Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 space-y-5 min-w-0 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 min-w-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 whitespace-nowrap">
                Phase {activePhase.phaseNumber} of 4
              </span>
              <span className="text-[10px] text-amber-800 dark:text-amber-300 font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 whitespace-nowrap">
                {activePhase.weight}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white break-words">
              {activePhase.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 break-words leading-relaxed">
              <strong>Core Focus:</strong> {activePhase.focus}
            </p>
          </div>

          <div className="text-left md:text-right shrink-0">
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Phase Completion</div>
            <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {activePhaseProgress.percent}% ({activePhaseProgress.completed}/{activePhaseProgress.total} tasks)
            </div>
          </div>
        </div>

        {/* Curated Gold Standard Free Resources */}
        {activePhase.resources && activePhase.resources.length > 0 && (
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
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
          <div className="flex items-center justify-between gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex-wrap">
            <span>Weekly Action Targets ({activePhase.weeks.length} Weeks)</span>
            <div className="flex items-center gap-2 font-normal lowercase text-slate-500 dark:text-slate-400">
              <button
                onClick={() => setViewFilter(viewFilter === 'all' ? 'uncompleted' : 'all')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 cursor-pointer shadow-sm transition"
              >
                <ListFilter className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
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
                  className={`border rounded-2xl transition-all overflow-hidden min-w-0 shadow-sm ${
                    isWeekFullyDone
                      ? 'bg-slate-50 dark:bg-slate-900/50 border-emerald-300 dark:border-emerald-500/40'
                      : 'bg-white dark:bg-slate-950/70 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {/* Week Header */}
                  <div
                    onClick={() => toggleWeek(week.weekNumber)}
                    className="p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition min-w-0"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isWeekFullyDone
                          ? 'bg-emerald-600 text-white font-black'
                          : 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30'
                      }`}>
                        W{week.weekNumber}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate">{week.title}</h4>
                          {isWeekFullyDone && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-1 shrink-0">
                              <CheckCircle className="w-3 h-3" /> Done
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          Focus: {week.focus}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {weekCompletedCount}/{week.tasks.length}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Week Content */}
                  {isExpanded && (
                    <div className="p-3.5 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-900/40 min-w-0">
                      {/* Guidance Callout */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 shadow-sm">
                        <div className="text-emerald-800 dark:text-emerald-300 min-w-0">
                          <strong className="text-emerald-700 dark:text-emerald-400 block mb-0.5">📅 Weekday Routine:</strong>
                          <span className="text-slate-600 dark:text-slate-300 break-words leading-relaxed text-[11px]">{week.weekdayGuidance}</span>
                        </div>
                        <div className="text-amber-800 dark:text-amber-300 min-w-0">
                          <strong className="text-amber-700 dark:text-amber-400 block mb-0.5">⚡ Weekend Surge / Mocks:</strong>
                          <span className="text-slate-600 dark:text-slate-300 break-words leading-relaxed text-[11px]">{week.weekendGuidance}</span>
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
                              className={`p-2.5 rounded-xl border flex items-start justify-between gap-2.5 cursor-pointer transition min-w-0 shadow-sm ${
                                isDone
                                  ? 'bg-slate-100/60 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-400 line-through'
                                  : isMock
                                  ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-500/40 hover:border-emerald-400'
                                  : 'bg-white dark:bg-slate-950/70 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                              }`}
                            >
                              <div className="flex items-start gap-2.5 min-w-0">
                                <button
                                  type="button"
                                  className="mt-0.5 shrink-0 focus:outline-none"
                                >
                                  {isDone ? (
                                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-600/10" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 hover:text-emerald-600" />
                                  )}
                                </button>
                                <div className="min-w-0">
                                  <div className={`text-xs font-semibold break-words ${isDone ? 'text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                                    {task.title}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap ${
                                  task.pareto === 'Tier 1'
                                    ? 'bg-rose-100 dark:bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-500/20'
                                    : task.pareto === 'Optional'
                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                    : 'bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20'
                                }`}>
                                  {task.pareto}
                                </span>
                                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-0.5">
                                  <Clock className="w-3 h-3 text-slate-400" />
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
