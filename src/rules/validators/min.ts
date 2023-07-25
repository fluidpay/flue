import type { ValidationRuleFunction } from '../../types'
import { isEmpty, isStringOrNumber } from '../utils'

const validator: ValidationRuleFunction = (value, params) => {
  if (isEmpty(value)) {
    return true
  }

  if (!isStringOrNumber(params)) {
    throw new Error('Invalid params provided to validator.')
  }

  if (Array.isArray(value)) {
    return value.every((val) => validator(val, params))
  }

  return String(value).length >= Number(params)
}

export default validator
