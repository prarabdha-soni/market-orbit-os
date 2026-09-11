import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DemoNote, PageHeader, Pill, SectionCard } from "@/components/common/primitives";
import { fulfillmentTimeline, inr, samples } from "@/data/rocketloop";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/orders")({
  head: () => ({
    meta: [
      { title: "Orders & Fulfillment — Rocket-Loop" },
      {
        name: "description",
        content:
          "Track every sample kit from request to delivery to first order, with courier status and conversion potential.",
      },
      { property: "og:title", content: "Orders & Fulfillment — Rocket-Loop" },
      { property: "og:description", content: "Sample dispatch and order tracking across Rajasthan." },
    ],
  }),
  component: Orders,
});

const toneFor = (status: string) =>
  status === "Converted" || status === "Delivered"
    ? "success"
    : status === "Requested"
      ? "warning"
      : "primary";

function Orders() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Orders & Fulfillment"
        subtitle="Samples and shipments Rocket-Loop created from qualified conversations."
        actions={
          <Button asChild className="gap-1.5">
            <Link to="/app/analytics">
              See results <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Samples in flight", "3"],
          ["Awaiting approval", "1"],
          ["Delivered this month", "42"],
          ["Converted to orders", "67"],
        ].map(([label, value]) => (
          <div key={label} className="panel p-4">
            <p className="stat-label">{label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
          </div>
        ))}
      </div>

      <SectionCard title="Sample shipments" bodyClassName="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-4 py-2.5 font-medium">Business</th>
                <th className="px-4 py-2.5 font-medium">City</th>
                <th className="px-4 py-2.5 font-medium">Kit</th>
                <th className="px-4 py-2.5 font-medium">Courier</th>
                <th className="px-4 py-2.5 font-medium">Tracking</th>
                <th className="px-4 py-2.5 font-medium">Potential</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {samples.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium text-foreground">{s.business}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.city}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.kit}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.courier}</td>
                  <td className="px-4 py-3 tabular-nums text-muted-foreground">{s.tracking}</td>
                  <td className="px-4 py-3 tabular-nums text-foreground">{inr(s.potential)}</td>
                  <td className="px-4 py-3">
                    <Pill tone={toneFor(s.status)}>{s.status}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard
        title="Fulfillment journey"
        description="MedPlus Pharmacy, Jaipur · Gloww Retail Kit"
        bodyClassName="p-5"
      >
        <ol className="grid gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {fulfillmentTimeline.map((stage, i) => {
            const done = i <= 3;
            return (
              <li key={stage} className="rounded-lg border border-border p-3">
                <span
                  className={cn(
                    "grid h-6 w-6 place-items-center rounded-full text-[11px] font-semibold",
                    done ? "bg-success-soft text-success" : "bg-muted text-muted-foreground",
                  )}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <p className="mt-2 text-xs font-medium text-foreground">{stage}</p>
              </li>
            );
          })}
        </ol>
      </SectionCard>

      <DemoNote />
    </div>
  );
}
