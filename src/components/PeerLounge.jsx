import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  Sparkles, 
  Send, 
  ThumbsUp, 
  CheckCircle2, 
  ShieldCheck, 
  BookOpen, 
  Award, 
  Search, 
  Filter,
  ArrowRight,
  UserCheck,
  Flame,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

const INITIAL_COMMUNITY_POSTS = [
  {
    id: 'post_1',
    category: 'tech',
    trackName: 'Cybersecurity & Ethical Hacking',
    title: 'Non-tech background: Can I land a Junior SOC / Pentesting job without a CS degree?',
    question: 'I have 2 years of experience in customer support. I want to switch to Cyber Security. Where should I start, and will companies reject me without a CS degree?',
    author: 'Aakash V.',
    authorTag: 'Career Switcher',
    date: '1 day ago',
    upvotes: 42,
    hasUpvoted: false,
    seniorAnswer: {
      mentorName: 'Priya Sharma',
      mentorRole: 'Senior SOC Lead @ CyberTech Solutions',
      verified: true,
      answer: 'Absolutely YES. In Cyber Security, demonstrable hands-on lab proof beats a generic CS degree every time. Here is the exact path: 1) Complete OverTheWire Bandit (Linux CLI). 2) Finish PortSwigger Web Security Academy (free & respected). 3) Solve 15-20 machines on Hack The Box Starting Point and write clean public write-ups on GitHub/Medium. Put those write-up links right on your resume. That is what hiring managers look for.',
      upvotes: 68
    },
    repliesCount: 7
  },
  {
    id: 'post_2',
    category: 'tech',
    trackName: 'Software Engineering (FAANG / Product)',
    title: 'Should I finish all 150 NeetCode problems before learning System Design?',
    question: 'Currently on week 8 of prep. Should I master Dynamic Programming first, or start reading Low-Level Design (LLD) and system architecture?',
    author: 'Rohan K.',
    authorTag: '3rd Year College Student',
    date: '2 days ago',
    upvotes: 38,
    seniorAnswer: {
      mentorName: 'Shiraz (Shirazinator)',
      mentorRole: 'Platform Engineer & Creator of Pathzyra',
      verified: true,
      answer: 'Do NOT delay design until the end! If you only grind DSA, you get stuck when interviewers ask "How would you design a rate limiter or design Twitter?". Follow the 70/30 rule: Spend 70% of weekly time on core DSA patterns (Sliding Window, Trees, Two Pointers), and 30% building 1 real scalable full-stack project with Auth, DB indexing, and Docker. Hard DP questions rarely show up in SDE-1 rounds compared to clean Trees and Hashmaps.',
      upvotes: 94
    },
    repliesCount: 12
  },
  {
    id: 'post_3',
    category: 'non_tech',
    trackName: 'Data Analytics & Business Intelligence',
    title: 'What actually gets you shortlisted for Data Analyst roles in 2026?',
    question: 'So many people know basic Python and Pandas. What makes a beginner resume stand out to recruiters?',
    author: 'Meera P.',
    authorTag: 'Final Year Aspirant',
    date: '3 days ago',
    upvotes: 29,
    seniorAnswer: {
      mentorName: 'Arjun Das',
      mentorRole: 'Lead BI Specialist @ Enterprise Analytics',
      verified: true,
      answer: 'Stop submitting generic Titanic and Iris dataset projects! Build 2 end-to-end business case studies: 1) E-commerce sales churn dashboard in Power BI/Tableau with automated DAX measures. 2) Complex SQL queries using Window functions (RANK, LEAD/LAG, CTEs). Host interactive dashboard screenshots and SQL query scripts in a public GitHub repository. Recruiters want to see that you understand business KPIs, not just code.',
      upvotes: 53
    },
    repliesCount: 5
  },
  {
    id: 'post_4',
    category: 'govt',
    trackName: 'UPSC Civil Services / Indian Exams',
    title: 'How to manage full-time IT job with UPSC preparation without burning out?',
    question: 'I work 9 hours daily. By the time I get home, I feel completely drained. How do working aspirants clear prelims?',
    author: 'Vikram S.',
    authorTag: 'Working Professional',
    date: '4 days ago',
    upvotes: 51,
    seniorAnswer: {
      mentorName: 'Sanjay Verma',
      mentorRole: 'Former Aspirant & State Administration Mentor',
      verified: true,
      answer: 'The secret is splitting your day into two 90-minute blocks rather than one long evening slog: 1) Wake up 90 minutes early (e.g. 6:30 AM to 8:00 AM) and finish The Hindu newspaper and 1 static topic when your mind is fresh. 2) Evening 9:00 PM to 10:30 PM: Solve 25 MCQs or do spaced revision. 3) Reserve weekends for 6-8 hour deep-work sessions. Zero backlog rule on weekdays!',
      upvotes: 82
    },
    repliesCount: 9
  }
];

