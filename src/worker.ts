import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { createRequestHandler } from 'react-router'
import { createAuth } from './auth/server'

const handler = createRequestHandler(() => import('virtual:react-router/server-build'))

const app = new Hono<{ Bindings: Cloudflare.Env }>()
  .use(logger())
  .on(['POST', 'GET'], '/api/auth/*', async (c) => {
    const auth = createAuth({
      connectionString: c.env.HYPERDRIVE.connectionString,
      baseUrl: new URL(c.req.url).origin,
      secret: c.env.BETTER_AUTH_SECRET,
    })
    return auth.handler(c.req.raw)
  })
  .use((c) => handler(c.req.raw))
  .onError((err, c) => {
    console.error(err)
    return c.json({ message: err.message }, 500)
  })

export default {
  fetch: (request: Request, env: Cloudflare.Env, ctx: ExecutionContext) => app.fetch(request, env, ctx),
  queue(batch: MessageBatch<{ message: string }>) {
    for (const message of batch.messages) {
      console.log(message)
    }
  },
  scheduled(controller: ScheduledController) {
    console.log(
      `Run at "${new Date(controller.scheduledTime).toISOString()}" with CRON "${controller.cron}"`,
    )
  },
} satisfies ExportedHandler<Cloudflare.Env, { message: string }>
