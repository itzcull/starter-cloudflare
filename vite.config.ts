import { cloudflare } from '@cloudflare/vite-plugin'
import { reactRouter } from '@react-router/dev/vite'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [
		react(),
		cloudflare({
			viteEnvironment: {
				name: 'ssr' // This turned out to be ridiculously important, I couldn't run 'vite preview' or 'wrangler deploy' without it
			},
			configPath: './wrangler.jsonc',
			persistState: {
				path: './.wrangler/state'
			}
		}),
		reactRouter(),
		tsconfigPaths()
	],
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: ['./vitest.setup.ts'],
		browser: {
			provider: playwright(),
			enabled: true,
			// at least one instance is required
			instances: [{ browser: 'chromium' }]
		},
		css: true
	}
})
