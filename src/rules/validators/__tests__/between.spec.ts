import validator from '../between'
import { expect, test } from 'vitest'

test('validates numbers range', () => {
  const params = [1, 3]
  expect(validator('1', params)).toBe(true)
  expect(validator(2, params)).toBe(true)
  expect(validator(3, params)).toBe(true)
  expect(validator([1, 2, 3], params)).toBe(true)
  expect(validator(undefined, params)).toBe(true)
  expect(validator(null, params)).toBe(true)
  expect(validator('', params)).toBe(true)
  expect(validator([], params)).toBe(true)

  // invalid
  expect(validator({}, params)).toBe(false)
  expect(validator('1234', params)).toBe(false)
  expect(validator('12', params)).toBe(false)
  expect(validator('abc', params)).toBe(false)
  expect(validator('12a', params)).toBe(false)
  expect(validator(0, params)).toBe(false)
  expect(validator(4, params)).toBe(false)
  expect(validator(-1, params)).toBe(false)
  expect(validator([4, 5, 6], params)).toBe(false)
})

test('validates numbers range including negative numbers', () => {
  const params = [-10, 1]
  expect(validator(0, params)).toBe(true)
  expect(validator('-9', params)).toBe(true)
})
