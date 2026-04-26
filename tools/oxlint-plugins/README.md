# starter oxlint plugin

Local oxlint JS plugin with architectural lint rules for this repo. Loaded via `jsPlugins` in `oxlint.config.ts`.

## Rules

- `starter/domain-no-infra-imports` — forbids imports from `src/infra/**` in files under `src/domain/**`. Matches static imports, re-exports, and string-literal dynamic `import()`. Covers both the `@infra/*` path alias and relative paths that resolve into `src/infra/`.

## Adding a rule

1. Create `rules/<rule-name>.js` exporting `{ meta, create(context) }` (ESLint v9 compatible shape).
2. Register it in `index.js` under `rules`.
3. Enable it in `oxlint.config.ts` under `rules` (prefixed with `starter/`).
4. Drive the implementation with a co-located `rules/<rule-name>.unit.test.ts` using `test-utils/rule-tester.ts`.

## Constraints

- Plain ESM `.js` source — no build step; oxlint `import()`s directly.
- oxlint's JS-plugin runtime does not support type-aware rules or custom parsers (alpha).
- Tests use a minimal in-tree `RuleTester` built on `acorn` (ES modules). Keep rule tests snippet-sized; full-file TS parsing is out of scope.
