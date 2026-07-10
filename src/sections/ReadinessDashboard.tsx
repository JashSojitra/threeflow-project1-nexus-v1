import { useState } from 'react';
import { dashboardRows, riskScanResults, employee } from '../data';
import { Card, SectionTitle, RiskBadge, StatusPill, ScoreRing, ProgressBar, ActionButton } from '../ui';
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
} from 'lucide-react';

const iconMap: Record<string, typeof Mail> = {
  mail: Mail,
  laptop: Laptop,
  'file-text': FileText,
  key: KeyRound,
  printer: Printer,
  shield: ShieldCheck,
  smartphone: Smartphone,
};

export default function ReadinessDashboard() {
  const [scanning, setScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const score = 62;

  const blockers = dashboardRows.filter((r) => r.risk === 'high').length;

  const stats = [
    { label: 'Tickets generated', value: '11', icon: TrendingUp },
    { label: 'Pending approvals', value: '3', icon: Clock },
    { label: 'High-risk blockers', value: String(blockers), icon: AlertTriangle, tone: 'rose' as const },
    { label: 'Security issues', value: '1', icon: ShieldAlert, tone: 'rose' as const },
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
        description="Live tracking of generated tickets, approval status, and AI-flagged risks across Priya's transition to TBS."
      />

      {/* top row: score + stats */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card className="flex items-center gap-6">
          <ScoreRing score={score} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Overall readiness</p>
            <p className="mt-1 font-serif text-xl font-semibold text-navy-900">On track, with blockers</p>
            <p className="mt-1 text-sm text-slate-500">
              {blockers} high-risk items must close before {employee.startDate}.
            </p>
            <div className="mt-3">
              <ProgressBar value={score} tone="amber" />
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

      {/* AI risk scan */}
      <Card className="mb-6 overflow-hidden">
        <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 px-5 py-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-700 text-white">
            <Zap className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <h3 className="font-semibold text-navy-900">AI Risk Scan</h3>
            <p className="text-sm text-slate-500">
              Scans all generated tickets and flags blockers before the start date.
            </p>
          </div>
          <ActionButton onClick={runScan} loading={scanning} disabled={scanDone}>
            <Zap className="h-4 w-4" />
            {scanDone ? 'Scan complete' : 'Run AI Risk Scan'}
          </ActionButton>
        </div>

        {scanning && (
          <div className="px-5 py-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-navy-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              Scanning 7 readiness areas…
            </div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 rounded shimmer-bg animate-shimmer" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        )}

        {scanDone && (
          <div className="animate-fade-in px-5 py-5">
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
          <div className="flex flex-col items-center justify-center px-5 py-8 text-center">
            <ShieldCheck className="mb-3 h-10 w-10 text-slate-300" />
            <p className="text-sm text-slate-400">Run the AI risk scan to surface blockers across all tickets.</p>
          </div>
        )}
      </Card>

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
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
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
                  <tr key={row.id} className="group transition-colors hover:bg-slate-50/60">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-50 text-navy-600">
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
