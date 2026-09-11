import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AiLabel, DemoNote, KpiCard, PageHeader, SectionCard } from "@/components/common/primitives";
import { funnel, homeKpis, ordersByCity, revenueGrowth } from "@/data/rocketloop";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Rocket-Loop" },
      {
        name: "description",
        content:
          "Outcome analytics for the expansion mission: funnel conversion, orders by city and revenue growth attributed to agent actions.",
      },
      { property: "og:title", content: "Analytics — Rocket-Loop" },
      { property: "og:description", content: "What the agent actions actually produced." },
    ],
  }),
  component: Analytics,
});

function Analytics() {
  const maxOrders = Math.max(...ordersByCity.map((c) => c.first + c.repeat));
  const maxRevenue = Math.max(...revenueGrowth.map((r) => r.revenue));

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Analytics"
        subtitle="Every number here traces back to a specific action an agent took."
        actions={
          <Button asChild variant="outline" className="gap-1.5">
            <Link to="/app/plan">
              Review the plan <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {homeKpis.slice(1).map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Expansion funnel" bodyClassName="space-y-3 p-5">
          {funnel.map((f) => (
            <div key={f.stage}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">{f.stage}</span>
                <span className="tabular-nums text-muted-foreground">
                  {f.value} · {f.pct}%
                </span>
              </div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${f.pct}%` }} />
              </div>
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Orders by city" description="First orders vs repeat orders" bodyClassName="space-y-3 p-5">
          {ordersByCity.map((c) => (
            <div key={c.city}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">{c.city}</span>
                <span className="tabular-nums text-muted-foreground">
                  {c.first} first · {c.repeat} repeat
                </span>
              </div>
              <div className="mt-1.5 flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-l-full bg-primary"
                  style={{ width: `${(c.first / maxOrders) * 100}%` }}
                />
                <div
                  className="h-full rounded-r-full bg-success"
                  style={{ width: `${(c.repeat / maxOrders) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </SectionCard>
      </div>

      <SectionCard title="Revenue growth" description="₹ in lakhs, with samples dispatched" bodyClassName="p-5">
        <div className="flex h-56 items-end gap-6">
          {revenueGrowth.map((r) => (
            <div key={r.month} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-semibold tabular-nums text-foreground">
                ₹{r.revenue}L
              </span>
              <div
                className="w-full max-w-[64px] rounded-t-md bg-primary"
                style={{ height: `${(r.revenue / maxRevenue) * 160}px` }}
              />
              <span className="text-xs text-muted-foreground">{r.month}</span>
              <span className="text-[11px] text-muted-foreground">{r.samples} samples</span>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="panel p-5">
        <AiLabel>What Rocket-Loop concluded</AiLabel>
        <ul className="mt-3 space-y-2 text-sm text-foreground">
          <li>
            Jaipur converts samples to orders 28% better than Kota — outreach volume has been
            shifted accordingly.
          </li>
          <li>
            Follow-ups sent 6–9 days after delivery produce most first orders; earlier nudges
            underperform.
          </li>
          <li>
            Outlets within 12 km of the Jaipur warehouse convert 1.6x better, so proximity now
            carries more weight in scoring.
          </li>
        </ul>
      </div>

      <DemoNote />
    </div>
  );
}
