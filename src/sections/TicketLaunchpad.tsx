import { useState } from 'react';
import { useNexus } from '../store';
import { Card, SectionTitle, ActionButton, StatusPill, ApprovalTag, EmptyState } from '../ui';
import {
  Mail,
  Laptop,
  HardDrive,
  Folder,
  MessageSquare,
  Smartphone,
  ShieldCheck,
  KeyRound,
  Printer,
  Trash2,
  Rocket,
  ExternalLink,
  CheckCircle2,
  Info,
  Package,
  AlertTriangle,
  FileText,
  GraduationCap,
} from 'lucide-react';

const iconMap: Record<string, typeof Mail> = {
  mail: Mail,
  laptop: Laptop,
  'hard-drive': HardDrive,
  folder: Folder,
  'message-square': MessageSquare,
  smartphone: Smartphone,
  shield: ShieldCheck,
  key: KeyRound,
  printer: Printer,
  trash: Trash2,
  'file-text': FileText,
  'graduation-cap': GraduationCap,
};

export default function TicketLaunchpad({ onToast }: { onToast: (msg: string) => void }) {
  const { tickets, submitted, submitBundle, bundleGenerated } = useNexus();
  const [submitting, setSubmitting] = useState(false);

  if (!bundleGenerated) {
    return (
      <div className="animate-fade-in">
        <SectionTitle eyebrow="Step 2" title="Ticket Launchpad" description="" />
        <EmptyState
          icon={Package}
          title="No bundle generated yet"
          description="Complete the Manager Intake form and click 'Generate Transition Bundle' to create ONRequest ticket drafts."
        />
      </div>
    );
  }

  const draftCount = tickets.filter((t) => t.status === 'draft-ready').length;
  const needsApprovalCount = tickets.filter((t) => t.status === 'needs-approval' || t.status === 'attention').length;

  function openTicket(action: string) {
    onToast(`${action} — prototype simulation`);
  }

  function handleSubmit() {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      submitBundle();
      onToast('Transition bundle submitted in prototype simulation.');
    }, 1400);
  }

  return (
    <div className="animate-fade-in">
      <SectionTitle
        eyebrow="Step 2"
        title="Ticket Launchpad"
        description="Nexus generated a bundle of ONRequest ticket drafts from the intake. Review approval paths, open individual tickets, and submit the bundle."
      />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-700">
          <Package className="h-3.5 w-3.5" />
          Generated from role-based onboarding template
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
          <Info className="h-3.5 w-3.5" />
          Prototype simulation: ONRequest integration would be implemented in production
        </span>
      </div>

      {/* summary cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="flex items-center gap-3 py-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
            <Package className="h-5 w-5" />
          </span>
          <div>
            <p className="text-2xl font-bold text-navy-900">{tickets.length}</p>
            <p className="text-xs font-medium text-slate-500">Tickets generated</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3 py-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <div>
            <p className="text-2xl font-bold text-navy-900">{draftCount}</p>
            <p className="text-xs font-medium text-slate-500">Draft ready</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3 py-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div>
            <p className="text-2xl font-bold text-navy-900">{needsApprovalCount}</p>
            <p className="text-xs font-medium text-slate-500">Need approval</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3 py-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
            <Rocket className="h-5 w-5" />
          </span>
          <div>
            <p className="text-2xl font-bold text-navy-900">{submitted ? 'Submitted' : 'Ready'}</p>
            <p className="text-xs font-medium text-slate-500">Bundle status</p>
          </div>
        </Card>
      </div>

      {/* ticket table */}
      <Card padded={false} className="mb-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h3 className="font-serif text-lg font-semibold text-navy-900">Generated Transition Ticket Bundle</h3>
          <span className="text-xs text-slate-400">{tickets.length} tickets</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-5 py-3 font-semibold">Ticket</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Approval path</th>
                <th className="px-5 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tickets.map((t) => {
                const Icon = iconMap[t.icon] ?? Mail;
                return (
                  <tr key={t.id} className="group transition-colors hover:bg-slate-50/60">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-50 text-navy-600">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="font-medium text-navy-900">{t.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {t.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusPill status={t.status} />
                    </td>
                    <td className="px-5 py-3.5">
                      <ApprovalTag path={t.approvalPath} />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => openTicket(t.actionLabel)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                          t.actionType === 'removal'
                            ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                            : t.actionType === 'facilities'
                              ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                              : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
                        }`}
                      >
                        {t.actionLabel}
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* submit bar */}
      <Card className={`flex flex-wrap items-center gap-4 ${submitted ? 'border-emerald-300 bg-emerald-50/40' : ''}`}>
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-lg ${
            submitted ? 'bg-emerald-600 text-white' : 'bg-navy-700 text-white'
          }`}
        >
          {submitted ? <CheckCircle2 className="h-5 w-5" /> : <Rocket className="h-5 w-5" />}
        </span>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-navy-900">
            {submitted ? 'Bundle submitted' : 'Submit transition bundle'}
          </h3>
          <p className="text-sm text-slate-500">
            {submitted
              ? 'Draft tickets are now Submitted or Pending Approval in prototype simulation.'
              : 'Submit all draft-ready tickets to ONRequest (prototype simulation). Tickets needing approval will enter the approval queue.'}
          </p>
        </div>
        {submitted ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-700">
            <CheckCircle2 className="h-4 w-4" /> Submitted
          </span>
        ) : (
          <ActionButton onClick={handleSubmit} loading={submitting}>
            <Rocket className="h-4 w-4" />
            Submit Bundle
          </ActionButton>
        )}
      </Card>
    </div>
  );
}
