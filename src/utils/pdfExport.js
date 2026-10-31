/**
 * Roadmap PDF Export Engine
 * Generates an executive, beautifully formatted printable PDF document
 * with 4 phases, weekly checklists, and curated resources.
 */

export function downloadRoadmapPDF(roadmap, completedTasks = {}) {
  if (!roadmap || !roadmap.phases) return;

  const totalTasks = roadmap.phases.reduce(
    (acc, p) => acc + p.weeks.reduce((wAcc, w) => wAcc + w.tasks.length, 0),
    0
  );
  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  let phasesHtml = '';
  roadmap.phases.forEach((phase) => {
    let resourcesHtml = '';
    if (phase.resources && phase.resources.length > 0) {
      resourcesHtml = `
        <div class="resources-box">
          <div class="section-title">📚 Recommended Free Resources</div>
          <div class="resource-grid">
            ${phase.resources
              .map(
                (r) => `
              <div class="resource-item">
                <strong>${r.name}</strong> <span class="badge">${r.type}</span>
                <div class="res-note">${r.note || ''}</div>
                <div class="res-url"><a href="${r.url}" target="_blank">${r.url}</a></div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      `;
    }

    let weeksHtml = '';
    phase.weeks.forEach((w) => {
      const tasksHtml = w.tasks
        .map((t) => {
          const isDone = completedTasks[t.id];
          return `
            <div class="task-row ${isDone ? 'task-done' : ''}">
              <span class="checkbox">${isDone ? '☑' : '☐'}</span>
              <span class="task-title">${t.title}</span>
              <span class="task-hours">${t.estimatedHours}h</span>
              <span class="task-tag">${t.pareto}</span>
            </div>
          `;
        })
        .join('');

      weeksHtml += `
        <div class="week-card">
          <div class="week-header">
            <strong>${w.title}</strong>
          </div>
          <div class="guidance-box">
            <div><strong>Weekday:</strong> ${w.weekdayGuidance}</div>
            <div><strong>Weekend:</strong> ${w.weekendGuidance}</div>
          </div>
          <div class="tasks-list">
            ${tasksHtml}
          </div>
        </div>
      `;
    });

    phasesHtml += `
      <div class="phase-container">
        <div class="phase-header">
          <div class="phase-badge">${phase.weight}</div>
          <h2>${phase.title}</h2>
          <p class="phase-focus"><strong>Focus:</strong> ${phase.focus}</p>
        </div>
        ${resourcesHtml}
        <div class="weeks-container">
          ${weeksHtml}
        </div>
      </div>
    `;
  });

  const fullHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${roadmap.targetTitle} — Pathzyra Roadmap PDF</title>
      <style>
        @page {
          size: A4;
          margin: 14mm 14mm 16mm 14mm;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #0f172a;
          background: #ffffff;
          line-height: 1.45;
          font-size: 11pt;
          margin: 0;
          padding: 0;
        }
        .header {
          border-bottom: 2px solid #059669;
          padding-bottom: 12px;
          margin-bottom: 16px;
        }
        .brand-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .brand {
          font-size: 20pt;
          font-weight: 800;
          color: #064e3b;
          letter-spacing: -0.5px;
        }
        .designer {
          font-size: 10pt;
          font-weight: 700;
          color: #059669;
        }
        .plan-title {
          font-size: 16pt;
          font-weight: 800;
          margin: 6px 0 4px 0;
          color: #0f172a;
        }
        .stats-bar {
          display: flex;
          gap: 16px;
          font-size: 9.5pt;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 8px 12px;
          border-radius: 8px;
          margin-top: 8px;
          font-weight: 600;
        }
        .stat-item strong {
          color: #065f46;
        }
        .phase-container {
          page-break-inside: avoid;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 16px;
          background: #fafafa;
        }
        .phase-header h2 {
          font-size: 13pt;
          font-weight: 800;
          margin: 4px 0;
          color: #0f172a;
        }
        .phase-badge {
          display: inline-block;
          font-size: 8pt;
          font-weight: 700;
          background: #dbeafe;
          color: #1e40af;
          padding: 2px 8px;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .phase-focus {
          font-size: 9pt;
          color: #475569;
          margin: 4px 0 10px 0;
        }
        .resources-box {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 10px;
          margin-bottom: 12px;
        }
        .section-title {
          font-size: 9.5pt;
          font-weight: 700;
          color: #065f46;
          margin-bottom: 6px;
        }
        .resource-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 8px;
        }
        .resource-item {
          font-size: 8.5pt;
          background: #f8fafc;
          padding: 6px;
          border-radius: 4px;
          border-left: 3px solid #10b981;
        }
        .badge {
          font-size: 7.5pt;
          background: #e2e8f0;
          padding: 1px 4px;
          border-radius: 3px;
        }
        .res-note {
          color: #64748b;
          font-size: 8pt;
          margin-top: 2px;
        }
        .res-url a {
          color: #059669;
          text-decoration: none;
          font-size: 7.5pt;
          word-break: break-all;
        }
        .week-card {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          padding: 8px 10px;
          margin-bottom: 8px;
        }
        .week-header {
          font-size: 10pt;
          font-weight: 700;
          color: #1e293b;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 4px;
          margin-bottom: 4px;
        }
        .guidance-box {
          font-size: 8pt;
          color: #475569;
          margin-bottom: 6px;
          background: #f8fafc;
          padding: 4px 6px;
          border-radius: 4px;
        }
        .task-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 8.5pt;
          padding: 3px 0;
          border-bottom: 1px dotted #e2e8f0;
        }
        .task-row:last-child {
          border-bottom: none;
        }
        .checkbox {
          font-size: 10pt;
          color: #059669;
        }
        .task-title {
          flex: 1;
        }
        .task-hours {
          font-size: 7.5pt;
          color: #64748b;
          background: #f1f5f9;
          padding: 1px 4px;
          border-radius: 3px;
        }
        .task-tag {
          font-size: 7pt;
          font-weight: 700;
          background: #fef3c7;
          color: #92400e;
          padding: 1px 4px;
          border-radius: 3px;
        }
        .task-done .task-title {
          text-decoration: line-through;
          color: #94a3b8;
        }
        .footer {
          margin-top: 20px;
          border-top: 1px solid #e2e8f0;
          padding-top: 8px;
          text-align: center;
          font-size: 8pt;
          color: #94a3b8;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="brand-row">
          <span class="brand">Pathzyra</span>
          <span class="designer">Designed by Shiraz</span>
        </div>
        <div class="plan-title">${roadmap.targetTitle} — ${roadmap.totalWeeks} Weeks Execution Blueprint</div>
        <div class="stats-bar">
          <span class="stat-item">Total Study Target: <strong>${roadmap.totalAvailableHours} hrs</strong></span>
          <span class="stat-item">Benchmark Required: <strong>~${roadmap.benchmarkHours} hrs</strong></span>
          <span class="stat-item">Feasibility: <strong>${roadmap.feasibilityStatus.toUpperCase()} (${roadmap.feasibilityScore}%)</strong></span>
          <span class="stat-item">Progress: <strong>${progressPercent}% (${completedCount}/${totalTasks} Tasks)</strong></span>
        </div>
      </div>

      ${phasesHtml}

      <div class="footer">
        Generated with <strong>Pathzyra</strong> (Designed by Shiraz) — Live App: https://shirazinator.github.io/pathzyra/
      </div>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(fullHtml);
  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
  }, 400);
}
