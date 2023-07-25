<script setup lang="ts">
import type { Flue } from '../types'

defineProps<{
  flue: Flue
  hideLabel?: boolean
}>()
</script>

<template>
  <div ref="fieldset" class="fieldset" :class="{ error: flue.validation.valid === false }">
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
