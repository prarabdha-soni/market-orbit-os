import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, Minus, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Kpi, SignalTone } from "@/data/rocketloop";

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-semibold text-foreground">{title}</h1>
        {subtitle ? (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function Sparkline({
  points,
  tone = "primary",
}: {
  points: number[];
  tone?: "primary" | "success";
}) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 28 - ((p - min) / span) * 24;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 30" className="h-8 w-20" preserveAspectRatio="none" aria-hidden>
      <path
        d={path}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        className={tone === "success" ? "stroke-success" : "stroke-primary"}
      />
    </svg>
  );
}

export function KpiCard({ kpi, compact = false }: { kpi: Kpi; compact?: boolean }) {
  const Icon =
    kpi.direction === "up" ? ArrowUpRight : kpi.direction === "down" ? ArrowDownRight : Minus;
  const tone =
    kpi.direction === "up"
      ? "text-success"
      : kpi.direction === "down"
        ? "text-danger"
        : "text-muted-foreground";

  return (
    <div className="panel p-4">
      <p className="stat-label truncate">{kpi.label}</p>
      <div className="mt-2 flex items-end justify-between gap-2">
        <p className="text-2xl font-semibold tracking-tight text-foreground">{kpi.value}</p>
        {!compact ? <Sparkline points={kpi.spark} /> : null}
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-xs">
        <Icon className={cn("h-3.5 w-3.5", tone)} />
        <span className={cn("font-medium", tone)}>{kpi.change}</span>
        <span className="truncate text-muted-foreground">{kpi.hint}</span>
      </div>
    </div>
  );
}

const toneClasses: Record<SignalTone | "primary", string> = {
  danger: "bg-danger-soft text-danger border-danger/20",
  warning: "bg-warning-soft text-warning-foreground border-warning/25",
  success: "bg-success-soft text-success border-success/20",
  muted: "bg-muted text-muted-foreground border-border",
  primary: "bg-primary-soft text-primary border-primary/20",
};

export function Pill({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode;
  tone?: SignalTone | "primary";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusDot({ tone = "success" }: { tone?: "success" | "warning" | "muted" }) {
  return (
    <span
      className={cn(
        "inline-block h-1.5 w-1.5 rounded-full",
        tone === "success" && "bg-success",
        tone === "warning" && "bg-warning",
        tone === "muted" && "bg-muted-foreground",
      )}
    />
  );
}

export function ScoreBadge({ score }: { score: number }) {
  const tone = score >= 85 ? "success" : score >= 75 ? "primary" : "muted";
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "grid h-8 w-9 shrink-0 place-items-center rounded-md text-sm font-semibold tabular-nums",
          tone === "success" && "bg-success-soft text-success",
          tone === "primary" && "bg-primary-soft text-primary",
          tone === "muted" && "bg-muted text-muted-foreground",
        )}
      >
        {score}
      </span>
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full",
            tone === "success" ? "bg-success" : tone === "primary" ? "bg-primary" : "bg-border-strong",
          )}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 truncate text-sm text-foreground">{label}</span>
      <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${score}%` }} />
      </div>
      <span className="w-7 shrink-0 text-right text-sm font-semibold tabular-nums text-foreground">
        {score}
      </span>
    </div>
  );
}

export function SectionCard({
  title,
  description,
  actions,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("panel", className)}>
      {title ? (
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-5 py-3.5">
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-foreground">{title}</h2>
            {description ? (
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
        </div>
      ) : null}
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
}

export function AiLabel({ children }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-primary-soft px-2 py-0.5 text-[11px] font-semibold tracking-wide text-primary uppercase">
      <Sparkles className="h-3 w-3" />
      {children ?? "Rocket-Loop AI"}
    </span>
  );
}

export function DemoNote({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      All figures shown are illustrative demo data for the Gloww workspace.
    </p>
  );
}
