import { defineConfig } from 'oxlint'

export default defineConfig({
  ignorePatterns: ['dist/**', 'worker-configuration.d.ts', 'src/webapp/routeTree.gen.ts'],
  options: {
    typeAware: true,
    typeCheck: true,
  },
  jsPlugins: ['./tools/oxlint-plugins/index.js'],
  rules: {
    'starter/domain-no-infra-imports': 'error',
  },
})
