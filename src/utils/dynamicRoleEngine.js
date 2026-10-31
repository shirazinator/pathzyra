/**
 * Dynamic Universal Roadmap Engine
 * Deeply adapts to ANY custom target or search query (Data Analytics, Data Science,
 * Hacker / Cybersecurity, Full Stack, Cloud, Mobile, Competitive Exams, etc.)
 * Synthesizes concrete 4-phase blueprints with real, gold-standard, 100% free learning resources.
 */

export function generateDynamicTargetFromQuery(rawQuery) {
  const query = (rawQuery || '').trim();
  if (!query) {
    return null;
  }
  const lower = query.toLowerCase();

  // Formatted title with proper capitalization
  const formattedTitle = query
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  // Domain 1: Cybersecurity / Ethical Hacking / Pentesting / Infosec / SOC
  if (
    lower.includes('cyber') || 
    lower.includes('security') || 
    lower.includes('hack') || 
    lower.includes('pentest') || 
    lower.includes('soc') || 
    lower.includes('infosec') || 
    lower.includes('bug bounty') ||
    lower.includes('ctf')
  ) {
    return {
      id: `dynamic_${encodeURIComponent(lower).replace(/[^a-zA-Z0-9]/g, '_')}`,
      category: 'tech',
      title: formattedTitle.includes('Cyber') || formattedTitle.includes('Security') || formattedTitle.includes('Hack')
        ? formattedTitle
        : `${formattedTitle} (Cybersecurity & Ethical Hacking Track)`,
      badge: 'Cyber & Infosec',
      description: `Hyper-focused 4-phase preparation track for ${formattedTitle}: Network Security, Linux, Web Pentesting (OWASP Top 10), Privilege Escalation, and SIEM / SOC defense.`,
      minHours: { beginner: 480, intermediate: 270, advanced: 130 },
      defaultMonths: 6,
      phases: [
        {
          phaseName: 'Phase 1: Networking Protocols, Linux Mastery & Security Scripting',
          focus: 'OSI Model, TCP/IP, Subnetting, Wireshark packet capture, Linux CLI administration, Bash & Python for security automation',
          weight: 'Tier 1 (Non-negotiable Bedrock)',
          resources: [
            { name: 'OverTheWire: Bandit (Free Linux Wargame)', type: 'Interactive CTF Lab', url: 'https://overthewire.org/wargames/bandit/', free: true, note: 'Gamified Linux command line mastery from scratch' },
            { name: "Professor Messer's CompTIA Security+ Training", type: 'Video Course', url: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-training-course/', free: true, note: 'World standard free video series for security foundations' },
            { name: 'NetworkChuck - Networking for Hackers', type: 'YouTube Series', url: 'https://www.youtube.com/@NetworkChuck', free: true, note: 'Visual breakdowns of routing, DNS, and TCP/IP handshakes' }
          ]
        },
        {
          phaseName: 'Phase 2: Web Application Security & OWASP Top 10 Pentesting',
          focus: 'Reconnaissance (Nmap, Gobuster), OWASP Top 10 (SQLi, XSS, CSRF, SSRF, IDOR), Burp Suite Proxy, and vulnerability assessment',
          weight: 'Tier 1 (Core Interview Weightage)',
          resources: [
            { name: 'PortSwigger Web Security Academy', type: 'Interactive Labs & Theory', url: 'https://portswigger.net/web-security', free: true, note: 'Free interactive labs by creators of Burp Suite (industry gold standard)' },
            { name: 'TryHackMe: Free Beginner & Pre-Security Paths', type: 'Browser Labs', url: 'https://tryhackme.com/', free: true, note: 'Hands-on virtual machines teaching real ethical hacking' },
            { name: 'OWASP Top 10 Official Documentation & Cheatsheets', type: 'Reference Standard', url: 'https://owasp.org/www-project-top-ten/', free: true, note: 'Authoritative vulnerability classifications and mitigations' }
          ]
        },
        {
          phaseName: 'Phase 3: System Penetration, Privilege Escalation & Active Directory',
          focus: 'Windows & Linux privilege escalation (LinPEAS, WinPEAS), Metasploit, Active Directory basics, Hash cracking (Hashcat/John)',
          weight: 'Tier 2 (High-Value Technical Depth)',
          resources: [
            { name: 'Hack The Box - Starting Point (Free Labs)', type: 'CTF Machines', url: 'https://www.hackthebox.com/hacker/starting-point', free: true, note: 'Guided vulnerable lab machines with detailed writeups' },
            { name: 'TCM Security - Practical Ethical Hacking Free Modules', type: 'YouTube Course', url: 'https://www.youtube.com/@TheCyberMentor', free: true, note: 'Ethical hacking methodologies and real penetration testing demos' }
          ]
        },
        {
          phaseName: 'Phase 4: SOC Operations, SIEM (Splunk), Incident Response & CTFs',
          focus: 'SIEM log analysis (Splunk/Wazuh), Incident Response (NIST framework), Threat Intelligence, Blue Team defense, and technical mock interviews',
          weight: 'Tier 1 (Job Offer Round)',
          resources: [
            { name: 'Splunk Free Training & Search Tutorial', type: 'Official Free Labs', url: 'https://www.splunk.com/en_us/training/free-courses/overview.html', free: true, note: 'Learn log ingestion, SPL queries, and alert dashboard creation' },
            { name: 'LetsDefend - Blue Team SOC Analyst Simulator', type: 'Interactive SOC Platform', url: 'https://letsdefend.io/', free: true, note: 'Free simulated SOC analyst alerts and investigation playbooks' }
          ]
        }
      ]
    };
  }

  // Domain 2: Data Analytics / Business Intelligence / Power BI / SQL
  if (
    lower.includes('analyst') || 
    lower.includes('analytics') || 
    lower.includes('bi') || 
    lower.includes('power bi') || 
    lower.includes('tableau') || 
    lower.includes('excel') ||
    lower.includes('business intelligence')
  ) {
    return {
      id: `dynamic_${encodeURIComponent(lower).replace(/[^a-zA-Z0-9]/g, '_')}`,
      category: 'non_tech',
      title: formattedTitle.includes('Analyst') || formattedTitle.includes('Analytics') ? formattedTitle : `${formattedTitle} (Data Analytics & BI Track)`,
      badge: 'High Transition',
      description: `Structured preparation track for ${formattedTitle}: Advanced Excel modeling, Production SQL queries, Power BI / Tableau dashboards, and Python EDA.`,
      minHours: { beginner: 340, intermediate: 180, advanced: 90 },
      defaultMonths: 4,
      phases: [
        {
          phaseName: 'Phase 1: Advanced Excel & Business Problem Solving',
          focus: 'Pivot tables, XLOOKUP, Index-Match, conditional formatting, dynamic arrays, building executive KPI summary dashboards',
          weight: 'Tier 1 (Corporate Foundation)',
          resources: [
            { name: 'Chandoo - Excel & Power BI Masterclass', type: 'YouTube Channel', url: 'https://www.youtube.com/@chandoo_', free: true, note: 'Clear visual lessons on modern Excel features and dashboarding' },
            { name: 'SQLBolt - Learn SQL Interactively', type: 'Interactive Platform', url: 'https://sqlbolt.com/', free: true, note: 'Hands-on practice for SQL queries, joins, and filters' }
          ]
        },
        {
          phaseName: 'Phase 2: Production SQL for Enterprise Analytics',
          focus: 'Window functions (RANK, ROW_NUMBER, DENSE_RANK), Common Table Expressions (CTEs), Subqueries, Date aggregations, CASE WHEN statements',
          weight: 'Tier 1 (Interview Filter)',
          resources: [
            { name: 'Alex The Analyst - Data Analyst Bootcamp', type: 'YouTube Series', url: 'https://www.youtube.com/@AlexTheAnalyst', free: true, note: 'Complete free guided path from Excel to SQL and Power BI' },
            { name: 'Mode Analytics SQL School', type: 'Interactive Guide', url: 'https://mode.com/sql-tutorial/', free: true, note: 'Real enterprise business case SQL questions' }
          ]
        },
        {
          phaseName: 'Phase 3: Interactive Dashboards (Power BI / Tableau)',
          focus: 'DAX measures, Star schema data modeling, drill-down interactions, executive storytelling, automated data refreshes',
          weight: 'Tier 1 (Portfolio Showcase)',
          resources: [
            { name: 'Maven Analytics Free Project Datasets', type: 'Open Datasets', url: 'https://mavenanalytics.io/data-playground', free: true, note: 'Enterprise datasets (Retail, Healthcare, Tech) for standout case studies' },
            { name: 'Microsoft Learn Free Power BI Path', type: 'Official Certification Course', url: 'https://learn.microsoft.com/en-us/training/powerplatform/power-bi', free: true, note: 'Official guided modules with sandbox exercises' }
          ]
        },
        {
          phaseName: 'Phase 4: Python for EDA & 3 Standout Portfolio Projects',
          focus: 'Pandas exploratory data analysis, Seaborn/Matplotlib charts, publishing GitHub case studies, and business stakeholder presentation practice',
          weight: 'Tier 1 (Hiring Proof)',
          resources: [
            { name: 'Kaggle Datasets & Public Notebooks', type: 'Portfolio Platform', url: 'https://www.kaggle.com/datasets', free: true, note: 'Host and share reproducible data analytics work' }
          ]
        }
      ]
    };
  }

  // Domain 3: Data Science / AI / Machine Learning / Deep Learning / LLM
  if (
    lower.includes('data sci') || 
    lower.includes('machine learning') || 
    lower.includes('ai') || 
    lower.includes('ml') || 
    lower.includes('deep learning') || 
    lower.includes('neural') || 
    lower.includes('llm') || 
    lower.includes('genai') || 
    lower.includes('generative ai')
  ) {
    return {
      id: `dynamic_${encodeURIComponent(lower).replace(/[^a-zA-Z0-9]/g, '_')}`,
      category: 'tech',
      title: formattedTitle.includes('Data') || formattedTitle.includes('AI') || formattedTitle.includes('ML') ? formattedTitle : `${formattedTitle} (Data Science & AI / ML Track)`,
      badge: 'Trending & High Pay',
      description: `Comprehensive roadmap for ${formattedTitle}: Math foundations, Classical Machine Learning, Deep Learning (PyTorch), LLMs, and Production MLOps.`,
      minHours: { beginner: 520, intermediate: 300, advanced: 150 },
      defaultMonths: 6,
      phases: [
        {
          phaseName: 'Phase 1: Math Foundations & Python for Data Science',
          focus: 'Linear Algebra (vectors, matrices, eigenvalues), Probability & Statistics, NumPy, Pandas, Matplotlib, SQL queries',
          weight: 'Tier 1 (Non-negotiable)',
          resources: [
            { name: '3Blue1Brown - Essence of Linear Algebra', type: 'YouTube Series', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', free: true, note: 'Geometric visual understanding of vector spaces & transformations' },
            { name: 'StatQuest with Josh Starmer', type: 'YouTube Channel', url: 'https://www.youtube.com/@statquest', free: true, note: 'Intuitive breakdowns of statistical distributions and p-values' }
          ]
        },
        {
          phaseName: 'Phase 2: Classical Machine Learning & Scikit-Learn',
          focus: 'Regression, Classification, Decision Trees, Random Forests, XGBoost/LightGBM, Hyperparameter tuning, Cross-validation',
          weight: 'Tier 1 (Core ML)',
          resources: [
            { name: 'Krish Naik Complete Machine Learning Playlist', type: 'YouTube Playlist', url: 'https://www.youtube.com/@krishnaik06', free: true, note: 'End-to-end Python ML tutorials with industry project examples' },
            { name: 'Kaggle Learn Free Micro-Courses', type: 'Hands-on Labs', url: 'https://www.kaggle.com/learn', free: true, note: 'Interactive Jupyter notebooks with immediate automated feedback' }
          ]
        },
        {
          phaseName: 'Phase 3: Deep Learning, PyTorch & Generative AI / LLMs',
          focus: 'Neural Networks, CNNs, Transformers architecture, Fine-Tuning open-source LLMs, LangChain/LlamaIndex, Vector databases (Chroma/Pinecone)',
          weight: 'Tier 2 (Modern Differentiation)',
          resources: [
            { name: 'Andrej Karpathy - Neural Networks: Zero to Hero', type: 'YouTube Series', url: 'https://www.youtube.com/@AndrejKarpathy', free: true, note: 'Build GPT and backpropagation from scratch with former Tesla AI Director' },
            { name: 'Fast.ai - Practical Deep Learning for Coders', type: 'Free Full Course', url: 'https://course.fast.ai/', free: true, note: 'Top-down pragmatic deep learning curriculum' }
          ]
        },
        {
          phaseName: 'Phase 4: MLOps, Model Serving & Deployment',
          focus: 'FastAPI model endpoints, Docker containerization, Streamlit demos, MLflow tracking, deploying on HuggingFace Spaces & AWS',
          weight: 'Tier 1 (Job Offer Key)',
          resources: [
            { name: 'Made With ML (Goku Mohandas)', type: 'Open Source Guide', url: 'https://madewithml.com/', free: true, note: 'Production MLOps from clean code architecture to CI/CD pipelines' },
            { name: 'Hugging Face Free NLP & Audio Courses', type: 'Course & Labs', url: 'https://huggingface.co/learn', free: true, note: 'Hands-on transformer architectures and pipelines' }
          ]
        }
      ]
    };
  }

  // Domain 4: Software Engineering / FAANG / Backend / Web Development
  if (
    lower.includes('sde') || 
    lower.includes('software') || 
    lower.includes('backend') || 
    lower.includes('full stack') || 
    lower.includes('developer') || 
    lower.includes('dsa') || 
    lower.includes('coding') || 
    lower.includes('java') || 
    lower.includes('python') || 
    lower.includes('cpp') || 
    lower.includes('c++') || 
    lower.includes('rust') || 
    lower.includes('golang')
  ) {
    return {
      id: `dynamic_${encodeURIComponent(lower).replace(/[^a-zA-Z0-9]/g, '_')}`,
      category: 'tech',
      title: formattedTitle.includes('Engineer') || formattedTitle.includes('Developer') ? formattedTitle : `${formattedTitle} (Software Engineering Track)`,
      badge: 'High Demand Tech',
      description: `End-to-end preparation track for ${formattedTitle}: Data Structures & Algorithms, System Design, Core CS (OS/DBMS/CN), and Production Projects.`,
      minHours: { beginner: 500, intermediate: 280, advanced: 140 },
      defaultMonths: 6,
      phases: [
        {
          phaseName: `Phase 1: Language Syntax Mastery & Core Data Structures`,
          focus: `C++ / Java / Python / ${formattedTitle} syntax, Time & Space Complexity, Arrays, Strings, Hashmaps, Two Pointers, Recursion`,
          weight: 'Tier 1 (High Yield)',
          resources: [
            { name: "Striver's A2Z DSA Course & Sheet", type: 'Course & Sheet', url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', free: true, note: 'Gold standard for Indian tech interview preparation' },
            { name: 'NeetCode 150 Pattern-Based Roadmap', type: 'Curated Sheet & Videos', url: 'https://neetcode.io/roadmap', free: true, note: 'Categorized pattern-based problem solving' },
            { name: 'Abdul Bari Algorithms Playlist', type: 'YouTube Playlist', url: 'https://www.youtube.com/@abdul_bari', free: true, note: 'Best visual explanations of asymptotic notation and algorithms' }
          ]
        },
        {
          phaseName: 'Phase 2: Advanced DSA & Core Computer Science',
          focus: 'Trees, Graphs, Dynamic Programming, Heap/Greedy, Operating Systems, DBMS, Computer Networks, SQL',
          weight: 'Tier 1 (Crucial)',
          resources: [
            { name: 'Gate Smashers (OS, DBMS & Networks)', type: 'YouTube Playlist', url: 'https://www.youtube.com/@GateSmashers', free: true, note: 'Bite-sized high-yield revision for core CS subjects' },
            { name: 'LeetCode Free Top Interview 150', type: 'Practice Platform', url: 'https://leetcode.com/problemset/all/', free: true, note: 'Timed problem solving practice under pressure' }
          ]
        },
        {
          phaseName: 'Phase 3: Production Project & Low-Level Design (LLD)',
          focus: 'Building 1-2 end-to-end full stack apps (Auth, Caching, DB indexing, Docker), OOP design patterns',
          weight: 'Tier 2 (Resume & Machine Coding)',
          resources: [
            { name: 'Full Stack Open (University of Helsinki)', type: 'Interactive Course', url: 'https://fullstackopen.com/en/', free: true, note: 'Modern full stack React, Node, Express, MongoDB, TypeScript' },
            { name: 'Refactoring Guru - Design Patterns', type: 'Reference Guide', url: 'https://refactoring.guru/design-patterns', free: true, note: 'Visual diagrams of Factory, Strategy, and Observer patterns' }
          ]
        },
        {
          phaseName: 'Phase 4: High-Level System Design & Mock Interviews',
          focus: 'Scalability, Load balancers, Caching (Redis), Database sharding, PRAMA behavioral stories',
          weight: 'Tier 1 (Final Rounds)',
          resources: [
            { name: 'Gaurav Sen System Design Playlist', type: 'YouTube Playlist', url: 'https://www.youtube.com/@gkcs', free: true, note: 'Foundational distributed systems concepts' },
            { name: 'ByteByteGo Free Articles & Newsletter', type: 'Visual Guide', url: 'https://bytebytego.com/', free: true, note: 'Architectural diagrams of YouTube, Uber, Twitter' },
            { name: 'Pramp Free Peer Mocks', type: 'Live Mocks', url: 'https://www.pramp.com/', free: true, note: 'Free peer-to-peer technical mock interviews' }
          ]
        }
      ]
    };
  }

  // Domain 5: Government & Civil Services (India)
  if (
    lower.includes('upsc') || 
    lower.includes('ssc') || 
    lower.includes('govt') || 
    lower.includes('ias') || 
    lower.includes('ips') || 
    lower.includes('nda') || 
    lower.includes('cds') || 
    lower.includes('rbi') || 
    lower.includes('banking') || 
    lower.includes('railway') || 
    lower.includes('psc') || 
    lower.includes('defense')
  ) {
    return {
      id: `dynamic_${encodeURIComponent(lower).replace(/[^a-zA-Z0-9]/g, '_')}`,
      category: 'govt',
      title: formattedTitle.includes('Exam') || formattedTitle.includes('UPSC') || formattedTitle.includes('SSC') ? formattedTitle : `${formattedTitle} (Govt & Civil Services Track)`,
      badge: 'Huge Aspirants',
      description: `Calibrated exam preparation roadmap for ${formattedTitle}: Standard syllabus breakdown, high-yield subject blocks, PYQ mastery, and full-length timed mocks.`,
      minHours: { beginner: 700, intermediate: 400, advanced: 200 },
      defaultMonths: 8,
      phases: [
        {
          phaseName: 'Phase 1: Standard Foundations, Concepts & Grammar Rules',
          focus: 'Core quantitative aptitude / CSAT, fundamental grammar rules, static syllabus coverage, and daily newspaper analysis',
          weight: 'Tier 1 (70% Weightage)',
          resources: [
            { name: 'Official Notification & Syllabus Blueprint', type: 'Official Portal', url: 'https://google.com/search?q=' + encodeURIComponent(query + ' official syllabus pdf'), free: true, note: 'Decode official mark weightage and negative marking pattern' },
            { name: 'Subject-wise Free Masterclasses', type: 'YouTube Playlists', url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query + ' complete syllabus playlist'), free: true, note: 'Free conceptual classes by top faculty' }
          ]
        },
        {
          phaseName: 'Phase 2: Chapter-wise PYQ Grinding & Speed Shortcuts',
          focus: 'Past 5 years previous year questions (PYQs), formula notebooks, speed calculation tricks, and topic-wise sectional tests',
          weight: 'Tier 1 (Rank Decider)',
          resources: [
            { name: 'Previous Year Question Papers Repository', type: 'PYQ Archive', url: 'https://www.google.com/search?q=' + encodeURIComponent(query + ' previous year questions pdf solutions'), free: true, note: 'Practice actual exam question patterns' }
          ]
        },
        {
          phaseName: 'Phase 3: General Awareness, Current Affairs & Analytical Revision',
          focus: 'Last 8 months current affairs compilation, high-yield static GK topics, analytical answer writing / descriptive paper prep',
          weight: 'Tier 2 (Score Booster)',
          resources: [
            { name: 'Monthly Current Affairs Compilation', type: 'PDF & Video', url: 'https://affairscloud.com/', free: true, note: 'Targeted monthly current affairs magazines' }
          ]
        },
        {
          phaseName: 'Phase 4: Full-Length Timed Mocks & Error Diary Review',
          focus: '20+ Full-length timed mock tests under strict exam conditions, negative mark elimination, and speed calibration',
          weight: 'Tier 1 (Final Selection Factor)',
          resources: [
            { name: 'Testbook / Oliveboard Free All-India Live Mocks', type: 'Mock Portal', url: 'https://testbook.com/', free: true, note: 'Real exam UI with All-India percentile ranking' }
          ]
        }
      ]
    };
  }

  // Universal Dynamic Fallback for ANY OTHER Query
  return {
    id: `dynamic_${encodeURIComponent(lower).replace(/[^a-zA-Z0-9]/g, '_')}`,
    category: 'tech',
    title: formattedTitle,
    badge: 'Universal AI Blueprint',
    description: `Complete, calibrated 4-phase preparation roadmap for ${formattedTitle} with structured weekly milestones, honest feasibility benchmarks, and curated free resources.`,
    minHours: { beginner: 420, intermediate: 240, advanced: 120 },
    defaultMonths: 5,
    phases: [
      {
        phaseName: `Phase 1: ${formattedTitle} Fundamentals & Core Syntax/Theory`,
        focus: `Master foundational principles, essential terminology, standard syntax/rules, and key mental models for ${formattedTitle}.`,
        weight: 'Tier 1 (Non-negotiable Bedrock)',
        resources: [
          {
            name: `${formattedTitle} Masterclass Tutorials & Docs`,
            type: 'Curated Open Course',
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' complete course beginner to advanced')}`,
            free: true,
            note: `Top-rated video series and official documentation for ${formattedTitle}`
          },
          {
            name: `GitHub Awesome ${formattedTitle} List`,
            type: 'Curated Resource Hub',
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
            name: `Top Interview & Exam Problems for ${formattedTitle}`,
            type: 'Practice Platform',
            url: `https://www.google.com/search?q=${encodeURIComponent(query + ' top practice questions exercises')}`,
            free: true,
            note: `Categorized problem patterns frequently tested in top assessments`
          }
        ]
      },
      {
        phaseName: `Phase 3: Advanced Topics, Architecture & Sectional Tests`,
        focus: `Tackle complex scenarios, full-scale portfolio deliverables, speed enhancement, and sectional timed assessments in ${formattedTitle}.`,
        weight: 'Tier 2 (Differentiator & Rank Decider)',
        resources: [
          {
            name: `Advanced Case Studies & Production Guides`,
            type: 'Deep-Dive Guide',
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' advanced concepts real world')}`,
            free: true,
            note: `Deep conceptual clarity on edge cases and advanced architecture`
          }
        ]
      },
      {
        phaseName: `Phase 4: Full-Length Mocks, Error Analysis & Final Sprint`,
        focus: `Execute full-length timed mock tests, rigorous error diary review, speed refinement, and interview/exam simulation for ${formattedTitle}.`,
        weight: 'Tier 1 (Final Selection Round)',
        resources: [
          {
            name: `Mock Assessments & Real-Time Simulation Portals`,
            type: 'Timed Mocks',
            url: `https://www.google.com/search?q=${encodeURIComponent(query + ' free mock tests assessment')}`,
            free: true,
            note: `Simulate the exact pressure, time constraints, and environment of exam/interview day`
          }
        ]
      }
    ]
  };
}
