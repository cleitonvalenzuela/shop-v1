import * as Sentry from "@sentry/sveltekit";
import { PUBLIC_SENTRY_DSN } from "$env/static/public";

Sentry.init({
    dsn: PUBLIC_SENTRY_DSN,
    sendDefaultPii: true,
    integrations: [
        Sentry.replayIntegration(),
    ],
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0
});