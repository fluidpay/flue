import { getCurrentInstance, type InjectionKey, inject, provide } from 'vue'
import type { FlueFormManager } from '../types'

const injectionKey = Symbol('flue')

// Uses same component provide as its own injections
// Due to changes in https://github.com/vuejs/vue-next/pull/2424
export function injectWithSelf<T>(symbol: InjectionKey<T>, def: T | null = null): T | null {
  const vm = getCurrentInstance() as any

  // Vue 2
  // return vm?.proxy._provided[symbol as any] || inject(symbol, def)
  // TODO: Vue 3
  return vm?.provides[symbol as any] || inject(symbol, def)
}

export function injectFlueFormManager() {
  // Default to null if provider is not available
  return injectWithSelf<FlueFormManager | null>(injectionKey, null)
}

export function provideFlueFormManager(manager: FlueFormManager) {
  provide<FlueFormManager>(injectionKey, manager)
}
