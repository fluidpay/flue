import type { ValidationRuleFunction } from '../../types'
import { isEmptyArray, isNullOrUndefined } from '../utils'

const validator: ValidationRuleFunction = (value) => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false) {
    return false
  }

  return !!String(value).trim().length
}

export default validator
