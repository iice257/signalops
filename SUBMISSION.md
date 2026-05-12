# SignalOps Submission Brief

## One-Liner

SignalOps is an agentic security and operations cockpit that turns noisy incident signals into an evidence-backed triage timeline, with human approval gates for risky remediation.

## Problem

Incident teams lose time stitching together repository changes, logs, observability traces, external advisories, ownership, and policy context. Many AI demos skip the trust layer and jump from alert to action without showing why the action is safe.

## Solution

SignalOps gives operators a structured AI workspace:

- Ingest signals from source-control, logs, observability, and public web intelligence.
- Rank incidents by risk, confidence, severity, and age.
- Build an evidence map that explains why an incident matters.
- Generate a remediation plan and keep execution behind approval.
- Preserve an audit trail of each agent step.

## Demo Flow

1. Open the SignalOps cockpit.
2. Toggle data sources: GitLab, Elastic, Splunk, Bright Data.
3. Select the critical invite privilege incident.
4. Run triage to simulate agent collection and hypothesis building.
5. Review evidence map, policy failures, and remediation plan.
6. Approve the guarded remediation action.

## Sponsor Track Fit

### Google Cloud Rapid Agent

Use Gemini for agent planning, hypothesis generation, and remediation drafting. Connect one required partner MCP source. Best current partner fit: GitLab for repo/MR/CI evidence or Elastic for logs/APM evidence.

Dedicated submission plan: `GOOGLE_RAPID_AGENT_SUBMISSION.md`.

### Splunk Agentic Ops

Map Splunk notable events and SPL query results into the incident queue, then have the agent summarize blast radius and suggested response. Public requirements are not fully posted yet, so keep this as a prepared track until the rules open.

### Bright Data

Use Bright Data MCP, SERP API, Web Unlocker, or Scraping Browser for vendor advisories, status-page signals, public CVE context, and public exploit/noise validation.

### Elastic / GitLab MCP

GitLab supplies change context, ownership, MRs, and CI state. Elastic supplies logs, traces, and APM signals for confidence scoring.

### DevNetwork AI + ML

Submit SignalOps as an applied AI operations workflow, or adapt it to TrueFoundry's resilient-agent angle by demonstrating fallback behavior when an LLM, MCP server, or log provider is degraded.

### TechEx / lablab

Use SignalOps under Agent Security & AI Governance or Data & Intelligence. The fastest credible path is a Gemini-assisted governance agent that keeps remediation behind approval.

### FIND EVIL

Use SignalOps as a defensive evidence triage cockpit: load a prepared incident bundle, generate a timeline, show agent execution logs, compare the result with expected findings, and keep every risky action behind a human approval gate. The dedicated submission pack is in `FIND_EVIL_SUBMISSION.md`.

## What Is Built

- React/Vite prototype with realistic triage data.
- Responsive desktop/mobile cockpit.
- Interactive source filters, sorting, incident switching, agent run state, and approval state.
- FIND EVIL demo incident with public prepared evidence bundle and accuracy counts.
- Google Rapid Agent proof slice with public GitLab/Elastic-style evidence bundle.
- Public GitHub repository and Vercel deployment.

Live demo: https://signalops-orpin.vercel.app

## Submission Assets Needed

- Public repo: https://github.com/iice257/signalops
- Hosted app: https://signalops-orpin.vercel.app
- 1-3 minute demo video
- Cover image
- Optional slide deck
- Explicit sponsor-tech proof section
- FIND EVIL evidence bundle, accuracy report, and agent execution log
- Google Rapid Agent evidence bundle and Gemini triage-plan proof
- Open-source license if a track requires it

## What Comes Next

The first production slice should connect GitHub or GitLab repository data, then one log source. The agent can then generate the hypothesis and remediation fields from real evidence rather than local sample data.
