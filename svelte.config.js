import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	onwarn: (warning, handler) => {
		if(warning.code === 'a11y_invalid_attribute' || warning.code === 'a11y_missing_attribute' || warning.code === 'state_referenced_locally'){
			return;
		}
		handler(warning);
	},
	kit: {
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
