import validator from '../digits'
import { expect, test } from 'vitest'

test('validates digits', () => {
  const params = 3 // 3 digits only.
  expect(validator('123', params)).toBe(true)
  expect(validator('456', params)).toBe(true)
  expect(validator('789', params)).toBe(true)
  expect(validator('012', params)).toBe(true)
  expect(validator('000', params)).toBe(true)
  expect(validator(['012', '789'], params)).toBe(true)
  expect(validator(undefined, params)).toBe(true)
  expect(validator(null, params)).toBe(true)
  expect(validator('', params)).toBe(true)
  expect(validator([], params)).toBe(true)

  // invalid
  expect(validator(0, params)).toBe(false)
  expect(validator({}, params)).toBe(false)
  expect(validator('1234', params)).toBe(false)
  expect(validator('12', params)).toBe(false)
  expect(validator('abc', params)).toBe(false)
  expect(validator('12a', params)).toBe(false)
  expect(validator(['123', '12a'], params)).toBe(false)
})
