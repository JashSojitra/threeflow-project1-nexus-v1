import { useState } from 'react';
import { useNexus } from '../store';
import { useLocale } from '../locale';
import { Card, SectionTitle, ActionButton, EmptyState } from '../ui';
import { formatDate } from '../data';
import {
  FileText,
  Loader2,
  CheckCircle2,
  Download,
  User,
  Building2,
  Briefcase,
  CalendarClock,
  Sparkles,
  ShieldCheck,
  Calendar,
  Users,
  ClipboardList,
  KeyRound,
  HelpCircle,
  Trash2,
  CheckCircle,
  GraduationCap,
  AlertTriangle,
  Package,
} from 'lucide-react';

const iconMap: Record<string, typeof FileText> = {
  briefcase: Briefcase,
  calendar: Calendar,
  users: Users,
  'file-text': FileText,
  'clipboard-list': ClipboardList,
  key: KeyRound,
  'help-circle': HelpCircle,
  trash: Trash2,
  'check-circle': CheckCircle,
  'graduation-cap': GraduationCap,
  'alert-triangle': AlertTriangle,
};

export default function AIStarterBrief({ onToast }: { onToast: (msg: string) => void }) {
  const { form, briefSections, briefGenerated, setBriefGenerated, handoverNotes, setHandoverNotes, bundleGenerated } = useNexus();
  const { locale } = useLocale();
  const [generating, setGenerating] = useState(false);
  const isMaryamDemo = form.name === 'Maryam Arif' && form.transitionType === 'Ministry Transfer';

  if (!bundleGenerated) {
    return (
      <div className="animate-fade-in">
        <SectionTitle eyebrow="Step 5" title="AI Starter Brief" description="" />
        <EmptyState
          icon={Package}
          title="No brief available yet"
          description="Generate a transition bundle from the Manager Intake first, then create an AI starter brief."
        />
      </div>
    );
  }

  function generate() {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setBriefGenerated(true);
      onToast(locale === 'fr' ? 'Le document d’accueil a été généré à partir des exemples de notes de transfert.' : 'Starter brief generated from the sample handover notes.');
    }, 1800);
  }

  return (
    <div className="animate-fade-in">
      <SectionTitle
        eyebrow="Step 5"
        title="AI Starter Brief"
        description={`Paste temporary handover notes and Nexus generates a clean starter brief for ${form.name || 'this employee'}'s first week. Raw notes are processed and discarded.`}
      />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* handover notes input */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy-900">
              <FileText className="h-4 w-4 text-navy-600" />
              Handover notes
            </h3>

            {/* privacy note */}
            <div className="mb-3 flex items-start gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50/50 p-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <p className="text-xs leading-relaxed text-emerald-700">
                <span className="font-semibold">Temporary AI Processing:</span> Handover notes are used only to generate the starter brief and are not used for model training. Raw notes remain available while the active case is being prepared; after the manager approves and saves the brief, they can be cleared while the structured brief remains with the case.
              </p>
            </div>

            {isMaryamDemo && <><p className="mb-1 text-xs font-semibold text-slate-700">{locale === 'fr' ? 'Exemple de notes de transfert non structurées' : 'Sample unstructured handover notes'}</p><p className="mb-3 text-xs leading-relaxed text-slate-500">{locale === 'fr' ? 'Dans le prototype, ces exemples de notes représentent les renseignements recueillis auprès de l’ancienne équipe de l’employée et de son nouveau gestionnaire.' : 'For the prototype, these sample notes represent information collected from the employee’s previous team and new manager.'}</p></>}

            <textarea
              value={handoverNotes}
              onChange={(e) => setHandoverNotes(e.target.value)}
              disabled={generating}
              rows={18}
              placeholder="Paste handover notes here…"
              className="min-h-[22rem] w-full resize-y rounded-xl border border-slate-300 bg-white p-4 text-sm leading-relaxed text-slate-900 outline-none transition-colors duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-slate-50 disabled:opacity-60"
            />

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                {`${handoverNotes.length} characters`}
              </span>
              <div className="flex flex-wrap gap-2"><button type="button" onClick={() => setHandoverNotes('')} disabled={!handoverNotes || generating} className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-60">{locale === 'fr' ? 'Effacer les notes brutes' : 'Clear Raw Notes'}</button><ActionButton onClick={generate} loading={generating} disabled={!handoverNotes.trim()}><Sparkles className="h-4 w-4" />{locale === 'fr' ? (briefGenerated ? 'Regénérer le document d’accueil' : 'Générer le document d’accueil') : (briefGenerated ? 'Regenerate Starter Brief' : 'Generate Starter Brief')}</ActionButton></div>
            </div>
          </Card>
        </div>

        {/* brief output */}
        <div className="lg:col-span-3">
          {!briefGenerated && !generating && (
            <Card className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
                <FileText className="h-6 w-6" />
              </span>
              <h3 className="font-serif text-xl font-semibold text-navy-900">No brief generated yet</h3>
              <p className="mt-1.5 max-w-sm text-sm text-slate-500">
                Nexus will synthesize the handover notes into a structured starter brief with role overview,
                priorities, contacts, documents, and questions.
              </p>
            </Card>
          )}

          {generating && (
            <Card className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
              <Loader2 className="mb-4 h-10 w-10 animate-spin text-navy-600" />
              <h3 className="font-serif text-xl font-semibold text-navy-900">Generating brief…</h3>
              <p className="mt-1.5 text-sm text-slate-500">Synthesizing handover notes into structured sections.</p>
              <div className="mt-5 w-full max-w-sm space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-3 rounded shimmer-bg animate-shimmer" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </Card>
          )}

          {briefGenerated && (
            <div className="animate-fade-in space-y-4">
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                Starter brief generated from the sample handover notes.
              </div>

              <Card padded={false} className="overflow-hidden">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-700 text-white">
                      <FileText className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-navy-900">
                        Starter Brief — {form.name || 'Employee'}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {form.newRole || 'Role'} · {[form.newMinistry, form.newTeam].filter(Boolean).join(' / ') || 'Team'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" /> AI-generated
                    </span>
                    <ActionButton variant="secondary" onClick={() => onToast('PDF export — prototype simulation')}>
                      <Download className="h-4 w-4" />
                      Export PDF
                    </ActionButton>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-px bg-slate-100 sm:grid-cols-4">
                  {[
                    { icon: User, label: 'Employee', value: form.name || '—' },
                    { icon: Building2, label: 'Team', value: [form.newMinistry, form.newTeam].filter(Boolean).join(' / ') || '—' },
                    { icon: Briefcase, label: 'Role', value: form.newRole || '—' },
                    { icon: CalendarClock, label: 'Start', value: form.startDate ? formatDate(form.startDate) : '—' },
                  ].map((m) => (
                    <div key={m.label} className="bg-white px-5 py-3">
                      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        <m.icon className="h-3.5 w-3.5" /> {m.label}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-navy-900">{m.value}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                {briefSections.map((section) => {
                  const Icon = iconMap[section.icon] ?? FileText;
                  return (
                    <Card key={section.heading}>
                      <h4 className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-2 text-sm font-semibold text-navy-900">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                          <Icon className="h-4 w-4" />
                        </span>
                        {section.heading}
                      </h4>
                      <ul className="space-y-2.5">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex flex-col gap-0.5">
                            <span className="text-[11px] font-semibold uppercase tracking-wide text-navy-500">
                              {item.label}
                            </span>
                            <span className="text-sm leading-relaxed text-slate-700">{item.value}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  );
                })}
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-navy-200 bg-navy-50/40 p-4">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                <div>
                  <h4 className="text-sm font-semibold text-navy-900">AI summary</h4>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {form.name || 'The employee'}'s first week should focus on confirming workspace access, reviewing
                    active files, and attending the branch check-in. Payroll confirmation and building access
                    approval are the key outstanding blockers.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
