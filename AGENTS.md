# Development Toolchain

This project uses **Vite 8**, **Vitest 4**, **oxlint**, **oxfmt**, and **pnpm** as its development toolchain. Each tool is installed directly as a devDependency.

## Commands

### Development

- `pnpm dev` - Start the Vite dev server
- `pnpm build` - Production build with Vite
- `pnpm preview` - Preview the production build

### Testing

- `pnpm test` - Run all tests (Vitest, watch mode)
- `pnpm test:unit` - Run unit tests only
- `pnpm test:browser` - Run browser tests only
- `pnpm test:integration` - Run integration tests (requires Docker)
- `pnpm test:e2e` - Run Playwright end-to-end tests
- `pnpm vitest run --project <name>` - Run a specific test project in CI mode (no watch)

### Code Quality

- `pnpm lint` - Lint and auto-fix with oxlint
- `pnpm format` - Format code with oxfmt
- `pnpm ci` - Full CI check: lint, format, knip, and typecheck

### Dependencies

- `pnpm install` - Install dependencies
- `pnpm add <pkg>` - Add a dependency
- `pnpm remove <pkg>` - Remove a dependency

## Configuration

- **Vite config**: `vite.config.ts` (plugins, resolve)
- **Vitest config**: `vitest.config.ts` (test projects: unit, browser, integration)
- **oxlint config**: `.oxlintrc.json` (type-aware linting, ignore patterns)
- **oxfmt config**: `.oxfmtrc.json` (formatting: no semi, single quotes)
- **TypeScript**: `tsconfig.json` and layer-specific configs

## Imports

- Import from `vite` for Vite APIs (e.g., `import { defineConfig } from 'vite'`)
- Import from `vitest` for test utilities (e.g., `import { describe, expect, it } from 'vitest'`)
- Import from `vitest/config` for test configuration
- Import from `vitest/node` for node-specific test APIs
- Import from `@vitest/browser-playwright` for browser test providers

## Pre-commit Hooks

Pre-commit hooks are managed by `simple-git-hooks` and `lint-staged`. Staged files are automatically linted and formatted on commit.

## Review Checklist for Agents

- [ ] Run `pnpm install` after pulling remote changes and before getting started.
- [ ] Run `pnpm ci` and `pnpm test` to validate changes.
