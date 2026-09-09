import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Radio } from "lucide-react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/common/primitives";
import { activityEvents } from "@/data/rocketloop";
import { cn } from "@/lib/utils";

const filters = ["All", "Market", "Decision", "Outreach", "Fulfillment", "Analytics"] as const;

export function ActivityDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const events = useMemo(
    () => activityEvents.filter((e) => filter === "All" || e.category === filter),
    [filter],
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="flex items-center gap-2 text-base">
            <Radio className="h-4 w-4 text-primary" />
            Rocket-Loop Activity
          </SheetTitle>
          <SheetDescription>
            Every action the agent team took, and why it took it.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-wrap gap-1.5 border-b border-border px-5 py-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                filter === f
                  ? "border-primary/25 bg-primary-soft text-primary"
                  : "border-border text-muted-foreground hover:bg-muted",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {events.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No activity in this category yet.
            </p>
          ) : (
            events.map((event) => (
              <article key={event.id} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between gap-2">
                  <Link
                    to="/app/agents/$agentId"
                    params={{ agentId: event.agentId }}
                    onClick={() => onOpenChange(false)}
                    className="truncate text-xs font-semibold text-primary hover:underline"
                  >
                    {event.agent}
                  </Link>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{event.at}</span>
                </div>
                <p className="mt-1.5 text-sm font-medium text-foreground">{event.action}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{event.reason}</p>
                <div className="mt-2">
                  <Pill
                    tone={
                      event.status === "Completed"
                        ? "success"
                        : event.status === "In progress"
                          ? "primary"
                          : "warning"
                    }
                  >
                    {event.status}
                  </Pill>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="border-t border-border p-4">
          <Button variant="outline" className="w-full gap-1.5" asChild>
            <Link to="/app/analytics" onClick={() => onOpenChange(false)}>
              See what these actions produced <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
