import { Hono } from 'hono'
import { defineHandlers } from './utils'

export default defineHandlers({
	app: (app) => {
		app.get('/', (c) => c.text('Hello, world!'))
	},
	queue(batch, _env, _ctx) {
		for (const message of batch.messages) {
			console.log(message)
		}
	}
})