const STUDY_PODS = [
  {
    id: 'pod_cyber',
    title: '🛡️ Cyber Security & Ethical Hacking Pod',
    description: 'Weekly OverTheWire CTFs, PortSwigger lab walk-throughs, and SOC interview preparation with experienced seniors.',
    activeMembers: 340,
    tags: ['OWASP', 'Linux', 'Burp Suite', 'SOC']
  },
  {
    id: 'pod_sde',
    title: '💻 FAANG / SDE Problem Solvers Circle',
    description: 'Daily LeetCode discussions, mock technical pair-programming, and system design breakdown sessions.',
    activeMembers: 520,
    tags: ['DSA', 'NeetCode', 'System Design', 'Mocks']
  },
  {
    id: 'pod_data',
    title: '📊 Data Analytics & BI Sprint Group',
    description: 'Real-world business case study builds, complex SQL query peer reviews, and Power BI dashboard portfolio critiques.',
    activeMembers: 210,
    tags: ['SQL', 'Power BI', 'Python EDA', 'Portfolios']
  },
  {
    id: 'pod_govt',
    title: '🏛️ Civil Services & Competitive Exam Room',
    description: 'Daily editorial analysis, PYQ speed drills, and answer evaluation for UPSC, SSC CGL & Banking aspirants.',
    activeMembers: 410,
    tags: ['PYQs', 'Current Affairs', 'Mocks', 'Speed Drills']
  }
];

