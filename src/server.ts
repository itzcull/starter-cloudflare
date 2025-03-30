import { Hono } from 'hono'

const app = new Hono()

app.get('/', async (c) => {
	c.text('Hello World')
})

export default app
