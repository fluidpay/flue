import validator from '../length'
import { expect, test } from 'vitest'

test('validates number of characters in a string', () => {
  // exact length
  expect(validator('hey', { value: 3 })).toBe(true)
  expect(validator('hello', { value: 3 })).toBe(false)
})

test('null and undefined are always rejected', () => {
  expect(validator(null, { value: 3 })).toBe(false)
  expect(validator(undefined, { value: 3 })).toBe(false)
})

test('validates number of elements in an enumerable', () => {
  const firstSet = new Set(['h', 'e', 'y'])
  const secondSet = new Set(['h', 'e', 'l', 'l'])
  expect(validator(firstSet, { value: 3 })).toBe(true)
  expect(validator(secondSet, { value: 4 })).toBe(false)
})

test('validates number of elements in an array', () => {
  // exact length
  expect(validator(['h', 'e', 'y'], { value: 3 })).toBe(true)
  expect(validator(['h', 'e', 'l', 'l', 'o'], { value: 3 })).toBe(false)
})

test('validates strings consisting of numbers', () => {
  expect(validator(123 as any, { value: 3 })).toBe(true)
})
