import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	onwarn: (warning, handler) => {
		if(warning.code === 'a11y_invalid_attribute' || warning.code === 'a11y_missing_attribute' || warning.code === 'state_referenced_locally'){
			return;
		}
		handler(warning);
	},
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		experimental: {
			instrumentation: {
				server: true,
			},
		},
		alias: {
			$action: "./src/action",
			$style: "./src/style",
			$component: "./src/component",
			$state: "./src/state"
		}
	}
};

export default config;
