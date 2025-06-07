import { createRequestHandler } from 'react-router'
import { defineHandlers } from './utils'

export default defineHandlers({
	async fetch(request, env, ctx) {
		return new Response('Hello, world!')
	},
	queue(batch, _env, _ctx) {
		for (const message of batch.messages) {
			console.log(message)
		}
	}
})
