import validator from '../alpha'
import { expect, test } from 'vitest'

test('validates that the string may only contains alphabetic characters', () => {
  expect(validator('abcdefgHijklMnOpqRsTUVwxYZ')).toBe(true)
  expect(validator('')).toBe(true)
  expect(validator(null)).toBe(true)
  expect(validator(undefined)).toBe(true)
  expect(validator('null')).toBe(true)
  expect(validator('undefined')).toBe(true)
  expect(validator(true)).toBe(true)
  expect(validator(false)).toBe(true)
  expect(validator(['abcdefg', 'hijk', 'lmnopq'])).toBe(true)
  expect(validator('abcdefgHijklMnOpqRsTUVwxYZ ,')).toBe(false)
  expect(validator('abcdefgHijklMnOpqRsTUVwxYZ ,', { comma: true, whitespace: true })).toBe(true)
  expect(validator('/abcd', { slash: true })).toBe(true)
  expect(validator(',abcd', { comma: true })).toBe(true)
  expect(validator('-abcd', { dash: true })).toBe(true)
  expect(validator('_abcd', { underscore: true })).toBe(true)
  expect(validator(' abcd', { whitespace: true })).toBe(true)

  // invalid
  expect(validator('this is sparta')).toBe(false)
  expect(validator('1234567a89')).toBe(false)
  expect(validator({})).toBe(false)
  expect(validator(' ')).toBe(false)
  expect(validator(['abcdefg', 'hijk', 'lmnopq123'])).toBe(false)
})

test('validates the string contains alphabetic chars from other locales', () => {
  // any locale.
  expect(validator('سلام')).toBe(true)
  expect(validator('Привет')).toBe(true)

  // non-existant locale defaults to english validation.
  expect(validator('peace', { locale: 'blah' })).toBe(true)
  expect(validator('اين اشيائي', { locale: 'blah' })).toBe(false) // non english characters.
})
