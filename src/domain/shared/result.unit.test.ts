import { describe, expect, it } from 'vite-plus/test'
import { ok, err, type Result } from './result'

describe('Result', () => {
  describe('ok', () => {
    it('creates a success result with the given value', () => {
      const result = ok(42)

      expect(result).toEqual({ ok: true, value: 42 })
    })

    it('narrows to success branch when ok is true', () => {
      const result: Result<number, Error> = ok(42)

      if (result.ok) {
        expect(result.value).toBe(42)
      } else {
        throw new Error('Expected ok result')
      }
    })
  })

  describe('err', () => {
    it('creates a failure result with the given error', () => {
      const error = new Error('something went wrong')
      const result = err(error)

      expect(result).toEqual({ ok: false, error })
    })

    it('narrows to failure branch when ok is false', () => {
      const error = new Error('something went wrong')
      const result: Result<number, Error> = err(error)

      if (!result.ok) {
        expect(result.error).toBe(error)
      } else {
        throw new Error('Expected err result')
      }
    })
  })
})
