import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { createDatabase } from '../db/client'
import * as schema from '../db/schema'

type CreateAuthOptions = {
	readonly connectionString: string
	readonly baseUrl: string
	readonly secret: string
}

export const createAuth = (options: CreateAuthOptions) => {
	const db = createDatabase({ connectionString: options.connectionString })

	return betterAuth({
		database: drizzleAdapter(db, {
			provider: 'pg',
			schema
		}),
		baseURL: options.baseUrl,
		secret: options.secret,
		emailAndPassword: {
			enabled: true
		}
	})
}

export type Auth = ReturnType<typeof createAuth>
