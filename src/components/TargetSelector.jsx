import React, { useState } from 'react';
import { TARGET_CATEGORIES, TARGET_ROLES } from '../data/targets';
import { generateDynamicTargetFromQuery } from '../utils/dynamicRoleEngine';
import { 
  Search, 
  Code2, 
  ShieldCheck, 
  GraduationCap, 
  Briefcase, 
  PlusCircle, 
  Sparkles, 
  Check, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  X,
  Zap,
  ArrowRight,
  Layers,
  SlidersHorizontal
} from 'lucide-react';

const POPULAR_QUICK_SEARCHES = [
  'Cyber Security',
  'Software Engineer',
  'Data Science & AI',
  'Data Analytics',
  'UPSC CSE',
  'CAT MBA',
  'DevOps & Cloud',
  'SSC CGL',
  'Mobile App Dev'
];

export function TargetSelector({
  selectedTargetId,
  customGoal,
  onSelectTarget,
  onSetCustomGoal
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customCategory, setCustomCategory] = useState('tech');
  const [customBenchmarkHours, setCustomBenchmarkHours] = useState(400);

  // If user already has a plan selected, collapse the 13-card catalog by default so they don't have to scroll!
  const [isCatalogExpanded, setIsCatalogExpanded] = useState(() => {
    return !selectedTargetId && !customGoal;
  });

  const getCategoryIcon = (catId) => {
    switch (catId) {
      case 'tech': return <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />;
      case 'govt': return <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />;
      case 'grad_mba': return <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />;
      case 'non_tech': return <Briefcase className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />;
      default: return <Sparkles className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />;
    }
  };

  const cleanQuery = searchQuery.trim().toLowerCase();

  const filteredRoles = TARGET_ROLES.filter((role) => {
    const matchesCategory = activeCategory === 'all' || role.category === activeCategory;
    if (!cleanQuery) return matchesCategory;

    const matchesSearch =
      role.title.toLowerCase().includes(cleanQuery) ||
      role.description.toLowerCase().includes(cleanQuery) ||
      role.badge.toLowerCase().includes(cleanQuery) ||
      (role.keywords && role.keywords.some((k) => k.toLowerCase().includes(cleanQuery)));

    return matchesCategory && matchesSearch;
  });

  // Current active target object
  const activeRole = customGoal && customGoal.id === selectedTargetId
    ? customGoal
    : TARGET_ROLES.find((r) => r.id === selectedTargetId) || TARGET_ROLES[0];

  const handleSelect = (id) => {
    onSelectTarget(id);
    setIsCatalogExpanded(false); // Collapse to avoid huge scroll!
  };

  const handleInstantGenerate = (queryText) => {
    const text = (queryText || searchQuery).trim();
    if (!text) return;
    const dynamicTarget = generateDynamicTargetFromQuery(text);
    onSetCustomGoal(dynamicTarget);
    setIsCatalogExpanded(false); // Collapse to avoid huge scroll!
  };

  const handleCreateCustom = (e) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    // Deeply adapts to data analytics, data science, hacker, tech, govt, or any custom role
    const dynamicPlan = generateDynamicTargetFromQuery(customTitle.trim());
    const customRole = {
      ...dynamicPlan,
      id: `custom_${Date.now()}`,
      category: customCategory,
      title: customTitle.trim(),
      badge: 'Custom Target',
      minHours: {
        beginner: Number(customBenchmarkHours) || dynamicPlan.minHours.beginner,
        intermediate: Math.round((Number(customBenchmarkHours) || dynamicPlan.minHours.beginner) * 0.55),
        advanced: Math.round((Number(customBenchmarkHours) || dynamicPlan.minHours.beginner) * 0.3)
      }
    };

    onSetCustomGoal(customRole);
    setShowCustomModal(false);
    setIsCatalogExpanded(false); // Collapse to keep page compact!
  };

  return (
    <div className="space-y-3.5">
      {/* Active Selected Goal Compact Summary Card (Zero Scrolling Needed!) */}
      {activeRole && (
        <div className="p-3.5 sm:p-4.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-500/80 shadow-md transition-all text-left w-full max-w-full min-w-0 overflow-hidden box-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full min-w-0">
            <div className="w-full min-w-0 flex-1 overflow-hidden">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 flex items-center gap-1">
                  <Check className="w-3 h-3 stroke-[3]" />
                  Active Selected Goal
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium capitalize">
                  {activeRole.category === 'grad_mba' ? 'MBA / Entrance' : activeRole.category}
                </span>
                <span className="text-[11px] text-slate-400">•</span>
                <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                  ~{activeRole.minHours?.beginner || 400} hrs benchmark
                </span>
              </div>

              <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 dark:text-white break-words whitespace-normal leading-snug">
                {activeRole.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 break-words line-clamp-2 mt-1 leading-relaxed">
                {activeRole.description}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => setIsCatalogExpanded(!isCatalogExpanded)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-zinc-200 text-xs font-semibold transition cursor-pointer"
              >
                <span>{isCatalogExpanded ? 'Hide Targets' : 'Change Target'}</span>
                {isCatalogExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setShowCustomModal(true)}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold transition cursor-pointer"
                title="Create custom target"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add Custom</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expandable Catalog / Search Bar (Only shown when browsing or expanding) */}
      {isCatalogExpanded && (
        <div className="space-y-3.5 pt-1 animate-in fade-in duration-200">
          {/* Search Input and Custom Trigger */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 min-w-0">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search ANY role, exam, or skill (e.g. Cyber Security, Data Analytics, Hacker, UPSC)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 shadow-sm transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowCustomModal(true)}
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-zinc-200 text-xs sm:text-sm font-medium transition cursor-pointer shrink-0 shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Add Custom Target</span>
            </button>
          </div>

          {/* Quick Jump Topic Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            <span className="text-slate-400 dark:text-slate-500 font-medium whitespace-nowrap pl-0.5">Quick jump:</span>
            {POPULAR_QUICK_SEARCHES.map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  setSearchQuery(chip);
                  setActiveCategory('all');
                }}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap border transition cursor-pointer ${
                  cleanQuery === chip.toLowerCase()
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20'
                  : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              All Targets ({TARGET_ROLES.length})
            </button>

            {TARGET_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20'
                    : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Dynamic AI Roadmap Card if unlisted search */}
          {cleanQuery && filteredRoles.length === 0 && (
            <div className="p-4.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-left space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs sm:text-sm">
                <Zap className="w-4 h-4 fill-emerald-500 text-emerald-500 shrink-0" />
                <span>Universal AI Roadmap Generator</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                No preset found for <strong className="text-emerald-600 dark:text-emerald-400 font-bold">"{searchQuery}"</strong>. 
                Pathzyra can adapt and dynamically synthesize a 4-phase calibrated blueprint with free resources, weekly goals, and honest time estimates right now.
              </p>
              <button
                onClick={() => handleInstantGenerate(searchQuery)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Roadmap for "{searchQuery}"</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Custom goal card if created */}
            {customGoal && (
              <div
                onClick={() => handleSelect(customGoal.id)}
                className={`p-3.5 rounded-2xl border transition-all text-left relative cursor-pointer min-w-0 shadow-sm ${
                  selectedTargetId === customGoal.id
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                    ✨ Custom Goal
                  </span>
                  {selectedTargetId === customGoal.id && (
                    <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 break-words">{customGoal.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2 leading-relaxed">{customGoal.description}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2">
                  <span>Benchmark: <strong className="text-slate-800 dark:text-slate-200">~{customGoal.minHours?.beginner || 400} hrs</strong></span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Click to Apply</span>
                </div>
              </div>
            )}

            {/* Quick Generator card when searching */}
            {cleanQuery && filteredRoles.length > 0 && (
              <div
                onClick={() => handleInstantGenerate(searchQuery)}
                className="p-3.5 rounded-2xl border border-dashed border-emerald-500/40 hover:border-emerald-500 bg-emerald-500/[0.04] dark:bg-emerald-500/[0.08] hover:bg-emerald-500/10 transition text-left cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                      ✨ Dynamic Synthesizer
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Build Custom "{searchQuery}"
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
                    Click to generate a tailored 4-phase curriculum specifically for "{searchQuery}".
                  </p>
                </div>
                <div className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 border-t border-emerald-500/20 pt-2 gap-1">
                  <span>Generate in 1-Click</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )}

            {/* Preset Roles */}
            {filteredRoles.map((role) => {
              const isSelected = selectedTargetId === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => handleSelect(role.id)}
                  className={`p-3.5 rounded-2xl border transition-all text-left relative cursor-pointer group flex flex-col justify-between min-w-0 shadow-sm ${
                    isSelected
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1.5 flex-wrap">
                      <div className="flex items-center gap-1.5 min-w-0">
                        {getCategoryIcon(role.category)}
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 capitalize truncate">
                          {role.category === 'grad_mba' ? 'MBA / GATE' : role.category}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {role.badge}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors break-words">
                      {role.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3 line-clamp-2">
                      {role.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2.5 gap-2">
                    <div>
                      Benchmark: <strong className="text-slate-800 dark:text-slate-200">{role.minHours.beginner} hrs</strong>
                      <span className="text-slate-400 ml-1">({role.defaultMonths}m)</span>
                    </div>
                    {isSelected ? (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> Selected
                      </span>
                    ) : (
                      <span className="text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center transition">
                        Select <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Done Browsing / Collapse Button */}
          <div className="text-center pt-1">
            <button
              onClick={() => setIsCatalogExpanded(false)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer inline-flex items-center gap-1"
            >
              <span>Done picking target — Collapse list</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Custom Target Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Add Custom Goal / Exam
              </h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-sm p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Type any role or exam (e.g. <strong>Data Analytics</strong>, <strong>Data Scientist</strong>, <strong>Ethical Hacker</strong>, <strong>Rust</strong>). Pathzyra will automatically adapt the 4-phase curriculum and attach real, curated free resources!
            </p>

            <form onSubmit={handleCreateCustom} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Target Exam or Job Role Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Data Analytics, Data Scientist, Ethical Hacker, RBI Grade B"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Category
                </label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="tech">Tech & Engineering</option>
                  <option value="govt">Government & Civil Services</option>
                  <option value="grad_mba">MBA & Higher Entrance</option>
                  <option value="non_tech">Business & Non-Tech</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Estimated Benchmark Study Hours Required
                </label>
                <input
                  type="number"
                  min="50"
                  max="2000"
                  value={customBenchmarkHours}
                  onChange={(e) => setCustomBenchmarkHours(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer shadow-md"
                >
                  Generate Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
