import { useNexus } from '../store';
import { scenarios, intakeToggles, type FormState, type ScenarioId } from '../data';
import { Card, SectionTitle, ActionButton, ProgressBar, Toggle } from '../ui';
import {
  User,
  ArrowRight,
  Building2,
  Briefcase,
  Calendar,
  MapPin,
  Laptop,
  Folder,
  Smartphone,
  ShieldCheck,
  KeyRound,
  Printer,
  ClipboardList,
  Sparkles,
  Package,
  Layers,
} from 'lucide-react';

const textIcons: Record<string, typeof User> = {
  user: User,
  'arrow-right': ArrowRight,
  building: Building2,
  briefcase: Briefcase,
  calendar: Calendar,
  'map-pin': MapPin,
};

const toggleIcons: Record<string, typeof Laptop> = {
  laptop: Laptop,
  folder: Folder,
  'message-square': KeyRound,
  mail: User,
  smartphone: Smartphone,
  shield: ShieldCheck,
  key: KeyRound,
  printer: Printer,
};

const textFields: { key: keyof FormState; label: string; icon: string }[] = [
  { key: 'name', label: 'Employee name', icon: 'user' },
  { key: 'transitionType', label: 'Transition type', icon: 'arrow-right' },
  { key: 'previousMinistry', label: 'Previous ministry', icon: 'building' },
  { key: 'newMinistry', label: 'New ministry / team', icon: 'building' },
  { key: 'newRole', label: 'Role', icon: 'briefcase' },
  { key: 'startDate', label: 'Start date', icon: 'calendar' },
  { key: 'location', label: 'Location', icon: 'map-pin' },
  { key: 'manager', label: 'Manager', icon: 'user' },
];

export default function ManagerIntake({ onGenerate }: { onGenerate: () => void }) {
  const { form, updateField, loadScenario, setBundleGenerated, bundleGenerated } = useNexus();
  const isTransfer = form.transitionType === 'Ministry Transfer';

  function handleGenerate() {
    setBundleGenerated(true);
    onGenerate();
  }

  const activeCount = intakeToggles.filter((t) => form[t.key]).length;

  return (
    <div className="animate-fade-in">
      <SectionTitle
        eyebrow="Step 1"
        title="Manager Intake"
        description="One guided intake replaces ten separate onboarding requests. Select a scenario or start blank — the form is the single source of truth for every screen."
      />

      {/* Scenario selector */}
      <Card className="mb-6">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy-900">
          <Layers className="h-4 w-4 text-navy-600" />
          Scenario selector
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {(['transfer', 'newhire', 'blank'] as ScenarioId[]).map((id) => {
            const s = scenarios[id!];
            const isActive =
              (id === 'transfer' && form.name === 'John Doe') ||
              (id === 'newhire' && form.name === 'Alex Morgan') ||
              (id === 'blank' && form.name === '');
            return (
              <button
                key={id}
                onClick={() => loadScenario(id)}
                className={`rounded-lg border p-3 text-left transition-all ${
                  isActive
                    ? 'border-navy-600 bg-navy-50 ring-2 ring-navy-200'
                    : 'border-slate-200 bg-white hover:border-navy-300 hover:bg-navy-50/30'
                }`}
              >
                <p className="text-sm font-semibold text-navy-900">{s.label}</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {id === 'transfer' && 'Ministry transfer with access cleanup'}
                  {id === 'newhire' && 'New hire with provisioning review'}
                  {id === 'blank' && 'Clear all fields for custom entry'}
                </p>
              </button>
            );
          })}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-700 text-white">
                <ClipboardList className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-navy-900">Transition intake form</h3>
                <p className="text-sm text-slate-500">
                  {form.manager ? `Submitted by ${form.manager}` : 'Enter manager name'}
                </p>
              </div>
            </div>

            {/* text fields */}
            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
              {textFields.map((f) => {
                const isPrevMinistry = f.key === 'previousMinistry';
                const Icon = textIcons[f.icon] ?? User;
                return (
                  <div key={f.key} className={isPrevMinistry && !isTransfer ? 'opacity-40' : ''}>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {f.label}
                      {isPrevMinistry && !isTransfer && <span className="ml-1.5 text-slate-300">(N/A for new hire)</span>}
                    </label>
                    <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 focus-within:border-navy-400 focus-within:bg-white">
                      <Icon className="h-4 w-4 shrink-0 text-navy-500" />
                      <input
                        type="text"
                        value={form[f.key] as string}
                        disabled={isPrevMinistry && !isTransfer}
                        onChange={(e) => updateField(f.key, e.target.value as FormState[typeof f.key])}
                        className="w-full bg-transparent text-sm font-medium text-navy-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* toggle fields */}
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Onboarding requirements
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {intakeToggles.map((t) => {
                  const Icon = toggleIcons[t.icon] ?? Laptop;
                  return (
                    <Toggle
                      key={t.key}
                      checked={form[t.key] as boolean}
                      onChange={(v) => updateField(t.key, v as FormState[typeof t.key])}
                      label={t.label}
                      icon={<Icon className="h-4 w-4 shrink-0 text-navy-500" />}
                    />
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
              <ActionButton onClick={handleGenerate} disabled={!form.name || !form.newRole}>
                <Package className="h-4 w-4" />
                Generate Transition Bundle
              </ActionButton>
              {bundleGenerated && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 animate-scale-in">
                  <Sparkles className="h-3.5 w-3.5" /> Bundle generated
                </span>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <h3 className="mb-3 text-sm font-semibold text-navy-900">Intake completeness</h3>
            <div className="space-y-3">
              {[
                { label: 'Employee identity', val: form.name && form.transitionType ? 100 : 50 },
                { label: 'Role & destination', val: form.newRole && form.newMinistry ? 100 : 50 },
                { label: 'Logistics & location', val: form.startDate && form.location ? 100 : 50 },
                { label: 'Onboarding requirements', val: Math.round((activeCount / 8) * 100) },
              ].map((row) => (
                <div key={row.label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-slate-600">{row.label}</span>
                    <span className="font-semibold text-navy-700">{row.val}%</span>
                  </div>
                  <ProgressBar value={row.val} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-navy-50/40">
            <div className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-700 text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-navy-900">What happens next</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Nexus generates a bundle of ONRequest ticket drafts tailored to {form.name || 'the employee'}'s
                  role, location, and selected requirements — ready for review and submission.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
