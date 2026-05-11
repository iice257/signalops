import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleDot,
  ClipboardCheck,
  Clock,
  FileText,
  Filter,
  GitBranch,
  Loader2,
  Pause,
  Play,
  RefreshCw,
  Send,
  ShieldAlert,
  SlidersHorizontal,
  TerminalSquare,
  Zap,
} from "lucide-react";
import {
  connectors,
  incidents,
  liveLog,
  navItems,
  policies,
  timeline,
  type Incident,
  type Severity,
  type SourceKey,
} from "./data";

const severityRank: Record<Severity, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

const severityLabel: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

type LiveRepoSignal = {
  branch: string;
  openIssues: number;
  pushedAt: string;
  repo: string;
  stars: number;
  status: "loading" | "online" | "fallback";
  url: string;
};

function App() {
  const [selectedId, setSelectedId] = useState(incidents[0].id);
  const [activeSources, setActiveSources] = useState<Record<SourceKey, boolean>>({
    gitlab: true,
    elastic: true,
    splunk: true,
    web: false,
  });
  const [running, setRunning] = useState(false);
  const [approved, setApproved] = useState(false);
  const [sort, setSort] = useState<"risk" | "age">("risk");
  const [liveRepoSignal, setLiveRepoSignal] = useState<LiveRepoSignal>({
    branch: "main",
    openIssues: 0,
    pushedAt: "pending",
    repo: "iice257/signalops",
    stars: 0,
    status: "loading",
    url: "https://github.com/iice257/signalops",
  });

  const selected = incidents.find((incident) => incident.id === selectedId) ?? incidents[0];

  useEffect(() => {
    const controller = new AbortController();

    async function loadRepoSignal() {
      try {
        const response = await fetch("https://api.github.com/repos/iice257/signalops", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`GitHub returned ${response.status}`);
        }

        const repo = (await response.json()) as {
          default_branch: string;
          full_name: string;
          html_url: string;
          open_issues_count: number;
          pushed_at: string;
          stargazers_count: number;
        };

        setLiveRepoSignal({
          branch: repo.default_branch,
          openIssues: repo.open_issues_count,
          pushedAt: new Intl.DateTimeFormat(undefined, {
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            month: "short",
          }).format(new Date(repo.pushed_at)),
          repo: repo.full_name,
          stars: repo.stargazers_count,
          status: "online",
          url: repo.html_url,
        });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setLiveRepoSignal((current) => ({
          ...current,
          pushedAt: "cached",
          status: "fallback",
        }));
      }
    }

    void loadRepoSignal();

    return () => controller.abort();
  }, []);

  const visibleIncidents = useMemo(() => {
    return incidents
      .filter((incident) => activeSources[incident.source])
      .sort((a, b) => (sort === "risk" ? b.riskScore - a.riskScore : severityRank[b.severity] - severityRank[a.severity]));
  }, [activeSources, sort]);

  const activeConnectorCount = Object.values(activeSources).filter(Boolean).length;

  return (
    <div className="app-shell">
      <aside className="side-nav" aria-label="Main navigation">
        <div className="brand-lockup">
          <div className="brand-mark">
            <Activity size={18} strokeWidth={2.4} />
          </div>
          <div>
            <strong>SignalOps</strong>
            <span>Agent cockpit</span>
          </div>
        </div>

        <nav className="nav-list">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button className={index === 0 ? "nav-item active" : "nav-item"} key={item.label}>
                <Icon size={17} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="quota-panel">
          <div className="quota-topline">
            <span>Agent budget</span>
            <strong>68%</strong>
          </div>
          <div className="quota-track">
            <span style={{ width: "68%" }} />
          </div>
          <p>Fallback routing is ready for slow MCP responses.</p>
        </div>
      </aside>

      <main className="workspace">
        <CommandBar
          activeConnectorCount={activeConnectorCount}
          activeSources={activeSources}
          running={running}
          setActiveSources={setActiveSources}
          setRunning={setRunning}
        />

        <section className="metrics-strip" aria-label="Triage summary">
          <Metric label="Open incidents" value={visibleIncidents.length.toString()} trend="+2 in 30m" />
          <Metric label="Mean confidence" value="82%" trend="policy weighted" />
          <Metric label="Actions ready" value="7" trend="3 require approval" />
          <Metric label="Fallback health" value="96%" trend="2 degraded sources" />
        </section>

        <section className="triage-grid">
          <IncidentQueue
            incidents={visibleIncidents}
            selectedId={selected.id}
            setSelectedId={setSelectedId}
            setSort={setSort}
            sort={sort}
          />
          <IncidentDetail approved={approved} incident={selected} running={running} setApproved={setApproved} />
          <Inspector incident={selected} liveRepoSignal={liveRepoSignal} running={running} />
        </section>

        <LiveLog running={running} />
      </main>
    </div>
  );
}

