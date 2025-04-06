import server from './server'

interface QueueMessage {
	foo: string
}

export default {
	fetch: server.fetch,
	queue(batch, _env, _ctx) {
		for (const message of batch.messages) {
			console.log(message)
		}
	},
	scheduled(controller, _env, _ctx) {
		console.log(`Run at "${new Date(controller.scheduledTime).toISOString()}" with CRON "${controller.cron}"`)
	}
} satisfies ExportedHandler<Env, QueueMessage>
