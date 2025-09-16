import { logger } from 'hono/logger'
import { createRequestHandler } from 'react-router'
import { defineWorkerHandlers } from './cf-utils/handlers'

const handler = createRequestHandler(() => import('virtual:react-router/server-build'))

export default defineWorkerHandlers<{ counter: number }, { message: string }>({
	app: (app) => app.use(logger()).use((c) => handler(c.req.raw)),
	queue(batch) {
		for (const message of batch.messages) {
			console.log(message)
		}
	},
	scheduled(controller) {
		console.log(`Run at "${new Date(controller.scheduledTime).toISOString()}" with CRON "${controller.cron}"`)
	}
})
