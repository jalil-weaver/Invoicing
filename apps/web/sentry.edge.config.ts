import { init } from "@sentry/nextjs";

init({
  dsn:
    process.env.SENTRY_DSN ||
    "https://e4873162b52f393b0e92393da5a631ca@o4510884860592128.ingest.de.sentry.io/4510884862361680",
  tracesSampleRate: 0.1,
});
