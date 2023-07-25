import type { AlphaSettings, ValidationRuleFunction } from '../../types'
import { isEmpty } from '../utils'
import {
  alphanumeric,
  getCorrectCharacterRegex,
  getLocaleRegex,
  testAllLocales
} from '../utils/alpha_helper'

const validator: ValidationRuleFunction = (value, params) => {
  if (isEmpty(value)) {
    return true
  }

  if (Array.isArray(value)) {
    return value.every((value) => validator(value, params))
  }

  const settings: AlphaSettings | undefined =
    params && typeof params === 'object' ? params : undefined
  const regexMap = alphanumeric(getCorrectCharacterRegex(settings))
  const stringValue = String(value)

  // TODO: locale should be based on a global Flue setting
  const localeRegex = getLocaleRegex(regexMap, settings?.locale)
  if (localeRegex) {
    return localeRegex.test(stringValue)
  }
  return testAllLocales(stringValue, regexMap)
}

export default validator
