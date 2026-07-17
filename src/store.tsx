import { createContext, useContext, useState, useMemo, useCallback, type ReactNode } from 'react';
import {
  type FormState,
  type Ticket,
  type DashboardRow,
  type AccessRow,
  type BriefSection,
  type ScenarioId,
  scenarios,
  generateTickets,
  generateDashboardRows,
  generateAccessRows,
  generateBriefSections,
  generateJustification,
  generateRiskScanResults,
  calculateReadinessScore,
} from './data';
import { formatLocalizedDate, useLocale } from './locale';

interface NexusContextValue {
  form: FormState;
  setForm: (f: FormState) => void;
  updateField: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  loadScenario: (id: ScenarioId) => void;
  activeScenario: ScenarioId;
  bundleGenerated: boolean;
  setBundleGenerated: (v: boolean) => void;
  tickets: Ticket[];
  dashboardRows: DashboardRow[];
  accessRows: AccessRow[];
  briefSections: BriefSection[];
  justification: string;
  readinessScore: number;
  riskScanResults: string[];
  submitted: boolean;
  setSubmitted: (v: boolean) => void;
  submitBundle: () => void;
  briefGenerated: boolean;
  setBriefGenerated: (v: boolean) => void;
  handoverNotes: string;
  setHandoverNotes: (v: string) => void;
  resetSession: () => void;
}

const NexusContext = createContext<NexusContextValue | null>(null);

// The provider and its hook intentionally share this small state module.
// eslint-disable-next-line react-refresh/only-export-components
export function useNexus() {
  const ctx = useContext(NexusContext);
  if (!ctx) throw new Error('useNexus must be used within NexusProvider');
  return ctx;
}

export function NexusProvider({ children }: { children: ReactNode }) {
  const { locale, t } = useLocale();
  const [form, setFormState] = useState<FormState>(scenarios.transfer.form);
  const [activeScenario, setActiveScenario] = useState<ScenarioId>('transfer');
  const [bundleGenerated, setBundleGenerated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [briefGenerated, setBriefGenerated] = useState(false);
  const [handoverNotes, setHandoverNotes] = useState('');

  const setForm = useCallback((f: FormState) => {
    setFormState(f);
    setActiveScenario(null);
    setBundleGenerated(false);
    setSubmitted(false);
    setBriefGenerated(false);
  }, []);

  const updateField = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormState((prev) => {
      const next = { ...prev, [key]: value };
      return next;
    });
    setActiveScenario(null);
    // Changing form invalidates generated bundle
    setBundleGenerated(false);
    setSubmitted(false);
    setBriefGenerated(false);
  }, []);

  const loadScenario = useCallback((id: ScenarioId) => {
    if (id && scenarios[id]) {
      setFormState(scenarios[id].form);
    }
    setActiveScenario(id);
    setBundleGenerated(false);
    setSubmitted(false);
    setBriefGenerated(false);
    setHandoverNotes('');
  }, []);

  const tickets = useMemo(() => generateTickets(form, t), [form, t]);
  const dashboardRows = useMemo(() => generateDashboardRows(form, tickets), [form, tickets]);
  const accessRows = useMemo(() => generateAccessRows(form), [form]);
  const briefSections = useMemo(() => generateBriefSections(form, locale), [form, locale]);
  const justification = useMemo(() => generateJustification(form, t, date => formatLocalizedDate(date, locale)), [form, t, locale]);
  const readinessScore = useMemo(() => calculateReadinessScore(tickets), [tickets]);
  const riskScanResults = useMemo(() => generateRiskScanResults(form, tickets), [form, tickets]);

  const submitBundle = useCallback(() => {
    setSubmitted(true);
  }, []);

  const resetSession = useCallback(() => {
    setFormState(scenarios.blank.form);
    setActiveScenario('blank');
    setBundleGenerated(false);
    setSubmitted(false);
    setBriefGenerated(false);
    setHandoverNotes('');
  }, []);

  const value: NexusContextValue = {
    form,
    setForm,
    updateField,
    loadScenario,
    activeScenario,
    bundleGenerated,
    setBundleGenerated,
    tickets: submitted
      ? tickets.map((t) => {
          if (t.status === 'draft-ready') return { ...t, status: 'submitted' as const };
          if (t.status === 'needs-approval') return { ...t, status: 'pending-approval' as const };
          if (t.status === 'waiting') return { ...t, status: 'waiting' as const };
          if (t.status === 'attention') return { ...t, status: 'attention' as const };
          return t;
        })
      : tickets,
    dashboardRows,
    accessRows,
    briefSections,
    justification,
    readinessScore,
    riskScanResults,
    submitted,
    setSubmitted,
    submitBundle,
    briefGenerated,
    setBriefGenerated,
    handoverNotes,
    setHandoverNotes,
    resetSession,
  };

  return <NexusContext.Provider value={value}>{children}</NexusContext.Provider>;
}
