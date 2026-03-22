import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { sentrySvelteKit } from "@sentry/sveltekit";
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sentrySvelteKit({
		adapter: "vercel",
		org: process.env.SENTRY_ORG,
		project: process.env.SENTRY_PROJECT,
		authToken: process.env.SENTRY_TOKEN,
    }), sveltekit()]
});