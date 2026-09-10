import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DemoNote,
  KpiCard,
  PageHeader,
  Pill,
  ScoreBar,
  SectionCard,
} from "@/components/common/primitives";
import { cityOpportunities, competitorGaps, demandSignals, marketKpis } from "@/data/rocketloop";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/markets")({
  head: () => ({
    meta: [
      { title: "Market Analysis — Rocket-Loop" },
      {
        name: "description",
        content:
          "Territory-level market analysis: outlet density, competitor availability gaps and demand signals across Rajasthan.",
      },
      { property: "og:title", content: "Market Analysis — Rocket-Loop" },
      { property: "og:description", content: "Where the demand is, and where competitors are not." },
    ],
  }),
  component: Markets,
});

function Markets() {
  const [selected, setSelected] = useState(cityOpportunities[0].city);
  const city = cityOpportunities.find((c) => c.city === selected) ?? cityOpportunities[0];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Market Analysis"
        subtitle="Rajasthan territory · what Rocket-Loop found on the ground and why it matters."
        actions={
          <Button asChild className="gap-1.5">
            <Link to="/app/plan">
              See the plan <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {marketKpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <SectionCard
          title="Opportunity map"
          description="Bubble size reflects the number of high-potential outlets."
          bodyClassName="p-4"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-muted/40">
            {cityOpportunities.map((c) => (
              <button
                key={c.city}
                onClick={() => setSelected(c.city)}
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all",
                  c.city === selected
                    ? "border-primary bg-primary/25"
                    : "border-primary/40 bg-primary/10 hover:bg-primary/20",
                )}
              >
                <span
                  className="grid place-items-center text-[11px] font-semibold text-primary"
                  style={{
                    width: `${40 + c.highPotential / 40}px`,
                    height: `${40 + c.highPotential / 40}px`,
                  }}
                >
                  {c.score}
                </span>
              </button>
            ))}
            <span className="absolute bottom-3 left-3 text-[11px] text-muted-foreground">
              Rajasthan · illustrative positioning
            </span>
          </div>

          <div className="mt-4 rounded-lg border border-border p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-foreground">{city.city}</h3>
              <Pill tone="primary">Opportunity score {city.score}</Pill>
            </div>
            <dl className="mt-3 grid grid-cols-3 gap-3 text-xs">
              <div>
                <dt className="text-muted-foreground">Outlets</dt>
                <dd className="font-semibold text-foreground">{city.outlets.toLocaleString("en-IN")}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">High potential</dt>
                <dd className="font-semibold text-foreground">{city.highPotential.toLocaleString("en-IN")}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Availability gap</dt>
                <dd className="font-semibold text-foreground">{city.gap}%</dd>
              </div>
            </dl>
            <Button asChild size="sm" variant="outline" className="mt-3 gap-1.5">
              <Link to="/app/opportunities">
                See {city.city} opportunities <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="City scores" bodyClassName="space-y-3 p-4">
            {cityOpportunities.map((c) => (
              <ScoreBar key={c.city} label={c.city} score={c.score} />
            ))}
          </SectionCard>

          <SectionCard title="Demand signals" bodyClassName="space-y-3 p-4">
            {demandSignals.map((s) => (
              <div key={s.id} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-foreground">{s.signal}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {s.city} · {s.window}
                  </p>
                </div>
                <Pill tone={s.tone}>{s.trend}</Pill>
              </div>
            ))}
          </SectionCard>

          <SectionCard title="Competitor availability gaps" bodyClassName="space-y-3 p-4">
            {competitorGaps.map((g) => (
              <div key={g.id} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-foreground">{g.area}</p>
                  <Pill tone={g.tone}>{g.outlets} outlets</Pill>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{g.gap}</p>
              </div>
            ))}
          </SectionCard>
        </div>
      </div>

      <DemoNote />
    </div>
  );
}
