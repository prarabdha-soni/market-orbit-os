import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AiLabel, DemoNote, PageHeader, Pill, SectionCard } from "@/components/common/primitives";
import { cityOpportunities, workspace } from "@/data/rocketloop";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/new-expansion")({
  head: () => ({
    meta: [
      { title: "New Expansion — Rocket-Loop" },
      {
        name: "description",
        content:
          "Set up a new market expansion mission: brand, territory, target retailers and how autonomous Rocket-Loop should be.",
      },
      { property: "og:title", content: "New Expansion — Rocket-Loop" },
      { property: "og:description", content: "Launch an autonomous expansion mission in four steps." },
    ],
  }),
  component: NewExpansion,
});

const steps = ["Brand", "Territory", "Targets", "Autonomy"] as const;

function NewExpansion() {
  const [step, setStep] = useState(0);
  const [cities, setCities] = useState<string[]>(["Jaipur", "Jodhpur"]);
  const [autonomy, setAutonomy] = useState(2);
  const [goal, setGoal] = useState("500");

  const toggleCity = (city: string) =>
    setCities((prev) => (prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]));

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="New Expansion Mission"
        subtitle="Tell Rocket-Loop where to grow. It will handle discovery, outreach, sampling and follow-up."
      />

      <ol className="grid grid-cols-4 gap-2">
        {steps.map((s, i) => (
          <li key={s}>
            <button
              onClick={() => setStep(i)}
              className={cn(
                "w-full rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors",
                i === step
                  ? "border-primary/30 bg-primary-soft text-primary"
                  : i < step
                    ? "border-success/25 bg-success-soft text-success"
                    : "border-border text-muted-foreground hover:bg-muted",
              )}
            >
              <span className="block text-[10px] tracking-wide uppercase opacity-70">
                Step {i + 1}
              </span>
              <span className="flex items-center gap-1">
                {i < step ? <Check className="h-3 w-3" /> : null} {s}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <SectionCard bodyClassName="space-y-5 p-5">
        {step === 0 ? (
          <>
            <AiLabel>Brand learned from your website</AiLabel>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="brand">Brand name</Label>
                <Input id="brand" defaultValue={workspace.brand} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="site">Website</Label>
                <Input id="site" defaultValue={workspace.website} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cat">Category</Label>
                <Input id="cat" defaultValue={workspace.category} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pos">Positioning</Label>
                <Input id="pos" defaultValue={workspace.positioning} />
              </div>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-xs font-semibold text-foreground">Products detected</p>
              <ul className="mt-2 space-y-1.5">
                {workspace.products.map((p) => (
                  <li key={p.name} className="flex items-center justify-between gap-2 text-sm">
                    <span className="text-foreground">{p.name}</span>
                    <span className="text-xs text-muted-foreground">{p.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <div className="space-y-1.5">
              <Label>State / territory</Label>
              <Input defaultValue="Rajasthan" />
            </div>
            <div>
              <Label>Cities to work</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {cityOpportunities.map((c) => (
                  <button
                    key={c.city}
                    onClick={() => toggleCity(c.city)}
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                      cities.includes(c.city)
                        ? "border-primary/30 bg-primary-soft text-primary"
                        : "border-border text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {c.city} · {c.score}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {cities.length} cities selected ·{" "}
                {cityOpportunities
                  .filter((c) => cities.includes(c.city))
                  .reduce((sum, c) => sum + c.highPotential, 0)
                  .toLocaleString("en-IN")}{" "}
                high-potential outlets in scope.
              </p>
            </div>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="goal">Retailers to onboard</Label>
                <Input id="goal" value={goal} onChange={(e) => setGoal(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="type">Business types</Label>
                <Input id="type" defaultValue="Pharmacies, health stores, clinics" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="notes">Anything the agents must know</Label>
              <Textarea
                id="notes"
                rows={4}
                defaultValue="Never quote below ₹410 wholesale without approval. Hindi-first messaging in Rajasthan."
              />
            </div>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <p className="text-sm text-muted-foreground">
              How much should Rocket-Loop do on its own? You can change this later.
            </p>
            <div className="space-y-2">
              {[
                ["Recommend", "Rocket-Loop suggests, you decide everything."],
                ["Approve", "Rocket-Loop prepares actions, you approve each batch."],
                ["Execute", "Rocket-Loop executes inside agreed guardrails."],
                ["Optimize", "Rocket-Loop reallocates effort based on outcomes."],
              ].map(([name, detail], i) => (
                <button
                  key={name}
                  onClick={() => setAutonomy(i + 1)}
                  className={cn(
                    "w-full rounded-lg border p-3 text-left transition-colors",
                    autonomy === i + 1
                      ? "border-primary/30 bg-primary-soft"
                      : "border-border hover:bg-muted",
                  )}
                >
                  <span className="text-sm font-semibold text-foreground">
                    Level {i + 1} · {name}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{detail}</span>
                </button>
              ))}
            </div>
            <div className="rounded-lg border border-primary/20 bg-primary-soft/40 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Sparkles className="h-4 w-4 text-primary" /> Mission summary
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {workspace.brand} · {cities.join(", ")} · {goal} retailers · autonomy level{" "}
                {autonomy}. Rocket-Loop will index outlets, score them, run approved outreach and
                report on every order created.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Pill tone="primary">Discovery automated</Pill>
                <Pill tone="warning">First outreach approved by you</Pill>
                <Pill tone="success">Attribution on</Pill>
              </div>
            </div>
          </>
        ) : null}

        <div className="flex items-center justify-between gap-2 border-t border-border pt-4">
          <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
          {step < 3 ? (
            <Button className="gap-1.5" onClick={() => setStep((s) => s + 1)}>
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button asChild className="gap-1.5">
              <Link to="/app/markets">
                Launch mission <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </SectionCard>

      <DemoNote />
    </div>
  );
}
