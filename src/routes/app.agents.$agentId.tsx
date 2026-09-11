import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DemoNote, PageHeader, Pill, SectionCard } from "@/components/common/primitives";
import { activityEvents, agents } from "@/data/rocketloop";

export const Route = createFileRoute("/app/agents/$agentId")({
  loader: ({ params }) => {
    const agent = agents.find((a) => a.id === params.agentId);
    if (!agent) throw notFound();
    return { agent };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Agent unavailable — Rocket-Loop" }, { name: "robots", content: "noindex" }],
      };
    }
    const { agent } = loaderData;
    return {
      meta: [
        { title: `${agent.name} — Rocket-Loop` },
        { name: "description", content: agent.purpose },
        { property: "og:title", content: `${agent.name} — Rocket-Loop` },
        { property: "og:description", content: agent.purpose },
      ],
    };
  },
  component: AgentDetail,
  errorComponent: AgentError,
  notFoundComponent: AgentNotFound,
});

function AgentNotFound() {
  const { agentId } = Route.useParams();
  return (
    <div className="mx-auto max-w-2xl py-16 text-center">
      <h1 className="text-xl font-semibold text-foreground">No agent called “{agentId}”</h1>
      <Button asChild className="mt-4">
        <Link to="/app">Back to home</Link>
      </Button>
    </div>
  );
}

function AgentError() {
  return (
    <div className="mx-auto max-w-2xl py-16 text-center">
      <h1 className="text-xl font-semibold text-foreground">This agent didn't load</h1>
      <Button asChild className="mt-4">
        <Link to="/app">Back to home</Link>
      </Button>
    </div>
  );
}

function AgentDetail() {
  const { agent } = Route.useLoaderData();
  const events = activityEvents.filter((e) => e.agentId === agent.id);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Button asChild variant="ghost" size="sm" className="gap-1.5">
        <Link to="/app">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </Button>

      <PageHeader
        title={agent.name}
        subtitle={agent.purpose}
        actions={
          <Pill tone={agent.status === "Running" ? "success" : agent.status === "Idle" ? "muted" : "warning"}>
            {agent.status}
          </Pill>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Actions today", String(agent.actionsToday)],
          [agent.usefulOutcomesLabel, String(agent.usefulOutcomes)],
          ["Success rate", `${agent.successRate}%`],
          ["Confidence", `${agent.confidence}%`],
        ].map(([label, value]) => (
          <div key={label} className="panel p-4">
            <p className="stat-label truncate">{label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <SectionCard title="Current task" bodyClassName="p-5">
            <p className="text-sm text-foreground">{agent.currentTask}</p>
            <p className="mt-2 text-xs text-muted-foreground">Last action: {agent.lastAction}</p>
          </SectionCard>

          <SectionCard title="Recent decisions and reasoning" bodyClassName="space-y-3 p-5">
            {agent.decisions.map((d) => (
              <div key={d.at} className="border-l-2 border-primary/40 pl-3">
                <p className="text-xs text-muted-foreground">{d.at}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-foreground">{d.text}</p>
              </div>
            ))}
          </SectionCard>

          <SectionCard title="Activity" bodyClassName="space-y-3 p-5">
            {events.length === 0 ? (
              <p className="text-sm text-muted-foreground">No logged events for this agent yet.</p>
            ) : (
              events.map((e) => (
                <div key={e.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-foreground">{e.action}</p>
                    <span className="shrink-0 text-[11px] text-muted-foreground">{e.at}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{e.reason}</p>
                </div>
              ))
            )}
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Tools it can use" bodyClassName="flex flex-wrap gap-2 p-5">
            {agent.tools.map((t) => (
              <Pill key={t} tone="primary">
                {t}
              </Pill>
            ))}
          </SectionCard>

          <SectionCard title="Oversight" bodyClassName="space-y-2 p-5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Approvals pending</span>
              <span className="font-semibold text-foreground">{agent.approvals}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Errors today</span>
              <span className="font-semibold text-foreground">{agent.errors}</span>
            </div>
          </SectionCard>

          <SectionCard title="What it learned" bodyClassName="p-5">
            <p className="text-sm leading-relaxed text-foreground">{agent.learning}</p>
          </SectionCard>
        </div>
      </div>

      <DemoNote />
    </div>
  );
}
