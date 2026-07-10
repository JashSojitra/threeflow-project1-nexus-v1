import { accessCleanupRows } from '../data';
import { Card, SectionTitle, ActionButton, ApprovalTag } from '../ui';
import {
  ShieldAlert,
  ShieldCheck,
  Trash2,
  Plus,
  Lock,
  FileWarning,
  AlertTriangle,
  KeyRound,
} from 'lucide-react';

export default function AccessCleanupReview({
  adminSelected,
  onToast,
}: {
  adminSelected: boolean;
  onToast: (msg: string) => void;
}) {
  const currentRows = accessCleanupRows.filter((r) => r.kind === 'current');
  const newRows = accessCleanupRows.filter((r) => r.kind === 'new');

  return (
    <div className="animate-fade-in">
      <SectionTitle
        eyebrow="Step 4"
        title="Access Cleanup Review"
        description="Nexus flags old ministry access that should be removed and recommends only the role-based access Priya needs at TBS."
      />

      {/* security message banner */}
      <div className="mb-6 overflow-hidden rounded-xl border border-navy-700 bg-gradient-to-br from-navy-800 to-navy-950">
        <div className="p-5">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-gold-400">
              <ShieldAlert className="h-5 w-5" />
            </span>
            <div>
              <p className="font-serif text-lg font-semibold leading-snug text-white">
                Nexus helps prevent access sprawl by flagging old ministry access and recommending only the access
                required for the new role.
              </p>
              <p className="mt-3 border-t border-white/10 pt-3 font-serif text-base italic leading-relaxed text-navy-200">
                "Today, onboarding often asks: <span className="text-slate-400">Has access been granted?</span> Nexus
                asks: <span className="text-gold-400">Has only the correct access been granted, and has old access been removed?</span>"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* admin warning */}
      {adminSelected && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 animate-scale-in">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
          <div>
            <h4 className="text-sm font-semibold text-rose-700">Admin privileges flagged</h4>
            <p className="mt-0.5 text-sm text-rose-600">
              Admin privileges require cyber / security approval and business justification.
            </p>
          </div>
        </div>
      )}

      {/* access table */}
      <Card padded={false} className="mb-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h3 className="flex items-center gap-2 font-semibold text-navy-900">
            <KeyRound className="h-4 w-4 text-navy-600" />
            Access cleanup matrix
          </h3>
          <span className="text-xs text-slate-400">
            {currentRows.length} current · {newRows.length} new
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-5 py-3 font-semibold">Access item</th>
                <th className="px-5 py-3 font-semibold">Current / New</th>
                <th className="px-5 py-3 font-semibold">Recommendation</th>
                <th className="px-5 py-3 font-semibold">Approval required</th>
                <th className="px-5 py-3 font-semibold">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {accessCleanupRows.map((row) => (
                <tr key={row.id} className="group transition-colors hover:bg-slate-50/60">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          row.kind === 'current' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                        }`}
                      >
                        {row.kind === 'current' ? <Trash2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                      <span className="font-medium text-navy-900">{row.item}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        row.kind === 'current'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {row.kind === 'current' ? 'Current access' : 'New access'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-medium text-navy-800">{row.recommendation}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <ApprovalTag path={row.approval} />
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm text-slate-600">{row.reason}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* complete bar */}
      <Card className="flex flex-wrap items-center gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-700 text-white">
          <Lock className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-navy-900">Manager + IT joint review</h3>
          <p className="text-sm text-slate-500">
            Both the manager and IT must review and approve the removals and grants before start date.
          </p>
        </div>
        <ActionButton
          variant="success"
          onClick={() => onToast('Access cleanup review marked complete — prototype simulation.')}
        >
          <ShieldCheck className="h-4 w-4" />
          Mark Review Complete
        </ActionButton>
      </Card>

      <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
        <FileWarning className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          <span className="font-semibold">Audit note:</span> All access changes are logged for compliance review.
          Removals take effect after handover; grants activate on the start date unless flagged "Immediately."
        </p>
      </div>
    </div>
  );
}
