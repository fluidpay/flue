import validator from '../alpha_num'
import { expect, test } from 'vitest'

test('validates that the string may only contain alphabetic and numeric characters', () => {
  expect(validator('a')).toBe(true)
  expect(validator('abcdefgHijklMnOpqRsTUVwxYZ')).toBe(true)
  expect(validator('1234567890')).toBe(true)
  expect(validator('abc123')).toBe(true)
  expect(validator(123)).toBe(true)
  expect(validator('')).toBe(true)
  expect(validator(null)).toBe(true)
  expect(validator(undefined)).toBe(true)
  expect(validator('null')).toBe(true)
  expect(validator('undefined')).toBe(true)
  expect(validator(true)).toBe(true)
  expect(validator(false)).toBe(true)
  expect(validator(['asdad', 123, 'asd2123'])).toBe(true)
  expect(validator('abc123 ,')).toBe(false)
  expect(validator('abc123 ,', { comma: true, whitespace: true })).toBe(true)
  expect(validator('/abcd123', { slash: true })).toBe(true)
  expect(validator(',abcd123', { comma: true })).toBe(true)
  expect(validator('-abcd123', { dash: true })).toBe(true)
  expect(validator('_abcd123', { underscore: true })).toBe(true)
  expect(validator(' abcd123', { whitespace: true })).toBe(true)
  expect(validator('this is sparta')).toBe(false)
  expect(validator('123-abc')).toBe(false)
  expect(validator({})).toBe(false)
  expect(validator(' ')).toBe(false)
  expect(validator(['asdasda  ', '123 ad'])).toBe(false)
})

test('validates the string contains alphabetic chars from other locales', () => {
  // any locale.
  expect(validator('سلام12')).toBe(true)
  expect(validator('Привет12')).toBe(true)

  // non-existant locale defaults to english validation.
  expect(validator('peace', { locale: 'blah' })).toBe(true)
  expect(validator('اين اشيائي', { locale: 'blah' })).toBe(false) // non english characters.
})
