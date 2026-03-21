import react from '@vitejs/plugin-react'
import { playwright } from 'vite-plus/test/browser-playwright'
import { defineConfig } from 'vite-plus'

const defaultExclude = ['**/node_modules/**', '**/dist/**', '**/.{git,cache,output,temp}/**']

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },

  test: {
    projects: [
      {
        plugins: [react()],
        resolve: {
          tsconfigPaths: true,
        },
        test: {
          name: 'browser',
          include: ['**/*.browser.test.{ts,tsx}'],
          exclude: defaultExclude,
          globals: true,
          setupFiles: ['./vitest.setup.ts'],
          browser: {
            provider: playwright(),
            enabled: true,
            instances: [{ browser: 'chromium' }],
          },
          css: true,
        },
      },
      {
        resolve: {
          tsconfigPaths: true,
        },
        test: {
          name: 'unit',
          include: ['**/*.unit.test.{ts,tsx}'],
          exclude: defaultExclude,
          globals: true,
          environment: 'node',
        },
      },
      {
        resolve: {
          tsconfigPaths: true,
        },
        test: {
          name: 'integration',
          include: ['**/*.integration.test.{ts,tsx}'],
          exclude: defaultExclude,
          globals: true,
          environment: 'node',
          globalSetup: ['./test/setup/global-setup.ts'],
          testTimeout: 30000,
          hookTimeout: 60000,
          pool: 'forks',
          fileParallelism: false,
        },
      },
    ],
  },
})
