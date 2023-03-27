import {
  compose,
  equals,
  filter,
  fromPairs,
  map,
  match,
  pick,
  pipe,
  reduce,
  replace,
  toLower,
  toPairs
} from 'ramda'

import { cleanUpString, convertToSnakeCase } from './util'

const capitalizeFirstLetter = (e: string): string => e.replace(/^\w/, (c) => c.toUpperCase())
const escapeNewline = (s: string): string => s.replace(/\n/g, '\\n')

export const toCamelCase = pipe(
  escapeNewline,
  replace(/([\w\s-]+).*/, '$1'),
  match(/[a-zA-Z0-9]+/g),
  map(toLower),
  reduce((acc: string, e: string) => acc + capitalizeFirstLetter(e), ''),
  (s: string) => s.replace(/^\w/, (c: string) => c.toLowerCase())
)

export const isEquals = (content: string): ((x: string) => boolean) => equals(toCamelCase(content))

export const toCategories = (childrenContent: string): Record<string, string> => ({
  category_name: childrenContent
  // category_icon:
})

export const toFromAccount = (childrenContent: Record<string, string>): Record<string, string> =>
  pick(
    ['account_name', 'description', 'account_type', 'account_icon', 'counterparty', 'last_digits'],
    childrenContent
  )

export interface Block {
  content: string
  propertiesTextValues: Record<string, string>
}

// type StringOrArray = string // | string[] | readonly string[]

// const splitAndTrim = pipe(split(','), map(trim))

// const transformValue: (x: string) => StringOrArray = pipe(
//   cleanUpString,
//   R.ifElse(includes(','), splitAndTrim, identity)
// )

const transformEntry = ([key, value]: [string, string]): [string, string] => [
  convertToSnakeCase(key),
  cleanUpString(value)
]

export const transformProperties = (originalObject: Record<string, string>): Record<string, string> =>
  // @ts-expect-error: Use conditional typings
  compose(
    fromPairs,
    map(transformEntry),
    filter(([, v]: [string, any]) => typeof v === 'string'),
    filter(([k]: [string]) => k !== 'id'),
    toPairs
  )(originalObject)
