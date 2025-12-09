import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

const defaultExclude = ['**/node_modules/**', '**/dist/**', '**/.{git,cache,output,temp}/**']

export default defineConfig({
	test: {
		projects: [
			{
				plugins: [react(), tsconfigPaths()],
				test: {
					name: 'browser',
					include: ['**/*.browser.test.{ts,tsx}'],
					exclude: defaultExclude,
					globals: true,
					setupFiles: ['./vitest.setup.ts'],
					browser: {
						provider: playwright(),
						enabled: true,
						instances: [{ browser: 'chromium' }]
					},
					css: true
				}
			},
			{
				plugins: [react(), tsconfigPaths()],
				test: {
					name: 'react',
					include: ['**/*.react.test.{ts,tsx}'],
					exclude: defaultExclude,
					globals: true,
					environment: 'happy-dom',
					setupFiles: ['./vitest.setup.ts'],
					css: true
				}
			},
			{
				plugins: [tsconfigPaths()],
				test: {
					name: 'bare',
					include: ['**/*.test.{ts,tsx}'],
					exclude: [
						...defaultExclude,
						'**/*.browser.test.{ts,tsx}',
						'**/*.react.test.{ts,tsx}',
						'**/*.worker.test.{ts,tsx}'
					],
					globals: true,
					environment: 'node'
				}
			},
			{
				plugins: [tsconfigPaths()],
				test: {
					name: 'cloudflare-worker',
					include: ['**/*.worker.test.{ts,tsx}'],
					exclude: defaultExclude,
					globals: true,
					environment: 'edge-runtime'
				}
			}
		]
	}
})
