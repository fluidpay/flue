import validator from '../confirm'
import { expect, test } from 'vitest'

test('checks if the value confirms another', () => {
  expect(validator('1', '1')).toBe(true)
  expect(validator(1, '1')).toBe(true)
  expect(validator(1, 1)).toBe(true)
  expect(validator(1, '2')).toBe(false)
  expect(validator(1, 2)).toBe(false)
})
