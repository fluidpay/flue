import type { ValidationRuleFunction } from '../../types'

const isValidator: ValidationRuleFunction = (value, params) => {
  return value !== params
}

export default isValidator
