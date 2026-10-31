/**
 * Dynamic Universal Roadmap Generator
 * Instantly synthesizes a complete 4-phase preparation blueprint
 * for ANY search query, role, or exam on earth.
 */

export function generateDynamicTargetFromQuery(rawQuery) {
  const query = rawQuery.trim();
  const lower = query.toLowerCase();

  // Detect domain category
  let category = 'tech';
  let badge = 'Dynamic AI Roadmap';
  let benchmarkHours = 420;
  let defaultMonths = 6;

  const isCyber = lower.includes('cyber') || lower.includes('security') || lower.includes('hack') || lower.includes('pentest') || lower.includes('soc') || lower.includes('infosec');
  const isGovt = lower.includes('upsc') || lower.includes('ssc') || lower.includes('govt') || lower.includes('police') || lower.includes('ias') || lower.includes('ips') || lower.includes('nda') || lower.includes('cds') || lower.includes('rbi') || lower.includes('sebi') || lower.includes('banking') || lower.includes('railway') || lower.includes('psc') || lower.includes('defense') || lower.includes('army');
  const isEntrance = lower.includes('cat') || lower.includes('gate') || lower.includes('jee') || lower.includes('neet') || lower.includes('gre') || lower.includes('gmat') || lower.includes('mba') || lower.includes('clat') || lower.includes('cuet');
  const isDesign = lower.includes('ui') || lower.includes('ux') || lower.includes('design') || lower.includes('figma') || lower.includes('product design');

  if (isCyber) {
    category = 'tech';
    badge = 'Cyber & Infosec';
    benchmarkHours = 460;
  } else if (isGovt) {
    category = 'govt';
    badge = 'Govt & Civil Services';
    benchmarkHours = 600;
    defaultMonths = 8;
  } else if (isEntrance) {
    category = 'grad_mba';
    badge = 'Competitive Entrance';
    benchmarkHours = 480;
  } else if (isDesign) {
    category = 'non_tech';
    badge = 'Design & Creative';
    benchmarkHours = 320;
    defaultMonths = 4;
  } else if (lower.includes('engineer') || lower.includes('developer') || lower.includes('code') || lower.includes('cloud') || lower.includes('data') || lower.includes('ai') || lower.includes('web')) {
    category = 'tech';
    badge = 'High Demand Tech';
    benchmarkHours = 450;
  } else {
    category = 'non_tech';
    badge = 'Professional Track';
    benchmarkHours = 360;
    defaultMonths = 4.5;
  }

  // Format title with clean casing
  const formattedTitle = query
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  // Formulate tailored 4-phase curriculum
  const phases = [
    {
      phaseName: `Phase 1: ${formattedTitle} Core Foundations & Theory`,
      focus: `Master foundational principles, essential terminology, standard syntax/rules, and key mental models for ${formattedTitle}.`,
      weight: 'Tier 1 (Non-negotiable Bedrock)',
      resources: [
        {
          name: `${formattedTitle} Masterclass Playlists & Docs`,
          type: 'Curated Open Course',
          url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' complete course beginner to advanced')}`,
          free: true,
          note: `High-yield video tutorials and foundational documentation for ${formattedTitle}`
        },
        {
          name: `GitHub Awesome ${formattedTitle} Repository`,
          type: 'Curated Study Guide',
          url: `https://github.com/search?q=${encodeURIComponent('awesome ' + query)}`,
          free: true,
          note: `Community-curated cheat sheets, roadmaps, and free books`
        }
      ]
    },
    {
      phaseName: `Phase 2: High-Yield Problem Sets & Practical Application`,
      focus: `Solve core exercises, chapter-wise questions, hands-on labs, and build real-world modules in ${formattedTitle}.`,
      weight: 'Tier 1 (70% Exam/Interview Weightage)',
      resources: [
        {
          name: `Top Interview & Exam Questions for ${formattedTitle}`,
          type: 'Practice Platform',
          url: `https://www.google.com/search?q=${encodeURIComponent(query + ' previous year questions top practice problems')}`,
          free: true,
          note: `Categorized problem patterns frequently tested in top assessments`
        },
        {
          name: `Open Source Case Studies & Exercises`,
          type: 'Interactive Practice',
          url: `https://github.com/search?q=${encodeURIComponent(query + ' practice problems exercises')}`,
          free: true,
          note: `Hands-on problem sets with community solutions`
        }
      ]
    },
    {
      phaseName: `Phase 3: Advanced Case Studies & Sectional Timed Practice`,
      focus: `Tackle complex scenarios, full-scale portfolio deliverables, speed enhancement, and sectional timed assessments.`,
      weight: 'Tier 2 (Differentiator & Rank Decider)',
      resources: [
        {
          name: `Advanced Architecture & Depth Guide`,
          type: 'Deep-Dive Guide',
          url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' advanced concepts real world system')}`,
          free: true,
          note: `Deep conceptual clarity on edge cases and advanced techniques`
        }
      ]
    },
    {
      phaseName: `Phase 4: Full-Length Mocks, Error Analysis & Final Sprint`,
      focus: `Execute full-length timed mock tests, rigorous error diary review, speed refinement, and interview/exam simulation.`,
      weight: 'Tier 1 (Selection & Clearing Round)',
      resources: [
        {
          name: `Mock Assessments & Real-Time Simulation Portals`,
          type: 'Timed Mocks',
          url: `https://www.google.com/search?q=${encodeURIComponent(query + ' free mock tests assessment simulation')}`,
          free: true,
          note: `Simulate the exact pressure, time constraints, and environment of exam day`
        }
      ]
    }
  ];

  return {
    id: `dynamic_${encodeURIComponent(lower).replace(/[^a-zA-Z0-9]/g, '_')}`,
    category,
    title: formattedTitle,
    badge,
    description: `Complete, tailored 4-phase preparation roadmap for ${formattedTitle} with calibrated study benchmarks, weekly execution checklists, and free curated resources.`,
    minHours: {
      beginner: benchmarkHours,
      intermediate: Math.round(benchmarkHours * 0.55),
      advanced: Math.round(benchmarkHours * 0.3)
    },
    defaultMonths,
    phases
  };
}