function CommandBar({
  activeConnectorCount,
  activeSources,
  running,
  setActiveSources,
  setRunning,
}: {
  activeConnectorCount: number;
  activeSources: Record<SourceKey, boolean>;
  running: boolean;
  setActiveSources: (next: Record<SourceKey, boolean>) => void;
  setRunning: (next: boolean) => void;
}) {
  return (
    <header className="command-bar">
      <div className="project-select">
        <span>Project</span>
        <strong>Prod Security Console</strong>
        <ChevronRight size={15} />
      </div>

      <div className="source-toggles" aria-label="Data sources">
        {connectors.map((connector) => (
          <button
            aria-pressed={activeSources[connector.key]}
            className={activeSources[connector.key] ? "source-toggle selected" : "source-toggle"}
            key={connector.key}
            onClick={() => setActiveSources({ ...activeSources, [connector.key]: !activeSources[connector.key] })}
            title={connector.coverage}
          >
            <connector.icon size={15} />
            <span>{connector.label.replace(" MCP", "")}</span>
          </button>
        ))}
      </div>

      <div className="bar-actions">
        <button className="icon-button" title="Filter queue">
          <Filter size={17} />
        </button>
        <button className="icon-button" title="Triage settings">
          <SlidersHorizontal size={17} />
        </button>
        <button className="run-button" onClick={() => setRunning(!running)}>
          {running ? <Pause size={16} /> : <Play size={16} />}
          <span>{running ? "Pause agent" : "Run triage"}</span>
        </button>
        <span className="source-count">{activeConnectorCount} sources</span>
      </div>
    </header>
  );
}

function Metric({ label, trend, value }: { label: string; trend: string; value: string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{trend}</small>
    </div>
  );
}

