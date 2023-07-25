import type { ValidationRuleMessages, AlphaSettings } from '../types'
import { maybeGetStringPrefix } from './utils/index'

const messages: Record<string, ValidationRuleMessages> = {
  required: {
    en: (options) => {
      return `The${maybeGetStringPrefix(options.fieldGroup)}${maybeGetStringPrefix(
        options.fieldLabel
      )} field is required.`
    }
  },
  alpha_num: {
    en: (options) => {
      const baseMessage = `The${maybeGetStringPrefix(options.fieldGroup)}${maybeGetStringPrefix(
        options.fieldLabel
      )} field must only contain alphanumeric characters.`
      const settings: AlphaSettings | undefined =
        options.params && typeof options.params === 'object' ? options.params : undefined
      return settings ? baseMessage + getMessageForSpecialCharacters(settings) : baseMessage
    }
  },
  alpha: {
    en: (options) => {
      const baseMessage = `The${maybeGetStringPrefix(options.fieldGroup)}${maybeGetStringPrefix(
        options.fieldLabel
      )} field must only contain alphabetic characters.`
      const settings: AlphaSettings | undefined =
        options.params && typeof options.params === 'object' ? options.params : undefined
      return settings ? baseMessage + getMessageForSpecialCharacters(settings) : baseMessage
    }
  },
  numeric: {
    en: (options) => {
      return `The${maybeGetStringPrefix(options.fieldGroup)}${maybeGetStringPrefix(
        options.fieldLabel
      )} field must only contain numeric characters.`
    }
  },
  min: {
    en: (options) => {
      return `The${maybeGetStringPrefix(options.fieldGroup)}${maybeGetStringPrefix(
        options.fieldLabel
      )} field must be at least ${options.params} characters.`
    }
  },
  max: {
    en: (options) => {
      return `The${maybeGetStringPrefix(options.fieldGroup)}${maybeGetStringPrefix(
        options.fieldLabel
      )} field must not contain more than ${options.params} characters.`
    }
  },
  digits: {
    en: (options) => {
      return `The${maybeGetStringPrefix(options.fieldGroup)}${maybeGetStringPrefix(
        options.fieldLabel
      )} field must be a number and exactly ${options.params} digits.`
    }
  },
  min_value: {
    en: (options) => {
      return `The${maybeGetStringPrefix(options.fieldGroup)}${maybeGetStringPrefix(
        options.fieldLabel
      )} field must be ${options.params} or more.`
    }
  },
  max_value: {
    en: (options) => {
      return `The${maybeGetStringPrefix(options.fieldGroup)}${maybeGetStringPrefix(
        options.fieldLabel
      )} field must be ${options.params} or less.`
    }
  },
  regex: {
    en: (options) => {
      return `The value provided for the${maybeGetStringPrefix(
        options.fieldGroup
      )}${maybeGetStringPrefix(options.fieldLabel)} field has invalid format.`
    }
  },
  url: {
    en: (options) => {
      return `The url provided for the${maybeGetStringPrefix(
        options.fieldGroup
      )}${maybeGetStringPrefix(options.fieldLabel)} field has invalid format.`
    }
  },
  email: {
    en: (options) => {
      return `The email provided for the${maybeGetStringPrefix(
        options.fieldGroup
      )}${maybeGetStringPrefix(options.fieldLabel)} field must be valid.`
    }
  },
  length: {
    en: (options) => {
      const params = options.params as { value: string | number; unit: string }

      return `The ${maybeGetStringPrefix(options.fieldGroup)}${maybeGetStringPrefix(
        options.fieldLabel
      )} field must be exactly ${params.value} ${params.unit} long.`
    }
  },
  max_length: {
    en: (options) => {
      const params = options.params as { value: string | number; unit: string }

      return `The${maybeGetStringPrefix(options.fieldGroup)}${maybeGetStringPrefix(
        options.fieldLabel
      )} field must be ${params.value} ${params.unit} or less.`
    }
  },
  confirm: {
    en: (options) => {
      return `The${maybeGetStringPrefix(options.fieldGroup)}${maybeGetStringPrefix(
        options.fieldLabel
      )} field does not match.`
    }
  }
}

function getMessageForSpecialCharacters(settings: AlphaSettings) {
  const specialCharacters: string[] = []
  Object.entries(settings).forEach(([specialChar, isAllowed]) => {
    if (isAllowed === true) {
      specialCharacters.push(specialChar)
    }
  })
  return `The field can also contain ${specialCharacters.join(', ')}.`
}

export default messages
