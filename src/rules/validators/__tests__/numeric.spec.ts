import validator from '../numeric'
import { expect, test } from 'vitest'

test('validates that the string only contains numeric characters', () => {
  // valid.
  expect(validator('1234567890')).toBe(true)
  expect(validator(123)).toBe(true)
  expect(validator('٠١٢٣٤')).toBe(true)
  expect(validator('٠١٢٣٤٥٦٧٨٩')).toBe(true)
  expect(validator(undefined)).toBe(true)
  expect(validator(null)).toBe(true)
  expect(validator('')).toBe(true)
  expect(validator([])).toBe(true)
  expect(validator(0)).toBe(true)

  // invalid
  expect(validator('a')).toBe(false)
  expect(validator('1234567a89')).toBe(false)
  expect(validator(true)).toBe(false)
  expect(validator(false)).toBe(false)
  expect(validator({})).toBe(false)
  expect(validator('+123')).toBe(false)
  expect(validator('-123')).toBe(false)
})
