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
import { DDayCountdown } from './components/DDayCountdown';
import { TodayTargetCard } from './components/TodayTargetCard';
import { RecalibrateModal } from './components/RecalibrateModal';
import { ExportModal } from './components/ExportModal';
import { PeerLounge } from './components/PeerLounge';
import { 
  Sparkles, 
  Calendar, 
  SlidersHorizontal,
  ChevronRight,
  RotateCcw,
  HelpCircle,
  Users
} from 'lucide-react';

export function App() {
  // Theme state: 'light' or 'dark'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('pathzyra_theme') || 'light';
  });

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

  const [targetDate, setTargetDate] = useState(() => {
    return localStorage.getItem('pathzyra_target_date') || '';
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

  const [hasOnboarded, setHasOnboarded] = useState(() => {
    return localStorage.getItem('pathzyra_has_onboarded') === 'true';
  });

  const [streak, setStreak] = useState(() => {
    return Number(localStorage.getItem('pathzyra_streak')) || 0;
  });

  const [totalHoursStudied, setTotalHoursStudied] = useState(() => {
    return Number(localStorage.getItem('pathzyra_total_hours_studied')) || 0;
  });

  const [lastStudyDate, setLastStudyDate] = useState(() => {
    return localStorage.getItem('pathzyra_last_study_date') || '';
  });

  // UI Modals & Navigation: New users start on 'configure' so they choose their own goal!
  const [activeView, setActiveView] = useState(() => {
    const onboarded = localStorage.getItem('pathzyra_has_onboarded');
    return onboarded === 'true' ? 'roadmap' : 'configure';
  });
  const [isRecalibrateOpen, setIsRecalibrateOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showResetTooltip, setShowResetTooltip] = useState(false);

  // Sync theme with document class and localStorage
  useEffect(() => {
    localStorage.setItem('pathzyra_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

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
    if (targetDate) {
      localStorage.setItem('pathzyra_target_date', targetDate);
    }
  }, [targetDate]);

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
      setTargetDate(''); // recalculate default date
    }
  };

  const handleSetCustomGoal = (customRole) => {
    setCustomGoal(customRole);
    setSelectedTargetId(customRole.id);
    setDurationMonths(customRole.defaultMonths || 6);
    setTargetDate('');
  };

  const handleToggleTask = (taskId) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleApplyRecommendedMonths = (healthyMonths) => {
    setDurationMonths(healthyMonths);
    setTargetDate('');
    localStorage.setItem('pathzyra_has_onboarded', 'true');
    setHasOnboarded(true);
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
      // Backlog trim: keep moving forward without accumulating guilt
    } else if (strategy === 'buffer_spread') {
      if (isWorkingProfessional) {
        setWeekdayHours((prev) => Math.min(4, Math.round((prev + 0.5) * 10) / 10));
      } else {
        setFulltimeDailyHours((prev) => Math.min(10, Math.round((prev + 0.5) * 10) / 10));
      }
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Clear all task checkmarks to start a fresh study or revision cycle? Your logged study hours will be preserved.')) {
      setCompletedTasks({});
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-zinc-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-200">
      {/* Global Navigation Header with Light/Dark Switch */}
      <Header
        streak={streak}
        completedTasksCount={completedTasksCount}
        totalTasksCount={totalTasksCount}
        theme={theme}
        onToggleTheme={toggleTheme}
        onRecalibrateClick={() => setIsRecalibrateOpen(true)}
        onEditProfileClick={() => setActiveView(activeView === 'configure' ? 'roadmap' : 'configure')}
        onOpenCommunity={() => setActiveView('community')}
        activeView={activeView}
        hasActivePlan={!!roadmap}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 min-w-0">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="truncate">The Honest Feasibility Engine • 80/20 Pareto Focus</span>
          </div>

          {!hasOnboarded && (
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-bold shadow-sm">
                <span>👉 Step 1: Select what you are preparing for below</span>
              </div>
            </div>
          )}

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight break-words">
            Land The Job & Crack The Exam <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 dark:from-emerald-400 dark:via-teal-300 dark:to-amber-300 bg-clip-text text-transparent">
              With Zero Guesswork
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto break-words">
            No generic 10-hour timetables. Choose your target (Tech, SSC, CAT, UPSC, Banking, PM), set your real-life daily hours, and receive an honest feasibility verdict with 100% free curated resources.
          </p>

          {/* View Mode Toggle Switch */}
          <div className="inline-flex p-1 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mt-2 max-w-full overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveView('roadmap')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeView === 'roadmap'
                  ? 'bg-emerald-600 text-white font-extrabold shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>Execution Roadmap</span>
            </button>

            <button
              onClick={() => setActiveView('configure')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeView === 'configure'
                  ? 'bg-emerald-600 text-white font-extrabold shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Change Target & Hours</span>
              <span className="sm:hidden">Target & Hours</span>
            </button>

            <button
              onClick={() => setActiveView('community')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeView === 'community'
                  ? 'bg-emerald-600 text-white font-extrabold shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
              <span>Peer Lounge</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 ml-0.5">
                New
              </span>
            </button>
          </div>
        </div>

        {/* View 1: Configuration Mode (Pick Target & Set Availability) */}
        {activeView === 'configure' ? (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200 min-w-0">
            {/* Step 1: Target Selector */}
            <section className="space-y-3 min-w-0">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-emerald-600 text-white font-black flex items-center justify-center text-xs">1</span>
                  Select Target Exam or Role
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Choose from pre-calibrated gold standards or create your own custom goal.</p>
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
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-emerald-600 text-white font-black flex items-center justify-center text-xs">2</span>
                  Set Your Real Daily Hours & Window
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Account for working hours, college schedules, and weekend availability.</p>
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
                onClick={() => {
                  localStorage.setItem('pathzyra_has_onboarded', 'true');
                  setHasOnboarded(true);
                  setActiveView('roadmap');
                }}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm transition cursor-pointer shadow-lg shadow-emerald-600/25 active:scale-95"
              >
                <span>Generate & View My Roadmap</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : activeView === 'community' ? (
          <div className="animate-in fade-in duration-200 min-w-0">
            <PeerLounge currentTargetTitle={currentTarget.title} />
          </div>
        ) : (
          /* View 2: Active Roadmap Mode */
          <div className="space-y-6 animate-in fade-in duration-200 min-w-0">
            {/* Top Grid: D-Day Countdown & Today's Target Card */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Feature 1: D-Day Exam Countdown / Interview-Ready Launch */}
              <DDayCountdown
                durationMonths={durationMonths}
                targetTitle={currentTarget.title}
                targetCategory={currentTarget.category}
                targetDate={targetDate}
                onUpdateTargetDate={setTargetDate}
              />

              {/* Feature 2: Today's Action Target Card */}
              <TodayTargetCard
                roadmap={roadmap}
                completedTasks={completedTasks}
                onToggleTask={handleToggleTask}
              />
            </div>

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

            {/* Reset Progress Action with Explanation Tooltip */}
            <div className="flex flex-col items-center justify-center pt-3 pb-2 text-center space-y-1">
              <div className="relative inline-block">
                <button
                  onClick={handleResetProgress}
                  onMouseEnter={() => setShowResetTooltip(true)}
                  onMouseLeave={() => setShowResetTooltip(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition cursor-pointer shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset task checkboxes for this plan</span>
                  <HelpCircle className="w-3 h-3 text-slate-400 ml-0.5" />
                </button>

                {/* Tooltip explaining what Reset does */}
                {showResetTooltip && (
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-2.5 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl border border-slate-700 z-50 leading-relaxed animate-in fade-in zoom-in-95 duration-150">
                    <strong className="text-emerald-400 block mb-0.5">What does this do?</strong>
                    Unchecks all the weekly task checkmarks if you have finished the syllabus and want to start a second revision round, or if you want a clean slate. Your logged hours and streak remain safe!
                  </div>
                )}
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                Use this to start Revision Round 2 after finishing all weeks.
              </p>
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
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6 mt-12 text-center text-xs text-slate-500 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="font-extrabold text-slate-800 dark:text-slate-300">Pathzyra</span>
            <span>—</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Designed by Shiraz</span>
          </div>
          <div className="text-slate-500 text-[11px]">
            100% free open-access gold standard resources. Zero spam, honest calculations.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
