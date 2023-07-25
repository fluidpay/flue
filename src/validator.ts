import { unref, type Ref } from 'vue'
import rules from './rules'
import type { RuleConfiguration, RuleResults } from './types'

export default function useValidator(ruleConfig: RuleConfiguration | Ref<RuleConfiguration>) {
  return { validate: (input: unknown) => validate(input, ruleConfig) }
}

function validate(input: unknown, ruleConfig: RuleConfiguration | Ref<RuleConfiguration>) {
  const unreffedConfig = unref(ruleConfig)
  const ruleEntries = Object.entries(unreffedConfig) as [keyof RuleConfiguration, unknown][]
  const results = initResults(unreffedConfig)
  for (let i = 0; i < ruleEntries.length; i++) {
    const [ruleKey, ruleParams] = ruleEntries[i]
    const unreffedParams = unref(ruleParams)
    if (unreffedParams === false) {
      results[ruleKey] = { valid: true }
      continue
    }
    const params = resolveParams(unreffedParams)
    const result = runRule(input, ruleKey, params)
    results[ruleKey] = { valid: result }
    if (typeof params === 'number' || params) {
      results[ruleKey]!.params = params
    }
  }
  return results
}

function initResults(ruleConfig: RuleConfiguration): RuleResults {
  return Object.keys(ruleConfig).reduce((obj: RuleResults, currentValue) => {
    //@ts-ignore
    obj[currentValue] = null
    return obj
  }, {})
}

function resolveParams(params: unknown) {
  if (params === true) {
    return null
  }
  return params
}

function runRule(input: unknown, ruleKey: keyof RuleConfiguration, params: unknown): boolean {
  const rule = rules[ruleKey]
  if (!rule) {
    throw new Error(`invalid rule key: ${ruleKey}`)
  }
  return rule.validator(input, params)
}
