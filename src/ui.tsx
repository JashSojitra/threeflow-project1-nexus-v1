import type { RiskLevel, TicketStatus } from './data';
import { FileText } from 'lucide-react';

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  const map: Record<RiskLevel, { label: string; cls: string; dot: string }> = {
    low: { label: 'Low risk', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
    medium: { label: 'Medium risk', cls: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
    high: { label: 'High risk', cls: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
  };
  const s = map[risk];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${s.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

export function StatusPill({ status }: { status: TicketStatus }) {
  const map: Record<TicketStatus, { label: string; cls: string }> = {
    'draft-ready': { label: 'Draft ready', cls: 'bg-sky-50 text-sky-700' },
    optional: { label: 'Optional', cls: 'bg-slate-100 text-slate-600' },
    'needs-approval': { label: 'Needs approval', cls: 'bg-amber-50 text-amber-700' },
    attention: { label: 'Attention required', cls: 'bg-rose-50 text-rose-700' },
    submitted: { label: 'Submitted', cls: 'bg-navy-50 text-navy-700' },
    'pending-approval': { label: 'Pending approval', cls: 'bg-indigo-50 text-indigo-700' },
    'in-progress': { label: 'In progress', cls: 'bg-sky-50 text-sky-700' },
    waiting: { label: 'Waiting on PDF', cls: 'bg-amber-50 text-amber-700' },
    'not-started': { label: 'Not started', cls: 'bg-slate-100 text-slate-600' },
    complete: { label: 'Complete', cls: 'bg-emerald-50 text-emerald-700' },
  };
  const s = map[status];
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${s.cls}`}>{s.label}</span>;
}

export function ApprovalTag({ path }: { path: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
      <span className="h-1.5 w-1.5 rounded-full bg-navy-400" />
      {path}
    </span>
  );
}

export function ProgressBar({ value, tone = 'navy' }: { value: number; tone?: 'navy' | 'emerald' | 'amber' | 'rose' }) {
  const tones = {
    navy: 'bg-navy-600',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  };
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className={`h-full rounded-full ${tones[tone]} transition-all duration-700 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function Card({
  children,
  className = '',
  padded = true,
}: {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white shadow-card ${padded ? 'p-5' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5">
      {eyebrow && <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-navy-500">{eyebrow}</p>}
      <h2 className="font-serif text-2xl font-semibold text-navy-900">{title}</h2>
      {description && <p className="mt-1.5 max-w-2xl text-sm text-slate-500">{description}</p>}
    </div>
  );
}

export function ActionButton({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'success' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}) {
  const variants = {
    primary: 'bg-navy-700 text-white hover:bg-navy-800 active:bg-navy-900 shadow-sm',
    secondary: 'bg-white text-navy-700 border border-navy-200 hover:bg-navy-50',
    ghost: 'text-navy-600 hover:bg-navy-50',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm',
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
      {children}
    </button>
  );
}

export function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const tone = score >= 75 ? '#059669' : score >= 50 ? '#d97706' : '#e11d48';
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={tone}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-navy-900">{score}</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Ready</span>
      </div>
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  icon,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-left transition-colors hover:border-navy-300 hover:bg-navy-50/30"
    >
      <span className="flex items-center gap-2.5 text-sm font-medium text-navy-800">
        {icon}
        {label}
      </span>
      <span
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          checked ? 'bg-navy-600' : 'bg-slate-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </span>
    </button>
  );
}

export function Toast({ message, show }: { message: string; show: boolean }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg bg-navy-900 px-4 py-3 text-sm font-medium text-white shadow-cardLg transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs">✓</span>
      {message}
    </div>
  );
}

export function MiniScoreRing({ score, size = 48 }: { score: number; size?: number }) {
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const tone = score >= 75 ? '#059669' : score >= 50 ? '#d97706' : '#e11d48';
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={tone}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-sm font-bold text-navy-900">{score}</span>
    </div>
  );
}

export function StepProgress({ steps, activeIndex }: { steps: { label: string }[]; activeIndex: number }) {
  return (
    <div className="hidden items-center gap-1 px-6 py-3 md:flex">
      {steps.map((step, i) => {
        const isActive = i === activeIndex;
        const isDone = i < activeIndex;
        return (
          <div key={i} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  isDone
                    ? 'bg-navy-700 text-white'
                    : isActive
                      ? 'bg-navy-700 text-white ring-4 ring-navy-100'
                      : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isDone ? '✓' : i + 1}
              </span>
              <span
                className={`text-xs font-medium ${isActive || isDone ? 'text-navy-800' : 'text-slate-400'}`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`mx-2 h-0.5 flex-1 rounded ${isDone ? 'bg-navy-600' : 'bg-slate-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof FileText;
  title: string;
  description: string;
}) {
  return (
    <Card className="flex flex-col items-center justify-center py-16 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="font-serif text-xl font-semibold text-navy-900">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-slate-500">{description}</p>
    </Card>
  );
}
