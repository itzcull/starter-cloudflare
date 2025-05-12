import { cloudflare } from '@cloudflare/vite-plugin'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	test: {
		browser: {
			enabled: true,
			provider: 'playwright',
			instances: [{ browser: 'chromium' }]
		}
	},
	plugins: [react(), cloudflare({ viteEnvironment: { name: 'ssr' } }), tailwindcss(), reactRouter(), tsconfigPaths()]
})
