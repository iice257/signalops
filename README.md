# SignalOps

SignalOps is an agentic security and operations triage cockpit for teams that need fast, evidence-backed incident decisions without handing full control to an autonomous agent.

The prototype is built as a React/Vite interface for hackathon submission tracks around FIND EVIL, Google Cloud Rapid Agent, Splunk Agentic Ops, Bright Data, Elastic, and GitLab MCP workflows.

Live demo: https://signalops-orpin.vercel.app

## What It Does

- Ingests incident signals from repository, log, observability, and external advisory sources.
- Ranks incidents by risk, confidence, severity, and operational ownership.
- Builds an evidence map from change data, service telemetry, policy checks, and external intelligence.
- Shows an auditable timeline from evidence collection to remediation.
- Keeps risky actions behind explicit human approval.

## Why It Matters

Most AI incident demos jump straight from alert to automation. SignalOps focuses on the missing middle: gathering evidence, explaining the hypothesis, showing policy violations, and giving operators a guarded action path they can trust under pressure.

## Current Prototype

This version is a frontend prototype with realistic sample data and working UI states:

- Source toggles for GitLab, Elastic, Splunk, and Bright Data.
- Sort controls for risk and severity.
- Interactive incident queue.
- Simulated agent run state.
- Guarded approval state for remediation.
- Responsive desktop and mobile layout.

## Run Locally

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Hackathon Fit

- FIND EVIL: use SignalOps as a defensive evidence triage cockpit with a prepared incident bundle, agent execution logs, accuracy notes, and a human approval gate.
- Google Cloud Rapid Agent: adapt the agent plan/execution layer to Gemini and a partner MCP track.
- Splunk Agentic Ops: connect the triage queue and evidence timeline to Splunk notable events and SPL queries.
- Bright Data: enrich incident context with public advisories, vendor status pages, and external risk signals.
- DevNetwork AI + ML: position as an applied AI operations workflow with human approval controls.

The FIND EVIL submission plan is in [FIND_EVIL_SUBMISSION.md](./FIND_EVIL_SUBMISSION.md).

## Next Implementation Step

Replace the local sample data in `src/data.ts` with a thin agent service that can call one real source first. The fastest credible integration path is:

1. GitHub/GitLab repository and PR metadata.
2. Splunk or Elastic log query results.
3. External advisory lookup.
4. LLM-generated hypothesis and remediation draft.
