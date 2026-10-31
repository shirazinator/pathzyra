import React, { useState } from 'react';
import { Copy, Check, Download, FileText, FileDown } from 'lucide-react';
import { downloadRoadmapPDF } from '../utils/pdfExport';

export function ExportModal({
  isOpen,
  onClose,
  roadmap,
  completedTasks
}) {
  if (!isOpen || !roadmap) return null;

  const [copied, setCopied] = useState(false);

  // Generate clean Markdown representation
  const generateMarkdown = () => {
    let md = `# 🧭 Pathzyra Roadmap: ${roadmap.targetTitle}\n`;
    md += `*Designed by Shiraz*\n\n`;
    md += `> **Total Timeline:** ${roadmap.totalWeeks} Weeks (~${Math.round(roadmap.totalWeeks / 4.3)} Months)\n`;
    md += `> **Total Study Budget:** ${roadmap.totalAvailableHours} Hours (Benchmark: ~${roadmap.benchmarkHours} Hours)\n`;
    md += `> **Feasibility Status:** ${roadmap.feasibilityStatus.toUpperCase()} (${roadmap.feasibilityScore}%)\n\n`;
    md += `---\n\n`;

    roadmap.phases.forEach((phase) => {
      md += `## 📌 ${phase.title}\n`;
      md += `**Weight:** ${phase.weight} | **Focus:** ${phase.focus}\n\n`;

      if (phase.resources && phase.resources.length > 0) {
        md += `### 📚 Curated Free Resources:\n`;
        phase.resources.forEach((r) => {
          md += `- [${r.name}](${r.url}) (${r.type}) — *${r.note}*\n`;
        });
        md += `\n`;
      }

      md += `### 📅 Weekly Action Items:\n`;
      phase.weeks.forEach((w) => {
        md += `#### ${w.title}\n`;
        md += `- **Weekday Routine:** ${w.weekdayGuidance}\n`;
        md += `- **Weekend Surge:** ${w.weekendGuidance}\n\n`;

        w.tasks.forEach((t) => {
          const isDone = completedTasks[t.id] ? 'x' : ' ';
          md += `- [${isDone}] **${t.title}** [${t.pareto}] (~${t.estimatedHours}h)\n`;
        });
        md += `\n`;
      });

      md += `---\n\n`;
    });

    md += `*Generated with Pathzyra (Designed by Shiraz) — The Honest, Hyper-Personalized Career & Exam Roadmap Engine.*\n`;
    return md;
  };

  const markdownContent = generateMarkdown();

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${roadmap.targetTitle.replace(/[^a-zA-Z0-9]/g, '_')}_Pathzyra.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col min-w-0">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">Export Preparation Roadmap</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-sm p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Paste directly into <strong>Notion</strong>, <strong>Obsidian</strong>, or your notes app for an offline interactive checklist.
        </p>

        {/* Markdown Preview Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 font-mono text-xs text-slate-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed select-all">
          {markdownContent}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2.5 pt-2 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                downloadRoadmapPDF(roadmap, completedTasks);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition shadow-md shadow-emerald-600/20 active:scale-95"
            >
              <FileDown className="w-4 h-4" />
              Download PDF
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-zinc-200 text-xs font-semibold cursor-pointer transition shadow-sm"
            >
              <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Download .md
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-xs font-bold cursor-pointer transition shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Markdown
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
