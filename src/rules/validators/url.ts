import type { ValidationRuleFunction } from '../../types'
import { isEmpty } from '../utils'

const defaultRegex =
  /^(https?:\/\/(www\.)?)?((localhost)|[a-z0-9]+([-.]{1,2}[a-z0-9]+)*\.[a-z]{2,5})(:[0-9]{1,5})?(\/.*)?$/

const validator: ValidationRuleFunction = (value: unknown, params?: unknown) => {
  if (isEmpty(value)) {
    return true
  }

  let regex: RegExp | undefined
  if (typeof params === 'undefined' || params === null) {
    regex = defaultRegex
  } else if (typeof params === 'string') {
    regex = new RegExp(params)
  } else if (params instanceof RegExp) {
    regex = params
  } else {
    throw new Error('Invalid regex validator parameters.')
  }

  try {
    // eslint-disable-next-line no-new
    new URL(value as string)
  } catch {
    return false
  }

  return regex.test(value as string) ?? true
}

export default validator
