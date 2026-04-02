import { describe, expect, it, vi } from 'vitest'

const mockAuthHandler = vi.fn<(request: Request) => Promise<Response>>()

vi.mock('@infra/better-auth/auth-adapter', () => ({
  createAuth: () => ({
    handler: mockAuthHandler,
  }),
}))

vi.mock('@tanstack/react-start/server-entry', () => ({
  default: {
    fetch: vi.fn<(request: Request) => Promise<Response>>(),
  },
}))

describe('Hono app routing', () => {
  describe('auth route delegation', () => {
    it('should route /api/auth requests to the auth handler', async () => {
      const { app } = await import('./app')
      const authResponse = new Response('auth response', { status: 200 })
      mockAuthHandler.mockResolvedValueOnce(authResponse)

      const response = await app.request(
        '/api/auth/sign-in',
        {},
        {
          HYPERDRIVE: { connectionString: 'postgres://test' },
          BETTER_AUTH_SECRET: 'test-secret',
        },
      )

      expect(mockAuthHandler).toHaveBeenCalledOnce()
      expect(response.status).toBe(200)
      expect(await response.text()).toBe('auth response')
    })

    it('should route /api/auth nested paths to the auth handler', async () => {
      const { app } = await import('./app')
      const authResponse = new Response('auth callback', { status: 200 })
      mockAuthHandler.mockResolvedValueOnce(authResponse)

      const response = await app.request(
        '/api/auth/callback/github',
        {},
        {
          HYPERDRIVE: { connectionString: 'postgres://test' },
          BETTER_AUTH_SECRET: 'test-secret',
        },
      )

      expect(mockAuthHandler).toHaveBeenCalled()
      expect(await response.text()).toBe('auth callback')
    })
  })

  describe('TanStack Start fallthrough', () => {
    it('should route non-auth requests to TanStack Start handler', async () => {
      const startHandler = await import('@tanstack/react-start/server-entry')
      const { app } = await import('./app')
      const startResponse = new Response('tanstack page', { status: 200 })
      vi.mocked(startHandler.default.fetch).mockResolvedValueOnce(startResponse)

      const response = await app.request('/')

      expect(startHandler.default.fetch).toHaveBeenCalledOnce()
      expect(response.status).toBe(200)
      expect(await response.text()).toBe('tanstack page')
    })

    it('should route non-api paths to TanStack Start handler', async () => {
      const startHandler = await import('@tanstack/react-start/server-entry')
      const { app } = await import('./app')
      const startResponse = new Response('about page', { status: 200 })
      vi.mocked(startHandler.default.fetch).mockResolvedValueOnce(startResponse)

      const response = await app.request('/about')

      expect(startHandler.default.fetch).toHaveBeenCalled()
      expect(await response.text()).toBe('about page')
    })
  })
})
