# Input Validator plugin for Vue

This plugin uses the reactive values in components and runs validation either on value updates or when the `validate()`
function is called at a preferred place.

Supported Vue versions:

- ^2.7
- ^3

## Getting Started

Add the plugin to your Vue application.

Vue 2.7+

```ts
import Flue from './plugins/flue'

Vue.use(Flue)
```

The Validator can be used in two ways, either with individual values or as part of a collection (e.g. a form).

Individual values can be initialized with the `useFlue` composable. Use it either in the `setup() {}` method in
`defineComponent({})` or with the setup macro.

Vue 2.7+ Setup Macro

```vue
<script setup lang="ts">
import useFlue from '@/plugins/flue'

const textField = useFlue('', {
  rules: { required: true, alpha_num: true },
  label: 'My Text Input'
})
</script>
```

Setup Method

```vue
<script lang="ts">
import useFlue from '@/plugins/flue'

export default defineComponent({
  setup() {
    const textField = useFlue('', {
      rules: { required: true, alpha_num: true },
      label: 'My Text Input'
    })
    return { textField }
  }
})
</script>
```

The first parameter passed to `useFlue` acts similarly to Vue's [ref](https://vuejs.org/api/reactivity-core.html#ref)
function, the value is reactive and the type is inferred. It is also possible to provide a generic type and initialize
the value with undefined.

```ts
const textField = useFlue<string | undefined>(undefined, {
  rules: { required: true, alpha_num: true },
  label: 'My Text Input'
})
```

An object containing `value` and `validation` is returned. `value` is the reactive value, `validation` is an object
containing validation related information.

Since this value is reactive, it can be used in any context where reactivity is needed.

```vue
<input v-model="textField.value" />
```

The simples way of visually showing the validation results is to use the built-in `flue-fieldset` component that comes
with the plugin.

```vue
<flue-fieldset :flue="textField">
  <input v-model="textField.value" />
</flue-fieldset>
```

Although the validation happens automatically during value update, it can be forced by calling
`textField.validation.validate()` to update `textField.validation.messages` and `textField.validation.valid`. However, a
better approach is to provide a collection where the value validations automatically register.

```ts
import { useFlueForm } from '@/plugins/flue'

const flueForm = useFlueForm()
```

The returned value is an object that contains a `validate()` function, which when called returns with a `messages`
string array and a `valid` boolean. The `validate()` function returns all the combined messages of the validated values
and is invalid if any of the values are invalid.

```ts
import { useFlueForm } from '@/plugins/flue'
import useFlue from '@/plugins/flue'

const flueForm = useFlueForm()

const textField = useFlue('', {
  rules: { required: true, alpha_num: true },
  label: 'My Text Input'
})
```

All the values that reside in a child or descendant component will register to the closest ancestor collection.

In the following example, providing the collection as an option is not required.

WrapperComponent.vue

```vue
<script lang="ts" setup>
import { useFlueForm } from '@/plugins/flue'

const flueForm = useFlueForm()
</script>

<template>
  <ChildComponent></ChildComponent>
</template>
```

ChildComponent.vue

```vue
<script lang="ts" setup>
import useFlue from '@/plugins/flue'

const textField = useFlue('', {
  rules: { required: true, alpha_num: true },
  label: 'My Text Input'
})
</script>

<template>
  <flue-fieldset :flue="textField">
    <input v-model="textField.value" />
  </flue-fieldset>
</template>
```

From here on, evaluating the validation results during an event is very simple.

```vue
<script lang="ts" setup>
import { useFlueForm } from '@/plugins/flue'

const flueForm = useFlueForm()

function handleClick() {
  const validation = flueForm.validate()
  if (!validation.valid) {
    // Handle invalid
  }
  // Handle valid
}
</script>

<template>
  <div>
    <ChildComponent></ChildComponent>
    <button @click="handleClick"></button>
  </div>
</template>
```

## API

### useFlue

Takes in an initial value and options, returns the reactive value and validation related information. If a collection is
available in an ancestor component, the value will register to that collection using Vue's built in "provide / inject"
API.

```ts
function useFlue<T = any>(value: T, options?: ValueValidationOptions): Flue<T>
```

### useFlueForm

Provides a validated value collection where values can register automatically using Vue's built in "provide / inject"
API.

## Available Rules

Rules that don't require params can be provided with a simple `true` boolean. Some rules have optional, some rules have
required parameters. Rules can be combined, the most common pattern is to use the `required` rule along with others.

