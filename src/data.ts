export type RiskLevel = 'low' | 'medium' | 'high';
export type TicketStatus =
  | 'draft-ready'
  | 'optional'
  | 'needs-approval'
  | 'attention'
  | 'submitted'
  | 'pending-approval'
  | 'in-progress'
  | 'waiting'
  | 'not-started'
  | 'complete';

export interface Employee {
  name: string;
  transitionType: string;
  previousMinistry: string;
  newMinistry: string;
  newRole: string;
  startDate: string;
  location: string;
  manager: string;
  employeeId: string;
  classification: string;
  currentRole: string;
  securityClearance: string;
  reportingTo: string;
}

export interface IntakeSelections {
  laptop: boolean;
  sharedDrive: boolean;
  mobile: boolean;
  admin: boolean;
  building: boolean;
  printer: boolean;
}

export interface Ticket {
  id: string;
  name: string;
  category: string;
  status: TicketStatus;
  approvalPath: string;
  actionLabel: string;
  actionType: 'onrequest' | 'facilities' | 'removal';
  icon: string;
}

export interface DashboardRow {
  id: string;
  area: string;
  ticketStatus: TicketStatus;
  insight: string;
  risk: RiskLevel;
  icon: string;
}

export interface AccessCleanupRow {
  id: string;
  item: string;
  kind: 'current' | 'new';
  recommendation: string;
  approval: string;
  reason: string;
}

export interface BriefSection {
  heading: string;
  icon: string;
  items: { label: string; value: string }[];
}

export const employee: Employee = {
  name: 'Priya Shah',
  transitionType: 'Ministry Transfer',
  previousMinistry: 'Ministry of Health',
  newMinistry: 'Treasury Board Secretariat',
  newRole: 'Policy Analyst',
  startDate: 'July 21, 2026',
  location: "Queen's Park",
  manager: 'Kathryn Nguyen',
  employeeId: 'OPS-04821',
  classification: 'AS-04',
  currentRole: 'Program Coordinator',
  securityClearance: 'Reliability (Valid)',
  reportingTo: 'Director, Economic Policy Branch',
};

export const defaultIntakeSelections: IntakeSelections = {
  laptop: true,
  sharedDrive: true,
  mobile: false,
  admin: false,
  building: true,
  printer: true,
};

export const intakeFields = [
  { key: 'name', label: 'Employee name', type: 'text', icon: 'user' },
  { key: 'transitionType', label: 'Transition type', type: 'text', icon: 'arrow-right' },
  { key: 'previousMinistry', label: 'Previous ministry', type: 'text', icon: 'building' },
  { key: 'newMinistry', label: 'New ministry / team', type: 'text', icon: 'building' },
  { key: 'newRole', label: 'Role', type: 'text', icon: 'briefcase' },
  { key: 'startDate', label: 'Start date', type: 'text', icon: 'calendar' },
  { key: 'location', label: 'Location', type: 'text', icon: 'map-pin' },
  { key: 'manager', label: 'Manager', type: 'text', icon: 'user' },
] as const;

export const intakeToggles = [
  { key: 'laptop', label: 'Laptop needed?', icon: 'laptop' },
  { key: 'sharedDrive', label: 'Shared drive / SharePoint access needed?', icon: 'folder' },
  { key: 'mobile', label: 'Mobile number / SIM needed?', icon: 'smartphone' },
  { key: 'admin', label: 'Admin privileges needed?', icon: 'shield' },
  { key: 'building', label: 'Building access needed?', icon: 'key' },
  { key: 'printer', label: 'Printer / FMP setup needed?', icon: 'printer' },
] as const;

