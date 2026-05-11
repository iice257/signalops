import {
  AlertTriangle,
  BadgeCheck,
  Braces,
  DatabaseZap,
  GitBranch,
  Globe,
  LockKeyhole,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Severity = "critical" | "high" | "medium" | "low";
export type SourceKey = "gitlab" | "elastic" | "splunk" | "web";

export type Incident = {
  id: string;
  title: string;
  service: string;
  severity: Severity;
  source: SourceKey;
  age: string;
  status: "open" | "investigating" | "contained";
  confidence: number;
  riskScore: number;
  signals: string[];
  hypothesis: string;
  remediation: string[];
  owner: string;
};

export type TimelineStep = {
  label: string;
  detail: string;
  state: "done" | "active" | "queued";
  icon: LucideIcon;
};

export type Connector = {
  key: SourceKey;
  label: string;
  status: "online" | "degraded" | "queued";
  latency: string;
  coverage: string;
  icon: LucideIcon;
};

export const connectors: Connector[] = [
  {
    key: "gitlab",
    label: "GitLab MCP",
    status: "online",
    latency: "240ms",
    coverage: "Repo, MR, CI",
    icon: GitBranch,
  },
  {
    key: "elastic",
    label: "Elastic MCP",
    status: "online",
    latency: "310ms",
    coverage: "Logs, APM, traces",
    icon: SearchCheck,
  },
  {
    key: "splunk",
    label: "Splunk",
    status: "degraded",
    latency: "1.8s",
    coverage: "SPL, notable events",
    icon: DatabaseZap,
  },
  {
    key: "web",
    label: "Bright Data",
    status: "queued",
    latency: "ready",
    coverage: "External advisories",
    icon: Globe,
  },
];

export const incidents: Incident[] = [
  {
    id: "INC-4829",
    title: "Privilege boundary drift in project invites",
    service: "accounts-api",
    severity: "critical",
    source: "gitlab",
    age: "12m",
    status: "investigating",
    confidence: 91,
    riskScore: 94,
    owner: "Identity",
    signals: ["MR changed role mapper", "2 failed policy checks", "New admin path touched"],
    hypothesis:
      "A role mapping change allows invited project maintainers to inherit organization-level billing permissions before email verification completes.",
    remediation: [
      "Gate billing scope behind verified membership.",
      "Add regression coverage for invite role downgrade.",
      "Pause rollout on accounts-api canary.",
    ],
  },
  {
    id: "INC-4817",
    title: "Spike in checkout 500s after coupon deploy",
    service: "payments-web",
    severity: "high",
    source: "elastic",
    age: "28m",
    status: "open",
    confidence: 86,
    riskScore: 81,
    owner: "Revenue",
    signals: ["Error rate 7.2 percent", "Deploy window match", "Coupon resolver timeout"],
    hypothesis:
      "The coupon eligibility resolver is timing out for accounts with multiple active subscriptions, causing checkout sessions to fail before payment intent creation.",
    remediation: [
      "Roll back resolver cache change.",
      "Add timeout fallback to preserve checkout.",
      "Replay affected session IDs after deploy.",
    ],
  },
  {
    id: "INC-4804",
    title: "Public bucket reference in support exports",
    service: "support-tools",
    severity: "high",
    source: "splunk",
    age: "41m",
    status: "open",
    confidence: 74,
    riskScore: 76,
    owner: "Support Ops",
    signals: ["Policy deny in prod", "Export route touched", "S3 object ACL drift"],
    hypothesis:
      "A support export job is writing generated CSV files with the wrong ACL when the customer account has legacy export settings enabled.",
    remediation: [
      "Force private ACL in export writer.",
      "Invalidate generated URLs older than 15 minutes.",
      "Backfill audit events for affected exports.",
    ],
  },
  {
    id: "INC-4798",
    title: "External advisory matches transitive auth dependency",
    service: "frontend-shell",
    severity: "medium",
    source: "web",
    age: "1h",
    status: "contained",
    confidence: 68,
    riskScore: 59,
    owner: "Frontend",
    signals: ["CVE advisory match", "No vulnerable route active", "Patch available"],
    hypothesis:
      "A transitive package in the login shell matches an advisory, but the vulnerable parser path is not reachable in current production configuration.",
    remediation: [
      "Patch dependency in the next release train.",
      "Attach reachability note to the security report.",
      "Keep runtime detection rule active for 72 hours.",
    ],
  },
];

export const timeline: TimelineStep[] = [
  {
    label: "Collect evidence",
    detail: "Pulled MR diff, failing policy logs, CI deploy window, and service ownership data.",
    state: "done",
    icon: SearchCheck,
  },
  {
    label: "Build hypothesis",
    detail: "Mapped the changed role helper to invite acceptance and billing authorization checks.",
    state: "done",
    icon: Braces,
  },
  {
    label: "Verify blast radius",
    detail: "Cross-checking accounts created in the last 24 hours against privileged billing routes.",
    state: "active",
    icon: AlertTriangle,
  },
  {
    label: "Draft remediation",
    detail: "Prepare rollback command, regression test, and release note for security review.",
    state: "queued",
    icon: ShieldCheck,
  },
];

export const policies = [
  { label: "Least privilege", state: "fail", detail: "Role inheritance crosses billing boundary" },
  { label: "Change window", state: "pass", detail: "Deploy occurred inside approved canary window" },
  { label: "Customer data", state: "watch", detail: "No confirmed data access, monitor invite flow" },
  { label: "Rollback ready", state: "pass", detail: "Previous release can be restored in 3 minutes" },
];

export const liveLog = [
  "19:34:12 elastic: retrieved 418 matching authz events",
  "19:34:16 gitlab: linked MR !3812 to accounts-api deploy",
  "19:34:21 policy: billing_scope_guard failed on invite acceptance",
  "19:34:25 splunk: notable event SOC-771 mirrored into queue",
  "19:34:31 agent: drafted rollback and regression checklist",
];

export const navItems = [
  { label: "Triage", icon: ShieldCheck },
  { label: "Evidence", icon: SearchCheck },
  { label: "Policies", icon: LockKeyhole },
  { label: "Reports", icon: BadgeCheck },
];
