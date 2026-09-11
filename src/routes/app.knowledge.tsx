import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";

import { AiLabel, DemoNote, PageHeader, Pill, SectionCard } from "@/components/common/primitives";
import { aiLearned, knowledgeSections, knowledgeSources } from "@/data/rocketloop";

export const Route = createFileRoute("/app/knowledge")({
  head: () => ({
    meta: [
      { title: "Knowledge Base — Rocket-Loop" },
      {
        name: "description",
        content:
          "Everything Rocket-Loop knows about the brand: products, pricing rules, approved claims, playbooks and territories.",
      },
      { property: "og:title", content: "Knowledge Base — Rocket-Loop" },
      { property: "og:description", content: "The brand truth every agent works from." },
    ],
  }),
  component: Knowledge,
});

function Knowledge() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Knowledge Base"
        subtitle="What Rocket-Loop learned about your brand, and the sources it learned from."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {knowledgeSections.map((s) => (
          <article key={s.id} className="panel p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-foreground">{s.title}</h2>
              <Pill tone="muted">{s.items}</Pill>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.learned}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Rules the agents follow" bodyClassName="space-y-3 p-5">
          <AiLabel>Extracted brand truth</AiLabel>
          <dl className="space-y-2.5">
            {aiLearned.map((l) => (
              <div key={l.label} className="rounded-lg border border-border p-3">
                <dt className="text-xs text-muted-foreground">{l.label}</dt>
                <dd className="mt-0.5 text-sm text-foreground">{l.value}</dd>
              </div>
            ))}
          </dl>
        </SectionCard>

        <SectionCard title="Sources" description="Where this knowledge came from" bodyClassName="p-0">
          <ul className="divide-y divide-border">
            {knowledgeSources.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <span className="flex min-w-0 items-center gap-2.5">
                  <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-foreground">{s.name}</span>
                    <span className="block text-[11px] text-muted-foreground">
                      Updated {s.updated}
                    </span>
                  </span>
                </span>
                <Pill tone="primary">{s.type}</Pill>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <DemoNote />
    </div>
  );
}