export function PeerLounge({ currentTargetTitle = '' }) {
  const [activeTab, setActiveTab] = useState('qa'); // 'qa' | 'playbooks' | 'pods'
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Persistent posts in localStorage
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('pathzyra_community_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_COMMUNITY_POSTS;
      }
    }
    return INITIAL_COMMUNITY_POSTS;
  });

  // New question form state
  const [showAskModal, setShowAskModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newTrack, setNewTrack] = useState(currentTargetTitle || 'Tech & SDE');
  const [newAuthor, setNewAuthor] = useState('');
  const [newAuthorTag, setNewAuthorTag] = useState('Beginner');
  const [joinedPods, setJoinedPods] = useState(() => {
    const saved = localStorage.getItem('pathzyra_joined_pods');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('pathzyra_community_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('pathzyra_joined_pods', JSON.stringify(joinedPods));
  }, [joinedPods]);

  const handleUpvote = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const hasUpvoted = p.hasUpvoted;
          return {
            ...p,
            upvotes: hasUpvoted ? p.upvotes - 1 : p.upvotes + 1,
            hasUpvoted: !hasUpvoted
          };
        }
        return p;
      })
    );
  };

  const handleCreateQuestion = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newQuestion.trim()) return;

    let category = 'tech';
    const lower = newTrack.toLowerCase();
    if (lower.includes('upsc') || lower.includes('ssc') || lower.includes('govt') || lower.includes('bank')) {
      category = 'govt';
    } else if (lower.includes('data') || lower.includes('analyst') || lower.includes('bi')) {
      category = 'non_tech';
    } else if (lower.includes('cat') || lower.includes('mba') || lower.includes('gate')) {
      category = 'grad_mba';
    }

    const newPost = {
      id: `post_${Date.now()}`,
      category,
      trackName: newTrack,
      title: newTitle.trim(),
      question: newQuestion.trim(),
      author: newAuthor.trim() || 'Aspirant',
      authorTag: newAuthorTag,
      date: 'Just now',
      upvotes: 1,
      hasUpvoted: true,
      seniorAnswer: {
        mentorName: 'Pathzyra Senior Network',
        mentorRole: 'Community Mentors & Verified Seniors',
        verified: true,
        answer: `Great question regarding ${newTrack}! While community seniors review your question, start by focusing strictly on Phase 1 Tier-1 fundamentals. Do not buy extra courses or get stuck in tutorial hell—build consistent 2-hour daily problem solving blocks.`,
        upvotes: 4
      },
      repliesCount: 1
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewQuestion('');
    setShowAskModal(false);
  };

  const handleToggleJoinPod = (podId) => {
    setJoinedPods((prev) => ({
      ...prev,
      [podId]: !prev[podId]
    }));
  };

  const filteredPosts = posts.filter((p) => {
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    const cleanSearch = searchQuery.toLowerCase().trim();
    if (!cleanSearch) return matchesCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(cleanSearch) ||
      p.question.toLowerCase().includes(cleanSearch) ||
      p.trackName.toLowerCase().includes(cleanSearch) ||
      p.seniorAnswer?.answer.toLowerCase().includes(cleanSearch);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 text-left min-w-0">
      {/* Hero Community Header */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-500/30">
              <Users className="w-3.5 h-3.5" />
              <span>Peer & Senior Guidance Lounge • Designed by Shiraz</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Aspirants & Seniors Learning Together
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Have doubts or feel stuck? Ask questions to seniors who have cracked FAANG, Cyber Security, UPSC & CAT. 
              Zero gatekeeping, 100% honest, actionable road-tested advice.
            </p>
          </div>

          <button
            onClick={() => setShowAskModal(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-md shadow-emerald-600/20 active:scale-95 shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask a Senior</span>
          </button>
        </div>

        {/* Live Metrics Strip */}
        <div className="flex items-center gap-4 pt-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-emerald-500/15 flex-wrap">
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <strong>1,480+</strong> Active Aspirants
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <strong>62</strong> Verified Senior Mentors
          </span>
          <span>•</span>
          <span className="text-emerald-700 dark:text-emerald-300 font-semibold">
            100% Free Peer Support
          </span>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('qa')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'qa'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Senior Q&A Stream ({posts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('pods')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'pods'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Peer Study Pods ({STUDY_PODS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('playbooks')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'playbooks'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Senior Playbooks</span>
        </button>
      </div>

      {/* Tab 1: Senior Q&A Stream */}
      {activeTab === 'qa' && (
        <div className="space-y-4">
          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 min-w-0">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search community questions, topics, or senior advice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
              {['all', 'tech', 'govt', 'non_tech'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'all' ? 'All Questions' : cat === 'tech' ? 'Tech & Security' : cat === 'govt' ? 'Govt & UPSC' : 'Data & Business'}
                </button>
              ))}
            </div>
          </div>

          {/* Questions Stream */}
          <div className="space-y-3.5">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition hover:border-slate-300 dark:hover:border-slate-700"
              >
                {/* Question Metadata */}
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-slate-700">
                      {post.trackName}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      by <strong>{post.author}</strong> ({post.authorTag}) • {post.date}
                    </span>
                  </div>

                  <button
                    onClick={() => handleUpvote(post.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                      post.hasUpvoted
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
                        : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{post.upvotes}</span>
                  </button>
                </div>

                {/* Question Content */}
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {post.question}
                  </p>
                </div>

                {/* Senior Answer Card */}
                {post.seniorAnswer && (
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 text-xs text-emerald-800 dark:text-emerald-300 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{post.seniorAnswer.mentorName}</span>
                        <span className="text-[10px] font-normal text-emerald-700/80 dark:text-emerald-400/80">
                          ({post.seniorAnswer.mentorRole})
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider bg-emerald-200/60 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-300">
                        Verified Senior Advice
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                      "{post.seniorAnswer.answer}"
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-emerald-700 dark:text-emerald-400 pt-1 border-t border-emerald-500/15">
                      <span>Was this helpful? Found by <strong>{post.seniorAnswer.upvotes}</strong> aspirants</span>
                      <span className="text-slate-400">{post.repliesCount} peer replies</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Peer Study Pods */}
      {activeTab === 'pods' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Join dedicated peer study circles focused on your exact target track. Share daily streaks, clarify doubts, and stay accountable.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {STUDY_PODS.map((pod) => {
              const isJoined = joinedPods[pod.id];
              return (
                <div
                  key={pod.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        {pod.activeMembers} Members Active
                      </span>
                      {isJoined && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                          Joined Member
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {pod.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {pod.description}
                    </p>

                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {pod.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleJoinPod(pod.id)}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                      isJoined
                        ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-zinc-200'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
                    }`}
                  >
                    {isJoined ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Leave Study Pod</span>
                      </>
                    ) : (
                      <>
                        <span>Join Study Pod (Free)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Senior Playbooks */}
      {activeTab === 'playbooks' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300">
                Rule #1: The 80/20 Pareto Cut
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Never Read More Than 2 Resources for One Topic
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                The #1 reason aspirants fail is "Resource Hoarding"—collecting 5 PDFs, 3 courses, and 4 playlists. Pick ONE gold standard (e.g. Striver for DSA, PortSwigger for Web Security, Laxmikanth for Polity) and master it 3 times.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                Rule #2: The Error Diary
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Taking Mocks Without Analysis Is a Waste of Time
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                If you take a 60-minute mock test, spend 90 minutes analyzing why you got each question wrong. Record every missed question in an "Error Diary" and review it every Sunday morning.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300">
                Rule #3: The Zero Backlog Weekend
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Never Start Monday with Last Week's Guilt
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Life happens. If you miss 2 days due to office or personal emergency, do NOT try to cram 8 hours on Sunday night. Use Pathzyra's "Recalibrate" feature to redistribute hours evenly across remaining weeks.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300">
                Rule #4: Hands On Keyboard
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Passive Watching Is NOT Studying
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Watching an instructor solve a problem on 1.5x speed gives a false sense of mastery. Always open a blank editor or blank sheet of paper and solve it with zero hints.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Ask a Senior Modal */}
      {showAskModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Ask a Senior for Guidance
              </h3>
              <button
                onClick={() => setShowAskModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-sm p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Post your question to the community. Experienced seniors will see it and provide actionable guidance.
            </p>

            <form onSubmit={handleCreateQuestion} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Track / Role *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cyber Security, SDE FAANG, Data Analytics, UPSC"
                  value={newTrack}
                  onChange={(e) => setNewTrack(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Question Title (Short & Clear) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How to balance a 9-hour job with Cyber Security prep?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Details / Context *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your current situation, how many hours you have, and what you are struggling with..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Current Stage
                  </label>
                  <select
                    value={newAuthorTag}
                    onChange={(e) => setNewAuthorTag(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Beginner (0 Exp)">Beginner (0 Exp)</option>
                    <option value="Career Switcher">Career Switcher</option>
                    <option value="College Student">College Student</option>
                    <option value="Working Professional">Working Professional</option>
                    <option value="Experienced Senior">Experienced Senior</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAskModal(false)}
                  className="px-4 py-2 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer shadow-md"
                >
                  Post to Community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
