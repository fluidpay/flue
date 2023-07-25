import validator from '../max_value'
import { expect, test } from 'vitest'

test('validates number maximum value', () => {
  const params = 10

  // valid.
  expect(validator(0, params)).toBe(true)
  expect(validator('1', params)).toBe(true)
  expect(validator(10, params)).toBe(true)
  expect(validator([10], params)).toBe(true)
  expect(validator(undefined, params)).toBe(true)
  expect(validator(null, params)).toBe(true)
  expect(validator('', params)).toBe(true)
  expect(validator([], params)).toBe(true)

  // invalid
  expect(validator(10.01, params)).toBe(false)
  expect(validator(11, params)).toBe(false)
  expect(validator({}, params)).toBe(false)
  expect(validator('abc', params)).toBe(false)
  expect(validator([10.01], params)).toBe(false)
})
