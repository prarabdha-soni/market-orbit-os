/**
 * Service layer.
 *
 * Every screen reads data through these functions, so swapping the demo
 * dataset for a real backend later only requires changing this file.
 */
import * as demo from "@/data/rocketloop";

const latency = <T,>(value: T, ms = 220): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const api = {
  getWorkspace: () => latency(demo.workspace),
  getHomeKpis: () => latency(demo.homeKpis),
  getMissions: () => latency(demo.missions),
  getRecommendations: () => latency(demo.recommendations),
  getMarketKpis: () => latency(demo.marketKpis),
  getCityOpportunities: () => latency(demo.cityOpportunities),
  getOpportunities: () => latency(demo.opportunities, 320),
  getAgents: () => latency(demo.agents),
  getActivity: () => latency(demo.activityEvents),
  getConversations: () => latency(demo.conversations),
  getSamples: () => latency(demo.samples, 300),
};

export const queryKeys = {
  missions: ["missions"] as const,
  opportunities: ["opportunities"] as const,
  samples: ["samples"] as const,
};
