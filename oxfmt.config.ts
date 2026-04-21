import { defineConfig } from 'oxfmt'

export default defineConfig({
  semi: false,
  singleQuote: true,
  ignorePatterns: ['dist/**', 'src/webapp/routeTree.gen.ts'],
})
