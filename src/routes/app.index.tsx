import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Rocket, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AiLabel, DemoNote, KpiCard, PageHeader, Pill, SectionCard } from "@/components/common/primitives";
import { activityEvents, agents, homeKpis, missions, recommendations, workspace } from "@/data/rocketloop";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Expansion Home — Rocket-Loop" },
      {
        name: "description",
        content: "Live view of every expansion mission, agent action and result for Gloww Brands.",
      },
      { property: "og:title", content: "Expansion Home — Rocket-Loop" },
      { property: "og:description", content: "Missions, recommendations and live agent activity." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title={`Good morning, ${workspace.user.name.split(" ")[0]}`}
        subtitle={`Rocket-Loop is running expansion for ${workspace.company}. Data fresh as of ${workspace.dataAsOf}.`}
        actions={
          <Button asChild className="gap-1.5">
            <Link to="/app/new-expansion">
              <Rocket className="h-4 w-4" /> New Expansion
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {homeKpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <SectionCard
            title="Active Expansion Missions"
            description="Each mission is a territory Rocket-Loop is working right now."
            actions={
              <Button asChild variant="ghost" size="sm">
                <Link to="/app/markets">View markets</Link>
              </Button>
            }
            bodyClassName="space-y-3 p-4"
          >
            {missions.map((m) => (
              <article key={m.id} className="rounded-lg border border-border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{m.name}</h3>
                  <Pill tone={m.status === "Running" ? "success" : m.status === "Planning" ? "primary" : "warning"}>
                    {m.status}
                  </Pill>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {m.cities.join(" · ")} · started {m.startedOn}
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${m.progress}%` }} />
                </div>
                <dl className="mt-3 grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <dt className="text-muted-foreground">Target</dt>
                    <dd className="font-semibold text-foreground">{m.targetLabel}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Qualified</dt>
                    <dd className="font-semibold text-foreground">{m.qualified}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">First orders</dt>
                    <dd className="font-semibold text-foreground">{m.orders}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </SectionCard>

          <SectionCard title="Agent Team" description="What each agent is doing right now." bodyClassName="grid gap-3 p-4 sm:grid-cols-2">
            {agents.map((a) => (
              <Link
                key={a.id}
                to="/app/agents/$agentId"
                params={{ agentId: a.id }}
                className="rounded-lg border border-border p-3 transition-colors hover:border-primary/40 hover:bg-primary-soft/40"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-foreground">{a.shortName}</span>
                  <Pill tone={a.status === "Running" ? "success" : a.status === "Idle" ? "muted" : "warning"}>
                    {a.status}
                  </Pill>
                </div>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {a.currentTask}
                </p>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  {a.actionsToday} actions today · {a.usefulOutcomes} {a.usefulOutcomesLabel.toLowerCase()}
                </p>
              </Link>
            ))}
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="What Rocket-Loop recommends" bodyClassName="space-y-3 p-4">
            {recommendations.map((r) => (
              <article key={r.id} className="rounded-lg border border-primary/20 bg-primary-soft/40 p-4">
                <AiLabel />
                <h3 className="mt-2.5 text-sm font-semibold text-foreground">{r.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{r.reason}</p>
                <p className="mt-2 text-xs font-medium text-foreground">{r.impact}</p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-muted-foreground">Confidence {r.confidence}%</span>
                  <Button asChild size="sm" variant="outline" className="gap-1">
                    <Link to="/app/opportunities">
                      {r.primaryAction} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </SectionCard>

          <SectionCard
            title="Live activity"
            description="Latest agent actions"
            bodyClassName="space-y-3 p-4"
          >
            {activityEvents.slice(0, 6).map((e) => (
              <div key={e.id} className="border-l-2 border-border pl-3">
                <p className="text-xs font-medium text-foreground">{e.action}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{e.reason}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {e.agent} · {e.at}
                </p>
              </div>
            ))}
          </SectionCard>

          <SectionCard title="Next best step" bodyClassName="p-4">
            <p className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Sparkles className="h-4 w-4 text-primary" /> Review the AI Expansion Plan
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              The plan explains the full strategy Rocket-Loop is executing on your behalf.
            </p>
            <Button asChild size="sm" className="mt-3 w-full gap-1.5">
              <Link to="/app/plan">
                Open plan <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </SectionCard>
        </div>
      </div>

      <DemoNote />
    </div>
  );
}
