import { app } from './app'

export default {
  fetch: app.fetch,
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
