import { responsibleAIPoints, ticketJustification, employee } from '../data';
import { Card, SectionTitle } from '../ui';
import {
  ShieldCheck,
  Lock,
  Database,
  Eye,
  Trash2,
  FileLock,
  KeyRound,
  AlertTriangle,
  ArrowRight,
  FileText,
  Sparkles,
  CheckCircle2,
  FileDown,
  RotateCcw,
  FileX,
} from 'lucide-react';

const pointIcons = [
  Database,
  ArrowRight,
  Eye,
  CheckCircle2,
  FileDown,
  RotateCcw,
  FileX,
  Trash2,
  FileLock,
  KeyRound,
  AlertTriangle,
];

export default function ResponsibleAI() {
  return (
    <div className="animate-fade-in">
      <SectionTitle
        eyebrow="Step 6"
        title="Responsible AI and Data Security"
        description="How Nexus handles data, access, and AI responsibly across the transition workflow."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* principles */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-navy-900">
              <ShieldCheck className="h-4 w-4 text-navy-600" />
              Responsible AI principles
            </h3>
            <ul className="space-y-3">
              {responsibleAIPoints.map((point, i) => {
                const Icon = pointIcons[i] ?? CheckCircle2;
                return (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-3"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-slate-700">{point}</p>
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* future production review */}
          <Card className="mt-6 border-amber-200 bg-amber-50/30">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <AlertTriangle className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-navy-900">Future Production Review</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                  Before production deployment, Nexus would require review by cybersecurity, privacy, and
                  system / data owners to validate permissions, data retention, audit logging, threat modelling, and
                  approval workflows.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* right column */}
        <div className="space-y-6">
          {/* ONRequest integration panel */}
          <Card className="bg-navy-50/40">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-700 text-white">
                <ArrowRight className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-semibold text-navy-900">ONRequest integration</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              In production, Nexus would integrate with ONRequest by mapping each onboarding need to the correct
              ONRequest form or workflow. Nexus would pre-fill the request with employee details, role, location,
              required access, and business justification.
            </p>
          </Card>

          {/* ticket justification example */}
          <Card>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <FileText className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-semibold text-navy-900">AI-generated ticket justification</h3>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3">
              <p className="text-sm leading-relaxed text-slate-700">
                <span className="font-semibold text-navy-800">Business justification:</span> {ticketJustification}
              </p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <Sparkles className="h-3.5 w-3.5 text-gold-500" />
              Auto-generated from intake context for {employee.name}
            </div>
          </Card>

          {/* data handling */}
          <Card>
            <div className="flex items-start gap-3">
              <Lock className="mt-0.5 h-5 w-5 shrink-0 text-navy-600" />
              <div>
                <h3 className="text-sm font-semibold text-navy-900">Data handling</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Sensitive records stay in existing systems. Nexus only processes the minimum transition context
                  needed — and discards raw handover notes after brief generation.
                </p>
              </div>
            </div>
          </Card>

          {/* worklog + reset reference */}
          <Card className="border-navy-200 bg-navy-50/30">
            <div className="flex items-start gap-3">
              <FileDown className="mt-0.5 h-5 w-5 shrink-0 text-navy-600" />
              <div>
                <h3 className="text-sm font-semibold text-navy-900">Worklog export + session reset</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Before ending a session, managers can export an optional worklog PDF with the full session summary.
                  After export, Nexus clears all temporary AI inputs and draft state. No session data is retained for
                  model training or long-term database storage.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Submitted tickets keep their normal audit trail in existing ticketing / request systems. Nexus only
                  avoids keeping an additional long-term copy of sensitive session data.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
