import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  migrations: {
    prefix: "index",
    schema: "./src/db/schema.ts",
    table: "migrations",
  },
  casing: "camelCase",
  introspect: {
    casing: "camel",
  },
});