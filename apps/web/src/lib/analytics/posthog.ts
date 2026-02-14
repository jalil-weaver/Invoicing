"use client";

import posthog from "posthog-js";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";

let initialized = false;

export function initPosthog() {
  if (typeof window === "undefined") return;
  if (initialized || !KEY) return;

  posthog.init(KEY, {
    api_host: HOST,
    capture_pageview: true,
    autocapture: true,
  });

  initialized = true;
}

export function getPosthog() {
  initPosthog();
  return posthog;
}
