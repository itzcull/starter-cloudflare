import type { Config } from '@react-router/dev/config'

export default {
	appDirectory: './src/app/',
	buildDirectory: 'build',
	future: {
		v8_viteEnvironmentApi: true
	}
} satisfies Config
