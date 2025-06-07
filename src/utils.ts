import { Hono } from 'hono'

interface DefineHandlersOptions<Env, QueueMessage, CfHostMetadata> {
  app: (app: Hono<Env>) => void
  scheduled?: ExportedHandlerScheduledHandler<Env>
  queue?: ExportedHandlerQueueHandler<Env, QueueMessage>
}

export function defineHandlers<Env, QueueMessage, CfHostMetadata>(
  options: DefineHandlersOptions<Env, QueueMessage, CfHostMetadata>
): ExportedHandler<Env, QueueMessage, CfHostMetadata> {
  return {
    ...options,
    fetch: (request, env, ctx) => {
      const app = new Hono<Env>()
      options.app(app)
      return app.fetch(request, env, ctx)
    }
  }
}