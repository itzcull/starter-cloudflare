import handler from '@tanstack/react-start/server-entry'
import { createAuth } from './auth/server'

const handleAuth = async (request: Request, env: Cloudflare.Env): Promise<Response | null> => {
  const url = new URL(request.url)
  if (!url.pathname.startsWith('/api/auth')) {
    return null
  }

  const auth = createAuth({
    connectionString: env.HYPERDRIVE.connectionString,
    baseUrl: url.origin,
    secret: env.BETTER_AUTH_SECRET,
  })

  return auth.handler(request)
}

export default {
  async fetch(request: Request, env: Cloudflare.Env, ctx: ExecutionContext) {
    const authResponse = await handleAuth(request, env)
    if (authResponse) {
      return authResponse
    }

    return handler.fetch(request)
  },
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
