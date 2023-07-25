import { reactive } from 'vue'
import type { Flue, FlueCollection, ValidationResult } from '../types'

const useFlueCollection = <T extends Record<string, Flue>>(flues: T): FlueCollection<T> => {
  function validate(): ValidationResult {
    let valid = true

    const combinedMessages: string[] = []
    for (const flue of Object.values(flues)) {
      flue.validation.validate()
      if (flue.validation.valid === false) {
        valid = false
      }
      if (flue.validation.messages.length > 0) {
        flue.validation.messages.forEach((message) => {
          combinedMessages.push(message)
        })
      }
    }
    return { valid, messages: combinedMessages }
  }

  function reset() {
    for (const flue of Object.values(flues)) {
      flue.validation.reset()
    }
  }

  return reactive({ validate, reset, flues }) as FlueCollection<T>
}

export default useFlueCollection
