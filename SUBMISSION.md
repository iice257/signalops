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

Use Gemini for agent planning, hypothesis generation, and remediation drafting. Connect one partner MCP source as the first real ingestion path.

### Splunk Agentic Ops

Map Splunk notable events and SPL query results into the incident queue, then have the agent summarize blast radius and suggested response.

### Bright Data

Use external web intelligence for vendor advisories, status-page signals, public CVE context, and public exploit/noise validation.

### Elastic / GitLab MCP

GitLab supplies change context, ownership, MRs, and CI state. Elastic supplies logs, traces, and APM signals for confidence scoring.

## What Is Built

- React/Vite prototype with realistic triage data.
- Responsive desktop/mobile cockpit.
- Interactive source filters, sorting, incident switching, agent run state, and approval state.
- Public GitHub repository and Vercel deployment.

Live demo: https://signalops-orpin.vercel.app

## What Comes Next

The first production slice should connect GitHub or GitLab repository data, then one log source. The agent can then generate the hypothesis and remediation fields from real evidence rather than local sample data.
