import validator from '../min'
import { expect, test } from 'vitest'

test('validates minimum number of characters', () => {
  const params = 3
  // valid.
  expect(validator('asjdj', params)).toBe(true)
  expect(validator('null', params)).toBe(true)
  expect(validator('undefined', params)).toBe(true)
  expect(validator(123, params)).toBe(true)
  expect(validator('abc', params)).toBe(true)
  expect(validator([123, '123', 'abc'], params)).toBe(true)
  expect(validator(undefined, params)).toBe(true)
  expect(validator(null, params)).toBe(true)
  expect(validator('', params)).toBe(true)
  expect(validator([], params)).toBe(true)

  // invalid
  expect(validator(1, params)).toBe(false)
  expect(validator(12, params)).toBe(false)
  expect(validator([1], params)).toBe(false)
})
