import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

type DatabaseConfig = {
	readonly connectionString: string
}

export const createDatabase = (config: DatabaseConfig) => {
	const sql = postgres(config.connectionString, {
		max: 5,
		fetch_types: false
	})

	return drizzle(sql, { schema })
}

export type Database = ReturnType<typeof createDatabase>
