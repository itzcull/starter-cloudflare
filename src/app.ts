import { Hono } from 'hono'
import handler from '@tanstack/react-start/server-entry'
import { createAuth } from './auth/server'

type AppBindings = {
  Bindings: Cloudflare.Env
}

const app = new Hono<AppBindings>()

app.all('/api/auth/*', async (c) => {
  const auth = createAuth({
    connectionString: c.env.HYPERDRIVE.connectionString,
    baseUrl: new URL(c.req.url).origin,
    secret: c.env.BETTER_AUTH_SECRET,
  })
  return auth.handler(c.req.raw)
})

app.all('*', async (c) => {
  return handler.fetch(c.req.raw)
})

export { app }
