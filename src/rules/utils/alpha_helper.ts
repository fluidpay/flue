/* eslint-disable no-misleading-character-class */
import type { AlphaSettings, SpecialCharacters } from '../../types'

/**
 * Some Alpha Regex helpers.
 * https://github.com/chriso/validator.js/blob/master/src/lib/alpha.js
 */

export const alpha = (additionalCharacters?: string): { [k: string]: RegExp } => ({
  en: createAlphaRegex('A-Z', additionalCharacters),
  cs: createAlphaRegex('A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ', additionalCharacters),
  da: createAlphaRegex('A-ZÆØÅ', additionalCharacters),
  de: createAlphaRegex('A-ZÄÖÜß', additionalCharacters),
  es: createAlphaRegex('A-ZÁÉÍÑÓÚÜ', additionalCharacters),
  fr: createAlphaRegex('A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ', additionalCharacters),
  it: createAlphaRegex('A-Z\xC0-\xFF', additionalCharacters),
  lt: createAlphaRegex('A-ZĄČĘĖĮŠŲŪŽ', additionalCharacters),
  nl: createAlphaRegex('A-ZÉËÏÓÖÜ', additionalCharacters),
  hu: createAlphaRegex('A-ZÁÉÍÓÖŐÚÜŰ', additionalCharacters),
  pl: createAlphaRegex('A-ZĄĆĘŚŁŃÓŻŹ', additionalCharacters),
  pt: createAlphaRegex('A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ', additionalCharacters),
  ru: createAlphaRegex('А-ЯЁ', additionalCharacters),
  sk: createAlphaRegex('A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ', additionalCharacters),
  sr: createAlphaRegex('A-ZČĆŽŠĐ', additionalCharacters),
  sv: createAlphaRegex('A-ZÅÄÖ', additionalCharacters),
  tr: createAlphaRegex('A-ZÇĞİıÖŞÜ', additionalCharacters),
  uk: createAlphaRegex('А-ЩЬЮЯЄІЇҐ', additionalCharacters),
  ar: createAlphaRegex('ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ', additionalCharacters),
  az: createAlphaRegex('A-ZÇƏĞİıÖŞÜ', additionalCharacters),
  ug: createAlphaRegex('A-Zچۋېرتيۇڭوپھسداەىقكلزشغۈبنمژفگخجۆئ', additionalCharacters)
})

export const alphanumeric = (additionalCharacters?: string): { [k: string]: RegExp } => ({
  en: createAlphaRegex('0-9A-Z', additionalCharacters),
  cs: createAlphaRegex('0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ', additionalCharacters),
  da: createAlphaRegex('0-9A-ZÆØÅ', additionalCharacters),
  de: createAlphaRegex('0-9A-ZÄÖÜß', additionalCharacters),
  es: createAlphaRegex('0-9A-ZÁÉÍÑÓÚÜ', additionalCharacters),
  fr: createAlphaRegex('0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ', additionalCharacters),
  it: createAlphaRegex('0-9A-Z\xC0-\xFF', additionalCharacters),
  lt: createAlphaRegex('0-9A-ZĄČĘĖĮŠŲŪŽ', additionalCharacters),
  hu: createAlphaRegex('0-9A-ZÁÉÍÓÖŐÚÜŰ', additionalCharacters),
  nl: createAlphaRegex('0-9A-ZÉËÏÓÖÜ', additionalCharacters),
  pl: createAlphaRegex('0-9A-ZĄĆĘŚŁŃÓŻŹ', additionalCharacters),
  pt: createAlphaRegex('0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ', additionalCharacters),
  ru: createAlphaRegex('0-9А-ЯЁ', additionalCharacters),
  sk: createAlphaRegex('0-9A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ', additionalCharacters),
  sr: createAlphaRegex('0-9A-ZČĆŽŠĐ', additionalCharacters),
  sv: createAlphaRegex('0-9A-ZÅÄÖ', additionalCharacters),
  tr: createAlphaRegex('0-9A-ZÇĞİıÖŞÜ', additionalCharacters),
  uk: createAlphaRegex('0-9А-ЩЬЮЯЄІЇҐ', additionalCharacters),
  ar: createAlphaRegex(
    '٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ',
    additionalCharacters
  ),
  az: createAlphaRegex('0-9A-ZÇƏĞİıÖŞÜ', additionalCharacters),
  ug: createAlphaRegex('0-9A-Zچۋېرتيۇڭوپھسداەىقكلزشغۈبنمژفگخجۆئ', additionalCharacters)
})

export const specialCharacterSet: SpecialCharacters = {
  comma: ',',
  dash: '\\-',
  slash: '\\/',
  underscore: '\\_',
  whitespace: '\\s'
}

function createAlphaRegex(allowedChars: string, additionalCharacters?: string) {
  return new RegExp(`^[${allowedChars}${additionalCharacters ?? ''}]*$`, 'i')
}

export function getLocaleRegex(regexpMap: Record<string, RegExp>, locale?: string) {
  return locale ? regexpMap[locale] ?? regexpMap.en ?? null : null
}

export function testAllLocales(value: string, regexpMap: Record<string, RegExp>) {
  return Object.values(regexpMap).some((regex) => regex.test(value))
}

export function getCorrectCharacterRegex(settings: AlphaSettings | undefined) {
  if (!settings) {
    return
  }
  let specialRegexChars = ''
  Object.entries(settings).forEach(([specialChar, isAllowed]) => {
    if (isAllowed === true) {
      if (Object.keys(specialCharacterSet).includes(specialChar.toString())) {
        specialRegexChars += specialCharacterSet[specialChar]
      } else {
        throw new Error('incorrect parameters have been provided: ' + specialChar.toString())
      }
    }
  })

  return specialRegexChars
}
