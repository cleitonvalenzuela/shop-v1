import * as Sentry from "@sentry/sveltekit";
import { PUBLIC_SENTRY_DSN } from "$env/static/public";

Sentry.init({
    dsn: PUBLIC_SENTRY_DSN,
    sendDefaultPii: true,
});

const customErrorHandler = ({ error, event }) => {
    createEvent("error", { env: "client", error: `${error?.name}: ${error?.message}` });
};

export const handleError = Sentry.handleErrorWithSentry(customErrorHandler);