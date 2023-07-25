import {
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  watch,
  unref,
  isRef,
  type UnwrapRef,
  toRef,
  type Ref
} from 'vue'
import { injectFlueFormManager } from '../shared'
import type {
  MessageOptions,
  ValidationMessageGenerator,
  ValueValidationOptions,
  Flue,
  RuleConfiguration
} from '../types'
import useValidator from '../validator'
import rules from '../rules'
import { locale } from '..'

export default function <T = any>(value: T, options?: ValueValidationOptions): Flue<T> {
  const identifier = Symbol('valueId')

  const flue = reactive({
    value: unref(value),
    validation: {
      messages: [],
      validate: handleValidation,
      reset: resetValidation
    },
    label: options?.label,
    group: options?.group,
    collection: options?.collection,
    rules: options?.rules
  }) as Flue<T>

  if (isRef(value)) {
    watch(
      value,
      (newVal) => {
        flue.value = newVal as UnwrapRef<T>
      },
      { deep: typeof unref(value) === 'object' }
    )
  }

  watch(
    () => flue.rules,
    (newVal, oldVal) => {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        handleValidation()
      }
    },
    { deep: true }
  )

  const validator = flue.rules ? useValidator(toRef(flue, 'rules') as Ref<RuleConfiguration>) : null
  const flueForm = injectFlueFormManager()

  onMounted(() => {
    if (flueForm) {
      flueForm.setFlue(flue, identifier)
    }
  })

  onUnmounted(() => {
    if (flueForm) {
      flueForm.deleteFlue(identifier)
    }
  })

  watch(
    () => flue.value,
    () => {
      handleValidation()
    }
  )

  function handleValidation() {
    if (!validator) {
      return
    }
    const results = validator.validate(flue.value)
    if (!results) {
      return
    }
    let valid = true
    const messages: string[] = []

    const resultEntries = Object.entries(results)
    for (let i = 0; i < resultEntries.length; i++) {
      const [ruleKey, result] = resultEntries[i]
      if (!result.valid) {
        valid = result.valid

        //@ts-ignore
        if (rules[ruleKey].messages) {
          const messageOptions = getMessageOptions(flue, result.params)
          //@ts-ignore
          const message = resolveRuleMessage(rules[ruleKey].messages[locale], messageOptions)
          messages.push(message)
        }
      }
    }
    flue.validation.valid = valid
    flue.validation.messages = messages

    if (flueForm) {
      flueForm.setFlue(flue, identifier)
    }
  }

  function resetValidation() {
    nextTick(() => {
      delete flue.validation.valid
      flue.validation.messages = []
    })
  }

  return flue as Flue<T>
}

function getMessageOptions(flue: Flue, params?: unknown): MessageOptions {
  const messageOptions: MessageOptions = {}
  if (flue.label) {
    messageOptions.fieldLabel = flue.label
  }
  if (flue.group) {
    messageOptions.fieldGroup = flue.group
  }
  if (typeof params !== 'undefined') {
    messageOptions.params = params
  }
  return messageOptions
}

function resolveRuleMessage(
  message: string | ValidationMessageGenerator,
  messageOptions: MessageOptions
) {
  if (typeof message === 'string') {
    return message
  }
  return message(messageOptions)
}
