import { PostgreSqlContainer, type StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../../src/db/schema'

type TestDatabase = ReturnType<typeof drizzle<typeof schema>>

type TestDatabaseContext = {
	readonly container: StartedPostgreSqlContainer
	readonly connectionString: string
	readonly db: TestDatabase
	readonly sqlClient: ReturnType<typeof postgres>
}

let containerInstance: StartedPostgreSqlContainer | null = null

const startContainer = async (): Promise<StartedPostgreSqlContainer> => {
	if (containerInstance) {
		return containerInstance
	}

	const container = await new PostgreSqlContainer('postgres:16-alpine')
		.withDatabase('test_db')
		.withUsername('test_user')
		.withPassword('test_password')
		.start()

	containerInstance = container
	return container
}

const stopContainer = async (): Promise<void> => {
	if (containerInstance) {
		await containerInstance.stop()
		containerInstance = null
	}
}

const createTestDatabase = async (): Promise<TestDatabaseContext> => {
	const container = await startContainer()
	const connectionString = container.getConnectionUri()

	const sqlClient = postgres(connectionString, {
		max: 5,
		fetch_types: false
	})

	const db = drizzle(sqlClient, { schema })

	return {
		container,
		connectionString,
		db,
		sqlClient
	}
}

const pushSchema = async (db: TestDatabase): Promise<void> => {
	await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "user" (
      "id" TEXT PRIMARY KEY,
      "name" TEXT NOT NULL,
      "email" TEXT NOT NULL UNIQUE,
      "email_verified" BOOLEAN NOT NULL DEFAULT false,
      "image" TEXT,
      "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `)

	await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "session" (
      "id" TEXT PRIMARY KEY,
      "expires_at" TIMESTAMP NOT NULL,
      "token" TEXT NOT NULL UNIQUE,
      "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
      "ip_address" TEXT,
      "user_agent" TEXT,
      "user_id" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
    )
  `)

	await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "account" (
      "id" TEXT PRIMARY KEY,
      "account_id" TEXT NOT NULL,
      "provider_id" TEXT NOT NULL,
      "user_id" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "access_token" TEXT,
      "refresh_token" TEXT,
      "id_token" TEXT,
      "access_token_expires_at" TIMESTAMP,
      "refresh_token_expires_at" TIMESTAMP,
      "scope" TEXT,
      "password" TEXT,
      "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `)

	await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "verification" (
      "id" TEXT PRIMARY KEY,
      "identifier" TEXT NOT NULL,
      "value" TEXT NOT NULL,
      "expires_at" TIMESTAMP NOT NULL,
      "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `)
}

const truncateAllTables = async (db: TestDatabase): Promise<void> => {
	await db.execute(sql`TRUNCATE TABLE "session", "account", "verification", "user" CASCADE`)
}

const closeConnection = async (sqlClient: ReturnType<typeof postgres>): Promise<void> => {
	await sqlClient.end()
}

export {
	startContainer,
	stopContainer,
	createTestDatabase,
	pushSchema,
	truncateAllTables,
	closeConnection,
	type TestDatabase,
	type TestDatabaseContext
}
