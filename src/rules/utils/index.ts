export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined || value === '') {
    return true
  }

  if (isEmptyArray(value)) {
    return true
  }

  return false
}

export function isCallable(fn: unknown): fn is (...args: any[]) => any {
  return typeof fn === 'function'
}

export function isNullOrUndefined(value: unknown): value is undefined | null {
  return value === null || value === undefined
}

export function isEmptyArray(arr: unknown): boolean {
  return Array.isArray(arr) && arr.length === 0
}

export function isStringOrNumber(value: unknown): boolean {
  return typeof value !== 'number' || typeof value !== 'string'
}

export const isObject = (obj: unknown): obj is Record<string, unknown> =>
  obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)

export function isIndex(value: unknown): value is number {
  return Number(value) >= 0
}

export function toNumber(value: string): number | string {
  const n = parseFloat(value)

  return isNaN(n) ? value : n
}

export function maybeGetStringPrefix(str?: string) {
  return str ? ' ' + str : ''
}

export function maybeGetStringSuffix(str?: string) {
  return str ? str + ' ' : ''
}
