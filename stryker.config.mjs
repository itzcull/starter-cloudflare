/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
export default {
	packageManager: 'pnpm',
	testRunner: 'vitest',
	vitest: {
		configFile: 'vitest.config.ts'
	},
	checkers: ['typescript'],
	tsconfigFile: 'tsconfig.json',
	mutate: ['src/**/*.ts', 'src/**/*.tsx', '!src/**/*.test.ts', '!src/**/*.test.tsx', '!src/**/*.d.ts'],
	reporters: ['html', 'clear-text', 'progress'],
	coverageAnalysis: 'perTest',
	thresholds: {
		high: 80,
		low: 60,
		break: null
	}
}
