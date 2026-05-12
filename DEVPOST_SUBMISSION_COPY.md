# SignalOps Devpost Submission Copy

## Project Name

SignalOps

## One-Liner

An agentic security and operations cockpit that turns noisy incident signals into evidence-backed triage timelines with human approval gates.

## Short Description

SignalOps helps engineering and security teams move from alert noise to trustworthy action. It ingests prepared incident evidence, ranks risk, maps evidence, generates a hypothesis, and drafts remediation while keeping every risky action behind explicit human approval.

## Long Description

Incident teams often lose time stitching together repository changes, logs, policy failures, observability traces, and public context. SignalOps provides a single operator workspace for AI-assisted incident triage.

The prototype includes multiple submission-ready proof tracks:

- FIND EVIL: prepared defensive evidence bundle, expected findings, accuracy counts, and agent execution notes.
- Google Rapid Agent: Gemini-style triage plan backed by GitLab/Elastic-style partner evidence.
- Splunk Agentic Ops: prepared notable event, SPL evidence plan, agent action plan, and approval reason.

The key design choice is trust. SignalOps does not hide the agent behind a magic answer. It shows the evidence map, confidence, policy checks, fallback behavior, and approval state so an operator can understand and control the response.

## What It Does

- Ranks incident candidates by risk, severity, and confidence.
- Shows source coverage across SIFT-style evidence, GitLab, Elastic, Splunk, and web intelligence.
- Builds an evidence map from prepared source records.
- Shows timeline, hypothesis, policy checks, and remediation plan.
- Keeps rollback, invalidation, and containment actions guarded until approved.
- Serves public JSON evidence bundles for judges to inspect.

## Built With

- React
- TypeScript
- Vite
- Vercel
- Prepared JSON evidence bundles
- Lucide icons

## Links

- Live demo: https://signalops-orpin.vercel.app
- GitHub repo: https://github.com/iice257/signalops
- FIND EVIL evidence: https://signalops-orpin.vercel.app/examples/find-evil/evidence.json
- Google Rapid Agent evidence: https://signalops-orpin.vercel.app/examples/google-rapid-agent/evidence.json
- Splunk notable event: https://signalops-orpin.vercel.app/examples/splunk-agentic-ops/notable-event.json

## Track-Specific Notes

### Google Cloud Rapid Agent

SignalOps maps Gemini-style planning to GitLab/Elastic partner evidence. Gemini can plan the investigation, request repository or observability context, summarize blast radius, and draft remediation while the UI keeps human approval in the loop.

### Splunk Agentic Ops

SignalOps maps a Splunk notable event into a queue item, shows SPL evidence queries, summarizes blast radius, and prepares a guarded response. It demonstrates how an agentic workflow can support operators without silently executing high-impact actions.

### FIND EVIL

SignalOps loads a prepared defensive evidence bundle, compares generated findings to expected findings, and records execution steps. It is designed for safe defensive triage using owned or challenge-provided data only.

## 3-Minute Demo Script

1. Open SignalOps and show the incident queue.
2. Select the FIND EVIL incident and open the evidence packet and accuracy counts.
3. Select the privilege-boundary incident and show the Google Rapid Agent card with Gemini plan and GitLab evidence.
4. Select the support export incident and show the Splunk Agentic Ops card with SPL queries and agent actions.
5. Run triage to show the timeline and active agent state.
6. Show policy checks and the approval button.
7. Close with the live demo, public repo, and public evidence endpoints.

## Submission Checklist

- Devpost registration completed by account owner.
- Demo video recorded and uploaded.
- Repo is public.
- Live demo link works.
- Evidence endpoints return 200.
- Track selected correctly.
- Official rules and eligibility confirmed by account owner.
