import { useNexus } from '../store';
import { useLocale } from '../locale';
import { intakeToggles, locationOptions, ministryOptions, type FormState, type ScenarioId } from '../data';
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
  const { form, updateField, loadScenario, activeScenario, setBundleGenerated, bundleGenerated } = useNexus();
  const { t } = useLocale();
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
        title={t('intake.title')}
        description="One guided intake replaces ten separate onboarding requests. Select a scenario or start blank — the form is the single source of truth for every screen."
      />

      {/* Scenario selector */}
      <Card className="mb-6 intake-scenario-card" padded={false}>
        <div className="p-5 sm:p-6">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy-900">
          <Layers className="h-4 w-4 text-navy-600" />
          {t('intake.scenario')}
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {(['transfer', 'newhire', 'blank'] as ScenarioId[]).map((id) => {
            const isActive = activeScenario === id;
            return (
              <button
                type="button"
                key={id}
                onClick={() => loadScenario(id)}
                className={`rounded-2xl border p-5 text-left transition-colors duration-200 ${
                  isActive
                    ? 'border-blue-200 bg-blue-50/60'
                    : 'premium-interactive border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">{t(`scenario.${id}`)}</p>
                  {isActive && <span className="h-2 w-2 rounded-full bg-blue-600" aria-label={t('scenario.selected')} />}
                </div>
                <p className="mt-0.5 text-xs text-slate-500">
                  {id === 'transfer' && t('scenario.transferDesc')}
                  {id === 'newhire' && t('scenario.newhireDesc')}
                  {id === 'blank' && t('scenario.blankDesc')}
                </p>
              </button>
            );
          })}
        </div>
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
                <h3 className="font-semibold text-navy-900">{t('intake.form')}</h3>
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
                    <div className="flex min-h-11 items-center gap-2.5 rounded-xl border border-slate-300 bg-white px-3 transition-colors focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                      <Icon className="h-4 w-4 shrink-0 text-navy-500" />
                      {f.key === 'transitionType' ? (
                        <select
                          value={form.transitionType}
                          onChange={(e) => updateField('transitionType', e.target.value as FormState['transitionType'])}
                          className="h-10 w-full appearance-none bg-transparent text-sm font-medium text-slate-900 outline-none"
                        >
                          <option value="">Select transition type</option>
                          <option value="Ministry Transfer">Ministry Transfer</option>
                          <option value="New Hire">New Hire</option>
                        </select>
                      ) : f.key === 'newMinistry' ? (
                        <select
                          value={form.newMinistry}
                          onChange={(e) => updateField('newMinistry', e.target.value)}
                          className="h-10 w-full appearance-none bg-transparent text-sm font-medium text-slate-900 outline-none"
                        >
                          {ministryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                      ) : f.key === 'location' ? (
                        <select
                          value={form.location}
                          onChange={(e) => updateField('location', e.target.value)}
                          className="h-10 w-full appearance-none bg-transparent text-sm font-medium text-slate-900 outline-none"
                        >
                          {locationOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                      ) : (
                        <input
                          type={f.key === 'startDate' ? 'date' : 'text'}
                          value={form[f.key] as string}
                          disabled={isPrevMinistry && !isTransfer}
                          onChange={(e) => updateField(f.key, e.target.value as FormState[typeof f.key])}
                          className="h-10 w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
                        />
                      )}
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

            <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-6">
              <ActionButton onClick={handleGenerate} disabled={!form.name || !form.newRole}>
                <Package className="h-4 w-4" />
                {t('form.generate')}
              </ActionButton>
              {bundleGenerated && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 animate-scale-in">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600" /> Bundle generated
                </span>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <h3 className="mb-3 text-sm font-semibold text-navy-900">{t('intake.completeness')}</h3>
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

          <Card className="bg-slate-50/70">
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
