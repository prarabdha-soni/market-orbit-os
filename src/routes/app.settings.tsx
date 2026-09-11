import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Switch } from "@/components/ui/switch";
import { DemoNote, PageHeader, Pill, SectionCard } from "@/components/common/primitives";
import { autonomyLevels, autonomySettings, workspace } from "@/data/rocketloop";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Autonomy & Settings — Rocket-Loop" },
      {
        name: "description",
        content:
          "Control how much Rocket-Loop does on its own: discovery, targeting, outreach, sampling and commercial commitments.",
      },
      { property: "og:title", content: "Autonomy & Settings — Rocket-Loop" },
      { property: "og:description", content: "Guardrails for an autonomous expansion team." },
    ],
  }),
  component: Settings,
});

function Settings() {
  const [level, setLevel] = useState(2);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Autonomy & Settings"
        subtitle={`Workspace: ${workspace.company} · ${workspace.user.name}, ${workspace.user.role}`}
      />

      <SectionCard title="Global autonomy level" bodyClassName="grid gap-3 p-5 sm:grid-cols-2">
        {autonomyLevels.map((l) => (
          <button
            key={l.level}
            onClick={() => setLevel(l.level)}
            className={cn(
              "rounded-lg border p-4 text-left transition-colors",
              level === l.level ? "border-primary/30 bg-primary-soft" : "border-border hover:bg-muted",
            )}
          >
            <span className="text-sm font-semibold text-foreground">
              Level {l.level} · {l.name}
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
              {l.detail}
            </span>
          </button>
        ))}
      </SectionCard>

      <SectionCard
        title="Per-step controls"
        description="Override autonomy for individual parts of the loop."
        bodyClassName="p-0"
      >
        <ul className="divide-y divide-border">
          {autonomySettings.map((s) => (
            <li key={s.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <span className="min-w-0">
                <span className="block text-sm font-medium text-foreground">{s.label}</span>
                <span className="block text-xs text-muted-foreground">{s.value}</span>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <Pill tone={s.level >= 3 ? "success" : "warning"}>Level {s.level}</Pill>
                <Switch defaultChecked={s.level >= 3} aria-label={`Automate ${s.label}`} />
              </span>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Guardrails" bodyClassName="space-y-3 p-5">
        {[
          ["Never quote below ₹410 wholesale without approval", true],
          ["Hindi-first messaging in Rajasthan territories", true],
          ["One sample kit per store, after address confirmation", true],
          ["No medical outcome claims in any message", true],
          ["Pause outreach on weekends and public holidays", false],
        ].map(([label, on]) => (
          <div key={label as string} className="flex items-center justify-between gap-3">
            <span className="text-sm text-foreground">{label}</span>
            <Switch defaultChecked={on as boolean} aria-label={label as string} />
          </div>
        ))}
      </SectionCard>

      <DemoNote />
    </div>
  );
}
