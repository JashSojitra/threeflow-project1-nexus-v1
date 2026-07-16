import { useNexus } from './store';
import { MiniScoreRing } from './ui';
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
    <div className="border-b border-navy-700/30 bg-navy-900">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-xs font-semibold text-white">
            {initials || '?'}
          </span>
          <div className="leading-tight">
            <p className="font-serif text-base font-semibold text-white">{form.name || 'Unnamed employee'}</p>
            <p className="text-xs text-navy-300">
              {form.transitionType || '—'} · {form.newRole || 'Role TBD'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
          {isTransfer && form.previousMinistry && form.previousMinistry !== 'Not applicable' && (
            <>
              <HeaderItem icon={Building2} label="From" value={form.previousMinistry} />
              <ChevronRight className="h-3 w-3 text-navy-500" />
            </>
          )}
          {form.newMinistry && <HeaderItem icon={Building2} label="To" value={form.newMinistry} />}
          {form.startDate && <HeaderItem icon={CalendarClock} label="Start" value={form.startDate} />}
          {form.location && <HeaderItem icon={MapPin} label="At" value={form.location} />}
        </div>

        {bundleGenerated && (
          <div className="ml-auto flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5">
            <MiniScoreRing score={readinessScore} size={36} />
            <div className="leading-tight">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-navy-300">Readiness</p>
              <p className="text-sm font-bold text-white">{readinessScore}/100</p>
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
      <Icon className="h-3 w-3 text-navy-400" />
      <span className="text-navy-400">{label}:</span>
      <span className="font-medium text-navy-100">{value}</span>
    </div>
  );
}
