import { Hono } from 'hono'

const app = new Hono<Env>()

app.get('/', async (c) => {
	return c.text('Hello World')
})

export default app
