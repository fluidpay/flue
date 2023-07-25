import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import type { Flue, FlueForm } from '../../types'
import { useFlue, useFlueForm } from '../..'
import { expect, test } from 'vitest'

test('composable can be used in a component with required rule', async () => {
  const TestComponent = defineComponent({
    setup() {
      const textValue = useFlue<string | undefined>(undefined, {
        rules: { required: true },
        label: 'Test Label'
      })

      return { textValue }
    },
    template: `<input v-model="textValue.value" />`
  })

  const wrapper = mount(TestComponent)

  const textValue = (wrapper.vm as any).textValue as Flue<string | undefined>

  expect(textValue.validation.valid).toBe(undefined)
  expect(textValue.label).toBe('Test Label')

  // Set to empty value, expect to be invalid
  wrapper.find('input').setValue('')
  await nextTick()
  expect(textValue.validation.valid).toBe(false)
  expect(textValue.validation.messages.length).toBeGreaterThan(0)

  // Set value, expect to be valid
  wrapper.find('input').setValue('asdf')
  await nextTick()
  expect(textValue.validation.valid).toBe(true)
})

test('value registers to collection and can be validated in the collection', async () => {
  const WrapperComponent = defineComponent({
    setup() {
      const flueForm = useFlueForm()
      const textValue = useFlue<string | undefined>(undefined, {
        rules: { required: true },
        label: 'Test Label'
      })

      return { textValue, flueForm }
    },
    template: `<input v-model="textValue.value" />`
  })

  const wrapper = mount(WrapperComponent)

  const collection = (wrapper.vm as any).flueForm as FlueForm
  let validation = collection.validate()
  expect(validation.messages.length).toBeGreaterThan(0)
  expect(validation.valid).toBe(false)

  // Set value, expect validation to be valid.
  wrapper.find('input').setValue('asdf')
  await nextTick()
  validation = collection.validate()
  expect(validation.messages.length).toBe(0)
  expect(validation.valid).toBe(true)
})

test('value registers in sub component to collection and can be validated in the collection', async () => {
  const ChildComponent = defineComponent({
    setup() {
      const textValue = useFlue<string | undefined>(undefined, {
        rules: { required: true },
        label: 'Test Label'
      })

      return { textValue }
    },
    template: `<input v-model="textValue.value" />`
  })
  const WrapperComponent = defineComponent({
    components: {
      ChildComponent
    },
    setup() {
      const flueForm = useFlueForm()

      return { flueForm }
    },
    template: `<ChildComponent></ChildComponent>`
  })

  const wrapper = mount(WrapperComponent)
  const childWrapper = wrapper.findComponent(ChildComponent)

  const collection = (wrapper.vm as any).flueForm as FlueForm
  let validation = collection.validate()
  expect(validation.messages.length).toBeGreaterThan(0)
  expect(validation.valid).toBe(false)

  // Set value, expect validation to be valid.
  childWrapper.find('input').setValue('asdf')
  await nextTick()
  validation = collection.validate()
  expect(validation.messages.length).toBe(0)
  expect(validation.valid).toBe(true)
})
