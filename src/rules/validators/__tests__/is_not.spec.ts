import validator from '../is_not'
import { expect, test } from 'vitest'

test('checks if the value does not match another', () => {
  expect(validator(1, '1')).toBe(true)
  expect(validator(1, 1)).toBe(false)
  expect(validator(1, 2)).toBe(true)
  expect(validator({}, {})).toBe(true)
  const obj = {}
  expect(validator(obj, obj)).toBe(false)
})
