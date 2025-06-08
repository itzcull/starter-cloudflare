import { Hono } from 'hono'

interface DefineHandlersOptions<Env, QueueMessage = unknown, App extends Hono<Env> = Hono<Env>> {
  app: (app: Hono<Env>) => App
  scheduled?: ExportedHandlerScheduledHandler<Env>
  queue?: ExportedHandlerQueueHandler<Env, QueueMessage>
}

/** @description Only the 'fetch', 'queue', and 'scheduled' handlers can be provisioned together. */
export function defineWorkerHandlers<Env, QueueMessage = unknown, App extends Hono<Env> = Hono<Env>, CfHostMetadata = unknown>(
  options: DefineHandlersOptions<Env, QueueMessage, App>
): ExportedHandler<Env, QueueMessage, CfHostMetadata> {
  const { app, ...handlers } = options
  return {
    ...handlers,
    fetch: (request, env, ctx) => app(new Hono<Env>()).fetch(request, env, ctx)
  }
}
