/**
 * Calculates user's study capacity and evaluates feasibility against benchmarks.
 */
export function calculateFeasibility({
  target,
  baselineLevel = 'beginner', // 'beginner' | 'intermediate' | 'advanced'
  durationMonths = 6,
  isWorkingProfessional = true,
  weekdayHours = 2,
  weekendHours = 6,
  fulltimeDailyHours = 6,
  customBenchmarkHours = null
}) {
  const weeks = Math.max(1, Math.round(durationMonths * 4.33));
  const days = Math.round(durationMonths * 30.4);

  // Compute total available hours
  let weeklyHours = 0;
  if (isWorkingProfessional) {
    weeklyHours = (weekdayHours * 5) + (weekendHours * 2);
  } else {
    // 6 study days + 1 rest/light revision day
    weeklyHours = fulltimeDailyHours * 6.5;
  }

  const totalAvailableHours = Math.round(weeks * weeklyHours);

  // Get benchmark hours
  let benchmarkHours = 400; // default fallback
  if (customBenchmarkHours) {
    benchmarkHours = customBenchmarkHours;
  } else if (target && target.minHours) {
    benchmarkHours = target.minHours[baselineLevel] || target.minHours.beginner;
  }

  // Calculate ratio & feasibility score
  const ratio = totalAvailableHours / benchmarkHours;
  const score = Math.min(100, Math.round(ratio * 100));

  let status = 'realistic'; // 'realistic' | 'crunch' | 'unrealistic'
  let verdictTitle = 'Highly Feasible & Sustainable';
  let verdictDescription = 'You have sufficient hours to master concepts, complete all high-yield problem sets, and practice full-length timed mocks without burnout.';

  if (ratio >= 0.85) {
    status = 'realistic';
    verdictTitle = 'Highly Feasible & High Success Probability';
    verdictDescription = 'Your time budget aligns well with the syllabus depth. You have ample room for iterative revisions, mock analysis, and portfolio projects.';
  } else if (ratio >= 0.52) {
    status = 'crunch';
    verdictTitle = 'Intense Crunch — Strict Pareto 80/20 Required';
    verdictDescription = 'Achievable only with high discipline. You will need to skip low-weightage topics and focus strictly on high-yield questions and rapid mock testing.';
  } else {
    status = 'unrealistic';
    verdictTitle = 'Severe Feasibility Warning — High Failure & Burnout Risk';
    verdictDescription = `You have budgeted ${totalAvailableHours} hours, but master-level readiness for this role typically requires at least ~${benchmarkHours} focused hours for a ${baselineLevel} candidate.`;
  }

  // Calculate realistic alternatives
  // Alternative A: Keep the same daily study hours, but extend the duration in months
  const recommendedMonths = Math.max(
    1,
    Math.ceil((benchmarkHours / (weeklyHours || 1)) / 4.33 * 10) / 10
  );

  // Alternative B: Keep the same timeframe (months), but increase daily hours
  const neededWeeklyHours = Math.round(benchmarkHours / weeks);
  const neededDailyAvgHours = Math.round((benchmarkHours / days) * 10) / 10;

  // Specific consequences if unrealistic
  const consequences = [
    {
      title: 'Zero Runway for Timed Mock Tests',
      detail: '80% of candidates who fail do so not because of theory, but because they never practiced solving under real timed pressure.'
    },
    {
      title: 'Superficial Retention (<35%)',
      detail: 'Cramming massive syllabi without spaced repetition results in forgetting key formulas, syntax, and problem-solving patterns during tests.'
    },
    {
      title: 'High Burnout by Week 3',
      detail: 'Unrealistic schedules lead to missed days, mounting psychological guilt, and abandoning preparation entirely.'
    },
    {
      title: 'OA & First Round Screening Elimination',
      detail: 'Company tests (HackerRank, CAT, SSC Tier 1) have strict cutoffs that require speed, which only develops through sufficient hours of repetition.'
    }
  ];

  return {
    weeks,
    days,
    weeklyHours: Math.round(weeklyHours),
    totalAvailableHours,
    benchmarkHours,
    ratio,
    score,
    status,
    verdictTitle,
    verdictDescription,
    consequences,
    recommendations: {
      healthyMonths: Math.max(durationMonths + 1, Math.ceil(recommendedMonths)),
      neededDailyAvgHours: neededDailyAvgHours > 12 ? '> 12 hrs (Inhuman)' : `${neededDailyAvgHours} hrs/day`,
      recommendedWeeklyHours: neededWeeklyHours
    }
  };
}
