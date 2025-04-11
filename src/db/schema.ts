import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const Users = sqliteTable('Users', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	age: integer('age'),
	isActive: integer('is_active').default(0),
	profileData: text('profile_data'), // For JSON
	createdAt: text('created_at').notNull(),
	avatar: blob('avatar')
})
