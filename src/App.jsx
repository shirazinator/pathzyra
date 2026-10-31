import React, { useState, useEffect, useMemo } from 'react';
import { TARGET_ROLES } from './data/targets';
import { calculateFeasibility } from './utils/calculator';
import { generateRoadmap } from './utils/roadmapGenerator';
import { Header } from './components/Header';
import { TargetSelector } from './components/TargetSelector';
import { ProfileForm } from './components/ProfileForm';
import { FeasibilityBanner } from './components/FeasibilityBanner';
import { RoadmapView } from './components/RoadmapView';
import { DailyTracker } from './components/DailyTracker';
import { RecalibrateModal } from './components/RecalibrateModal';
import { ExportModal } from './components/ExportModal';
import { 
  Sparkles, 
  Calendar, 
  SlidersHorizontal,
  ChevronRight,
  RotateCcw,
  Compass,
  CheckCircle2
} from 'lucide-react';

export function App() {
  // Load saved state from localStorage
  const [selectedTargetId, setSelectedTargetId] = useState(() => {
    return localStorage.getItem('pathzyra_target_id') || 'sde_faang';
  });

  const [customGoal, setCustomGoal] = useState(() => {
    const saved = localStorage.getItem('pathzyra_custom_goal');
    return saved ? JSON.parse(saved) : null;
  });

  const [durationMonths, setDurationMonths] = useState(() => {
    return Number(localStorage.getItem('pathzyra_duration_months')) || 6;
  });

  const [isWorkingProfessional, setIsWorkingProfessional] = useState(() => {
    const saved = localStorage.getItem('pathzyra_is_working');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [weekdayHours, setWeekdayHours] = useState(() => {
    return Number(localStorage.getItem('pathzyra_weekday_hours')) || 2;
  });

  const [weekendHours, setWeekendHours] = useState(() => {
    return Number(localStorage.getItem('pathzyra_weekend_hours')) || 6;
  });

  const [fulltimeDailyHours, setFulltimeDailyHours] = useState(() => {
    return Number(localStorage.getItem('pathzyra_fulltime_hours')) || 6;
  });

  const [baselineLevel, setBaselineLevel] = useState(() => {
    return localStorage.getItem('pathzyra_baseline') || 'beginner';
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('pathzyra_completed_tasks');
    return saved ? JSON.parse(saved) : {};
  });

  const [streak, setStreak] = useState(() => {
    return Number(localStorage.getItem('pathzyra_streak')) || 1;
  });

  const [totalHoursStudied, setTotalHoursStudied] = useState(() => {
    return Number(localStorage.getItem('pathzyra_total_hours_studied')) || 0;
  });

  const [lastStudyDate, setLastStudyDate] = useState(() => {
    return localStorage.getItem('pathzyra_last_study_date') || '';
  });

  // UI Modals & Navigation
  const [isRecalibrateOpen, setIsRecalibrateOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [activeView, setActiveView] = useState('roadmap'); // 'roadmap' | 'configure'

  // Persist settings
  useEffect(() => {
    localStorage.setItem('pathzyra_target_id', selectedTargetId);
  }, [selectedTargetId]);

  useEffect(() => {
    if (customGoal) {
      localStorage.setItem('pathzyra_custom_goal', JSON.stringify(customGoal));
    }
  }, [customGoal]);

  useEffect(() => {
    localStorage.setItem('pathzyra_duration_months', durationMonths.toString());
  }, [durationMonths]);

  useEffect(() => {
    localStorage.setItem('pathzyra_is_working', JSON.stringify(isWorkingProfessional));
  }, [isWorkingProfessional]);

  useEffect(() => {
    localStorage.setItem('pathzyra_weekday_hours', weekdayHours.toString());
  }, [weekdayHours]);

  useEffect(() => {
    localStorage.setItem('pathzyra_weekend_hours', weekendHours.toString());
  }, [weekendHours]);

  useEffect(() => {
    localStorage.setItem('pathzyra_fulltime_hours', fulltimeDailyHours.toString());
  }, [fulltimeDailyHours]);

  useEffect(() => {
    localStorage.setItem('pathzyra_baseline', baselineLevel);
  }, [baselineLevel]);

  useEffect(() => {
    localStorage.setItem('pathzyra_completed_tasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem('pathzyra_streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('pathzyra_total_hours_studied', totalHoursStudied.toString());
  }, [totalHoursStudied]);

  useEffect(() => {
    localStorage.setItem('pathzyra_last_study_date', lastStudyDate);
  }, [lastStudyDate]);

  // Find active target role definition
  const currentTarget = useMemo(() => {
    if (customGoal && customGoal.id === selectedTargetId) {
      return customGoal;
    }
    return TARGET_ROLES.find((r) => r.id === selectedTargetId) || TARGET_ROLES[0];
  }, [selectedTargetId, customGoal]);

  // Compute feasibility
  const feasibility = useMemo(() => {
    return calculateFeasibility({
      target: currentTarget,
      baselineLevel,
      durationMonths,
      isWorkingProfessional,
      weekdayHours,
      weekendHours,
      fulltimeDailyHours
    });
  }, [currentTarget, baselineLevel, durationMonths, isWorkingProfessional, weekdayHours, weekendHours, fulltimeDailyHours]);

  // Generate dynamic hierarchical roadmap
  const roadmap = useMemo(() => {
    return generateRoadmap({
      target: currentTarget,
      feasibility,
      isWorkingProfessional,
      weekdayHours,
      weekendHours,
      fulltimeDailyHours
    });
  }, [currentTarget, feasibility, isWorkingProfessional, weekdayHours, weekendHours, fulltimeDailyHours]);

  // Count total and completed tasks
  const { totalTasksCount, completedTasksCount } = useMemo(() => {
    let total = 0;
    let completed = 0;
    if (roadmap && roadmap.phases) {
      roadmap.phases.forEach((p) => {
        p.weeks.forEach((w) => {
          w.tasks.forEach((t) => {
            total++;
            if (completedTasks[t.id]) completed++;
          });
        });
      });
    }
    return { totalTasksCount: total, completedTasksCount: completed };
  }, [roadmap, completedTasks]);

  // Handlers
  const handleSelectTarget = (id) => {
    setSelectedTargetId(id);
    const target = TARGET_ROLES.find((r) => r.id === id);
    if (target && target.defaultMonths) {
      setDurationMonths(target.defaultMonths);
    }
  };

  const handleSetCustomGoal = (customRole) => {
    setCustomGoal(customRole);
    setSelectedTargetId(customRole.id);
    setDurationMonths(customRole.defaultMonths || 6);
  };

  const handleToggleTask = (taskId) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleApplyRecommendedMonths = (healthyMonths) => {
    setDurationMonths(healthyMonths);
    setActiveView('roadmap');
  };

  const handleLogStudyHours = (hours) => {
    setTotalHoursStudied((prev) => prev + hours);
    const today = new Date().toISOString().split('T')[0];
    if (lastStudyDate !== today) {
      setStreak((prev) => prev + 1);
      setLastStudyDate(today);
    }
  };

  const handleRecalibrate = ({ missedDays, strategy }) => {
    if (strategy === 'extend_weeks') {
      setDurationMonths((prev) => Math.min(18, prev + 0.5));
    } else if (strategy === 'trim_backlog') {
      // Backlog trim: drop Tier 2 and proceed immediately
    } else if (strategy === 'buffer_spread') {
      if (isWorkingProfessional) {
        setWeekdayHours((prev) => Math.min(4, Math.round((prev + 0.5) * 10) / 10));
      } else {
        setFulltimeDailyHours((prev) => Math.min(10, Math.round((prev + 0.5) * 10) / 10));
      }
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset completed tasks for this roadmap?')) {
      setCompletedTasks({});
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0c] text-zinc-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Global Navigation Header */}
      <Header
        streak={streak}
        completedTasksCount={completedTasksCount}
        totalTasksCount={totalTasksCount}
        onRecalibrateClick={() => setIsRecalibrateOpen(true)}
        onEditProfileClick={() => setActiveView(activeView === 'configure' ? 'roadmap' : 'configure')}
        hasActivePlan={!!roadmap}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 min-w-0">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-400 shrink-0" />
            <span className="truncate">The Honest Feasibility Engine • 80/20 Pareto Focus</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight break-words">
            Land The Job & Crack The Exam <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-brand-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
              With Zero Guesswork
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto break-words">
            No generic 10-hour timetables. Choose your target (Tech, SSC, CAT, UPSC, Banking, PM), set your real-life daily hours, and receive an honest feasibility verdict with 100% free curated resources.
          </p>

          {/* View Mode Toggle Switch */}
          <div className="inline-flex p-1 rounded-2xl bg-surface-900 border border-surface-800 shadow-inner mt-2">
            <button
              onClick={() => setActiveView('roadmap')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeView === 'roadmap'
                  ? 'bg-brand-500 text-surface-950 font-black shadow-md shadow-brand-500/25'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Execution Roadmap</span>
            </button>

            <button
              onClick={() => setActiveView('configure')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeView === 'configure'
                  ? 'bg-brand-500 text-surface-950 font-black shadow-md shadow-brand-500/25'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 shrink-0" />
              <span>Change Target & Hours</span>
            </button>
          </div>
        </div>

        {/* View 1: Configuration Mode (Pick Target & Set Availability) */}
        {activeView === 'configure' ? (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200 min-w-0">
            {/* Step 1: Target Selector */}
            <section className="space-y-3 min-w-0">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-brand-500 text-surface-950 font-black flex items-center justify-center text-xs">1</span>
                  Select Target Exam or Role
                </h2>
                <p className="text-xs text-zinc-400">Choose from pre-calibrated gold standards or create your own custom goal.</p>
              </div>

              <TargetSelector
                selectedTargetId={selectedTargetId}
                customGoal={customGoal}
                onSelectTarget={handleSelectTarget}
                onSetCustomGoal={handleSetCustomGoal}
              />
            </section>

            {/* Step 2: Profile & Hours Calibration */}
            <section className="space-y-3 min-w-0">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-brand-500 text-surface-950 font-black flex items-center justify-center text-xs">2</span>
                  Set Your Real Daily Hours & Window
                </h2>
                <p className="text-xs text-zinc-400">Account for working hours, college schedules, and weekend availability.</p>
              </div>

              <ProfileForm
                durationMonths={durationMonths}
                setDurationMonths={setDurationMonths}
                isWorkingProfessional={isWorkingProfessional}
                setIsWorkingProfessional={setIsWorkingProfessional}
                weekdayHours={weekdayHours}
                setWeekdayHours={setWeekdayHours}
                weekendHours={weekendHours}
                setWeekendHours={setWeekendHours}
                fulltimeDailyHours={fulltimeDailyHours}
                setFulltimeDailyHours={setFulltimeDailyHours}
                baselineLevel={baselineLevel}
                setBaselineLevel={setBaselineLevel}
                feasibility={feasibility}
              />
            </section>

            {/* Step 3: Feasibility Banner Preview */}
            <FeasibilityBanner
              feasibility={feasibility}
              targetTitle={currentTarget.title}
              onApplyRecommendedMonths={handleApplyRecommendedMonths}
              onProceedCrunch={() => setActiveView('roadmap')}
            />

            {/* Generate & View Roadmap Button */}
            <div className="text-center pt-2">
              <button
                onClick={() => setActiveView('roadmap')}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-2xl bg-brand-500 hover:bg-brand-400 text-surface-950 font-black text-xs sm:text-sm transition cursor-pointer shadow-xl shadow-brand-500/25 active:scale-95"
              >
                <span>View My Personalized Roadmap</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* View 2: Active Roadmap Mode */
          <div className="space-y-6 animate-in fade-in duration-200 min-w-0">
            {/* Daily Habit & Streak Tracker */}
            <DailyTracker
              streak={streak}
              totalHoursStudied={totalHoursStudied}
              onLogStudyHours={handleLogStudyHours}
            />

            {/* The Honest Feasibility Banner (Reminder of Runway & Risk) */}
            <FeasibilityBanner
              feasibility={feasibility}
              targetTitle={currentTarget.title}
              onApplyRecommendedMonths={handleApplyRecommendedMonths}
              onProceedCrunch={() => {}}
            />

            {/* Interactive Week-by-Week Roadmap View */}
            <RoadmapView
              roadmap={roadmap}
              completedTasks={completedTasks}
              onToggleTask={handleToggleTask}
              onOpenExport={() => setIsExportOpen(true)}
              onOpenRecalibrate={() => setIsRecalibrateOpen(true)}
            />

            {/* Reset Progress Action */}
            <div className="flex justify-center pt-2">
              <button
                onClick={handleResetProgress}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-rose-400 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset task checkboxes for this plan</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Recalibrate Modal */}
      <RecalibrateModal
        isOpen={isRecalibrateOpen}
        onClose={() => setIsRecalibrateOpen(false)}
        onRecalibrate={handleRecalibrate}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        roadmap={roadmap}
        completedTasks={completedTasks}
      />

      {/* Footer with Shiraz attribution */}
      <footer className="border-t border-surface-800 bg-surface-950 py-6 mt-12 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="font-extrabold text-zinc-300">Pathzyra</span>
            <span>—</span>
            <span className="text-brand-400 font-semibold">Designed by Shiraz</span>
          </div>
          <div className="text-zinc-500 text-[11px]">
            100% free open-access gold standard resources. Zero spam, honest calculations.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
