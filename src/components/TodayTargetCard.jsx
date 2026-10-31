import React from 'react';
import { Target, CheckCircle, Circle, Clock, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export function TodayTargetCard({
  roadmap,
  completedTasks,
  onToggleTask
}) {
  if (!roadmap || !roadmap.phases) return null;

  // Find the first uncompleted week and its pending tasks
  let activeWeek = null;
  let activePhase = null;
  let pendingTasks = [];

  for (const phase of roadmap.phases) {
    for (const week of phase.weeks) {
      const remainingInWeek = week.tasks.filter((t) => !completedTasks[t.id]);
      if (remainingInWeek.length > 0) {
        activeWeek = week;
        activePhase = phase;
        pendingTasks = remainingInWeek;
        break;
      }
    }
    if (activeWeek) break;
  }

  // If all tasks in all phases are done!
  const isFullyComplete = !activeWeek;

  const handleCheck = (taskId) => {
    onToggleTask(taskId);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8, x: 0.5 },
      colors: ['#059669', '#10b981', '#f59e0b', '#3b82f6']
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-sm min-w-0 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center shrink-0">
            <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                🎯 Today's Mission & Action Target
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20">
                Zero Overwhelm
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Focus strictly on today's tasks — ignore the rest of the syllabus for now.
            </p>
          </div>
        </div>

        {activeWeek && (
          <div className="text-right shrink-0">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Week {activeWeek.weekNumber} Active
            </span>
          </div>
        )}
      </div>

      {/* If all done */}
      {isFullyComplete ? (
        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl p-4 text-center space-y-1">
          <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
            All Planned Tasks Completed!
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            You have finished all milestones in your roadmap. Start Revision Round 2 or take full-length mocks!
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {/* Active Target Banner */}
          <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Current Focus: <span className="text-emerald-700 dark:text-emerald-400">{activeWeek.focus}</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {pendingTasks.length} task{pendingTasks.length > 1 ? 's' : ''} remaining in Week {activeWeek.weekNumber}
              </div>
            </div>

            {/* Link to resource if available */}
            {activePhase?.resources?.[0] && (
              <a
                href={activePhase.resources[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 cursor-pointer self-start sm:self-auto"
              >
                <span>Open {activePhase.resources[0].name.slice(0, 24)}...</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Today's Next 2 Actionable Tasks */}
          <div className="space-y-2">
            {pendingTasks.slice(0, 2).map((task) => (
              <div
                key={task.id}
                onClick={() => handleCheck(task.id)}
                className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/50 transition cursor-pointer flex items-center justify-between gap-3 shadow-sm group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button type="button" className="shrink-0 focus:outline-none">
                    <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                  </button>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {task.title}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                    task.pareto === 'Tier 1'
                      ? 'bg-rose-100 dark:bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-500/20'
                      : 'bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20'
                  }`}>
                    {task.pareto}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {task.estimatedHours}h
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
