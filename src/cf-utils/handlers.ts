import { Hono } from 'hono'
import type { BlankSchema, Schema } from 'hono/types'

export type FetchApp<Env extends object, S extends Schema = BlankSchema, BasePath extends string = '/'> = Hono<
  { Bindings: Env },
  S,
  BasePath
>

export function defineFetchApp<Env extends object, App extends FetchApp<Env> = FetchApp<Env>, CfHostMetadata = unknown>(
  app: (app: FetchApp<Env>) => App
): ExportedHandlerFetchHandler<Env, CfHostMetadata> {
  return (request, env, ctx) => app(new Hono<{ Bindings: Env }>()).fetch(request, env, ctx)
}

interface DefineWorkerHandlersOptions<
  Env extends object,
  QueueMessage = unknown,
  App extends FetchApp<Env> = FetchApp<Env>
> {
  app: (app: FetchApp<Env>) => App
  scheduled?: ExportedHandlerScheduledHandler<Env>
  queue?: ExportedHandlerQueueHandler<Env, QueueMessage>
}

/** @description Only the 'fetch', 'queue', and 'scheduled' handlers can be provisioned together. */
export function defineWorkerHandlers<
  Env extends object,
  QueueMessage extends object,
  App extends FetchApp<Env> = FetchApp<Env>,
  CfHostMetadata = unknown
>(options: DefineWorkerHandlersOptions<Env, QueueMessage, App>): ExportedHandler<Env, QueueMessage, CfHostMetadata> {
  const { app, ...handlers } = options
  return {
    ...handlers,
    fetch: defineFetchApp<Env, App, CfHostMetadata>(app)
  }
}
