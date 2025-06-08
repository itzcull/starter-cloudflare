import { Hono } from 'hono'

interface DefineHandlersOptions<Env, App extends Hono<Env>, QueueMessage> {
  app: (app: Hono<Env>) => App
  scheduled?: ExportedHandlerScheduledHandler<Env>
  queue?: ExportedHandlerQueueHandler<Env, QueueMessage>
}

/** @description Only the 'fetch', 'queue', and 'scheduled' handlers can be provisioned together. */
export function defineWorkerHandlers<Env, App extends Hono<Env> = Hono<Env>, QueueMessage = unknown, CfHostMetadata = unknown>(
  options: DefineHandlersOptions<Env, App, QueueMessage>
): ExportedHandler<Env, QueueMessage, CfHostMetadata> {
  const { app, ...handlers } = options
  return {
    ...handlers,
    fetch: (request, env, ctx) => app(new Hono<Env>()).fetch(request, env, ctx)
  }
}
