import { OpenAPIHono } from '@hono/zod-openapi'
import { createAuth } from '@infra/better-auth/auth-adapter'

type AppBindings = {
  Bindings: Cloudflare.Env
}

const httpApi = new OpenAPIHono<AppBindings>()

httpApi.all('/auth/*', async (c) => {
  const auth = createAuth({
    connectionString: c.env.HYPERDRIVE.connectionString,
    baseUrl: new URL(c.req.url).origin,
    secret: c.env.BETTER_AUTH_SECRET,
  })
  return auth.handler(c.req.raw)
})

httpApi.doc('/doc', {
  openapi: '3.0.0',
  info: {
    title: 'Starter HTTP API',
    version: '0.1.0',
  },
})

export { httpApi }
