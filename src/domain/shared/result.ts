export type Result<T, E extends Error> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E }

export type AsyncResult<T, E extends Error> = Promise<Result<T, E>>

export const ok = <T>(value: T): Result<T, never> => ({
  ok: true,
  value,
})

export const err = <E extends Error>(error: E): Result<never, E> => ({
  ok: false,
  error,
})
