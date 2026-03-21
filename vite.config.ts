import { cloudflare } from '@cloudflare/vite-plugin'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite-plus'

export default defineConfig({
  plugins: [
    cloudflare({
      viteEnvironment: {
        name: 'ssr',
      },
      configPath: './wrangler.jsonc',
      persistState: {
        path: './.wrangler/state',
      },
    }),
    tanstackStart(),
    react(),
  ],

  resolve: {
    tsconfigPaths: true,
  },

  lint: {
    ignorePatterns: ['dist/**', 'worker-configuration.d.ts', 'src/routeTree.gen.ts'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },

  fmt: {
    ignorePatterns: ['dist/**', 'src/routeTree.gen.ts'],
    singleQuote: true,
    semi: false,
  },

  staged: {
    '*.{js,ts,tsx,jsx,mjs,cjs,json,css}': 'vp check --fix',
  },
})
