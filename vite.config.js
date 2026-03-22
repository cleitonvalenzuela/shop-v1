import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { sentrySvelteKit } from "@sentry/sveltekit";
import { defineConfig } from 'vite';

import { SENTRY_ORG, SENTRY_PROJECT, SENTRY_TOKEN } from "$env/static/private";

export default defineConfig({
	plugins: [tailwindcss(), sentrySvelteKit({
		org: SENTRY_ORG,
		project: SENTRY_PROJECT,
		authToken: SENTRY_TOKEN,
    }), sveltekit()]
});