import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DemoNote, PageHeader, Pill, SectionCard } from "@/components/common/primitives";
import { campaignMetrics, conversations } from "@/data/rocketloop";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/campaigns")({
  head: () => ({
    meta: [
      { title: "Campaigns & Conversations — Rocket-Loop" },
      {
        name: "description",
        content:
          "Localised WhatsApp and voice outreach run by Rocket-Loop, with every AI-generated message visible and approvable.",
      },
      { property: "og:title", content: "Campaigns & Conversations — Rocket-Loop" },
      { property: "og:description", content: "Hindi-first retailer conversations, run and tracked." },
    ],
  }),
  component: Campaigns,
});

function Campaigns() {
  const [activeId, setActiveId] = useState(conversations[0]?.id ?? "");
  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Campaigns"
        subtitle="Every conversation Rocket-Loop is running with retailers, in their language."
        actions={
          <Button asChild variant="outline" className="gap-1.5">
            <Link to="/app/orders">
              Fulfillment <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {campaignMetrics.map((m) => (
          <div key={m.id} className="panel p-4">
            <p className="stat-label truncate">{m.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{m.value}</p>
            <p className="mt-1 text-xs text-success">{m.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <SectionCard title="Conversations" bodyClassName="p-0">
          <ul className="max-h-[560px] divide-y divide-border overflow-y-auto">
            {conversations.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    "w-full px-4 py-3 text-left transition-colors hover:bg-muted/60",
                    c.id === active?.id && "bg-primary-soft/50",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-foreground">
                      {c.business}
                    </span>
                    <span className="shrink-0 text-[11px] text-muted-foreground">{c.ago}</span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {c.area}, {c.city} · {c.language}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Pill tone={c.stage === "First order" ? "success" : "primary"}>{c.stage}</Pill>
                    {c.unread ? <span className="h-1.5 w-1.5 rounded-full bg-danger" /> : null}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title={active?.business ?? "Conversation"}
          description={active ? `${active.area}, ${active.city} · ${active.language}` : undefined}
          bodyClassName="p-0"
        >
          <div className="max-h-[460px] space-y-4 overflow-y-auto p-5">
            {active?.messages.map((m, i) => (
              <div
                key={i}
                className={cn("flex", m.from === "agent" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg px-3.5 py-2.5",
                    m.from === "agent"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-surface text-foreground",
                  )}
                >
                  <p className="text-sm leading-relaxed">{m.text}</p>
                  <p
                    className={cn(
                      "mt-1.5 text-[11px]",
                      m.from === "agent" ? "text-primary-foreground/70" : "text-muted-foreground",
                    )}
                  >
                    {m.at}
                    {m.meta ? ` · ${m.meta}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-border p-4">
            <Input placeholder="Add a human message to this conversation" />
            <Button size="icon" aria-label="Send">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </SectionCard>
      </div>

      <DemoNote />
    </div>
  );
}
