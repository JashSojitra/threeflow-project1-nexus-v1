import { useState } from 'react';
import { useNexus } from '../store';
import { worklogIncludedSections, worklogExcludedItems, formatDate } from '../data';
import { Card, SectionTitle, ActionButton, StatusPill, ApprovalTag, EmptyState } from '../ui';
import {
  FileDown,
  FileText,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  User,
  Briefcase,
  CalendarClock,
  MapPin,
  ArrowRight,
  AlertTriangle,
  FileLock,
  Package,
} from 'lucide-react';

export default function WorklogExport({ onToast }: { onToast: (msg: string) => void }) {
  const { form, tickets, dashboardRows, riskScanResults, accessRows, briefSections, readinessScore, bundleGenerated, resetSession } = useNexus();
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  if (!bundleGenerated) {
    return (
      <div className="animate-fade-in">
        <SectionTitle eyebrow="Step 7" title="Worklog Export + Session Reset" description="" />
        <EmptyState
          icon={Package}
          title="No session to export"
          description="Generate a transition bundle from the Manager Intake to build a session worklog."
        />
      </div>
    );
  }

  const timestamp = new Date().toLocaleString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const currentAccess = accessRows.filter((r) => r.kind === 'current');
  const newAccess = accessRows.filter((r) => r.kind === 'new');

  function exportPdf() {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExported(true);
      onToast('Session worklog PDF ready — prototype simulation.');
    }, 1600);
  }

  function resetSessionNow() {
    setResetting(true);
    setTimeout(() => {
      setResetting(false);
      setResetDone(true);
      resetSession();
      onToast('Session reset complete. Temporary AI inputs and draft state have been cleared.');
    }, 1400);
  }

  return (
    <div className="animate-fade-in">
      <SectionTitle
        eyebrow="Step 7"
        title="Worklog Export + Session Reset"
        description="The final privacy and reviewability layer. Export an optional local worklog PDF, then end the session — Nexus clears all temporary AI inputs and draft state."
      />

      {/* explanation card */}
      <Card className="mb-6 border-navy-200 bg-navy-50/30">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-700 text-white">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-navy-900">Why this exists</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              Nexus does not retain long-term session records. Submitted tickets create their normal audit trail in
              existing request systems. If a manager wants a local review record, they can export a session worklog
              PDF before ending the session.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Submitted tickets keep their normal audit trail in existing ticketing / request systems. Nexus only
              avoids keeping an additional long-term copy of sensitive session data.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* left: action buttons + included/excluded */}
        <div className="space-y-4 lg:col-span-1">
          <Card>
            <h3 className="mb-4 text-sm font-semibold text-navy-900">Session actions</h3>

            <ActionButton onClick={exportPdf} loading={exporting} disabled={exported} className="w-full">
              <FileDown className="h-4 w-4" />
              {exported ? 'Worklog PDF Ready' : 'Export Session Worklog PDF'}
            </ActionButton>

            <div className="my-3 flex items-center gap-2">
              <div className="h-px flex-1 bg-slate-100" />
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-300">then</span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>

            <ActionButton
              variant="danger"
              onClick={resetSessionNow}
              loading={resetting}
              disabled={resetDone}
              className="w-full"
            >
              <Trash2 className="h-4 w-4" />
              {resetDone ? 'Session Ended' : 'End Session + Clear Temporary Data'}
            </ActionButton>

            {resetDone && (
              <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 p-3 animate-scale-in">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <p className="text-xs leading-relaxed text-emerald-700">
                  <span className="font-semibold">Session reset complete.</span> Temporary AI inputs and draft state
                  have been cleared. Nexus has not stored this session for model training or long-term database
                  retention.
                </p>
              </div>
            )}
          </Card>

          <Card>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy-900">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Worklog includes
            </h3>
            <ul className="space-y-1.5">
              {worklogIncludedSections.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy-900">
              <XCircle className="h-4 w-4 text-rose-500" />
              Worklog excludes
            </h3>
            <ul className="space-y-1.5">
              {worklogExcludedItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-500">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* right: PDF preview */}
        <div className="lg:col-span-2">
          {!exported && !exporting && (
            <Card className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
                <FileText className="h-6 w-6" />
              </span>
              <h3 className="font-serif text-xl font-semibold text-navy-900">No worklog exported yet</h3>
              <p className="mt-1.5 max-w-sm text-sm text-slate-500">
                Click "Export Session Worklog PDF" to generate a preview of the session summary for {form.name || 'this employee'}.
              </p>
            </Card>
          )}

          {exporting && (
            <Card className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
              <FileDown className="mb-4 h-10 w-10 animate-pulse text-navy-600" />
              <h3 className="font-serif text-xl font-semibold text-navy-900">Generating worklog PDF…</h3>
              <p className="mt-1.5 text-sm text-slate-500">Compiling session summary for export.</p>
              <div className="mt-5 w-full max-w-sm space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-3 rounded shimmer-bg animate-shimmer" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </Card>
          )}

          {exported && (
            <Card padded={false} className="animate-fade-in overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-5 py-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-navy-600" />
                  <span className="text-sm font-semibold text-navy-900">Session Worklog — Preview</span>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  Ready to download
                </span>
              </div>

              <div className="max-h-[600px] overflow-y-auto bg-white p-6 sm:p-8">
                {/* doc header */}
                <div className="mb-6 border-b border-slate-200 pb-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-serif text-xl font-bold text-navy-900">Project Nexus — Session Worklog</p>
                      <p className="mt-1 text-sm text-slate-500">AI Employee Transition Readiness Hub</p>
                    </div>
                    <div className="text-right text-xs text-slate-400">
                      <p className="flex items-center gap-1 font-medium text-slate-500">
                        <Clock className="h-3 w-3" /> {timestamp}
                      </p>
                      <p className="mt-0.5">Session ID: NX-{new Date().getFullYear()}-SESSION</p>
                    </div>
                  </div>
                </div>

                {/* employee transition summary */}
                <WorklogSection title="1. Employee Transition Summary">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {[
                      { icon: User, label: 'Employee', value: form.name || '—' },
                      { icon: Building2, label: 'Previous', value: form.previousMinistry || '—' },
                      { icon: Building2, label: 'New ministry', value: form.newMinistry || '—' },
                      { icon: Briefcase, label: 'Role', value: form.newRole || '—' },
                      { icon: CalendarClock, label: 'Start date', value: form.startDate ? formatDate(form.startDate) : '—' },
                      { icon: MapPin, label: 'Location', value: form.location || '—' },
                      { icon: User, label: 'Manager', value: form.manager || '—' },
                      { icon: ArrowRight, label: 'Transition type', value: form.transitionType || '—' },
                    ].map((m) => (
                      <div key={m.label} className="rounded-lg bg-slate-50 p-2.5">
                        <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          <m.icon className="h-3 w-3" /> {m.label}
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-navy-900">{m.value}</p>
                      </div>
                    ))}
                  </div>
                </WorklogSection>

                {/* generated ticket bundle */}
                <WorklogSection title="2. Generated Ticket Bundle">
                  <div className="space-y-1.5">
                    {tickets.map((t) => (
                      <div key={t.id} className="flex items-center justify-between gap-2 rounded-md border border-slate-100 px-3 py-1.5">
                        <span className="text-sm font-medium text-navy-800">{t.name}</span>
                        <div className="flex items-center gap-2">
                          <StatusPill status={t.status} />
                          <ApprovalTag path={t.approvalPath} />
                        </div>
                      </div>
                    ))}
                  </div>
                </WorklogSection>

                {/* AI risk scan results */}
                <WorklogSection title="3. AI Risk Scan Results">
                  {riskScanResults.length > 0 ? (
                    <ul className="space-y-1.5">
                      {riskScanResults.map((result, i) => (
                        <li key={i} className="flex items-start gap-2 rounded-md bg-amber-50/50 px-3 py-1.5 text-sm text-slate-700">
                          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-400">Risk scan not yet run in this session.</p>
                  )}
                </WorklogSection>

                {/* access cleanup recommendations */}
                <WorklogSection title="4. Access Cleanup Recommendations">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {currentAccess.length > 0 && (
                      <div>
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-rose-600">Remove</p>
                        <ul className="space-y-1">
                          {currentAccess.map((r) => (
                            <li key={r.id} className="text-sm text-slate-600">
                              <span className="font-medium text-navy-800">{r.item}</span> — {r.recommendation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div>
                      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-600">Add</p>
                      <ul className="space-y-1">
                        {newAccess.map((r) => (
                          <li key={r.id} className="text-sm text-slate-600">
                            <span className="font-medium text-navy-800">{r.item}</span> — {r.recommendation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </WorklogSection>

                {/* AI starter brief summary */}
                <WorklogSection title="5. AI Starter Brief Summary">
                  <div className="space-y-1">
                    {briefSections.map((s) => (
                      <div key={s.heading} className="flex gap-2 text-sm text-slate-600">
                        <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy-400" />
                        <span className="font-medium text-navy-700">{s.heading}:</span>
                        <span className="truncate">{s.items.map((i) => i.value).join('; ')}</span>
                      </div>
                    ))}
                  </div>
                </WorklogSection>

                {/* timestamped session summary */}
                <WorklogSection title="6. Session Summary">
                  <div className="space-y-1 text-sm text-slate-600">
                    <p><span className="font-medium text-navy-700">Session timestamp:</span> {timestamp}</p>
                    <p><span className="font-medium text-navy-700">Manager:</span> {form.manager || '—'}</p>
                    <p><span className="font-medium text-navy-700">Tickets generated:</span> {tickets.length}</p>
                    <p><span className="font-medium text-navy-700">Readiness score:</span> {readinessScore}/100</p>
                    <p><span className="font-medium text-navy-700">Risk scan:</span> {riskScanResults.length > 0 ? `Completed — ${dashboardRows.filter((r) => r.risk === 'high').length} high-risk blockers` : 'Not run'}</p>
                  </div>
                </WorklogSection>

                {/* session reset confirmation */}
                <WorklogSection title="7. Session Reset Confirmation" last>
                  <div className="flex items-start gap-2.5 rounded-lg bg-slate-50 p-3">
                    {resetDone ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    ) : (
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    )}
                    <p className="text-sm text-slate-600">
                      {resetDone
                        ? 'Session reset complete. Temporary AI inputs and draft state cleared. Nexus has not stored this session for model training or long-term database retention.'
                        : 'Session reset pending. Temporary AI inputs and draft state will be cleared when the manager ends the session.'}
                    </p>
                  </div>
                </WorklogSection>

                {/* privacy footer */}
                <div className="mt-6 border-t border-slate-200 pt-4">
                  <div className="flex items-start gap-2 text-xs text-slate-400">
                    <FileLock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <p>
                      This worklog was intentionally exported by the manager. It excludes raw handover notes, AI
                      training data, and sensitive source-system records. Submitted tickets retain their normal
                      audit trail in existing request systems.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function WorklogSection({
  title,
  children,
  last = false,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={last ? '' : 'mb-5'}>
      <h4 className="mb-2.5 text-sm font-semibold text-navy-900">{title}</h4>
      {children}
    </div>
  );
}
