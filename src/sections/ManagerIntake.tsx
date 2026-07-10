import { useState } from 'react';
import {
  employee,
  defaultIntakeSelections,
  intakeToggles,
  type IntakeSelections,
} from '../data';
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
  CheckCircle2,
  ClipboardList,
  Sparkles,
  Package,
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
  smartphone: Smartphone,
  shield: ShieldCheck,
  key: KeyRound,
  printer: Printer,
};

export default function ManagerIntake({ onGenerate }: { onGenerate: () => void }) {
  const [form, setForm] = useState({
    name: employee.name,
    transitionType: employee.transitionType,
    previousMinistry: employee.previousMinistry,
    newMinistry: employee.newMinistry,
    newRole: employee.newRole,
    startDate: employee.startDate,
    location: employee.location,
    manager: employee.manager,
  });
  const [toggles, setToggles] = useState<IntakeSelections>(defaultIntakeSelections);
  const [generating, setGenerating] = useState(false);

  const textFields = [
    { key: 'name', label: 'Employee name' },
    { key: 'transitionType', label: 'Transition type' },
    { key: 'previousMinistry', label: 'Previous ministry' },
    { key: 'newMinistry', label: 'New ministry / team' },
    { key: 'newRole', label: 'Role' },
    { key: 'startDate', label: 'Start date' },
    { key: 'location', label: 'Location' },
    { key: 'manager', label: 'Manager' },
  ] as const;

  function handleGenerate() {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      onGenerate();
    }, 1600);
  }

  const activeCount = Object.values(toggles).filter(Boolean).length;

  return (
    <div className="animate-fade-in">
      <SectionTitle
        eyebrow="Step 1"
        title="Manager Intake"
        description="One guided intake replaces ten separate onboarding requests. Nexus captures everything needed to generate a role-based transition bundle."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-700 text-white">
                <ClipboardList className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-navy-900">Transition intake form</h3>
                <p className="text-sm text-slate-500">Submitted by {employee.manager}</p>
              </div>
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" /> Pre-filled
              </span>
            </div>

            {/* text fields */}
            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
              {textFields.map((f) => {
                const Icon = textIcons[f.key.replace(/([A-Z])/g, '-$1').toLowerCase()] ?? User;
                return (
                  <div key={f.key}>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {f.label}
                    </label>
                    <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5">
                      <Icon className="h-4 w-4 shrink-0 text-navy-500" />
                      <input
                        type="text"
                        value={form[f.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full bg-transparent text-sm font-medium text-navy-900 outline-none placeholder:text-slate-400"
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
                      checked={toggles[t.key as keyof IntakeSelections]}
                      onChange={(v) => setToggles({ ...toggles, [t.key]: v })}
                      label={t.label}
                      icon={<Icon className="h-4 w-4 shrink-0 text-navy-500" />}
                    />
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
              <ActionButton onClick={handleGenerate} loading={generating}>
                <Package className="h-4 w-4" />
                Generate Transition Bundle
              </ActionButton>
              {generating && (
                <span className="inline-flex items-center gap-2 text-sm text-navy-600">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  Generating role-based onboarding bundle…
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
                { label: 'Employee identity', val: 100 },
                { label: 'Role & destination', val: 100 },
                { label: 'Logistics & location', val: 100 },
                { label: 'Onboarding requirements', val: Math.round((activeCount / 6) * 100) },
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
                  Nexus generates a bundle of ONRequest ticket drafts tailored to Priya's role, location, and
                  selected requirements — ready for review and submission.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
