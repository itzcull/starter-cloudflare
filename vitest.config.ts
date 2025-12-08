import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: ['./vitest.setup.ts'],
		browser: {
			provider: playwright(),
			enabled: false,
			instances: [{ browser: 'chromium' }]
		},
		css: true
	}
})
