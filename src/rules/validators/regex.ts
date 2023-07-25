import { isEmpty } from '../utils'

import type { ValidationRuleFunction } from '../../types'

const validator: ValidationRuleFunction = (value, params): boolean => {
  if (isEmpty(value)) {
    return true
  }

  let regex: string | RegExp

  if (typeof params === 'string') {
    regex = new RegExp(params)
  } else if (params instanceof RegExp) {
    regex = params
  } else {
    throw new Error('Invalid regex validator parameters.')
  }

  if (Array.isArray(value)) {
    return value.every((val) => validator(val, regex))
  }

  return regex.test(String(value))
}

export default validator
