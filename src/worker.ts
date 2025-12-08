import { defineWorkerHandlers } from '@cf-utils/handlers'
import { logger } from 'hono/logger'
import { createRequestHandler } from 'react-router'
import { createAuth } from './auth/server'

const handler = createRequestHandler(() => import('virtual:react-router/server-build'))

export default defineWorkerHandlers<Cloudflare.Env, { message: string }>({
	app: (app) =>
		app
			.use(logger())
			.on(['POST', 'GET'], '/api/auth/*', async (c) => {
				const auth = createAuth({
					connectionString: c.env.HYPERDRIVE.connectionString,
					baseUrl: new URL(c.req.url).origin,
					secret: c.env.BETTER_AUTH_SECRET
				})
				return auth.handler(c.req.raw)
			})
			.use((c) => handler(c.req.raw))
			.onError((err, c) => {
				console.error(err)
				return c.json({ message: err.message }, 500)
			}),
	queue(batch) {
		for (const message of batch.messages) {
			console.log(message)
		}
	},
	scheduled(controller) {
		console.log(`Run at "${new Date(controller.scheduledTime).toISOString()}" with CRON "${controller.cron}"`)
	}
})
