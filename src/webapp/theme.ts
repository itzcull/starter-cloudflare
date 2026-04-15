import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  cssVarsPrefix: 'ck',
  theme: {
    tokens: {},
    semanticTokens: {},
  },
})

export const system = createSystem(defaultConfig, config)
