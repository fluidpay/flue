/* eslint-disable no-useless-escape */
import type { ValidationRuleFunction } from '../../types'
import { isEmpty } from '../utils'

const validator: ValidationRuleFunction = (value: unknown) => {
  if (isEmpty(value)) {
    return true
  }

  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (Array.isArray(value)) {
    return value.every((val) => re.test(String(val)))
  }

  return re.test(String(value))
}

export default validator
