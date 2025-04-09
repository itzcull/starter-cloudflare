import { cloudflare } from '@cloudflare/vite-plugin'
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from '@tailwindcss/vite'
import { config } from "reshaped/config/postcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	css: {
		postcss: {
			plugins: [...Object.values(config.plugins)]
		}
	},
	plugins: [
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tailwindcss(),
		reactRouter(),
		tsconfigPaths(),
	]
})
