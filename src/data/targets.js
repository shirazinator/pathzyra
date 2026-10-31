export const TARGET_CATEGORIES = [
  { id: 'tech', label: 'Tech & Engineering', icon: 'Code2' },
  { id: 'govt', label: 'Govt & Civil Services (India)', icon: 'ShieldCheck' },
  { id: 'grad_mba', label: 'MBA & Higher Entrance', icon: 'GraduationCap' },
  { id: 'non_tech', label: 'Business & Non-Tech Roles', icon: 'Briefcase' }
];

export const TARGET_ROLES = [
  // --- TECH ROLES ---
  {
    id: 'sde_faang',
    category: 'tech',
    title: 'Software Engineer (SDE-1 / Product & FAANG)',
    badge: 'High Demand',
    keywords: ['sde', 'software engineer', 'faang', 'backend', 'java', 'cpp', 'c++', 'python', 'dsa', 'leetcode', 'algorithms', 'coding', 'web development'],
    description: 'Data Structures & Algorithms, System Design basics, Core CS (OS, DBMS, CN), and scalable full-stack projects.',
    minHours: { beginner: 500, intermediate: 280, advanced: 140 },
    defaultMonths: 6,
    benchmarks: {
      dsaProblems: 250,
      systemDesignProjects: 2,
      mockInterviews: 8
    },
    phases: [
      {
        phaseName: 'Phase 1: Language Mastery & Core Data Structures',
        focus: 'C++ / Java / Python syntax, Complexity analysis, Arrays, Strings, Hashmaps, Recursion',
        weight: 'Tier 1 (High Yield)',
        resources: [
          { name: "Striver's A2Z DSA Course & Sheet", type: 'Course & Sheet', url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', free: true, note: 'Gold standard for Indian tech interview prep' },
          { name: 'NeetCode 150 & Roadmap', type: 'Curated Sheet & Videos', url: 'https://neetcode.io/roadmap', free: true, note: 'Categorized pattern-based problem solving' },
          { name: 'Abdul Bari Algorithms Playlist', type: 'YouTube Playlist', url: 'https://www.youtube.com/@abdul_bari', free: true, note: 'Best visual explanations of asymptotic notation and algorithms' }
        ]
      },
      {
        phaseName: 'Phase 2: Advanced DSA & Core Computer Science',
        focus: 'Trees, Graphs, Dynamic Programming, Heap/Greedy, OS, DBMS, Computer Networks, SQL',
        weight: 'Tier 1 (Crucial)',
        resources: [
          { name: 'Gate Smashers (OS & DBMS)', type: 'YouTube Playlist', url: 'https://www.youtube.com/@GateSmashers', free: true, note: 'Bite-sized revision for core CS subjects' },
          { name: 'LeetCode Free Top Interview 150', type: 'Practice Platform', url: 'https://leetcode.com/problemset/all/', free: true, note: 'Timed problem solving practice' }
        ]
      },
      {
        phaseName: 'Phase 3: Production Project & Low-Level Design (LLD)',
        focus: 'Building 1-2 end-to-end full stack apps (Auth, Caching, DB indexing, Docker), OOP design patterns',
        weight: 'Tier 2 (Resume & Machine Coding)',
        resources: [
          { name: 'Full Stack Open (University of Helsinki)', type: 'Interactive Course', url: 'https://fullstackopen.com/en/', free: true, note: 'Modern full stack React, Node, Express, MongoDB, TypeScript' },
          { name: 'Refactoring Guru - Design Patterns', type: 'Reference Guide', url: 'https://refactoring.guru/design-patterns', free: true, note: 'Clean visual diagrams of Factory, Strategy, Observer patterns' }
        ]
      },
      {
        phaseName: 'Phase 4: High-Level System Design & Mock Interviews',
        focus: 'Scalability, Load balancers, Caching (Redis), Database sharding, PRAMA behavioral stories',
        weight: 'Tier 1 (Final Rounds)',
        resources: [
          { name: 'Gaurav Sen System Design Playlist', type: 'YouTube Playlist', url: 'https://www.youtube.com/@gkcs', free: true, note: 'Foundational distributed systems concepts' },
          { name: 'ByteByteGo Free Articles & Newsletter', type: 'Visual Guide', url: 'https://bytebytego.com/', free: true, note: 'Architectural diagrams of YouTube, Uber, Twitter' },
          { name: 'Pramp / Interviewing.io Free Peer Mocks', type: 'Live Mocks', url: 'https://www.pramp.com/', free: true, note: 'Free peer-to-peer technical mock interviews' }
        ]
      }
    ]
  },
  {
    id: 'data_science',
    category: 'tech',
    title: 'Data Scientist & AI / ML Engineer',
    badge: 'Trending',
    keywords: ['data science', 'ai', 'artificial intelligence', 'ml', 'machine learning', 'deep learning', 'nlp', 'llm', 'python', 'genai', 'generative ai', 'pytorch', 'prompt engineering'],
    description: 'Python, Mathematics (Linear Algebra, Calculus, Stats), Classical ML, Deep Learning & LLM prompt engineering.',
    minHours: { beginner: 520, intermediate: 300, advanced: 160 },
    defaultMonths: 6,
    phases: [
      {
        phaseName: 'Phase 1: Math Foundations & Python for Data',
        focus: 'Linear Algebra, Probability & Stats, NumPy, Pandas, Matplotlib, SQL queries',
        weight: 'Tier 1 (Non-negotiable)',
        resources: [
          { name: '3Blue1Brown - Essence of Linear Algebra', type: 'YouTube Series', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', free: true, note: 'Intuitive geometric understanding of vectors & matrices' },
          { name: 'StatQuest with Josh Starmer', type: 'YouTube Channel', url: 'https://www.youtube.com/@statquest', free: true, note: 'Clear explanations of statistical testing and distributions' },
          { name: 'SQLBolt - Learn SQL Interactively', type: 'Interactive Platform', url: 'https://sqlbolt.com/', free: true, note: 'Hands-on practice for SQL joins, aggregations, and subqueries' }
        ]
      },
      {
        phaseName: 'Phase 2: Classical Machine Learning & Scikit-Learn',
        focus: 'Regression, Classification, Decision Trees, Random Forests, XGBoost, Hyperparameter Tuning',
        weight: 'Tier 1 (Core)',
        resources: [
          { name: 'Krish Naik Complete ML Playlist', type: 'YouTube Playlist', url: 'https://www.youtube.com/@krishnaik06', free: true, note: 'Practical end-to-end Python ML tutorials' },
          { name: 'Kaggle Learn Free Micro-Courses', type: 'Hands-on Labs', url: 'https://www.kaggle.com/learn', free: true, note: 'Interactive Jupyter notebooks with immediate feedback' }
        ]
      },
      {
        phaseName: 'Phase 3: Deep Learning, PyTorch & Generative AI',
        focus: 'Neural Networks, CNNs, Transformers, Fine-Tuning LLMs, LangChain/LlamaIndex',
        weight: 'Tier 2 (Modern Differentiation)',
        resources: [
          { name: 'Fast.ai - Practical Deep Learning for Coders', type: 'Free Full Course', url: 'https://course.fast.ai/', free: true, note: 'Top-down pragmatic deep learning curriculum' },
          { name: 'Andrej Karpathy - Neural Networks: Zero to Hero', type: 'YouTube Series', url: 'https://www.youtube.com/@AndrejKarpathy', free: true, note: 'Build GPT from scratch with former Tesla AI Director' }
        ]
      },
      {
        phaseName: 'Phase 4: Deployment & Portfolio Case Studies',
        focus: 'FastAPI, Docker, Streamlit apps, MLflow, Deploying models on HuggingFace / Cloud',
        weight: 'Tier 1 (Job Landing Key)',
        resources: [
          { name: 'Made With ML (Goku Mohandas)', type: 'Open Source Guide', url: 'https://madewithml.com/', free: true, note: 'Production MLOps from clean code to CI/CD' },
          { name: 'Hugging Face Free NLP & Audio Courses', type: 'Course & Labs', url: 'https://huggingface.co/learn', free: true, note: 'Hands-on transformer architectures' }
        ]
      }
    ]
  },
  {
    id: 'frontend_dev',
    category: 'tech',
    title: 'Modern Frontend Engineer (React / Next.js)',
    badge: 'Popular',
    keywords: ['frontend', 'react', 'nextjs', 'javascript', 'typescript', 'web developer', 'html', 'css', 'tailwind', 'ui'],
    description: 'HTML5/CSS3 semantics, Deep JavaScript (ES6+, Event Loop), React architecture, Next.js, and web performance.',
    minHours: { beginner: 380, intermediate: 200, advanced: 100 },
    defaultMonths: 4,
    phases: [
      {
        phaseName: 'Phase 1: Deep JavaScript & DOM Foundations',
        focus: 'Prototypes, Closures, Async/Await, Event Loop, Fetch API, Tailwind CSS, Semantic HTML',
        weight: 'Tier 1 (Interview Breaker)',
        resources: [
          { name: 'javascript.info - The Modern JavaScript Tutorial', type: 'Interactive Book', url: 'https://javascript.info/', free: true, note: 'The definitive deep-dive reference for JS' },
          { name: 'Namaste JavaScript (Akshay Saini)', type: 'YouTube Series', url: 'https://www.youtube.com/@akshaymarch7', free: true, note: 'Gold standard for understanding execution context & closures' }
        ]
      },
      {
        phaseName: 'Phase 2: React Core & Component Design',
        focus: 'Hooks in-depth (useEffect, useMemo, useCallback), State management (Zustand), Custom hooks',
        weight: 'Tier 1 (Everyday Craft)',
        resources: [
          { name: 'React Official Documentation (react.dev)', type: 'Official Guide', url: 'https://react.dev/learn', free: true, note: 'The new interactive tutorial with best practices' },
          { name: 'Chai aur Code - React in Hindi/English', type: 'YouTube Playlist', url: 'https://www.youtube.com/@chaiaurcode', free: true, note: 'Practical project-driven React by Hitesh Choudhary' }
        ]
      },
      {
        phaseName: 'Phase 3: Next.js App Router, TypeScript & Web Perf',
        focus: 'SSR, SSG, Server Actions, TypeScript typing, Core Web Vitals, Lighthouse optimization',
        weight: 'Tier 1 (Senior Expectation)',
        resources: [
          { name: 'Next.js Official Learn Dashboard Course', type: 'Interactive Course', url: 'https://nextjs.org/learn', free: true, note: 'Official Next.js step-by-step masterclass' },
          { name: 'Total TypeScript Free Beginner Tutorials', type: 'Tutorials', url: 'https://www.totaltypescript.com/tutorials', free: true, note: 'Matt Pocock’s interactive TypeScript challenges' }
        ]
      },
      {
        phaseName: 'Phase 4: Machine Coding & Frontend System Design',
        focus: 'Infinite scroll, Autocomplete/Debounce, Virtualized lists, Cache strategies, 3 standout projects',
        weight: 'Tier 1 (Interview Cracker)',
        resources: [
          { name: 'GreatFrontEnd Free Challenges', type: 'Practice Platform', url: 'https://www.greatfrontend.com/', free: true, note: 'Front-end interview preparation and coding questions' },
          { name: 'Frontend Masters Free Handbook', type: 'Guide', url: 'https://frontendmasters.com/guides/', free: true, note: 'Roadmap and production guidelines' }
        ]
      }
    ]
  },
  {
    id: 'devops_cloud',
    category: 'tech',
    title: 'DevOps & Cloud Infrastructure Engineer',
    badge: 'High Salary',
    keywords: ['devops', 'cloud', 'aws', 'docker', 'kubernetes', 'k8s', 'terraform', 'ci cd', 'linux', 'site reliability', 'sre', 'sysadmin'],
    description: 'Linux internals, Bash, Docker containers, Kubernetes orchestration, CI/CD pipelines, AWS, and Terraform.',
    minHours: { beginner: 440, intermediate: 250, advanced: 120 },
    defaultMonths: 5,
    phases: [
      {
        phaseName: 'Phase 1: Linux, Networking & Scripting',
        focus: 'File permissions, systemd, SSH, DNS, HTTP/TLS, Bash scripting, Python automation',
        weight: 'Tier 1 (Baseline)',
        resources: [
          { name: 'Linux Journey', type: 'Interactive Guide', url: 'https://linuxjourney.com/', free: true, note: 'Learn Linux fundamentals step by step' },
          { name: 'NetworkChuck - Networking & Linux for Beginners', type: 'YouTube Series', url: 'https://www.youtube.com/@NetworkChuck', free: true, note: 'Fun and visual explanations of routing and TCP/IP' }
        ]
      },
      {
        phaseName: 'Phase 2: Docker Containers & CI/CD Pipelines',
        focus: 'Dockerfile optimization, multi-stage builds, Docker Compose, GitHub Actions, Jenkins',
        weight: 'Tier 1 (Daily Workhorse)',
        resources: [
          { name: 'TechWorld with Nana - Docker Tutorial', type: 'YouTube Video', url: 'https://www.youtube.com/@TechWorldwithNana', free: true, note: 'Clear, concise Docker & container orchestration intro' },
          { name: 'GitHub Actions Official Quickstart', type: 'Documentation', url: 'https://docs.github.com/en/actions', free: true, note: 'Automate testing and deployment pipelines' }
        ]
      },
      {
        phaseName: 'Phase 3: Kubernetes Orchestration & Infrastructure as Code (Terraform)',
        focus: 'Pods, Deployments, Services, Ingress, Helm charts, Terraform HCL, state management',
        weight: 'Tier 1 (High Value Skill)',
        resources: [
          { name: 'KodeKloud Free Kubernetes Basics', type: 'Labs & Video', url: 'https://kodekloud.com/', free: true, note: 'Hands-on practice for K8s architecture' },
          { name: 'HashiCorp Learn Terraform', type: 'Official Tutorials', url: 'https://developer.hashicorp.com/terraform/tutorials', free: true, note: 'Deploy infrastructure to AWS/GCP declaratively' }
        ]
      },
      {
        phaseName: 'Phase 4: Cloud (AWS) & Observability (Prometheus/Grafana)',
        focus: 'IAM, VPC, EC2, S3, RDS, Prometheus metrics, Grafana dashboards, log aggregation',
        weight: 'Tier 2 (Enterprise Readiness)',
        resources: [
          { name: 'FreeCodeCamp AWS Certified Cloud Practitioner / SAA', type: 'YouTube Course', url: 'https://www.youtube.com/@freecodecamp', free: true, note: '10+ hour comprehensive AWS cloud fundamentals' }
        ]
      }
    ]
  },
  {
    id: 'cyber_security',
    category: 'tech',
    title: 'Cybersecurity Analyst & Ethical Hacker (PenTester / SOC)',
    badge: 'High Demand',
    keywords: ['cyber', 'security', 'cybersecurity', 'ethical hacking', 'hacker', 'pentest', 'soc', 'infosec', 'network security', 'owasp', 'bug bounty'],
    description: 'Network Security (TCP/IP, Wireshark), Linux CLI, Web Pentesting (OWASP Top 10), Privilege Escalation, SIEM (Splunk/Wazuh), and hands-on CTF labs.',
    minHours: { beginner: 480, intermediate: 270, advanced: 130 },
    defaultMonths: 6,
    phases: [
      {
        phaseName: 'Phase 1: Networking Foundations, Linux & Security Scripting',
        focus: 'OSI Model, TCP/IP, Subnetting, Wireshark packet capture, Linux CLI administration, Bash & Python scripting for security tasks',
        weight: 'Tier 1 (Non-negotiable Bedrock)',
        resources: [
          { name: 'OverTheWire: Bandit (Free Linux Wargame)', type: 'Interactive CTF Lab', url: 'https://overthewire.org/wargames/bandit/', free: true, note: 'Hands-on gamified Linux command line mastery' },
          { name: "Professor Messer's CompTIA Security+ Training", type: 'Video Course', url: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-training-course/', free: true, note: 'Gold-standard free video series for cybersecurity foundations' },
          { name: 'NetworkChuck - Networking for Hackers', type: 'YouTube Series', url: 'https://www.youtube.com/@NetworkChuck', free: true, note: 'Visual, high-retention breakdown of networking protocols & Wireshark' }
        ]
      },
      {
        phaseName: 'Phase 2: Web Application Security & OWASP Top 10 Pentesting',
        focus: 'Reconnaissance (Nmap, Gobuster), OWASP Top 10 (SQL Injection, XSS, CSRF, SSRF, IDOR), Burp Suite Proxy, and vulnerability assessment',
        weight: 'Tier 1 (Core Interview Weightage)',
        resources: [
          { name: 'PortSwigger Web Security Academy', type: 'Interactive Labs & Theory', url: 'https://portswigger.net/web-security', free: true, note: 'Free interactive labs by creators of Burp Suite (industry gold standard)' },
          { name: 'TryHackMe: Free Pre-Security & Complete Beginner Paths', type: 'Hands-on Browser Labs', url: 'https://tryhackme.com/', free: true, note: 'Gamified virtual machines teaching web & system hacking' },
          { name: 'OWASP Top 10 Official Documentation & Cheatsheets', type: 'Reference Standard', url: 'https://owasp.org/www-project-top-ten/', free: true, note: 'Authoritative vulnerability classifications and remediations' }
        ]
      },
      {
        phaseName: 'Phase 3: System Penetration, Privilege Escalation & Active Directory',
        focus: 'Windows & Linux privilege escalation (LinPEAS, WinPEAS), Metasploit, Active Directory basics, Hash cracking (Hashcat/John the Ripper)',
        weight: 'Tier 2 (High-Value Technical Skill)',
        resources: [
          { name: 'Hack The Box - Starting Point (Tier 0 & 1 Free)', type: 'CTF Machines', url: 'https://www.hackthebox.com/hacker/starting-point', free: true, note: 'Guided real-world vulnerable machines with writeups' },
          { name: 'TCM Security - Practical Ethical Hacking Free Modules', type: 'YouTube Course', url: 'https://www.youtube.com/@TheCyberMentor', free: true, note: 'Ethical hacking methodologies and real penetration testing demos' }
        ]
      },
      {
        phaseName: 'Phase 4: SOC Operations, SIEM (Splunk), Incident Response & Mocks',
        focus: 'SIEM log analysis (Splunk/Wazuh), Incident Response cycle (NIST framework), Threat Intelligence, Blue Team defense, and technical mock interviews',
        weight: 'Tier 1 (Job Offer Round)',
        resources: [
          { name: 'Splunk Free Training & Search Tutorial', type: 'Official Free Labs', url: 'https://www.splunk.com/en_us/training/free-courses/overview.html', free: true, note: 'Learn log ingestion, SPL queries, and alert dashboard creation' },
          { name: 'LetsDefend - Blue Team SOC Analyst Simulator', type: 'Interactive SOC Platform', url: 'https://letsdefend.io/', free: true, note: 'Free simulated SOC analyst alerts and investigation playbooks' }
        ]
      }
    ]
  },
  {
    id: 'mobile_dev',
    category: 'tech',
    title: 'Mobile App Developer (Flutter & React Native / iOS & Android)',
    badge: 'High Demand',
    keywords: ['mobile', 'flutter', 'react native', 'android', 'ios', 'dart', 'app developer', 'mobile app'],
    description: 'Cross-platform mobile apps with Flutter or React Native, native device APIs, state management, offline storage, and Play Store / App Store publishing.',
    minHours: { beginner: 420, intermediate: 230, advanced: 110 },
    defaultMonths: 5,
    phases: [
      {
        phaseName: 'Phase 1: Language Syntax & Mobile UI Components',
        focus: 'Dart syntax / TypeScript fundamentals, Widget tree / JSX layout, Flexbox, Navigation, Responsive layouts',
        weight: 'Tier 1 (Core)',
        resources: [
          { name: 'Flutter Official Codelabs & Learn', type: 'Interactive Guides', url: 'https://docs.flutter.dev/get-started/codelab', free: true, note: 'Step by step official Flutter starter apps' },
          { name: 'React Native Official Docs & Tutorial', type: 'Official Guide', url: 'https://reactnative.dev/docs/getting-started', free: true, note: 'Setting up Expo and fundamental components' }
        ]
      },
      {
        phaseName: 'Phase 2: State Management & REST/GraphQL API Integration',
        focus: 'Bloc / Riverpod or Redux / Zustand, Async networking, JWT authentication, caching network responses',
        weight: 'Tier 1 (Everyday Architecture)',
        resources: [
          { name: 'Vandad Nahavandipoor - Free Flutter Masterclasses', type: 'YouTube Series', url: 'https://www.youtube.com/@freecodecamp', free: true, note: 'Comprehensive state management and architectural patterns' }
        ]
      },
      {
        phaseName: 'Phase 3: Native Device Capabilities & Offline Persistence',
        focus: 'SQLite/Hive/MMKV local database, Push notifications, Camera & Geolocation APIs, Background jobs',
        weight: 'Tier 2 (Real-world App Ready)',
        resources: [
          { name: 'Firebase for Mobile Quickstarts', type: 'Documentation', url: 'https://firebase.google.com/docs', free: true, note: 'Auth, Firestore, Cloud Messaging, and Crashlytics' }
        ]
      },
      {
        phaseName: 'Phase 4: App Store Deployment, Performance & Mock Interviews',
        focus: 'Code signing, Play Store / App Store release checklist, profiling app frame rate, 2 polished publishable apps',
        weight: 'Tier 1 (Hiring Proof)',
        resources: [
          { name: 'Fastlane Automation Docs', type: 'CI/CD Guide', url: 'https://docs.fastlane.tools/', free: true, note: 'Automate beta deployment and screenshots' }
        ]
      }
    ]
  },

  // --- GOVERNMENT & CIVIL SERVICES (INDIA) ---
  {
    id: 'ssc_cgl',
    category: 'govt',
    title: 'SSC CGL (Tier 1 & Tier 2 / ASO, Inspector, CAG)',
    badge: 'Huge Aspirants',
    keywords: ['ssc', 'cgl', 'chsl', 'govt', 'government', 'cag', 'aso', 'inspector', 'ssc cgl', 'sarkari'],
    description: 'Quantitative Aptitude, General Intelligence & Reasoning, English Comprehension, General Awareness, and Computer Module.',
    minHours: { beginner: 650, intermediate: 350, advanced: 180 },
    defaultMonths: 8,
    benchmarks: {
      mockTests: 40,
      pyqYears: 5,
      vocabularyWords: 2000
    },
    phases: [
      {
        phaseName: 'Phase 1: Arithmetic & English Grammatical Rules',
        focus: 'Percentages, Profit & Loss, Ratio, Time & Work, Neetu Singh English 120 Rules, Daily Vocab (One Word, Idioms)',
        weight: 'Tier 1 (70% of Prelims Weightage)',
        resources: [
          { name: 'Gagan Pratap Maths / Rakesh Yadav Free Playlists', type: 'YouTube Classes', url: 'https://www.youtube.com/@GaganPratapMaths', free: true, note: 'Concept clarity with short calculation tricks for SSC' },
          { name: 'Neetu Singh English Vol 1 Free Video Series', type: 'YouTube Playlist', url: 'https://www.youtube.com/@KD_Campus', free: true, note: 'The holy bible of grammar rules for SSC aspirants' },
          { name: 'Pinnacle SSC Previous Year Questions (PYQs)', type: 'Book & Practice', url: 'https://ssccglpinnacle.com/', free: true, note: 'Solve all questions from 2018 onwards' }
        ]
      },
      {
        phaseName: 'Phase 2: Advance Maths & Reasoning Speed Building',
        focus: 'Algebra, Geometry, Trigonometry, Mensuration, Coding-Decoding, Syllogisms, Non-verbal series',
        weight: 'Tier 1 (Rank Decider)',
        resources: [
          { name: 'Aditya Ranjan Sir Complete Advance Maths', type: 'YouTube Playlist', url: 'https://www.youtube.com/@RankersGurukul', free: true, note: 'Formulas and PYQ patterns for Geometry & Algebra' },
          { name: 'RBE (Revolution By Education - Shubham Sir)', type: 'YouTube Analysis', url: 'https://www.youtube.com/@RBERevolutionByEducation', free: true, note: 'Exam cutoffs, weightage analysis and best PYQ compilation' }
        ]
      },
      {
        phaseName: 'Phase 3: General Awareness (High-Yield Static GK + Current Affairs)',
        focus: 'Modern History, Indian Polity (Articles/Amendments), Geography, Science, Last 8 months Current Affairs',
        weight: 'Tier 2 (Avoid rabbit holes)',
        resources: [
          { name: 'Parmar SSC GK Playlist', type: 'YouTube Playlist', url: 'https://www.youtube.com/@ParmarSSC', free: true, note: 'Most targeted static GK & science playlist for SSC' },
          { name: 'Crazy GkTrick (Polity & Static Tricks)', type: 'YouTube Tricks', url: 'https://www.youtube.com/@CrazyGkTrick', free: true, note: 'Memory mnemonics for national parks, classical dances' }
        ]
      },
      {
        phaseName: 'Phase 4: Full-Length Mocks & Computer + Typing Prep',
        focus: 'Daily Tier 1 & Tier 2 full mocks, 1-hour error notebook review, 15 min daily typing speed test (30+ WPM)',
        weight: 'Tier 1 (Final Selection Factor)',
        resources: [
          { name: 'Testbook / Oliveboard Free Weekly Live Mocks', type: 'Mock Portal', url: 'https://testbook.com/', free: true, note: 'All-India rank comparison with real exam UI' },
          { name: 'TypingBaba Free Typing Test for SSC', type: 'Typing Portal', url: 'https://www.typingbaba.com/', free: true, note: 'Practice official SSC paragraph typing format' }
        ]
      }
    ]
  },
  {
    id: 'banking_po',
    category: 'govt',
    title: 'Banking Exams (IBPS PO, SBI PO, RRB & Clerk)',
    badge: 'Speed & Accuracy',
    keywords: ['banking', 'bank', 'sbi', 'sbi po', 'ibps', 'ibps po', 'rbi', 'clerk', 'bank exam', 'rrb', 'financial'],
    description: 'Speed Math, High-level DI, Complex Puzzles & Seating Arrangements, Reading Comprehension, Banking & Financial Awareness.',
    minHours: { beginner: 500, intermediate: 260, advanced: 130 },
    defaultMonths: 6,
    phases: [
      {
        phaseName: 'Phase 1: Speed Maths & Seating Arrangement Basics',
        focus: 'Approximation, Quadratic equations, Number series, Linear/Circular seating arrangements, Syllogisms',
        weight: 'Tier 1 (Prelims Speed)',
        resources: [
          { name: 'Arun Singh Rawat (Maths by Arun Sir)', type: 'YouTube Channel', url: 'https://www.youtube.com/@BankersWay', free: true, note: 'Speed math calculation techniques for 20-second questions' },
          { name: 'Ankush Lamba (1000 Puzzles Series)', type: 'YouTube Playlist', url: 'https://www.youtube.com/@BankingChronicle', free: true, note: 'The ultimate free puzzle repository for banking exams' }
        ]
      },
      {
        phaseName: 'Phase 2: High-Level Data Interpretation (DI) & English',
        focus: 'Caselet DI, Missing DI, Radar charts, Reading Comprehension, Editorial reading, Cloze test',
        weight: 'Tier 1 (Mains Clearing)',
        resources: [
          { name: 'Aashish Arora (Studified / Quant Mains)', type: 'YouTube Channel', url: 'https://www.youtube.com/@Studified', free: true, note: 'High-level Mains Data Interpretation' },
          { name: 'Nimisha Bansal - The Hindu Editorial Analysis', type: 'Daily YouTube Series', url: 'https://www.youtube.com/@NimishaBansal', free: true, note: 'Daily vocab and reading comprehension' }
        ]
      },
      {
        phaseName: 'Phase 3: Financial & Banking Awareness (GA Mains)',
        focus: 'RBI notifications, monetary policy, priority sector lending, union budget, last 5 months financial news',
        weight: 'Tier 1 (Rank & Selection)',
        resources: [
          { name: 'AffairsCloud Free Daily & Weekly Current Affairs', type: 'Web Portal', url: 'https://affairscloud.com/', free: true, note: 'Detailed banking-focused current affairs' },
          { name: 'Abhijeet Mishra / Sheetal Sharma Banking GA', type: 'YouTube Classes', url: 'https://www.youtube.com/@BankersWay', free: true, note: 'Banking awareness and static economic terms' }
        ]
      },
      {
        phaseName: 'Phase 4: Sectional & Full-Length Mock Grinding',
        focus: 'Time management under strict 20-min sectional clock, negative marking elimination',
        weight: 'Tier 1 (Non-negotiable)',
        resources: [
          { name: 'PracticeMock Free Mini Mocks', type: 'Mock Tests', url: 'https://www.practicemock.com/', free: true, note: 'High exam-level difficulty interface' },
          { name: 'Smartkeeda Free Sectional Tests', type: 'Practice Platform', url: 'https://www.smartkeeda.com/', free: true, note: 'Mains level puzzle and DI explanations' }
        ]
      }
    ]
  },
  {
    id: 'upsc_cse',
    category: 'govt',
    title: 'UPSC Civil Services (IAS / IPS / IFS)',
    badge: 'Prestigious',
    keywords: ['upsc', 'ias', 'ips', 'ifs', 'civil services', 'cse', 'prelims', 'mains', 'sarkari'],
    description: 'General Studies 1-4, CSAT, Essay, Optional Subject, and Daily Current Affairs with Analytical Answer Writing.',
    minHours: { beginner: 1200, intermediate: 700, advanced: 350 },
    defaultMonths: 12,
    phases: [
      {
        phaseName: 'Phase 1: NCERT Foundation & Core Static Subjects',
        focus: 'Class 6-12 NCERTs: Indian Polity (Laxmikanth), Modern History (Spectrum), Geography (GC Leong), Economy basics',
        weight: 'Tier 1 (Bedrock)',
        resources: [
          { name: 'Official NCERT Free Textbooks PDF', type: 'Free Textbooks', url: 'https://ncert.nic.in/textbook.php', free: true, note: 'Direct government free repository of all school texts' },
          { name: 'Mrunal Patel Free Economy Playlists', type: 'YouTube & Notes', url: 'https://mrunal.org/', free: true, note: 'Unmatched visual clarity on Indian economy & budget' }
        ]
      },
      {
        phaseName: 'Phase 2: GS Mains Syllabus Coverage & Daily Current Affairs',
        focus: 'GS 1 (Society/Art), GS 2 (Governance/IR), GS 3 (Environment/Tech/Security), GS 4 (Ethics, Integrity & Case Studies)',
        weight: 'Tier 1 (Rank List)',
        resources: [
          { name: 'Vision IAS Free Monthly Current Affairs Magazines', type: 'Monthly Compilations', url: 'https://visionias.in/resources/all_programs.php?c=ca', free: true, note: 'Most widely used current affairs compilation' },
          { name: 'Sansad TV - Perspective & Big Picture', type: 'YouTube Debates', url: 'https://www.youtube.com/@SansadTV', free: true, note: 'Balanced diplomatic and policy arguments for Mains' }
        ]
      },
      {
        phaseName: 'Phase 3: Optional Subject Depth & Mains Answer Writing',
        focus: 'Finishing Paper 1 & 2 of chosen optional, daily 3-question answer writing with peer evaluation, Essay structure',
        weight: 'Tier 1 (Decisive)',
        resources: [
          { name: 'Insights on India - Secure Daily Answer Writing', type: 'Daily Challenge', url: 'https://www.insightsonindia.com/', free: true, note: 'Daily questions with model answers and review framework' }
        ]
      },
      {
        phaseName: 'Phase 4: Prelims Test Series & CSAT Mastery',
        focus: '40+ Prelims GS mock tests, reverse-engineering 10 years UPSC PYQs, CSAT reading & quant practice',
        weight: 'Tier 1 (The Prelims Gatekeeper)',
        resources: [
          { name: 'UPSC Official Previous Year Question Papers', type: 'Official Repository', url: 'https://upsc.gov.in/examinations/previous-question-papers', free: true, note: 'Analyze question framing directly from the commission' }
        ]
      }
    ]
  },

  // --- GRADUATE & MBA ENTRANCE ---
  {
    id: 'cat_mba',
    category: 'grad_mba',
    title: 'CAT (IIMs & Top Business Schools)',
    badge: 'High ROI',
    keywords: ['cat', 'mba', 'iim', 'entrance', 'xat', 'snap', 'business school', 'management'],
    description: 'VARC (Reading Comprehension & Critical Reasoning), DILR (Data Interpretation & Logical Puzzles), and QA (Quantitative Aptitude).',
    minHours: { beginner: 450, intermediate: 250, advanced: 120 },
    defaultMonths: 6,
    benchmarks: {
      rcPassages: 300,
      dilrSets: 200,
      fullMocks: 25
    },
    phases: [
      {
        phaseName: 'Phase 1: Arithmetic, Algebra & Daily Reading Habit',
        focus: 'Percentages, PnL, TSD, Linear/Quadratic equations, Daily 3 Aeon/Guardian essays, Speed reading',
        weight: 'Tier 1 (70% of Quant & Foundation of VARC)',
        resources: [
          { name: 'Rodha (Ravi Prakash) Complete Quant Playlist', type: 'YouTube Series', url: 'https://www.youtube.com/@Rodha', free: true, note: 'Top-tier conceptual depth for CAT QA and DILR' },
          { name: 'Aeon Essays (Daily High-Density Reading)', type: 'Free Essays', url: 'https://aeon.co/essays', free: true, note: 'Matches the exact vocabulary and philosophy density of CAT RCs' },
          { name: '2IIM CAT Free Preparation Portal', type: 'Question Bank', url: 'https://online.2iim.com/', free: true, note: 'Free video solutions of all past CAT actual papers' }
        ]
      },
      {
        phaseName: 'Phase 2: DILR Arrangement, Matrix & Modern Math',
        focus: 'Games & Tournaments, Scheduling, Venn diagrams, Number systems, Geometry basics',
        weight: 'Tier 1 (Sectional Cutoff Breaker)',
        resources: [
          { name: 'Elites Grid (Hunny Sharma) DILR Playlist', type: 'YouTube Playlist', url: 'https://www.youtube.com/@ElitesGrid', free: true, note: 'Mastering unconventional DILR puzzle sets' }
        ]
      },
      {
        phaseName: 'Phase 3: Topic Tests & Sectional Timed Strategy',
        focus: '40-minute sectional mocks, question selection strategy (knowing which 3 sets to solve vs 2 sets to skip)',
        weight: 'Tier 1 (Percentile Multiplier)',
        resources: [
          { name: 'Cracku Free Daily Targets for CAT', type: 'Daily Practice', url: 'https://cracku.in/cat-daily-target', free: true, note: 'Free daily sectional practice with percentile predictor' }
        ]
      },
      {
        phaseName: 'Phase 4: Full-Length Mocks & Error Log Deep Dive',
        focus: '20+ Full mocks under real exam time slots, analyzing hit-rate vs negative marks, strategy stabilization',
        weight: 'Tier 1 (99%ile Key)',
        resources: [
          { name: 'IIM Official CAT Mock Test Portal', type: 'Official Mock', url: 'https://iimcat.ac.in/', free: true, note: 'Official exam day interface walkthrough' }
        ]
      }
    ]
  },
  {
    id: 'gate_cs',
    category: 'grad_mba',
    title: 'GATE Computer Science & IT (IITs & PSUs)',
    badge: 'Technical Depth',
    keywords: ['gate', 'gate cs', 'iit', 'psu', 'mtech', 'computer science gate', 'engineering entrance'],
    description: 'Discrete Maths, Engineering Maths, Algorithms, OS, DBMS, Computer Networks, Theory of Computation, and Compiler Design.',
    minHours: { beginner: 550, intermediate: 300, advanced: 150 },
    defaultMonths: 7,
    phases: [
      {
        phaseName: 'Phase 1: Mathematics & Core Algorithms',
        focus: 'Discrete Mathematics (Logic, Sets, Graph Theory), Linear Algebra, Data Structures, Sorting, Searching',
        weight: 'Tier 1 (25-30 Marks)',
        resources: [
          { name: 'Gate Overflow Previous Year Questions (Free PDF & Forum)', type: 'Open Forum & PYQs', url: 'https://gateoverflow.in/', free: true, note: 'The ultimate peer-reviewed solution database for every GATE question' },
          { name: 'NPTEL Discrete Mathematics by IIT Ropar', type: 'Academic Lecture Series', url: 'https://nptel.ac.in/', free: true, note: 'Rigorous mathematical proof foundation' }
        ]
      },
      {
        phaseName: 'Phase 2: Systems (Operating Systems, DBMS & CN)',
        focus: 'Process synchronization (Semaphores), Virtual memory, SQL & Normalization, TCP/IP, IP addressing',
        weight: 'Tier 1 (30+ Marks)',
        resources: [
          { name: 'Ravindrababu Ravula Free Lecture Archives', type: 'YouTube Archives', url: 'https://www.youtube.com/@ravindrababu_ravula', free: true, note: 'Legendary GATE faculty explanations' },
          { name: 'Knowledge Gate (Sanchit Jain)', type: 'YouTube Channel', url: 'https://www.youtube.com/@KnowledgeGate_KG', free: true, note: 'Direct GATE-oriented topic explanations' }
        ]
      },
      {
        phaseName: 'Phase 3: Theoretical Computer Science (TOC & Compiler)',
        focus: 'DFA/NFA, Regular expressions, Context Free Grammars, Turing Machines, Parsing techniques',
        weight: 'Tier 1 (High Scoring & Objective)',
        resources: [
          { name: 'Gate Smashers TOC & Compiler Playlist', type: 'YouTube Playlist', url: 'https://www.youtube.com/@GateSmashers', free: true, note: 'Fastest revision for theoretical CS questions' }
        ]
      },
      {
        phaseName: 'Phase 4: Subject-wise Tests & Full-Length Mocks',
        focus: '30+ subject tests, 10 full length mocks, Virtual Calculator practice, error log revision',
        weight: 'Tier 1 (AIR < 200 Factor)',
        resources: [
          { name: 'GATE Virtual Calculator Online Emulator', type: 'Practice Tool', url: 'https://www.tcsion.com/OnlineAssessment/ScientificCalculator/Calculator.html', free: true, note: 'Master the clunky official virtual calculator early' }
        ]
      }
    ]
  },

  // --- NON-TECH & BUSINESS ROLES ---
  {
    id: 'product_management',
    category: 'non_tech',
    title: 'Product Management (APM / PM in Tech)',
    badge: 'High Impact',
    keywords: ['product manager', 'pm', 'apm', 'product management', 'agile', 'scrum', 'tech pm'],
    description: 'Product Sense, Product Design, Metrics & Analytics, Technical Fundamentals, Execution, and Case Interviews.',
    minHours: { beginner: 350, intermediate: 180, advanced: 90 },
    defaultMonths: 4,
    phases: [
      {
        phaseName: 'Phase 1: Product Fundamentals & Customer Discovery',
        focus: 'User persona creation, JTBD (Jobs to be Done), wireframing, competitive landscape teardowns',
        weight: 'Tier 1 (Core Mindset)',
        resources: [
          { name: "Lenny's Newsletter & Podcast (Free Episodes)", type: 'Podcast & Articles', url: 'https://www.lennysnewsletter.com/', free: true, note: 'In-depth interviews with top tech CPOs and PM leads' },
          { name: 'Product School Free Micro-Courses & Books', type: 'Free Certification & E-book', url: 'https://productschool.com/resources', free: true, note: 'Free "Ship It" and "The Product Book" PDF' }
        ]
      },
      {
        phaseName: 'Phase 2: Product Metrics, Experiments & Tech for PMs',
        focus: 'North Star Metric, Funnel analysis (AARRR), A/B testing statistical significance, APIs, Databases',
        weight: 'Tier 1 (Execution Round)',
        resources: [
          { name: 'Mixpanel / Amplitude Product Analytics Guides', type: 'Official Academy', url: 'https://amplitude.com/resources', free: true, note: 'Understanding retention cohorts, churn, and conversion funnels' }
        ]
      },
      {
        phaseName: 'Phase 3: PM Interview Case Practice (Design & Strategy)',
        focus: 'CIRCLES framework, "Design an alarm clock for the blind", "How would you monetize WhatsApp?"',
        weight: 'Tier 1 (Interview Breaker)',
        resources: [
          { name: 'Exponent Free PM Interview Breakdown Videos', type: 'YouTube Playlist', url: 'https://www.youtube.com/@tryexponent', free: true, note: 'Real mock interviews evaluated by senior PMs' },
          { name: 'StellarPeers Free Case Frameworks', type: 'Case Bank', url: 'https://stellarpeers.com/', free: true, note: 'Frameworks for analytical, execution, and design questions' }
        ]
      },
      {
        phaseName: 'Phase 4: Product Teardown Portfolio & Cold Outreach',
        focus: 'Publish 2 public product teardowns on Notion/Substack, PRD writing sample, reach out to hiring managers',
        weight: 'Tier 1 (Job Landing Edge)',
        resources: [
          { name: 'Never Search Alone (Phyl Terry Free Job Search Guide)', type: 'Community & Guide', url: 'https://phyl.org/', free: true, note: 'Structured career transition and peer support councils' }
        ]
      }
    ]
  },
  {
    id: 'data_analyst',
    category: 'non_tech',
    title: 'Data Analyst & Business Intelligence Specialist',
    badge: 'Quick Transition',
    keywords: ['data analyst', 'bi', 'business intelligence', 'sql', 'power bi', 'tableau', 'excel', 'analytics', 'data analysis'],
    description: 'Advanced Excel/Sheets, SQL queries, Tableau/PowerBI dashboards, Python for EDA, and business problem solving.',
    minHours: { beginner: 320, intermediate: 160, advanced: 80 },
    defaultMonths: 3.5,
    phases: [
      {
        phaseName: 'Phase 1: Advanced Excel & Business Problem Solving',
        focus: 'XLOOKUP, Pivot tables, Index-Match, conditional formulas, building executive summary dashboards',
        weight: 'Tier 1 (Corporate Foundation)',
        resources: [
          { name: 'Chandoo - Excel & Power BI Masterclass', type: 'YouTube Channel', url: 'https://www.youtube.com/@chandoo_', free: true, note: 'Clear visual lessons on modern Excel features and dashboarding' }
        ]
      },
      {
        phaseName: 'Phase 2: Production SQL for Analytics',
        focus: 'Subqueries, Window functions (RANK, ROW_NUMBER, LEAD/LAG), CTEs, Case statements, Joins',
        weight: 'Tier 1 (Interview Filter)',
        resources: [
          { name: 'Alex The Analyst - Full Data Analyst Portfolio Bootcamp', type: 'YouTube Series', url: 'https://www.youtube.com/@AlexTheAnalyst', free: true, note: 'Complete free guided path from Excel to SQL and Power BI' },
          { name: 'Mode Analytics SQL Tutorial', type: 'Interactive Guide', url: 'https://mode.com/sql-tutorial/', free: true, note: 'Real-world business case SQL questions' }
        ]
      },
      {
        phaseName: 'Phase 3: BI Dashboards (Power BI / Tableau)',
        focus: 'DAX expressions, data modeling (Star schema), interactive visual storytelling, drill-downs',
        weight: 'Tier 1 (Showcase Portfolio)',
        resources: [
          { name: 'Maven Analytics Free Project Datasets', type: 'Free Open Datasets', url: 'https://mavenanalytics.io/data-playground', free: true, note: 'Real enterprise datasets (Retail, Healthcare, Airline) to build case studies' }
        ]
      },
      {
        phaseName: 'Phase 4: Python EDA & Resume Portfolio',
        focus: 'Pandas exploratory data analysis, GitHub repo with 3 end-to-end business dashboards, resume audit',
        weight: 'Tier 1 (Hiring Conversion)',
        resources: [
          { name: 'Kaggle Datasets & Public Notebooks', type: 'Portfolio Platform', url: 'https://www.kaggle.com/datasets', free: true, note: 'Host and share reproducible data analytics work' }
        ]
      }
    ]
  }
];
