import alpha_num from './validators/alpha_num'
import alpha from './validators/alpha'
import between from './validators/between'
import confirm from './validators/confirm'
import digits from './validators/digits'
import email from './validators/email'
import is_not from './validators/is_not'
import is from './validators/is'
import length from './validators/length'
import max_value from './validators/max_value'
import max from './validators/max'
import min_value from './validators/min_value'
import min from './validators/min'
import numeric from './validators/numeric'
import regex from './validators/regex'
import required from './validators/required'
import url from './validators/url'
import max_length from './validators/max_length'
import type { ValidationMessageGenerator, ValidationRule, Rules, RuleConfiguration } from '../types'
import messages from './messages'

const rules: Rules = {}

export function addRule(ruleKey: keyof RuleConfiguration, rule: ValidationRule) {
  rules[ruleKey] = rule
}

function addDefaultRules() {
  addRule('alpha_num', { validator: alpha_num, messages: messages.alpha_num })
  addRule('alpha', { validator: alpha, messages: messages.alpha })
  addRule('between', { validator: between, messages: messages.between })
  addRule('confirm', { validator: confirm, messages: messages.confirm })
  addRule('digits', { validator: digits, messages: messages.digits })
  addRule('email', { validator: email, messages: messages.email })
  addRule('is_not', { validator: is_not, messages: messages.is_not })
  addRule('is', { validator: is, messages: messages.is })
  addRule('length', { validator: length, messages: messages.length })
  addRule('max_length', { validator: max_length, messages: messages.max_length })
  addRule('max_value', { validator: max_value, messages: messages.max_value })
  addRule('max', { validator: max, messages: messages.max })
  addRule('min_value', { validator: min_value, messages: messages.min_value })
  addRule('min', { validator: min, messages: messages.min })
  addRule('numeric', { validator: numeric, messages: messages.numeric })
  addRule('regex', { validator: regex, messages: messages.regex })
  addRule('required', { validator: required, messages: messages.required })
  addRule('url', { validator: url, messages: messages.url })
}

addDefaultRules()

export function setRuleMessages(
  ruleKey: string,
  messages: Record<string, ValidationMessageGenerator>
) {
  //@ts-ignore
  rules[ruleKey].messages = { ...rules[ruleKey].messages, ...messages }
}

export default rules
