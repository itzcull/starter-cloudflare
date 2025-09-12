import { Agent } from 'agents'

interface MyState {
	counter: number
}

export class MyAgent extends Agent<Env, MyState> {
	async fetch(_request: Request): Promise<Response> {
		return new Response('Hello, world!')
	}
}
