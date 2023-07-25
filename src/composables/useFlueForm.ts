import { reactive, unref } from 'vue'
import { provideFlueFormManager } from '../shared'
import type { FlueForm, ValidationResult, FlueFormManager, Flue } from '../types'

const useFlueForm = (): FlueForm => {
  const flues = reactive<Record<symbol, Flue>>({})

  function setFlue(result: Flue, key: symbol) {
    flues[key] = unref(result)
  }

  function deleteFlue(key: symbol) {
    delete flues[key]
  }

  function validate(...collections: string[]): ValidationResult {
    const combinedMessages: string[] = []
    let valid = true

    Object.getOwnPropertySymbols(flues)
      .filter((symbol) =>
        collections.length ? collections.includes(flues[symbol].collection ?? '') : true
      )
      .forEach((symbol) => {
        const flue = flues[symbol]

        flue.validation.validate()
        if (flue.validation.messages.length > 0) {
          flue.validation.messages.forEach((message) => {
            combinedMessages.push(message)
          })
        }
        if (flue.validation.valid === false) {
          valid = flue.validation.valid
        }
      })

    const result: ValidationResult = {
      messages: combinedMessages,
      valid
    }

    return result
  }

  function reset(...collections: string[]) {
    Object.getOwnPropertySymbols(flues)
      .filter((symbol) =>
        collections.length ? collections.includes(flues[symbol].collection ?? '') : true
      )
      .forEach((symbol) => {
        const flue = flues[symbol]
        flue.validation.reset()
      })
  }

  const manager: FlueFormManager = {
    setFlue,
    deleteFlue
  }
  provideFlueFormManager(manager)

  return { validate, reset }
}

export default useFlueForm
