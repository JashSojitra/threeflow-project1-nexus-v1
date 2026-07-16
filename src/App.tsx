import { useState } from 'react';
import { NexusProvider, useNexus } from './store';
import { Toast, StepProgress } from './ui';
import EmployeeHeader from './EmployeeHeader';
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
  PanelLeftClose,
  PanelLeft,
  ShieldCheck as Logo,
} from 'lucide-react';

type TabId = 'intake' | 'launchpad' | 'dashboard' | 'access' | 'brief' | 'rai' | 'worklog';

const tabs: { id: TabId; label: string; shortLabel: string; icon: typeof ClipboardList; step: string }[] = [
  { id: 'intake', label: 'Manager Intake', shortLabel: 'Intake', icon: ClipboardList, step: '1' },
  { id: 'launchpad', label: 'Ticket Launchpad', shortLabel: 'Ticket Bundle', icon: Rocket, step: '2' },
  { id: 'dashboard', label: 'Readiness Dashboard', shortLabel: 'Readiness', icon: LayoutDashboard, step: '3' },
  { id: 'access', label: 'Access Cleanup Review', shortLabel: 'Access Review', icon: ShieldCheck, step: '4' },
  { id: 'brief', label: 'AI Starter Brief', shortLabel: 'Starter Brief', icon: FileText, step: '5' },
  { id: 'rai', label: 'Responsible AI & Security', shortLabel: 'Responsible AI', icon: Lock, step: '6' },
  { id: 'worklog', label: 'Worklog Export + Reset', shortLabel: 'Export & Reset', icon: FileDown, step: '7' },
];

const stepProgress = [
  { label: 'Intake' },
  { label: 'Ticket Bundle' },
  { label: 'Readiness' },
  { label: 'Access Review' },
  { label: 'Starter Brief' },
  { label: 'Export & Reset' },
];

function AppContent() {
  const [active, setActive] = useState<TabId>('intake');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState<{ msg: string; show: boolean }>({ msg: '', show: false });
  const { form } = useNexus();

  function showToast(msg: string) {
    setToast({ msg, show: true });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 2800);
  }

  function goTo(tab: TabId, msg?: string) {
    setActive(tab);
    if (msg) showToast(msg);
  }

  const activeIndex = tabs.findIndex((t) => t.id === active);

  const managerInitials = (form.manager || '?')
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* left sidebar */}
      <aside
        className={`sticky top-0 hidden h-screen shrink-0 flex-col border-r border-slate-200 bg-white transition-all duration-300 lg:flex ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* logo */}
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-800 text-white shadow-sm">
            <Logo className="h-5 w-5" />
          </span>
          {sidebarOpen && (
            <div className="leading-tight">
              <p className="font-serif text-base font-semibold text-navy-900">Project Nexus</p>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Transition Readiness Hub
              </p>
            </div>
          )}
        </div>

        {/* nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                title={tab.label}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-navy-700 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-navy-50 hover:text-navy-800'
                } ${!sidebarOpen ? 'justify-center' : ''}`}
              >
                <tab.icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left">{tab.label}</span>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {tab.step}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* footer */}
        <div className="border-t border-slate-200 p-3">
          {sidebarOpen && (
            <>
              <div className="mb-2 rounded-lg bg-amber-50 px-3 py-1.5 text-center text-[11px] font-medium text-amber-700">
                <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
                Prototype Simulation
              </div>
              <div className="flex items-center gap-2 px-1">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-100 text-xs font-semibold text-navy-700">
                  {managerInitials}
                </span>
                <div className="leading-tight">
                  <p className="text-xs font-semibold text-navy-800">{form.manager || 'Manager'}</p>
                  <p className="text-[10px] text-slate-400">Signed in</p>
                </div>
              </div>
            </>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-100 hover:text-navy-700"
          >
            {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
            {sidebarOpen && 'Collapse'}
          </button>
        </div>
      </aside>

      {/* main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* top header */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-800 text-white lg:hidden">
              <Logo className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="font-serif text-sm font-semibold text-navy-900">Project Nexus</p>
              <p className="hidden text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:block">
                AI Employee Transition Readiness Hub
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
                Prototype Simulation
              </span>
            </div>
          </div>
          {/* step progress */}
          <StepProgress steps={stepProgress} activeIndex={Math.min(activeIndex, stepProgress.length - 1)} />
        </header>

        {/* employee context header */}
        <EmployeeHeader />

        {/* mobile tab nav */}
        <nav className="sticky top-[105px] z-30 border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden">
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
                  {tab.shortLabel}
                </button>
              );
            })}
          </div>
        </nav>

        {/* main content */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-6xl">
            {active === 'intake' && <ManagerIntake onGenerate={() => goTo('launchpad', 'Transition bundle generated')} />}
            {active === 'launchpad' && <TicketLaunchpad onToast={showToast} />}
            {active === 'dashboard' && <ReadinessDashboard />}
            {active === 'access' && <AccessCleanupReview onToast={showToast} />}
            {active === 'brief' && <AIStarterBrief onToast={showToast} />}
            {active === 'rai' && <ResponsibleAI />}
            {active === 'worklog' && <WorklogExport onToast={showToast} />}
          </div>
        </main>

        {/* footer */}
        <footer className="border-t border-slate-200 bg-white">
          <div className="flex flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-slate-400 sm:flex-row">
            <p>
              Project Nexus replaces ten separate onboarding requests with one guided intake that generates ONRequest
              ticket drafts, tracks readiness, flags access risks, exports an optional session worklog PDF, and
              creates an AI-powered starter brief.
            </p>
            <p className="shrink-0">Sample data only · No live integrations</p>
          </div>
        </footer>
      </div>

      <Toast message={toast.msg} show={toast.show} />
    </div>
  );
}

export default function App() {
  return (
    <NexusProvider>
      <AppContent />
    </NexusProvider>
  );
}