export const tickets: Ticket[] = [
  {
    id: 't1',
    name: 'Account setup',
    category: 'IT',
    status: 'draft-ready',
    approvalPath: 'Standard approval',
    actionLabel: 'Open ONRequest',
    actionType: 'onrequest',
    icon: 'mail',
  },
  {
    id: 't2',
    name: 'Laptop / asset request',
    category: 'IT',
    status: 'draft-ready',
    approvalPath: 'Standard approval',
    actionLabel: 'Open ONRequest',
    actionType: 'onrequest',
    icon: 'laptop',
  },
  {
    id: 't3',
    name: 'Shared drive access',
    category: 'IT',
    status: 'draft-ready',
    approvalPath: 'Data owner approval',
    actionLabel: 'Open ONRequest',
    actionType: 'onrequest',
    icon: 'hard-drive',
  },
  {
    id: 't4',
    name: 'SharePoint access',
    category: 'IT',
    status: 'draft-ready',
    approvalPath: 'Manager approval',
    actionLabel: 'Open ONRequest',
    actionType: 'onrequest',
    icon: 'folder',
  },
  {
    id: 't5',
    name: 'Teams channel access',
    category: 'IT',
    status: 'draft-ready',
    approvalPath: 'Manager approval',
    actionLabel: 'Open ONRequest',
    actionType: 'onrequest',
    icon: 'message-square',
  },
  {
    id: 't6',
    name: 'Distribution list access',
    category: 'IT',
    status: 'draft-ready',
    approvalPath: 'Manager approval',
    actionLabel: 'Open ONRequest',
    actionType: 'onrequest',
    icon: 'mail',
  },
  {
    id: 't7',
    name: 'Mobile number / SIM request',
    category: 'Telecom',
    status: 'optional',
    approvalPath: 'Manager + telecom approval',
    actionLabel: 'Open ONRequest',
    actionType: 'onrequest',
    icon: 'smartphone',
  },
  {
    id: 't8',
    name: 'Admin privileges',
    category: 'Security',
    status: 'needs-approval',
    approvalPath: 'Cyber / security approval',
    actionLabel: 'Open ONRequest',
    actionType: 'onrequest',
    icon: 'shield',
  },
  {
    id: 't9',
    name: 'Building access',
    category: 'Facilities',
    status: 'draft-ready',
    approvalPath: 'Facilities approval',
    actionLabel: 'Open Facilities Request',
    actionType: 'facilities',
    icon: 'key',
  },
  {
    id: 't10',
    name: 'Printer / FMP setup',
    category: 'IT',
    status: 'draft-ready',
    approvalPath: 'Standard approval',
    actionLabel: 'Open ONRequest',
    actionType: 'onrequest',
    icon: 'printer',
  },
  {
    id: 't11',
    name: 'Old ministry access removal',
    category: 'Security',
    status: 'attention',
    approvalPath: 'IT / security review',
    actionLabel: 'Open Access Removal Request',
    actionType: 'removal',
    icon: 'trash',
  },
];

export const dashboardRows: DashboardRow[] = [
  {
    id: 'd1',
    area: 'Account',
    ticketStatus: 'submitted',
    insight: 'Must be completed before Day 1.',
    risk: 'medium',
    icon: 'mail',
  },
  {
    id: 'd2',
    area: 'Laptop',
    ticketStatus: 'in-progress',
    insight: 'Low risk if delivered before July 18.',
    risk: 'low',
    icon: 'laptop',
  },
  {
    id: 'd3',
    area: 'Payroll',
    ticketStatus: 'waiting',
    insight: 'High risk: missing signed form may delay first pay.',
    risk: 'high',
    icon: 'file-text',
  },
  {
    id: 'd4',
    area: 'Building card',
    ticketStatus: 'not-started',
    insight: 'Owner needed from facilities or building management.',
    risk: 'medium',
    icon: 'key',
  },
  {
    id: 'd5',
    area: 'Printer / FMP',
    ticketStatus: 'draft-ready',
    insight: "Queen's Park setup may require profile reset.",
    risk: 'medium',
    icon: 'printer',
  },
  {
    id: 'd6',
    area: 'Security review',
    ticketStatus: 'attention',
    insight: 'Old Ministry of Health access is still active.',
    risk: 'high',
    icon: 'shield',
  },
  {
    id: 'd7',
    area: 'Mobile service',
    ticketStatus: 'not-started',
    insight: 'Based on manager selection.',
    risk: 'low',
    icon: 'smartphone',
  },
];

export const accessCleanupRows: AccessCleanupRow[] = [
  {
    id: 'ac1',
    item: 'Health SharePoint',
    kind: 'current',
    recommendation: 'Remove after handover',
    approval: 'IT / security review',
    reason: 'Employee is moving ministries and should only keep access needed for transition handover.',
  },
  {
    id: 'ac2',
    item: 'Health Finance Folder',
    kind: 'current',
    recommendation: 'Remove immediately',
    approval: 'IT / security review',
    reason: 'Finance folder is not required for new Policy Analyst role.',
  },
  {
    id: 'ac3',
    item: 'Old Health Teams channels',
    kind: 'current',
    recommendation: 'Remove non-required channels',
    approval: 'Manager + IT approval',
    reason: 'Keeps collaboration access role-based.',
  },
  {
    id: 'ac4',
    item: 'Old distribution lists',
    kind: 'current',
    recommendation: 'Remove outdated lists',
    approval: 'Manager + IT approval',
    reason: 'Prevents outdated internal communications access.',
  },
  {
    id: 'ac5',
    item: 'Generic Power BI Viewer',
    kind: 'current',
    recommendation: 'Keep only if still required',
    approval: 'Manager review',
    reason: 'Keep only if approved for reporting needs.',
  },
  {
    id: 'ac6',
    item: 'TBS Policy SharePoint',
    kind: 'new',
    recommendation: 'Add',
    approval: 'Manager approval',
    reason: 'Required for policy work in new ministry / team.',
  },
  {
    id: 'ac7',
    item: 'Briefing Notes Folder',
    kind: 'new',
    recommendation: 'Add',
    approval: 'Data owner approval',
    reason: 'Required for briefing note coordination.',
  },
  {
    id: 'ac8',
    item: 'Policy Analyst Teams Channel',
    kind: 'new',
    recommendation: 'Add',
    approval: 'Manager approval',
    reason: 'Required for branch collaboration.',
  },
  {
    id: 'ac9',
    item: 'TBS Branch Distribution List',
    kind: 'new',
    recommendation: 'Add',
    approval: 'Manager approval',
    reason: 'Required for team communication.',
  },
];

