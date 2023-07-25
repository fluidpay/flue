import type { Ref, UnwrapRef } from 'vue'

export type ValidationMessageGenerator = (options: MessageOptions) => string

export interface Rules {
  alpha_num?: ValidationRule
  alpha?: ValidationRule
  between?: ValidationRule
  confirm?: ValidationRule
  digits?: ValidationRule
  email?: ValidationRule
  is_not?: ValidationRule
  is?: ValidationRule
  length?: ValidationRule
  max_length?: ValidationRule
  max_value?: ValidationRule
  max?: ValidationRule
  min_value?: ValidationRule
  min?: ValidationRule
  numeric?: ValidationRule
  regex?: ValidationRule
  required?: ValidationRule
  url?: ValidationRule
  contain_special_char?: ValidationRule
  contain_numeric?: ValidationRule
  contain_uppercase?: ValidationRule
  username?: ValidationRule
  processor_password?: ValidationRule
  processor_username?: ValidationRule
  postal_code?: ValidationRule
  customer_id?: ValidationRule
  phone?: ValidationRule
  only_uppercase?: ValidationRule
  numeric_and_dash?: ValidationRule
  twenty_five_chars?: ValidationRule
  description?: ValidationRule
  processor_alt_key?: ValidationRule
  recurring_name?: ValidationRule
  billing_days?: ValidationRule
  account_number?: ValidationRule
  routing_number?: ValidationRule
  address?: ValidationRule
  country?: ValidationRule
  region?: ValidationRule
  masked_account_number?: ValidationRule
  check_number?: ValidationRule
  blank?: ValidationRule
  card_number?: ValidationRule
  card_expiration?: ValidationRule
  cvc?: ValidationRule
  already_in_use?: ValidationRule
  min_money?: ValidationRule
  max_money?: ValidationRule
}

export type RuleConfiguration = Partial<Record<keyof Rules, unknown>>

export type RuleResults = Record<string, { valid: boolean; params?: unknown }>

export type ValidationRuleFunction = (value: unknown, params?: unknown) => boolean

export type ValidationRuleMessages = Record<string, ValidationMessageGenerator>

export interface ValidationRule {
  validator: ValidationRuleFunction
  messages: ValidationRuleMessages
}

export interface ValidationResult {
  messages: string[]
  valid?: boolean
}

export interface ValueValidation extends ValidationResult {
  validate(): void
  reset(): void
}

export interface Flue<T = any> {
  value: UnwrapRef<T>
  validation: ValueValidation
  label?: UnwrapRef<string>
  group?: UnwrapRef<string>
  collection?: UnwrapRef<string>
  rules?: UnwrapRef<RuleConfiguration>
}

export interface FlueCollection<T extends Record<string, Flue>> {
  validate(): ValidationResult
  reset(): void
  flues: T
}

export interface ValueValidationOptions {
  rules?: RuleConfiguration | Ref<RuleConfiguration>
  label?: string | Ref<string>
  group?: string | Ref<string>
  collection?: string | Ref<string>
  flueForm?: FlueFormManager
}

export interface FlueFormManager {
  setFlue(flue: Flue, identifier: symbol): void
  deleteFlue(key: symbol): void
}

export interface FlueForm {
  validate(...collections: string[]): ValidationResult
  reset(...collections: string[]): void
}

export interface MessageOptions {
  fieldLabel?: string
  fieldGroup?: string
  params?: unknown
}

export interface AlphaSettings {
  locale?: string
  comma?: boolean
  dash?: boolean
  slash?: boolean
  underscore?: boolean
  whitespace?: boolean
}

export interface SpecialCharacters {
  [key: string]: string
}
