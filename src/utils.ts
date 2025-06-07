export function defineHandlers<Env, QueueMessage, CfHostMetadata>(
  handler: ExportedHandler<Env, QueueMessage, CfHostMetadata>
) {
  return handler
}