import validator from '../url'
import { expect, test } from 'vitest'

test('validates url', () => {
  const validUrl = 'https://example.com:8080/en/whatever/?q=test#wow'

  // no pattern
  expect(validator(validUrl)).toBe(true)
  expect(validator('/only/path')).toBe(false)
  expect(validator('invalid')).toBe(false)

  // with pattern
  expect(validator(validUrl, 'https://.*')).toBe(true)
  expect(validator(validUrl, /http:\/\/.*/)).toBe(false)
  expect(validator(validUrl, '/en/whatever/')).toBe(true)
  expect(validator(validUrl, '/fr/whatever/')).toBe(false)
})
