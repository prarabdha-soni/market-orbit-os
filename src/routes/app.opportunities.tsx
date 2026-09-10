import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  DemoNote,
  PageHeader,
  Pill,
  ScoreBadge,
  SectionCard,
} from "@/components/common/primitives";
import { inr, opportunities, type Opportunity } from "@/data/rocketloop";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/opportunities")({
  head: () => ({
    meta: [
      { title: "Opportunities — Rocket-Loop" },
      {
        name: "description",
        content:
          "Scored retail opportunities with the reasoning behind each score: demand, competitor gaps, route economics and expected first order.",
      },
      { property: "og:title", content: "Opportunities — Rocket-Loop" },
      { property: "og:description", content: "Every retailer, scored and explained." },
    ],
  }),
  component: Opportunities,
});

const cityFilters = ["All", "Jaipur", "Jodhpur", "Kota", "Udaipur", "Ajmer"];

function Opportunities() {
  const [city, setCity] = useState("All");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Opportunity | null>(null);

  const rows = useMemo(
    () =>
      opportunities.filter(
        (o) =>
          (city === "All" || o.city === city) &&
          (query.trim() === "" ||
            `${o.name} ${o.location} ${o.type}`.toLowerCase().includes(query.toLowerCase())),
      ),
    [city, query],
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Opportunities"
        subtitle="Retailers Rocket-Loop believes are worth your attention, and exactly why."
        actions={
          <Button asChild className="gap-1.5">
            <Link to="/app/campaigns">
              Go to outreach <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <SectionCard bodyClassName="p-0">
        <div className="flex flex-wrap items-center gap-2 border-b border-border p-4">
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search retailers or areas"
              className="pl-8"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cityFilters.map((c) => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={cn(
                  "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                  city === c
                    ? "border-primary/25 bg-primary-soft text-primary"
                    : "border-border text-muted-foreground hover:bg-muted",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-4 py-2.5 font-medium">Business</th>
                <th className="px-4 py-2.5 font-medium">Location</th>
                <th className="px-4 py-2.5 font-medium">Score</th>
                <th className="px-4 py-2.5 font-medium">Signal</th>
                <th className="px-4 py-2.5 font-medium">Est. first order</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{o.name}</p>
                    <p className="text-xs text-muted-foreground">{o.type}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {o.location}, {o.city}
                  </td>
                  <td className="px-4 py-3">
                    <ScoreBadge score={o.score} />
                  </td>
                  <td className="px-4 py-3">
                    <Pill tone={o.signalTone}>{o.signal}</Pill>
                  </td>
                  <td className="px-4 py-3 tabular-nums text-foreground">
                    {inr(o.estimatedFirstOrder)}
                  </td>
                  <td className="px-4 py-3">
                    <Pill tone={o.status === "Ready" ? "success" : "muted"}>{o.status}</Pill>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="ghost" onClick={() => setActive(o)}>
                      Why this?
                    </Button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    No retailers match this filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <DemoNote />

      <Sheet open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
          {active ? (
            <>
              <SheetHeader className="px-5 py-4">
                <SheetTitle>{active.name}</SheetTitle>
                <p className="text-sm text-muted-foreground">
                  {active.type} · {active.location}, {active.city}
                </p>
              </SheetHeader>
              <div className="space-y-5 px-5 pb-8">
                <ScoreBadge score={active.score} />

                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Why Rocket-Loop scored it this way
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {active.reasons.map((r) => (
                      <li key={r} className="flex gap-2 text-sm text-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border border-border p-3">
                    <dt className="text-xs text-muted-foreground">Competitor availability</dt>
                    <dd className="font-semibold text-foreground">{active.competitorAvailability}</dd>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <dt className="text-xs text-muted-foreground">Monthly demand</dt>
                    <dd className="font-semibold text-foreground">{active.monthlyDemand}</dd>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <dt className="text-xs text-muted-foreground">Distance</dt>
                    <dd className="font-semibold text-foreground">{active.distanceKm} km</dd>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <dt className="text-xs text-muted-foreground">Conversion probability</dt>
                    <dd className="font-semibold text-foreground">{active.conversionProbability}%</dd>
                  </div>
                </dl>

                <div className="rounded-lg border border-primary/20 bg-primary-soft/40 p-4">
                  <p className="text-xs font-semibold text-primary uppercase">Recommended action</p>
                  <p className="mt-1 text-sm text-foreground">{active.recommendedAction}</p>
                  <Button asChild size="sm" className="mt-3 gap-1.5">
                    <Link to="/app/campaigns" onClick={() => setActive(null)}>
                      Open conversation <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}
