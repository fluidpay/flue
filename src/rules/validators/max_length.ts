import type { ValidationRuleFunction } from '../../types'
import { isStringOrNumber, isNullOrUndefined } from '../utils'

type Params = { value: string | number; unit: string } | string | number

const validator: ValidationRuleFunction = (value, params) => {
  if (isNullOrUndefined(value)) {
    return false
  }

  if (!params) {
    throw new Error('No params provided to validator.')
  }
  const assertedParams = params as Params
  let length: number | undefined
  if (typeof assertedParams === 'object' && isStringOrNumber(assertedParams.value)) {
    length = Number(assertedParams.value)
  } else {
    throw new Error('Invalid params provided to validator.')
  }

  if (typeof value === 'number') {
    value = String(value)
  }

  if (!(value as ArrayLike<unknown>).length) {
    value = Array.from(value as ArrayLike<unknown>)
  }

  return (value as ArrayLike<unknown>).length <= length
}

export default validator
