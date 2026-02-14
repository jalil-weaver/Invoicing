"use client";

import { createContext, ReactNode, useContext, useEffect } from "react";
import posthog from "posthog-js";
import { initPosthog } from "./posthog";

const AnalyticsContext = createContext<typeof posthog | null>(null);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initPosthog();
  }, []);

  return (
    <AnalyticsContext.Provider value={posthog}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const ctx = useContext(AnalyticsContext);
  return ctx;
}
