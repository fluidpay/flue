import type { ValidationRuleFunction } from '../../types'
import { isEmpty } from '../utils'

/**
 * Validate a value between the provided parameters
 *
 * @param value Number or String convertable to Number
 * @param params An array of [min, max]
 */
const validator: ValidationRuleFunction = (value, params) => {
  if (isEmpty(value)) {
    return true
  }

  if (!Array.isArray(params) || params.length < 2 || params.length > 2) {
    throw new Error('Invalid params provided to validator.')
  }

  const [min, max] = params

  if (Array.isArray(value)) {
    return value.every((val) => !!validator(val, [min, max]))
  }

  const valueAsNumber = Number(value)
  return Number(min) <= valueAsNumber && Number(max) >= valueAsNumber
}

export default validator
