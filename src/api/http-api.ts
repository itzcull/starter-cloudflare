import { OpenAPIHono } from '@hono/zod-openapi'

type AppBindings = {
  Bindings: Cloudflare.Env
}

const httpApi = new OpenAPIHono<AppBindings>()

httpApi.doc('/doc', {
  openapi: '3.0.0',
  info: {
    title: 'Starter HTTP API',
    version: '0.1.0',
  },
})

export { httpApi }
