import { Hono } from 'hono'
import handler from '@tanstack/react-start/server-entry'
import { httpApi } from './api/http-api'

type AppBindings = {
  Bindings: Cloudflare.Env
}

const server = new Hono<AppBindings>()

server.route('/api', httpApi)

server.all('*', async (c) => {
  return handler.fetch(c.req.raw)
})

export default {
  fetch: server.fetch,
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

export { server as app }
