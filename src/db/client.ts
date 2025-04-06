import type { Logger } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/d1'

const logger: Logger = {
  logQuery: (query, params) => {
    console.log(query, params)
  },
}

export function createDrizzleClient(db: D1Database) {
  return drizzle(db, {
    casing: 'camelCase',
    logger,
  })
}
