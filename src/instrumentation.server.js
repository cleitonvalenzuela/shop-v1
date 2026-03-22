import * as Sentry from "@sentry/sveltekit";
import { PUBLIC_SENTRY_DSN } from "$env/static/public";

Sentry.init({
    dsn: PUBLIC_SENTRY_DSN,
    sendDefaultPii: true
});