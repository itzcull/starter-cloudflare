import { cloudflare } from '@cloudflare/vite-plugin'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

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
    tanstackStart({
      router: {
        entry: 'webapp/router',
        routesDirectory: 'webapp/routes',
        generatedRouteTree: 'webapp/routeTree.gen.ts',
      },
    }),
    react(),
  ],

  resolve: {
    tsconfigPaths: true,
  },
})
