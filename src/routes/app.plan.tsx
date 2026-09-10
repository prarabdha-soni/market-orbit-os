import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AiLabel, DemoNote, PageHeader, Pill, SectionCard } from "@/components/common/primitives";
import { autonomySettings, planStrategy, planTimeline, workspace } from "@/data/rocketloop";

export const Route = createFileRoute("/app/plan")({
  head: () => ({
    meta: [
      { title: "AI Expansion Plan — Rocket-Loop" },
      {
        name: "description",
        content:
          "The full strategy Rocket-Loop is executing: prioritisation, outreach, qualification, sampling, follow-up and reallocation.",
      },
      { property: "og:title", content: "AI Expansion Plan — Rocket-Loop" },
      { property: "og:description", content: "The seven-step expansion strategy, in plain language." },
    ],
  }),
  component: Plan,
});

function Plan() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title="AI Expansion Plan"
        subtitle={`How Rocket-Loop intends to grow ${workspace.brand} across Rajasthan over the next 12 weeks.`}
        actions={
          <Button asChild className="gap-1.5">
            <Link to="/app/opportunities">
              Review targets <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="panel p-5">
        <AiLabel>Strategy summary</AiLabel>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground">
          Concentrate effort on Jaipur and Jodhpur, where category demand is rising and competitor
          availability has dropped. Reach 500 high-fit retailers with Hindi-first outreach, convert
          interest into sample dispatches, and follow up in the 6–9 day window where first orders
          historically cluster. Reallocate weekly toward the cities that actually convert.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <SectionCard title="The seven-step strategy" bodyClassName="space-y-0 p-5">
          <ol className="space-y-0">
            {planStrategy.map((s, i) => (
              <li key={s.step} className="relative pb-6 pl-10 last:pb-0">
                {i < planStrategy.length - 1 ? (
                  <span className="absolute top-8 left-[15px] h-full w-px bg-border" />
                ) : null}
                <span className="absolute top-0 left-0 grid h-8 w-8 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
                  {s.step}
                </span>
                <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
              </li>
            ))}
          </ol>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Timeline" bodyClassName="space-y-3 p-4">
            {planTimeline.map((t) => (
              <div key={t.window} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground">{t.title}</p>
                  <Pill tone="primary">{t.window}</Pill>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t.detail}</p>
              </div>
            ))}
          </SectionCard>

          <SectionCard
            title="Autonomy for this mission"
            description="What runs automatically, what waits for you."
            actions={
              <Button asChild size="sm" variant="ghost">
                <Link to="/app/settings">Change</Link>
              </Button>
            }
            bodyClassName="space-y-2.5 p-4"
          >
            {autonomySettings.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="text-foreground">{s.label}</span>
                <Pill tone={s.level >= 3 ? "success" : "warning"}>{s.value}</Pill>
              </div>
            ))}
          </SectionCard>
        </div>
      </div>

      <DemoNote />
    </div>
  );
}
