import { defineWorkerHandlers } from '@cf-utils/handlers'
import { logger } from 'hono/logger'
import { createRequestHandler } from 'react-router'

const handler = createRequestHandler(() => import('virtual:react-router/server-build'))

export default defineWorkerHandlers<Cloudflare.Env, { message: string }>({
	app: (app) =>
		app
			.use(logger())
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
