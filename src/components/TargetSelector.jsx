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
  X,
  Zap,
  ArrowRight,
  Compass
} from 'lucide-react';

const POPULAR_QUICK_SEARCHES = [
  'Cyber Security',
  'Software Engineer',
  'Data Science & AI',
  'UPSC CSE',
  'CAT MBA',
  'DevOps & Cloud',
  'SSC CGL',
  'Mobile App Dev',
  'Product Management'
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

  const handleInstantGenerate = (queryText) => {
    const text = (queryText || searchQuery).trim();
    if (!text) return;
    const dynamicTarget = generateDynamicTargetFromQuery(text);
    onSetCustomGoal(dynamicTarget);
  };

  const handleCreateCustom = (e) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    // Use dynamic generator for rich phases or custom fallback
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
  };

  return (
    <div className="space-y-4">
      {/* Search and Category Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input with Clear Button */}
        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search ANY exam, role, or skill (e.g. Cyber Security, SDE, UPSC, Rust, CAT)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 shadow-sm transition"
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

        {/* Custom Role Trigger Button */}
        <button
          onClick={() => setShowCustomModal(true)}
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-zinc-200 text-xs sm:text-sm font-medium transition cursor-pointer shrink-0 shadow-sm"
        >
          <PlusCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Add Custom Target</span>
        </button>
      </div>

      {/* Quick Search Chips */}
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
                : 'bg-slate-100/70 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-750'
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
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

      {/* Dynamic Universal Generator Alert / Card when searching */}
      {cleanQuery && filteredRoles.length === 0 && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-500/30 text-left space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
            <Zap className="w-4 h-4 fill-emerald-500 text-emerald-500" />
            <span>Universal AI Roadmap Generator</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            No pre-packaged syllabus found matching <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">"{searchQuery}"</strong>. 
            Pathzyra's engine can dynamically synthesize a full 4-phase calibrated blueprint with free resources, weekly goals, and honest time estimates right now.
          </p>
          <button
            onClick={() => handleInstantGenerate(searchQuery)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Roadmap for "{searchQuery}"</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      )}

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {/* Active Custom / Dynamic goal card if created */}
        {customGoal && (
          <div
            onClick={() => onSelectTarget(customGoal.id)}
            className={`p-4 rounded-2xl border transition-all text-left relative cursor-pointer min-w-0 shadow-sm ${
              selectedTargetId === customGoal.id
                ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30'
                : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                ✨ {customGoal.badge || 'Dynamic Goal'}
              </span>
              {selectedTargetId === customGoal.id && (
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1 truncate">{customGoal.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">{customGoal.description}</p>
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2.5">
              <span>Benchmark: <strong className="text-slate-800 dark:text-slate-200">~{customGoal.minHours?.beginner || 400} hrs</strong></span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active Selection</span>
            </div>
          </div>
        )}

        {/* Dynamic Generator Prompt Card (when search query exists and filtered roles also exist) */}
        {cleanQuery && filteredRoles.length > 0 && (
          <div
            onClick={() => handleInstantGenerate(searchQuery)}
            className="p-4 rounded-2xl border border-dashed border-emerald-500/40 hover:border-emerald-500 bg-emerald-500/[0.04] dark:bg-emerald-500/[0.08] hover:bg-emerald-500/10 transition text-left cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
                  ✨ Dynamic AI Blueprint
                </span>
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Synthesize "{searchQuery}"
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                Build a tailored 4-phase curriculum specifically calibrated for "{searchQuery}" with free resources.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 border-t border-emerald-500/20 pt-2.5 gap-1">
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
              onClick={() => onSelectTarget(role.id)}
              className={`p-4 rounded-2xl border transition-all text-left relative cursor-pointer group flex flex-col justify-between min-w-0 shadow-sm ${
                isSelected
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {getCategoryIcon(role.category)}
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 capitalize truncate">
                      {role.category === 'grad_mba' ? 'MBA / GATE' : role.category}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${
                    role.badge === 'High Demand' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20' :
                    role.badge === 'Huge Aspirants' ? 'bg-teal-100 dark:bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-500/20' :
                    role.badge === 'Prestigious' ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20' :
                    'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}>
                    {role.badge}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors break-words">
                  {role.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                  {role.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3 gap-2 flex-wrap">
                <div>
                  Benchmark: <strong className="text-slate-800 dark:text-slate-200">{role.minHours.beginner} hrs</strong>
                  <span className="text-slate-400 ml-1">({role.defaultMonths}m)</span>
                </div>
                {isSelected ? (
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Selected
                  </span>
                ) : (
                  <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 flex items-center transition whitespace-nowrap">
                    Select <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

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

            <form onSubmit={handleCreateCustom} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Target Exam or Job Role Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. RBI Grade B, Embedded Rust Engineer, State PSC, NDA"
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
