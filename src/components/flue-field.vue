<script setup lang="ts">
import { type Ref, toRef } from 'vue'
import useFlue from '../composables/useFlue'
import type { RuleConfiguration } from '../types'

const props = defineProps<{
  value: unknown
  rules?: RuleConfiguration
  label?: string
  group?: string
  collection?: string
  hideLabel?: boolean
}>()

const value = toRef(props, 'value')
const label = toRef(props, 'label')
const group = toRef(props, 'group')
const collection = toRef(props, 'collection')
const rules = toRef(props, 'rules')

const flue = useFlue(value, {
  label: props.label !== undefined ? (label as Ref<string>) : undefined,
  group: props.group !== undefined ? (group as Ref<string>) : undefined,
  collection: props.collection !== undefined ? (collection as Ref<string>) : undefined,
  rules: props.rules !== undefined ? (rules as Ref<RuleConfiguration>) : undefined
})
</script>

<template>
  <div class="fieldset" :class="{ error: flue.validation.valid === false }">
    <label v-if="flue.label && !hideLabel">
      <span>{{ flue.label }}</span>
      <sup v-if="flue.rules && flue.rules.required"> *</sup></label
    >
    <slot></slot>
    <div
      class="mt-1"
      v-if="
        (typeof flue.validation.valid === 'undefined' || flue.validation.valid) &&
        $slots.description
      "
    >
      <slot name="description"></slot>
    </div>
    <ul
      v-if="!flue.validation.valid && flue.validation.messages"
      class="error-messages"
      :class="{ 'bullet mt-1': flue.validation.messages.length > 1 }"
    >
      <li class="mt-1" v-for="message in flue.validation.messages" :key="message">{{ message }}</li>
    </ul>
  </div>
</template>
