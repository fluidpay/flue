import validator from '../regex'
import { expect, test } from 'vitest'

test('validates regular expressions', () => {
  const params = /^[0-9]+$/
  expect(validator('1234567890', params)).toBe(true)
  expect(validator('abc', params)).toBe(false)
  expect(validator('abc-123', params)).toBe(false)
  expect(validator('1234abc5', params)).toBe(false)
  expect(validator(['1234567890', '321'], params)).toBe(true)
  expect(validator(['1234567890', 'abc'], params)).toBe(false)

  // empty values should pass
  expect(validator('', params)).toBe(true) // empty values pass
  expect(validator(undefined, params)).toBe(true) // empty values pass
  expect(validator(null, params)).toBe(true) // empty values pass
  expect(validator([], params)).toBe(true) // empty values pass
})