function IncidentQueue({
  incidents: queue,
  selectedId,
  setSelectedId,
  setSort,
  sort,
}: {
  incidents: Incident[];
  selectedId: string;
  setSelectedId: (id: string) => void;
  setSort: (next: "risk" | "age") => void;
  sort: "risk" | "age";
}) {
  return (
    <section className="queue-panel" aria-label="Incident queue">
      <div className="panel-header compact">
        <div>
          <span>Queue</span>
          <h2>Incident candidates</h2>
        </div>
        <button className="subtle-button" onClick={() => setSort(sort === "risk" ? "age" : "risk")}>
          Sort: {sort === "risk" ? "risk" : "age"}
        </button>
      </div>

      <div className="incident-list">
        {queue.map((incident) => (
          <button
            className={incident.id === selectedId ? "incident-row selected" : "incident-row"}
            key={incident.id}
            onClick={() => setSelectedId(incident.id)}
          >
            <div className="row-top">
              <span className={`severity ${incident.severity}`}>{severityLabel[incident.severity]}</span>
              <span className="incident-age">{incident.age}</span>
            </div>
            <strong>{incident.title}</strong>
            <div className="row-bottom">
              <span>{incident.service}</span>
              <span>Risk {incident.riskScore}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function IncidentDetail({
  approved,
  incident,
  running,
  setApproved,
}: {
  approved: boolean;
  incident: Incident;
  running: boolean;
  setApproved: (next: boolean) => void;
}) {
  return (
    <section className="detail-panel" aria-label="Selected incident">
      <div className="panel-header">
        <div>
          <span>{incident.id}</span>
          <h1>{incident.title}</h1>
        </div>
        <span className={`status-badge ${incident.status}`}>{incident.status}</span>
      </div>

      <div className="evidence-map" aria-label="Evidence map">
        <div className="map-node primary">
          <ShieldAlert size={19} />
          <span>{incident.service}</span>
        </div>
        <div className="map-rail">
          <i />
          <i />
          <i />
        </div>
        {incident.signals.map((signal, index) => (
          <div className="map-node" key={signal} style={{ animationDelay: `${index * 90}ms` }}>
            <CircleDot size={13} />
            <span>{signal}</span>
          </div>
        ))}
      </div>

      <div className="timeline">
        {timeline.map((step) => {
          const Icon = step.icon;
          return (
            <div className={`timeline-step ${step.state}`} key={step.label}>
              <div className="step-icon">{step.state === "active" && running ? <Loader2 size={17} /> : <Icon size={17} />}</div>
              <div>
                <strong>{step.label}</strong>
                <p>{step.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hypothesis-block">
        <div className="section-label">
          <Zap size={15} />
          <span>Agent hypothesis</span>
        </div>
        <p>{incident.hypothesis}</p>
      </div>

      <div className="remediation-block">
        <div className="section-label">
          <ClipboardCheck size={15} />
          <span>Remediation plan</span>
        </div>
        <ol>
          {incident.remediation.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="plan-actions">
          <button className={approved ? "approve-button approved" : "approve-button"} onClick={() => setApproved(!approved)}>
            {approved ? <Check size={16} /> : <Send size={16} />}
            <span>{approved ? "Approved" : "Approve guarded action"}</span>
          </button>
          <button className="report-button">
            <FileText size={16} />
            <span>Export report</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function Inspector({
  incident,
  liveRepoSignal,
  running,
}: {
  incident: Incident;
  liveRepoSignal: LiveRepoSignal;
  running: boolean;
}) {
  return (
    <aside className="inspector-panel" aria-label="Incident inspector">
      <div className="panel-header compact">
        <div>
          <span>Inspector</span>
          <h2>Decision support</h2>
        </div>
        <button className="icon-button small" title="Refresh evidence">
          <RefreshCw size={15} />
        </button>
      </div>

      <div className="risk-meter">
        <div>
          <span>Risk score</span>
          <strong>{incident.riskScore}</strong>
        </div>
        <div className="meter-ring" style={{ ["--score" as string]: `${incident.riskScore}%` }}>
          <span>{incident.confidence}%</span>
        </div>
      </div>

      <section className="live-source-card">
        <div className="section-label">
          <GitBranch size={15} />
          <span>Live repo signal</span>
        </div>
        <div className="source-health">
          <strong>{liveRepoSignal.repo}</strong>
          <small className={liveRepoSignal.status}>{liveRepoSignal.status}</small>
        </div>
        <dl>
          <div>
            <dt>Branch</dt>
            <dd>{liveRepoSignal.branch}</dd>
          </div>
          <div>
            <dt>Open issues</dt>
            <dd>{liveRepoSignal.openIssues}</dd>
          </div>
          <div>
            <dt>Stars</dt>
            <dd>{liveRepoSignal.stars}</dd>
          </div>
          <div>
            <dt>Last push</dt>
            <dd>{liveRepoSignal.pushedAt}</dd>
          </div>
        </dl>
      </section>

      <section className="connector-stack">
        <h3>MCP sources</h3>
        {connectors.map((connector) => (
          <div className="connector-row" key={connector.key}>
            <connector.icon size={16} />
            <div>
              <strong>{connector.label}</strong>
              <span>{connector.coverage}</span>
            </div>
            <small className={connector.status}>{connector.status}</small>
          </div>
        ))}
      </section>

      <section className="policy-stack">
        <h3>Policy checks</h3>
        {policies.map((policy) => (
          <div className={`policy-row ${policy.state}`} key={policy.label}>
            <span />
            <div>
              <strong>{policy.label}</strong>
              <p>{policy.detail}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="fallback-box">
        <div className="section-label">
          <TerminalSquare size={15} />
          <span>Fallback state</span>
        </div>
        <p>
          {running
            ? "Splunk latency crossed threshold, so the agent is preserving partial evidence and routing advisory lookup through web data."
            : "Ready to resume with cached evidence and deterministic retry policy."}
        </p>
      </section>
    </aside>
  );
}

function LiveLog({ running }: { running: boolean }) {
  return (
    <section className="live-log" aria-label="Live log">
      <div className="log-heading">
        <div>
          <Clock size={15} />
          <span>Live execution stream</span>
        </div>
        <span>{running ? "running" : "paused"}</span>
      </div>
      <div className="log-lines">
        {liveLog.map((line) => (
          <code key={line}>{line}</code>
        ))}
      </div>
      <button className="open-runbook">
        <span>Open runbook draft</span>
        <ArrowUpRight size={15} />
      </button>
    </section>
  );
}

export default App;
