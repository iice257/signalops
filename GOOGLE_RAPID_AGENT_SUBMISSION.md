# SignalOps Google Rapid Agent Submission Pack

## Submission Positioning

SignalOps is an incident triage agent interface for engineering and security teams. The Google Rapid Agent version focuses on Gemini-assisted planning plus a partner evidence source such as GitLab or Elastic.

## Track Choice

Primary partner path: GitLab MCP or Elastic MCP.

- GitLab MCP gives repository changes, merge requests, CI state, owners, and deploy windows.
- Elastic MCP gives logs, traces, service latency, and error-rate evidence.
- The current UI already models both paths and can show fallback behavior when a source is degraded.

## Demo Narrative

1. A high-risk incident appears in the queue.
2. Gemini drafts a triage plan and chooses evidence sources.
3. GitLab/Elastic evidence is mapped into the evidence graph.
4. The agent proposes a hypothesis and remediation plan.
5. Human approval is required before any action is treated as approved.
6. The run is exported as a short report with confidence and source coverage.

## Required Assets

- Public repository: https://github.com/iice257/signalops
- Live demo: https://signalops-orpin.vercel.app
- Prepared evidence bundle: `public/examples/google-rapid-agent/evidence.json`
- Demo video: about 3 minutes
- Open-source license if required by the brief
- Devpost submission with selected partner track
- Sponsor-tech proof: Gemini plan generation plus GitLab or Elastic evidence adapter

## Minimum Credible Build

The live app already demonstrates the cockpit. The current proof slice adds:

1. A prepared GitLab/Elastic evidence JSON file.
2. A Gemini triage plan shown in the inspector.
3. Partner evidence and fallback policy surfaced in the UI.

## Sponsor Fit Copy

SignalOps shows how a rapid agent can help teams move from noisy alerts to evidence-backed decisions. Gemini can plan the investigation, request GitLab or Elastic context, summarize blast radius, and draft remediation. The UI keeps the operator in control by showing source coverage, confidence, policy failures, and a human approval gate before action.

## Next Implementation Slice

Add a report view that turns selected incident data into a submission-ready incident brief.
