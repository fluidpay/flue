import { isEmpty, isStringOrNumber } from '../utils'
import type { ValidationRuleFunction } from '../../types'

const validator: ValidationRuleFunction = (value, params): boolean => {
  if (isEmpty(value)) {
    return true
  }

  if (!isStringOrNumber(params)) {
    throw new Error('Invalid params provided to validator.')
  }

  if (Array.isArray(value)) {
    return value.length > 0 && value.every((val) => validator(val, params))
  }

  return Number(value) <= Number(params)
}

export default validator
