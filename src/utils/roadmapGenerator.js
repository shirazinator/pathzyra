/**
 * Dynamically builds a week-by-week actionable roadmap
 * adapting to user hours, working professional schedule, and feasibility.
 */
export function generateRoadmap({
  target,
  feasibility,
  isWorkingProfessional,
  weekdayHours,
  weekendHours,
  fulltimeDailyHours,
  customGoalTitle = ''
}) {
  const totalWeeks = feasibility.weeks;
  const isCrunch = feasibility.status === 'crunch';
  const isUnrealistic = feasibility.status === 'unrealistic';

  // 4 Standard learning phases scaled across available weeks
  // Phase 1: 30%, Phase 2: 30%, Phase 3: 25%, Phase 4: 15%
  const phaseDistribution = [
    { name: 'Phase 1: Foundations & Core Concepts', share: 0.30 },
    { name: 'Phase 2: High-Yield Problem Sets & Practical Application', share: 0.30 },
    { name: 'Phase 3: Advanced Topics, System Integration & Sectional Tests', share: 0.25 },
    { name: 'Phase 4: Full-Length Mocks, Error Analysis & Final Sprint', share: 0.15 },
  ];

  let currentWeek = 1;
  const generatedPhases = [];

  const basePhases = target?.phases || [
    {
      phaseName: 'Phase 1: Core Fundamentals',
      focus: 'Build solid theoretical foundations, syntax, formulas, and baseline understanding',
      weight: 'Tier 1 (Crucial)',
      resources: [
        { name: 'FreeCodeCamp / Official Docs', type: 'Course & Docs', url: 'https://www.freecodecamp.org/', free: true, note: 'Foundational tutorials' }
      ]
    },
    {
      phaseName: 'Phase 2: Practice & Application',
      focus: 'Work through standard problem sets, assignments, and mini-case studies',
      weight: 'Tier 1 (Core)',
      resources: [
        { name: 'Open Problem Repositories', type: 'Practice Platform', url: 'https://github.com/', free: true, note: 'Curated problem banks and solution patterns' }
      ]
    },
    {
      phaseName: 'Phase 3: Projects / Advanced Sectionals',
      focus: 'Build comprehensive portfolio deliverables or take timed sectional tests',
      weight: 'Tier 2 (Differentiator)',
      resources: [
        { name: 'Standard PYQs & Case Studies', type: 'Question Bank', url: 'https://google.com', free: true, note: 'Examine previous year patterns' }
      ]
    },
    {
      phaseName: 'Phase 4: Full-Length Simulation & Polish',
      focus: 'Real-time test simulation, interview behavioral stories, error log review',
      weight: 'Tier 1 (Final Selection)',
      resources: [
        { name: 'Mock Portals & Peer Practice', type: 'Mock Simulation', url: 'https://pramp.com', free: true, note: 'Timed mock environments' }
      ]
    }
  ];

  // Distribute weeks across the 4 phases
  const weeksPerPhase = [];
  let remainingWeeks = totalWeeks;

  for (let i = 0; i < 4; i++) {
    if (i === 3) {
      weeksPerPhase.push(Math.max(1, remainingWeeks));
    } else {
      const allocated = Math.max(1, Math.round(totalWeeks * phaseDistribution[i].share));
      weeksPerPhase.push(allocated);
      remainingWeeks -= allocated;
    }
  }

  // Generate each phase and its weeks
  for (let pIdx = 0; pIdx < 4; pIdx++) {
    const pWeeksCount = weeksPerPhase[pIdx];
    const sourcePhase = basePhases[pIdx] || basePhases[basePhases.length - 1];
    const weeksInThisPhase = [];

    for (let w = 0; w < pWeeksCount; w++) {
      const weekNum = currentWeek++;
      const isMockWeek = weekNum % 2 === 0 || pIdx === 3;
      
      // Determine daily task breakdown based on Working Professional vs Student
      let weekdayGuidance = '';
      let weekendGuidance = '';
      let tasks = [];

      if (isWorkingProfessional) {
        weekdayGuidance = `Mon–Fri: ~${weekdayHours} hrs/evening — Concept videos, targeted flashcards, 2-3 focused problems.`;
        weekendGuidance = `Sat–Sun: ~${weekendHours} hrs/day — Deep work, long problem blocks, revision notes & sectional test.`;
        
        tasks = [
          {
            id: `w${weekNum}_t1`,
            title: `[Mon–Tue] Core Theory: Master ${sourcePhase.focus.split(',')[0] || 'Foundational Topics'}`,
            estimatedHours: weekdayHours * 2,
            type: 'study',
            pareto: 'Tier 1'
          },
          {
            id: `w${weekNum}_t2`,
            title: `[Wed–Thu] Active Practice: 10-15 standard questions or module exercises`,
            estimatedHours: weekdayHours * 2,
            type: 'practice',
            pareto: 'Tier 1'
          },
          {
            id: `w${weekNum}_t3`,
            title: `[Fri] Weekly Catchup & Flashcards Review (Zero Backlog Rule)`,
            estimatedHours: weekdayHours,
            type: 'revision',
            pareto: isCrunch ? 'Optional' : 'Tier 2'
          },
          {
            id: `w${weekNum}_t4`,
            title: isMockWeek 
              ? `[Sat] 🎯 Timed Sectional Test or Mock Exam + Strict 90-min Error Log Analysis` 
              : `[Sat] Deep Synthesis: Build module project / complete 25 complex questions`,
            estimatedHours: weekendHours,
            type: isMockWeek ? 'mock' : 'deepwork',
            pareto: 'Tier 1'
          },
          {
            id: `w${weekNum}_t5`,
            title: `[Sun] Weakness Remediation & Pre-read for upcoming week`,
            estimatedHours: weekendHours,
            type: 'remediation',
            pareto: 'Tier 2'
          }
        ];
      } else {
        // Full-time student
        weekdayGuidance = `Daily: ~${fulltimeDailyHours} hrs structured across Morning (Theory), Afternoon (Practice), and Evening (Revision).`;
        weekendGuidance = `Weekend: Timed mock tests, All-India rank comparison, and error notebook compilation.`;

        tasks = [
          {
            id: `w${weekNum}_t1`,
            title: `Module Mastery: ${sourcePhase.focus.split(',')[0] || 'Core concepts'} & structured note-taking`,
            estimatedHours: fulltimeDailyHours * 2,
            type: 'study',
            pareto: 'Tier 1'
          },
          {
            id: `w${weekNum}_t2`,
            title: `Intensive Problem Sprint: 30-40 categorized problems / chapter exercises`,
            estimatedHours: fulltimeDailyHours * 2,
            type: 'practice',
            pareto: 'Tier 1'
          },
          {
            id: `w${weekNum}_t3`,
            title: isMockWeek
              ? `🎯 Full-Length Timed Mock + 2-Hour Error Log Analysis (Record mistakes in Error Diary)`
              : `Deep Application: Build real-world portfolio component or solve previous 5-year PYQs`,
            estimatedHours: fulltimeDailyHours,
            type: isMockWeek ? 'mock' : 'deepwork',
            pareto: 'Tier 1'
          },
          {
            id: `w${weekNum}_t4`,
            title: `Spaced Repetition: Active recall of formulas, shortcuts & previous week concepts`,
            estimatedHours: fulltimeDailyHours,
            type: 'revision',
            pareto: isCrunch ? 'Optional' : 'Tier 2'
          }
        ];
      }

      // Add special warning if in crunch
      let specialNote = '';
      if (isCrunch) {
        specialNote = '⚡ High-Yield Crunch: Skip Tier 2/3 exercises if running short. Focus 100% on Tier 1 tasks.';
      } else if (pIdx === 3) {
        specialNote = '🏁 Peak Simulation: Never skip test analysis. Analyzing why you got a question wrong is 3x more valuable than taking another test.';
      }

      weeksInThisPhase.push({
        weekNumber: weekNum,
        title: `Week ${weekNum}: ${sourcePhase.phaseName.replace(/Phase \d+: /, '')}`,
        focus: sourcePhase.focus,
        weight: sourcePhase.weight,
        weekdayGuidance,
        weekendGuidance,
        specialNote,
        tasks,
        resources: sourcePhase.resources || []
      });
    }

    generatedPhases.push({
      phaseId: `phase_${pIdx + 1}`,
      phaseNumber: pIdx + 1,
      title: sourcePhase.phaseName,
      focus: sourcePhase.focus,
      weight: sourcePhase.weight,
      weeksCount: pWeeksCount,
      weeks: weeksInThisPhase,
      resources: sourcePhase.resources || []
    });
  }

  return {
    targetId: target?.id || 'custom',
    targetTitle: target?.title || customGoalTitle || 'Custom Goal',
    category: target?.category || 'custom',
    totalWeeks,
    totalAvailableHours: feasibility.totalAvailableHours,
    benchmarkHours: feasibility.benchmarkHours,
    feasibilityScore: feasibility.score,
    feasibilityStatus: feasibility.status,
    phases: generatedPhases
  };
}
