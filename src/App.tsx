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
import AccessibilityPanel from './AccessibilityPanel';
import { useLocale } from './locale';
import { ClipboardList, Rocket, LayoutDashboard, ShieldCheck, FileText, Lock, FileDown, PanelLeftClose, PanelLeft, ShieldCheck as Logo } from 'lucide-react';

type TabId = 'intake' | 'launchpad' | 'dashboard' | 'access' | 'brief' | 'rai' | 'worklog';
const tabs: { id: Exclude<TabId, 'rai'>; key: string; icon: typeof ClipboardList }[] = [
  { id: 'intake', key: 'nav.intake', icon: ClipboardList }, { id: 'launchpad', key: 'nav.launchpad', icon: Rocket },
  { id: 'dashboard', key: 'nav.dashboard', icon: LayoutDashboard }, { id: 'access', key: 'nav.access', icon: ShieldCheck },
  { id: 'brief', key: 'nav.brief', icon: FileText }, { id: 'worklog', key: 'nav.worklog', icon: FileDown },
];

function AppContent() {
  const [active, setActive] = useState<TabId>('intake'); const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState({ msg: '', show: false }); const { form } = useNexus(); const { locale, setLocale, t } = useLocale();
  const showToast = (msg: string) => { setToast({ msg, show: true }); window.setTimeout(() => setToast(current => ({ ...current, show: false })), 2800); };
  const goTo = (tab: TabId, msg?: string) => { setActive(tab); if (msg) showToast(msg); };
  const activeIndex = tabs.findIndex(tab => tab.id === active); const initials = (form.manager || '?').split(' ').map(part => part[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  return <div className="flex min-h-screen bg-[#f5f5f7]">
    <aside className={`sticky top-0 hidden h-screen shrink-0 flex-col border-r border-slate-200/70 bg-[#fbfbfc] transition-[width] duration-200 lg:flex ${sidebarOpen ? 'w-64' : 'w-[72px]'}`}>
      <div className="flex h-16 items-center gap-3 border-b border-slate-200/70 px-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white"><Logo className="h-5 w-5" aria-hidden="true" /></span>{sidebarOpen && <div className="leading-tight"><p className="text-sm font-semibold tracking-tight text-slate-950">Project Nexus</p><p className="text-[11px] text-slate-500">{t('header.readiness')}</p></div>}</div>
      <nav aria-label={t('header.workflow')} className="flex-1 space-y-1 overflow-y-auto px-3 py-5">{tabs.map(tab => { const Icon = tab.icon; const isActive = active === tab.id; return <button key={tab.id} onClick={() => setActive(tab.id)} title={t(tab.key)} className={`group flex min-h-10 w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'} ${!sidebarOpen ? 'justify-center' : ''}`}><Icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} aria-hidden="true" />{sidebarOpen && <span className="flex-1 text-left">{t(tab.key)}</span>}</button>; })}</nav>
      <div className="border-t border-slate-200/70 p-3">{sidebarOpen && <div className="flex items-center gap-2 px-1"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">{initials}</span><div className="leading-tight"><p className="text-xs font-semibold text-slate-800">{form.manager || t('common.manager')}</p><p className="text-[10px] text-slate-400">{t('common.signedIn')}</p></div></div>}<button onClick={() => setSidebarOpen(value => !value)} aria-label={t('common.collapse')} className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-100 hover:text-slate-700">{sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}{sidebarOpen && t('common.collapse')}</button></div>
    </aside>
    <div className="flex min-w-0 flex-1 flex-col"><header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur-sm"><div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white lg:hidden"><Logo className="h-4 w-4" /></span><div className="leading-tight"><p className="text-sm font-semibold text-slate-950">{t('header.transitions')}</p><p className="hidden text-xs text-slate-500 sm:block">{t('header.subtitle')}</p></div><div className="ml-auto flex items-center gap-2"><button onClick={() => setActive('rai')} className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800 sm:flex"><Lock className="h-3.5 w-3.5" aria-hidden="true" />{t('header.security')}</button><div className="inline-flex rounded-lg border border-slate-200 p-0.5" role="group" aria-label={t('header.language')}>{(['en','fr'] as const).map(item => <button key={item} onClick={() => setLocale(item)} aria-pressed={locale === item} className={`rounded-md px-2 py-1 text-xs font-semibold ${locale === item ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{item.toUpperCase()}</button>)}</div><span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-500"><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-blue-500" />{t('header.prototype')}</span></div></div>{active !== 'rai' && <StepProgress steps={tabs.map(tab => ({ label: t(tab.key) }))} activeIndex={Math.max(0, activeIndex)} />}</header>
      <EmployeeHeader />
      <nav aria-label={t('header.workflow')} className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden"><div className="flex gap-1 overflow-x-auto px-2">{tabs.map(tab => { const Icon = tab.icon; return <button key={tab.id} onClick={() => setActive(tab.id)} className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-3 text-xs font-medium transition-colors ${active === tab.id ? 'text-blue-700' : 'text-slate-500'}`}><Icon className="h-3.5 w-3.5" aria-hidden="true" />{t(tab.key)}</button>; })}</div></nav>
      <main className="flex-1 px-4 py-7 sm:px-6 lg:px-8 lg:py-9"><div className="mx-auto max-w-[1180px]">{active === 'intake' && <ManagerIntake onGenerate={() => goTo('launchpad', t('form.generated'))} />}{active === 'launchpad' && <TicketLaunchpad onToast={showToast} />}{active === 'dashboard' && <ReadinessDashboard />}{active === 'access' && <AccessCleanupReview onToast={showToast} />}{active === 'brief' && <AIStarterBrief onToast={showToast} />}{active === 'rai' && <ResponsibleAI />}{active === 'worklog' && <WorklogExport onToast={showToast} />}</div></main>
      <footer className="border-t border-slate-200/80 bg-white"><div className="mx-auto flex max-w-[1180px] flex-col justify-between gap-2 px-6 py-4 text-xs text-slate-400 sm:flex-row"><p>{t('footer.product')}</p><p className="shrink-0">{t('footer.sample')}</p></div></footer></div>
    <Toast message={toast.msg} show={toast.show} /><AccessibilityPanel />
  </div>;
}
export default function App() { return <NexusProvider><AppContent /></NexusProvider>; }
