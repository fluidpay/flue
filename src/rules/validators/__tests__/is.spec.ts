import validator from '../is'
import { expect, test } from 'vitest'

test('checks if the value matches another', () => {
  expect(validator(1, '1')).toBe(false)
  expect(validator(1, 1)).toBe(true)
  expect(validator(1, 2)).toBe(false)
  expect(validator({}, {})).toBe(false)
  const obj = {}
  expect(validator(obj, obj)).toBe(true)
})
