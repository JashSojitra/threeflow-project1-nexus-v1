import { useState } from 'react';
import { employee, defaultIntakeSelections, type IntakeSelections } from './data';
import { Toast } from './ui';
import ManagerIntake from './sections/ManagerIntake';
import TicketLaunchpad from './sections/TicketLaunchpad';
import ReadinessDashboard from './sections/ReadinessDashboard';
import AccessCleanupReview from './sections/AccessCleanupReview';
import AIStarterBrief from './sections/AIStarterBrief';
import ResponsibleAI from './sections/ResponsibleAI';
import WorklogExport from './sections/WorklogExport';
import {
  ClipboardList,
  Rocket,
  LayoutDashboard,
  ShieldCheck,
  FileText,
  Lock,
  FileDown,
  Building2,
  ChevronRight,
  CircleUser,
  CalendarClock,
  MapPin,
} from 'lucide-react';

type TabId = 'intake' | 'launchpad' | 'dashboard' | 'access' | 'brief' | 'rai' | 'worklog';

const tabs: { id: TabId; label: string; icon: typeof ClipboardList; step: string }[] = [
  { id: 'intake', label: 'Manager Intake', icon: ClipboardList, step: '1' },
  { id: 'launchpad', label: 'Ticket Launchpad', icon: Rocket, step: '2' },
  { id: 'dashboard', label: 'Readiness Dashboard', icon: LayoutDashboard, step: '3' },
  { id: 'access', label: 'Access Cleanup Review', icon: ShieldCheck, step: '4' },
  { id: 'brief', label: 'AI Starter Brief', icon: FileText, step: '5' },
  { id: 'rai', label: 'Responsible AI & Security', icon: Lock, step: '6' },
  { id: 'worklog', label: 'Worklog Export + Reset', icon: FileDown, step: '7' },
];

export default function App() {
  const [active, setActive] = useState<TabId>('intake');
  const [toast, setToast] = useState<{ msg: string; show: boolean }>({ msg: '', show: false });
  const [intakeSelections] = useState<IntakeSelections>(defaultIntakeSelections);

  function showToast(msg: string) {
    setToast({ msg, show: true });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 2800);
  }

  function goTo(tab: TabId, msg?: string) {
    setActive(tab);
    if (msg) showToast(msg);
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* left sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        {/* logo */}
        <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-800 text-white shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="font-serif text-base font-semibold text-navy-900">Project Nexus</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              Transition Readiness Hub
            </p>
          </div>
        </div>

        {/* nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-navy-700 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-navy-50 hover:text-navy-800'
                }`}
              >
                <tab.icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="flex-1 text-left">{tab.label}</span>
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {tab.step}
                </span>
              </button>
            );
          })}
        </nav>

        {/* demo badge */}
        <div className="border-t border-slate-200 p-4">
          <div className="rounded-lg bg-emerald-50 px-3 py-2 text-center text-xs font-medium text-emerald-700">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Demo environment
          </div>
          <div className="mt-3 flex items-center gap-2 px-1">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-100 text-xs font-semibold text-navy-700">
              KN
            </span>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-navy-800">Kathryn Nguyen</p>
              <p className="text-[10px] text-slate-400">Manager · TBS</p>
            </div>
          </div>
        </div>
      </aside>

      {/* main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* mobile header */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden">
          <div className="flex items-center gap-3 px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-800 text-white">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="font-serif text-sm font-semibold text-navy-900">Project Nexus</p>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Transition Readiness Hub
              </p>
            </div>
          </div>
        </header>

        {/* employee context banner */}
        <div className="border-b border-slate-200 bg-gradient-to-r from-navy-800 to-navy-950">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-white">
                  PS
                </span>
                <div>
                  <p className="font-serif text-lg font-semibold text-white">{employee.name}</p>
                  <p className="text-sm text-navy-200">
                    {employee.transitionType} · {employee.classification}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <ContextItem icon={Building2} label="From" value={employee.previousMinistry} />
                <ChevronRight className="h-4 w-4 text-navy-400" />
                <ContextItem icon={Building2} label="To" value={employee.newMinistry} />
                <ContextItem icon={CircleUser} label="Role" value={employee.newRole} />
                <ContextItem icon={CalendarClock} label="Start" value={employee.startDate} />
                <ContextItem icon={MapPin} label="Location" value={employee.location} />
              </div>
            </div>
          </div>
        </div>

        {/* mobile tab nav */}
        <nav className="sticky top-[57px] z-30 border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden">
          <div className="flex gap-1 overflow-x-auto px-2">
            {tabs.map((tab) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-3 text-xs font-medium transition-colors ${
                    isActive ? 'text-navy-800' : 'text-slate-500'
                  }`}
                >
                  <tab.icon className="h-3.5 w-3.5" />
                  {tab.label}
                  {isActive && <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-navy-700" />}
                </button>
              );
            })}
          </div>
        </nav>

        {/* main content */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-6xl">
            {active === 'intake' && (
              <ManagerIntake onGenerate={() => goTo('launchpad', 'Transition bundle generated')} />
            )}
            {active === 'launchpad' && <TicketLaunchpad onToast={showToast} />}
            {active === 'dashboard' && <ReadinessDashboard />}
            {active === 'access' && (
              <AccessCleanupReview adminSelected={intakeSelections.admin} onToast={showToast} />
            )}
            {active === 'brief' && <AIStarterBrief onToast={showToast} />}
            {active === 'rai' && <ResponsibleAI />}
            {active === 'worklog' && <WorklogExport onToast={showToast} />}
          </div>
        </main>

        {/* footer */}
        <footer className="border-t border-slate-200 bg-white">
          <div className="flex flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-slate-400 sm:flex-row">
            <p>
              Project Nexus — Prototype for the Government of Ontario Case Competition. Sample data only. Not
              affiliated with real OPS systems.
            </p>
            <p>ONRequest actions are prototype simulations · No live integrations</p>
          </div>
        </footer>
      </div>

      <Toast message={toast.msg} show={toast.show} />
    </div>
  );
}

function ContextItem({
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
      <Icon className="h-3.5 w-3.5 text-navy-300" />
      <span className="text-navy-300">{label}:</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}