export const briefSections: BriefSection[] = [
  {
    heading: 'Role overview',
    icon: 'briefcase',
    items: [
      { label: 'Title', value: 'Policy Analyst, Treasury Board Secretariat' },
      { label: 'Branch', value: 'Economic Policy Branch' },
      { label: 'Focus', value: 'Briefing note coordination and policy tracking across cross-cutting files.' },
    ],
  },
  {
    heading: 'First-week priorities',
    icon: 'calendar',
    items: [
      { label: 'Day 1–2', value: 'Confirm workspace, building access, and TBS SharePoint permissions.' },
      { label: 'Day 3–4', value: 'Review active briefing notes and the policy tracker with Kathryn.' },
      { label: 'Day 5', value: 'Attend Tuesday branch check-in and meet key contacts.' },
    ],
  },
  {
    heading: 'Key contacts',
    icon: 'users',
    items: [
      { label: 'Manager', value: 'Kathryn — management and branch lead' },
      { label: 'IT', value: 'Daniel — IT support and access provisioning' },
      { label: 'Payroll', value: 'Maya — payroll confirmation and transfer forms' },
    ],
  },
  {
    heading: 'Important documents',
    icon: 'file-text',
    items: [
      { label: 'Policy tracker', value: 'Active tracker for ongoing policy files and statuses.' },
      { label: 'Briefing note template', value: 'Standard TBS template for drafting notes.' },
      { label: 'Branch SOP', value: 'Branch standard operating procedures and workflows.' },
      { label: "Queen's Park printer setup guide", value: 'Local FMP and printer configuration reference.' },
    ],
  },
  {
    heading: 'Pending work',
    icon: 'clipboard-list',
    items: [
      { label: 'Q3 policy files', value: 'Review and triage Q3 policy files awaiting input.' },
      { label: 'TBS SharePoint access', value: 'Confirm access to TBS SharePoint before start date.' },
    ],
  },
  {
    heading: 'Access needed',
    icon: 'key',
    items: [
      { label: 'TBS Policy SharePoint', value: 'Required for policy document collaboration.' },
      { label: 'Briefing Notes Folder', value: 'Required for briefing note coordination.' },
      { label: 'Policy Analyst Teams Channel', value: 'Required for branch communication.' },
    ],
  },
  {
    heading: 'Questions to ask manager',
    icon: 'help-circle',
    items: [
      { label: 'Priorities', value: 'Which briefing notes are the top priority for my first two weeks?' },
      { label: 'Access', value: 'Is there any additional access I will need beyond the standard TBS set?' },
      { label: 'Check-ins', value: 'How should I report progress — weekly written updates or standup?' },
    ],
  },
];

export const sampleHandoverNotes = `Priya will support briefing note coordination and policy tracking. Weekly branch check-in occurs every Tuesday morning. Key contacts are Kathryn for management, Daniel from IT, and Maya from Payroll. Important documents include the policy tracker, briefing note template, branch SOP, and Queen's Park printer setup guide. Pending work includes reviewing Q3 policy files and confirming access to TBS SharePoint. Missing information includes final payroll confirmation and building access approval.`;

export const riskScanResults = [
  'Payroll is the highest readiness blocker because the signed form is missing.',
  'Security review needs attention because old Ministry of Health access is still active.',
  'Printer / FMP setup may cause Day 1 friction at Queen\u2019s Park.',
  'Admin privileges require cyber / security approval if selected.',
  'Laptop is low risk if delivery is confirmed before July 18.',
];

export const responsibleAIPoints = [
  'AI does not directly access OPS databases.',
  'Nexus would use approved ONRequest / system integrations.',
  'AI only receives the minimum transition context needed.',
  'Submitted tickets create their normal audit trail in existing ticketing / request systems.',
  'Optional worklog PDFs are generated only when the manager chooses to export them.',
  'Nexus session data resets at the end of the session.',
  'Nexus does not use session data to train or improve the AI model.',
  'Raw handover notes are temporarily processed and discarded.',
  'Sensitive records stay in existing systems.',
  'Admin privileges and sensitive access require approval.',
  'Production version would require cybersecurity and privacy review.',
];

export const worklogExcludedItems = [
  'Raw handover notes',
  'Training data for AI models',
  'Long-term Nexus database records',
  'Sensitive source-system records',
  'Hidden background data',
  'Unsubmitted draft state after reset',
  'Anything not intentionally exported by the manager',
];

export const worklogIncludedSections = [
  'Employee transition summary',
  'Generated ticket bundle',
  'Ticket statuses and approval paths',
  'AI risk scan results',
  'Access cleanup recommendations',
  'AI starter brief summary',
  'Timestamped session summary',
  'Session reset confirmation',
];

export const ticketJustification =
  'Business justification: Priya Shah is transferring into a Policy Analyst role at Treasury Board Secretariat starting July 21, 2026. Access to the TBS Policy SharePoint, Briefing Notes Folder, and Policy Analyst Teams channel is required for briefing note coordination, branch collaboration, and first-week onboarding tasks.';
