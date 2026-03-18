import { cloudflare } from '@cloudflare/vite-plugin'
import { reactRouter } from '@react-router/dev/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite-plus'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    cloudflare({
      viteEnvironment: {
        name: 'ssr',
      },
      configPath: './wrangler.jsonc',
      persistState: {
        path: './.wrangler/state',
      },
    }),
    reactRouter(),
    tsconfigPaths(),
  ],

  lint: {
    ignorePatterns: ['dist/**', 'worker-configuration.d.ts'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },

  fmt: {
    ignorePatterns: ['dist/**'],
    singleQuote: true,
    semi: false,
  },

  staged: {
    '*.{js,ts,tsx,jsx,mjs,cjs,json,css}': 'vp check --fix',
  },
})
