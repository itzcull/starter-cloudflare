import { defineWorkerHandlers } from './cf-utils/handlers'

export default defineWorkerHandlers({
	app: (app) => app.get('/', (c) => c.text('Hello, world!')),
	queue(batch) {
		for (const message of batch.messages) {
			console.log(message)
		}
	},
	scheduled(controller) {
		console.log(`Run at "${new Date(controller.scheduledTime).toISOString()}" with CRON "${controller.cron}"`)
	}
})
