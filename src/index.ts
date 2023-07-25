import type { App, Plugin } from 'vue'
import FlueFieldset from './components/flue-fieldset.vue'
import FlueField from './components/flue-field.vue'
import useFlue from './composables/useFlue'
import useFlueCollection from './composables/useFlueCollection'
import useFlueForm from './composables/useFlueForm'

let locale = 'en'

const plugin: Plugin<any> = {
  install: (app: App) => {
    app.component('flue-fieldset', FlueFieldset)
    app.component('flue-field', FlueField)
  }
}

function setLocale(newLocale: string) {
  locale = newLocale
}

export { plugin, useFlue, useFlueCollection, useFlueForm, setLocale, locale }
