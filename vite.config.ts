import { cloudflare } from '@cloudflare/vite-plugin'
import { reactRouter } from '@react-router/dev/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [
		react(),
		cloudflare({
			viteEnvironment: {
				name: 'ssr'
			},
			configPath: './wrangler.jsonc',
			persistState: {
				path: './.wrangler/state'
			}
		}),
		reactRouter(),
		tsconfigPaths()
	]
})
