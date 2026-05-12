# SignalOps Splunk Agentic Ops Submission Pack

## Submission Positioning

SignalOps is an agentic operations cockpit that converts Splunk notable events into an evidence-backed incident timeline, then prepares a guarded remediation plan.

## Demo Narrative

1. A Splunk notable event enters the SignalOps queue.
2. The agent runs focused SPL queries for source logs, policy decisions, and audit events.
3. The UI shows the evidence map, risk score, confidence, and agent action plan.
4. The agent drafts containment, but high-impact actions remain behind approval.
5. The run can be exported as an incident brief for the operator.

## Required Assets

- Public repository: https://github.com/iice257/signalops
- Live demo: https://signalops-orpin.vercel.app
- Prepared notable event: `public/examples/splunk-agentic-ops/notable-event.json`
- Demo video
- Devpost submission once Splunk rules are fully open
- Optional Splunk trial / MCP proof if the brief requires live platform integration

## What Is Implemented

- The `INC-4804` support export incident includes a Splunk Agentic Ops packet.
- The inspector shows SPL evidence queries, proposed agent actions, and the human approval reason.
- The public JSON notable-event bundle is available in the live deployment.

## Next Implementation Slice

Add a report export screen that converts the selected incident into a Splunk-style incident brief with notable event, evidence queries, risk score, confidence, and approval state.
