import validator from '../required'
import { expect, test } from 'vitest'

test('validates required', () => {
  // valid
  expect(validator('asjdj')).toBe(true)
  expect(validator(0)).toBe(true)
  expect(validator('undefined')).toBe(true)
  expect(validator('null')).toBe(true)
  expect(validator('s ')).toBe(true)
  expect(validator(true)).toBe(true)

  // invalid
  expect(validator('')).toBe(false)
  expect(validator(' ')).toBe(false)
  expect(validator([])).toBe(false)
  expect(validator(undefined)).toBe(false)
  expect(validator(null)).toBe(false)
  expect(validator(false)).toBe(false)
})
