import { useState } from 'react';
import { briefSections, sampleHandoverNotes, employee } from '../data';
import { Card, SectionTitle, ActionButton } from '../ui';
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
} from 'lucide-react';

const iconMap: Record<string, typeof FileText> = {
  briefcase: Briefcase,
  calendar: Calendar,
  users: Users,
  'file-text': FileText,
  'clipboard-list': ClipboardList,
  key: KeyRound,
  'help-circle': HelpCircle,
};

export default function AIStarterBrief({ onToast }: { onToast: (msg: string) => void }) {
  const [notes, setNotes] = useState(sampleHandoverNotes);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [notesCleared, setNotesCleared] = useState(false);

  function generate() {
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      setNotesCleared(true);
      setNotes('');
      onToast('Starter brief generated. Raw handover notes cleared in prototype simulation.');
    }, 1800);
  }

  return (
    <div className="animate-fade-in">
      <SectionTitle
        eyebrow="Step 5"
        title="AI Starter Brief"
        description="Paste temporary handover notes and Nexus generates a clean starter brief for Priya's first week. Raw notes are processed and discarded."
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
                <span className="font-semibold">Temporary AI Processing:</span> Handover notes are used only to
                generate the starter brief. Raw notes are not retained, not used for model training, and not stored
                as long-term Nexus records.
              </p>
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={generating || generated}
              rows={12}
              placeholder="Paste handover notes here…"
              className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50/50 p-3 text-sm leading-relaxed text-navy-900 outline-none transition-colors focus:border-navy-400 focus:bg-white disabled:opacity-60"
            />

            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {notesCleared ? 'Notes cleared after generation' : `${notes.length} characters`}
              </span>
              <ActionButton onClick={generate} loading={generating} disabled={generated || !notes.trim()}>
                <Sparkles className="h-4 w-4" />
                Generate Starter Brief
              </ActionButton>
            </div>
          </Card>
        </div>

        {/* brief output */}
        <div className="lg:col-span-3">
          {!generated && !generating && (
            <Card className="flex h-full flex-col items-center justify-center py-16 text-center">
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
            <Card className="flex h-full flex-col items-center justify-center py-16 text-center">
              <Loader2 className="mb-4 h-10 w-10 animate-spin text-navy-600" />
              <h3 className="font-serif text-xl font-semibold text-navy-900">Generating brief…</h3>
              <p className="mt-1.5 text-sm text-slate-500">
                Synthesizing handover notes into structured sections.
              </p>
              <div className="mt-5 w-full max-w-sm space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-3 rounded shimmer-bg animate-shimmer"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </Card>
          )}

          {generated && (
            <div className="animate-fade-in space-y-4">
              {/* success message */}
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                Starter brief generated. Raw handover notes cleared in prototype simulation.
              </div>

              {/* brief header */}
              <Card padded={false} className="overflow-hidden">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 bg-navy-50/40 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-700 text-white">
                      <FileText className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-navy-900">
                        Starter Brief — {employee.name}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {employee.newRole} · {employee.newMinistry}
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
                    { icon: User, label: 'Employee', value: employee.name },
                    { icon: Building2, label: 'Ministry', value: employee.newMinistry },
                    { icon: Briefcase, label: 'Role', value: employee.newRole },
                    { icon: CalendarClock, label: 'Start', value: employee.startDate },
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

              {/* brief sections */}
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

              {/* AI summary */}
              <div className="flex items-start gap-3 rounded-xl border border-navy-200 bg-navy-50/40 p-4">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                <div>
                  <h4 className="text-sm font-semibold text-navy-900">AI summary</h4>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Priya's first week should focus on confirming workspace access, reviewing active briefing notes,
                    and attending the Tuesday branch check-in. Payroll confirmation and building access approval
                    are the two outstanding blockers.
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
