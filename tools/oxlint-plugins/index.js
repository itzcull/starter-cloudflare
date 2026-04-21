import domainNoInfraImports from './rules/domain-no-infra-imports.js'

export default {
  meta: { name: 'starter-cloudflare' },
  rules: {
    'domain-no-infra-imports': domainNoInfraImports,
  },
}
