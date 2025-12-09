import type { NewAccount, NewSession, NewUser, NewVerification } from '../../src/db/types'

type UserOverrides = Partial<NewUser>
type SessionOverrides = Partial<NewSession>
type AccountOverrides = Partial<NewAccount>
type VerificationOverrides = Partial<NewVerification>

const generateId = (): string => `${Date.now()}_${Math.random().toString(36).slice(2)}`

const createTestUser = (overrides: UserOverrides = {}): NewUser => {
	const id = overrides.id ?? `user_${generateId()}`

	return {
		id,
		name: 'Test User',
		email: `${id}@example.com`,
		emailVerified: false,
		image: null,
		...overrides
	}
}

const createTestSession = (overrides: SessionOverrides = {}): NewSession => {
	const id = overrides.id ?? `session_${generateId()}`

	return {
		id,
		userId: overrides.userId ?? 'user_default',
		token: `token_${id}`,
		expiresAt: new Date(Date.now() + 86400000),
		ipAddress: null,
		userAgent: null,
		...overrides
	}
}

const createTestAccount = (overrides: AccountOverrides = {}): NewAccount => {
	const id = overrides.id ?? `account_${generateId()}`

	return {
		id,
		accountId: `external_${id}`,
		providerId: 'github',
		userId: overrides.userId ?? 'user_default',
		accessToken: null,
		refreshToken: null,
		idToken: null,
		accessTokenExpiresAt: null,
		refreshTokenExpiresAt: null,
		scope: null,
		password: null,
		...overrides
	}
}

const createTestVerification = (overrides: VerificationOverrides = {}): NewVerification => {
	const id = overrides.id ?? `verification_${generateId()}`

	return {
		id,
		identifier: 'test@example.com',
		value: `value_${id}`,
		expiresAt: new Date(Date.now() + 3600000),
		...overrides
	}
}

export { createTestUser, createTestSession, createTestAccount, createTestVerification }
