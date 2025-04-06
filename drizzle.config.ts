import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./migrations",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    databaseId: process.env.D1_DATABASE_ID,
    token: process.env.D1_TOKEN,
  },
  migrations: {
    prefix: "index",
    schema: "./src/db/schema.ts",
    table: "migrations",
  },
  casing: "camelCase",
  introspect: {
    casing: "camel",
  },
  breakpoints: true, // https://orm.drizzle.team/docs/drizzle-config-file#breakpoints
});
