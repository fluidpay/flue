import { isEmpty } from '../utils'

const ar = /^[٠١٢٣٤٥٦٧٨٩]+$/
const en = /^[0-9]+$/

const validator = (value: unknown) => {
  if (isEmpty(value)) {
    return true
  }

  const testValue = (val: unknown) => {
    const strValue = String(val)

    return en.test(strValue) || ar.test(strValue)
  }

  if (Array.isArray(value)) {
    return value.every(testValue)
  }

  return testValue(value)
}

export default validator
