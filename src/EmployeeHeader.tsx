import { useNexus } from './store';
import { MiniScoreRing } from './ui';
import { formatDate } from './data';
import { Building2, CalendarClock, MapPin, ChevronRight } from 'lucide-react';

export default function EmployeeHeader() {
  const { form, readinessScore, bundleGenerated } = useNexus();
  const isTransfer = form.transitionType === 'Ministry Transfer';
  const initials = (form.name || '?')
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="border-b border-slate-200/80 bg-white">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-100">
            {initials || '?'}
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-900">{form.name || 'Unnamed employee'}</p>
            <p className="text-xs text-slate-500">
              {form.transitionType || '—'} · {form.newRole || 'Role TBD'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
          {isTransfer && form.previousMinistry && form.previousMinistry !== 'Not applicable' && (
            <>
              <HeaderItem icon={Building2} label="From" value={form.previousMinistry} />
              <ChevronRight className="h-3 w-3 text-slate-300" />
            </>
          )}
          {form.newMinistry && <HeaderItem icon={Building2} label="To" value={form.newMinistry} />}
          {form.startDate && <HeaderItem icon={CalendarClock} label="Start" value={formatDate(form.startDate)} />}
          {form.location && <HeaderItem icon={MapPin} label="At" value={form.location} />}
        </div>

        {bundleGenerated && (
          <div className="ml-auto flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5">
            <MiniScoreRing score={readinessScore} size={36} />
            <div className="leading-tight">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Readiness</p>
              <p className="text-sm font-bold text-slate-900">{readinessScore}/100</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HeaderItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon className="h-3 w-3 text-slate-400" />
      <span className="text-slate-400">{label}:</span>
      <span className="font-medium text-slate-700">{value}</span>
    </div>
  );
}