### alpha_num

The value must only contain alpha-numeric characters.

```ts
const field = useFlue('', {
  rules: { alpha_num: true }
})
```

The settings object parameter can be set to allow additional special characters, such as `comma`, `whitespace`, `dash`, `underscore`, `slash`.

```ts
const field = useFlue('', {
  rules: { 
    alpha_num: { 
        dash: true,
        whitespace: true,
        comma: true,
        slash: true,
        underscore: true  
    }
  }
})
```

### alpha

The value must only contain alphabetic characters.

```ts
const field = useFlue('', {
  rules: { alpha: true }
})
```

The settings object parameter can be set to allow additional special characters, such as `comma`, `whitespace`, `dash`, `underscore`, `slash`.

```ts
const field = useFlue('', {
  rules: {
    alpha: {
      dash: true,
      whitespace: true,
      comma: true,
      slash: true,
      underscore: true
    }
  }
})
```

### between

The value must bet a Number or String between the `[min, max]` params provided .

```ts
const field = useFlue(2, {
  rules: { between: [1, 3] }
})
```

### confirm

The value must match the target value. The parameter provided can be a reactive value, like `computed`.

```ts
const confirmPassword = useFlue('asdf', {
  rules: { confirm: 'asdf' }
})
```

### digits

The value must be numeric String or Number and must be exactly `N` digits.

```ts
const field = useFlue(1234, {
  rules: { digits: 4 }
})

const field2 = useFlue('1234', {
  rules: { digits: 4 }
})
```

### email

The value must be a valid email address. The pattern for the validation is provided by
[emailregex.com](https://emailregex.com/).

```ts
const field = useFlue('asdf@example.com', {
  rules: { email: true }
})
```

### is_not

The value must not be the provided parameter.

```ts
const field = useFlue('asdf', {
  rules: { is_not: 'foobar' }
})

const field2 = useFlue(
  {},
  {
    rules: { is_not: {} }
  }
)
```

### is

The value must be the provided parameter.

```ts
const field = useFlue('asdf', {
  rules: { is: 'asdf' }
})

const obj = {}
const field = useFlue(obj, {
  rules: { is: obj }
})
```

### length

The parameter must be an object holding a `value` and a `unit` property. The validated value's character length, element
count in an enumerable or element count in an array must be the specified `value` property, the `unit` is used in the
validation message.

```ts
const field = useFlue('asdf', {
  rules: { length: { value: 4, unit: 'characters' } }
})

const field2 = useFlue(['a', 's', 'd', 'f'], {
  rules: { length: { value: 4, unit: 'items' } }
})
```

### max_value

The numeric value must be the provided parameter or less.

```ts
const field = useFlue(1, {
  rules: { max_value: 10 }
})

const field2 = useFlue('10', {
  rules: { max_value: 10 }
})
```

### max

The value must not contain more than `N` characters.

```ts
const field = useFlue(1, {
  rules: { max_value: 10 }
})
```

### min_value

The numeric value must be the provided parameter or more.

```ts
const field = useFlue('1', {
  rules: { min_value: 1 }
})

const field2 = useFlue(10, {
  rules: { min_value: '1' }
})
```

### min

The value must contain at least `N` characters.

```ts
const field = useFlue('asdf', {
  rules: { min: 4 }
})
```

### numeric

The value must contain numeric characters only.

```ts
const field = useFlue(1234, {
  rules: { numeric: true }
})

const field2 = useFlue('1234', {
  rules: { numeric: true }
})
```

### regex

The value must be valid when tested by the provided pattern.

```ts
const field = useFlue('1234', {
  rules: { regex: /^[0-9]+$/ }
})
```

### required

The value must not be empty.

```ts
const field = useFlue('1234', {
  rules: { required: true }
})
```

### url

The value must be a valid URL and valid when tested by the provided pattern if provided.

```ts
const field = useFlue('http://example.com', {
  rules: { url: true }
})

const field = useFlue('http://example.com/en/page/', {
  rules: { url: '/en/page/' }
})
```

## Rules Notes

Availables locales for alphabetic validators:

- en
- cs
- da
- de
- es
- fr
- it
- lt
- nl
- hu
- pl
- pt
- ru
- sk
- sr
- sv
- tr
- uk
- ar
- az
- ug

## Custom Rules

TODO
