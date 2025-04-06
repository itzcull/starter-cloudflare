import { Hono } from 'hono'

const server = new Hono<Env>()

server.get('/', async (c) => {
	return c.text('Hello World')
})

export default server
