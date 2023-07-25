import validator from '../min_value'
import { expect, test } from 'vitest'

test('validates number minimum value', () => {
  const params = -1
  expect(validator(-1, params)).toBe(true)
  expect(validator(0, params)).toBe(true)
  expect(validator('5', params)).toBe(true)
  expect(validator([-1, 5], params)).toBe(true)
  expect(validator(undefined, params)).toBe(true)
  expect(validator(null, params)).toBe(true)
  expect(validator('', params)).toBe(true)
  expect(validator([], params)).toBe(true)

  // invalid
  expect(validator({}, params)).toBe(false)
  expect(validator('abc', params)).toBe(false)
  expect(validator(-2, params)).toBe(false)
  expect(validator('-3', params)).toBe(false)
  expect(validator(['-3'], params)).toBe(false)
})
