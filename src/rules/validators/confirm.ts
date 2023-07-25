import type { ValidationRuleFunction } from '../../types'

const isValidator: ValidationRuleFunction = (value, params) => {
  return String(value) === String(params)
}

export default isValidator
