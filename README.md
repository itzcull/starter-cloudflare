# starter-cloudflare

A starter template for full-stack apps on **Cloudflare Workers** with **Vite 8**, **React 19**, **TanStack Start**, **Drizzle**, **Vitest 4**, and **pnpm**. See [`AGENTS.md`](./AGENTS.md) for the full toolchain reference and agent workflow notes.

## Toolchain at a glance

- **Runtime**: Cloudflare Workers (via `wrangler` + `@cloudflare/vite-plugin`)
- **App**: React 19, TanStack Start/Router, Chakra UI
- **Build**: Vite 8
- **Tests**: Vitest 4 (unit + browser + integration), Playwright (e2e), Stryker (mutation)
- **DB**: Drizzle ORM + Postgres
- **Lint / format**: oxlint, oxfmt
- **Typecheck**: layered (`tsconfig.domain.json`, `tsconfig.infra.json`)
- **Codebase intelligence**: [fallow](#codebase-intelligence-fallow)
- **Git hooks**: lefthook

## Getting started

```sh
pnpm install
pnpm dev
```

Run the test suites:

```sh
pnpm test          # watch mode, all projects
pnpm test:unit     # unit
pnpm test:browser  # browser (Vitest + Playwright)
pnpm test:e2e      # Playwright e2e
```

Full quality gate (lint, format, typecheck layers, fallow audit):

```sh
pnpm ci
```

See `AGENTS.md` for the complete command list and configuration details.

## Codebase intelligence (fallow)

[fallow](https://github.com/fallow-rs/fallow) is a Rust-native, sub-second whole-project analyzer for TypeScript/JavaScript. It finds things oxlint's per-file model can't see:

- **Dead code** — unused files, exports, types, dependencies
- **Duplication** — cross-file clone groups
- **Complexity hotspots** — cyclomatic + cognitive complexity, churn-vs-complexity hotspots
- **Circular dependencies**
- **Architecture drift**

Common commands:

```sh
pnpm fallow               # full analysis (dead code + dupes + health)
pnpm fallow dead-code     # unused code + circular deps only
pnpm fallow dupes         # duplication scan
pnpm fallow health        # complexity + maintainability
pnpm fallow fix --dry-run # preview auto-fixes for unused exports/deps
```

`pnpm ci` runs `pnpm fallow:ci` (`fallow audit`) as a quality gate — it scopes analysis to files changed against the base branch and returns a pass/warn/fail verdict.

Configuration lives in `.fallowrc.json`. For the full feature set, see the [fallow docs](https://docs.fallow.tools).
