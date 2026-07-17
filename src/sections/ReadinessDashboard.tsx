import { useState } from 'react';
import { useNexus } from '../store';
import { Card, SectionTitle, RiskBadge, StatusPill, ScoreRing, ProgressBar, ActionButton, EmptyState } from '../ui';
import { formatDate } from '../data';
import {
  Mail,
  Laptop,
  FileText,
  KeyRound,
  Printer,
  ShieldCheck,
  Smartphone,
  AlertTriangle,
  Zap,
  ShieldAlert,
  TrendingUp,
  Clock,
  CheckCircle2,
  Loader2,
  Lightbulb,
  ChevronRight,
  HardDrive,
  Folder,
  MessageSquare,
  GraduationCap,
  Package,
  Trash2,
} from 'lucide-react';

const iconMap: Record<string, typeof Mail> = {
  mail: Mail,
  laptop: Laptop,
  'file-text': FileText,
  key: KeyRound,
  printer: Printer,
  shield: ShieldCheck,
  smartphone: Smartphone,
  'hard-drive': HardDrive,
  folder: Folder,
  'message-square': MessageSquare,
  'graduation-cap': GraduationCap,
  trash: Trash2,
};

export default function ReadinessDashboard() {
  const { form, tickets, dashboardRows, readinessScore, riskScanResults, bundleGenerated } = useNexus();
  const [scanning, setScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);

  if (!bundleGenerated) {
    return (
      <div className="animate-fade-in">
        <SectionTitle eyebrow="Step 3" title="Readiness Dashboard" description="" />
        <EmptyState
          icon={Package}
          title="No tickets to track yet"
          description="Generate a transition bundle from the Manager Intake to see live readiness tracking."
        />
      </div>
    );
  }

  const blockers = dashboardRows.filter((r) => r.risk === 'high').length;
  const pending = tickets.filter((t) => t.status === 'pending-approval' || t.status === 'needs-approval').length;
  const securityIssues = dashboardRows.filter((r) => r.risk === 'high' && (r.icon === 'shield' || r.icon === 'trash')).length;

  const submittedCount = tickets.filter((t) => t.status === 'submitted').length;
  const stats = [
    { label: 'Submitted tickets', value: String(submittedCount), icon: TrendingUp },
    { label: 'Pending approvals', value: String(pending), icon: Clock },
    { label: 'High-risk blockers', value: String(blockers), icon: AlertTriangle, tone: 'rose' as const },
    { label: 'Security actions', value: String(securityIssues), icon: ShieldAlert, tone: 'rose' as const },
  ];

  function runScan() {
    setScanning(true);
    setScanDone(false);
    setTimeout(() => {
      setScanning(false);
      setScanDone(true);
    }, 1800);
  }

  return (
    <div className="animate-fade-in">
      <SectionTitle
        eyebrow="Step 3"
        title="Readiness Dashboard"
        description={`Live tracking of generated tickets, approval status, and AI-flagged risks for ${form.name || 'this employee'}'s transition.`}
      />

      {/* top row: score + stats */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card className="flex items-center gap-6">
          <ScoreRing score={readinessScore} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Overall readiness</p>
            <p className="mt-1 font-serif text-xl font-semibold text-navy-900">
              {readinessScore >= 75 ? 'On track' : readinessScore >= 50 ? 'On track, with blockers' : 'Needs attention'}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {blockers} high-risk {blockers === 1 ? 'item' : 'items'} must close before {form.startDate ? formatDate(form.startDate) : 'start date'}.
            </p>
            <div className="mt-3">
              <ProgressBar value={readinessScore} tone={readinessScore >= 75 ? 'emerald' : readinessScore >= 50 ? 'amber' : 'rose'} />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          {stats.map((s) => (
            <Card key={s.label} className="flex items-center gap-3">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-lg ${
                  s.tone === 'rose' ? 'bg-rose-50 text-rose-600' : 'bg-navy-50 text-navy-700'
                }`}
              >
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-2xl font-bold text-navy-900">{s.value}</p>
                <p className="text-xs font-medium text-slate-500">{s.label}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* AI risk scan + task chart */}
      <div className="mb-6 grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <div className="mb-4 flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-700 text-white">
              <Zap className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <h3 className="font-semibold text-navy-900">AI Risk Scan</h3>
              <p className="text-sm text-slate-500">Scans all generated tickets and flags blockers before the start date.</p>
            </div>
            <ActionButton onClick={runScan} loading={scanning} disabled={scanDone}>
              <Zap className="h-4 w-4" />
              {scanDone ? 'Scan complete' : 'Run AI Risk Scan'}
            </ActionButton>
          </div>

          {scanning && (
            <div className="py-4">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium text-navy-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                Scanning {tickets.length} tickets…
              </div>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 rounded bg-slate-100 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          )}

          {scanDone && (
            <div className="animate-fade-in">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <h4 className="text-sm font-semibold text-navy-900">AI Risk Scan Complete</h4>
              </div>
              <ul className="space-y-2.5">
                {riskScanResults.map((result, i) => (
                  <li key={i} className="flex items-start gap-2.5 rounded-lg bg-slate-50/70 p-3 text-sm text-slate-700">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!scanning && !scanDone && (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <ShieldCheck className="mb-3 h-10 w-10 text-slate-300" />
              <p className="text-sm text-slate-400">Run the AI risk scan to surface blockers across all tickets.</p>
            </div>
          )}
        </Card>

        {/* upcoming deadlines */}
        <Card className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Upcoming deadlines</h3>
          <div className="space-y-1">
            {[
              { label: 'Resolve high-risk blockers', meta: 'Before start date', tone: 'text-red-600 bg-red-50' },
              { label: 'Complete access review', meta: form.startDate ? formatDate(form.startDate) : 'Start date pending', tone: 'text-amber-700 bg-amber-50' },
              { label: 'Confirm onboarding package', meta: 'Day 1', tone: 'text-blue-700 bg-blue-50' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-xl px-2 py-3">
                <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.tone}`}>
                  <Clock className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden">
            <p className="text-xs text-slate-400">
              Score model: Complete 100 · Submitted 70 · In Progress 50 · Pending 35 · Draft 20 · Blocked 0
            </p>
          </div>
        </Card>
      </div>

      {/* dashboard table */}
      <Card padded={false} className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h3 className="flex items-center gap-2 font-semibold text-navy-900">
            <ShieldCheck className="h-4 w-4 text-navy-600" />
            Ticket readiness tracker
          </h3>
          <span className="text-xs text-slate-400">{dashboardRows.length} areas tracked</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50/80 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Area</th>
                <th className="px-5 py-3 font-semibold">Ticket status</th>
                <th className="px-5 py-3 font-semibold">Risk</th>
                <th className="px-5 py-3 font-semibold">AI insight</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dashboardRows.map((row) => {
                const Icon = iconMap[row.icon] ?? Mail;
                return (
                  <tr key={row.id} className="group transition-colors duration-150 hover:bg-slate-50/70">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="font-medium text-navy-900">{row.area}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusPill status={row.ticketStatus} />
                    </td>
                    <td className="px-5 py-3.5">
                      <RiskBadge risk={row.risk} />
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-slate-600">{row.insight}</p>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-navy-500" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
