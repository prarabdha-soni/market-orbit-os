import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Map, MessageSquare, Package, Rocket, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AiLabel } from "@/components/common/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rocket-Loop — Autonomous Market Expansion OS for Indian Brands" },
      {
        name: "description",
        content:
          "Rocket-Loop is the AI Expansion Manager for Indian physical-product brands: find retailers, run localised outreach, ship samples and track real orders.",
      },
      { property: "og:title", content: "Rocket-Loop — Autonomous Market Expansion OS" },
      {
        property: "og:description",
        content:
          "The operating system for physical-market expansion in India. Discover, decide, reach out, fulfil and measure — autonomously.",
      },
    ],
  }),
  component: Landing,
});

const capabilities = [
  { icon: Map, title: "Market Analysis", body: "Index every outlet in a territory and score it against your category." },
  { icon: Target, title: "Opportunity Scoring", body: "Rank retailers by demand, competitor gaps and route economics." },
  { icon: MessageSquare, title: "Localised Outreach", body: "Hindi-first WhatsApp and voice conversations, human-approved." },
  { icon: Package, title: "Sampling & Fulfillment", body: "Batch sample kits by route and track every shipment to delivery." },
  { icon: BarChart3, title: "Attribution", body: "Every order traced back to the action that created it." },
  { icon: Rocket, title: "Autonomy Controls", body: "Choose recommend, approve, execute or optimise per step." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <span className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary">
              <Rocket className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="text-sm font-semibold text-foreground">Rocket-Loop</span>
          </span>
          <Button asChild size="sm">
            <Link to="/app">
              Open workspace <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-5 py-20">
          <AiLabel>Autonomous Market Expansion OS</AiLabel>
          <h1 className="mt-5 max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-5xl">
            The AI Expansion Manager for Indian physical-product brands.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Rocket-Loop runs the full expansion loop for you — finding real retailers on the
            ground, deciding where effort should go, running localised conversations, dispatching
            samples and proving which actions turned into orders.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/app">
                Enter the Gloww demo <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/app/new-expansion">Start a new expansion</Link>
            </Button>
          </div>

          <dl className="mt-16 grid gap-4 sm:grid-cols-3">
            {[
              ["12,842", "Outlets indexed in Rajasthan"],
              ["842", "Localised conversations run"],
              ["₹4.8L", "Attributed first-order revenue"],
            ].map(([value, label]) => (
              <div key={label} className="panel p-5">
                <dt className="stat-label">{label}</dt>
                <dd className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="text-2xl font-semibold text-foreground">One loop, end to end</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((c) => (
                <article key={c.title} className="panel p-5">
                  <c.icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 text-sm font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-8 text-center text-xs text-muted-foreground">
        Rocket-Loop · Demo workspace shows illustrative data for Gloww Brands.
      </footer>
    </div>
  );
}
