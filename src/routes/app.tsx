import { Outlet, createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/shell/AppShell";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Rocket-Loop Workspace — Autonomous Market Expansion OS" },
      {
        name: "description",
        content:
          "The Gloww workspace inside Rocket-Loop: missions, market analysis, opportunities, outreach, fulfillment and results.",
      },
      { property: "og:title", content: "Rocket-Loop Workspace" },
      {
        property: "og:description",
        content: "Run autonomous market expansion missions across Indian retail territories.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});
