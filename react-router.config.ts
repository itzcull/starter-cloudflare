import type { Config } from "@react-router/dev/dist/config";

export default {
  ssr: true,
  appDirectory: './src/app',
  future: {
    unstable_viteEnvironmentApi: true,
  },
} satisfies Config;
