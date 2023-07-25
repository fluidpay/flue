import validator from '../max'
import { expect, test } from 'vitest'

test('validates maximum number of characters', () => {
  const params = 3
  // valid
  expect(validator(123, params)).toBe(true)
  expect(validator('abc', params)).toBe(true)
  expect(validator(1, params)).toBe(true)
  expect(validator(12, params)).toBe(true)
  expect(validator(undefined, params)).toBe(true)
  expect(validator(null, params)).toBe(true)
  expect(validator('', params)).toBe(true)
  expect(validator([1, 2], params)).toBe(true)

  // invalid
  expect(validator('abcde', params)).toBe(false)
  expect(validator('null', params)).toBe(false)
  expect(validator('undefined', params)).toBe(false)
  expect(validator(['1234'], params)).toBe(false)
})
