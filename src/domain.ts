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

export interface Category {
  category_name: string
  category_icon?: string
}

export interface FromAccount {
  account_name: string
  description?: string
  account_type: string
  counterparty: string
  last_digits: number
  account_icon: string
}

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

export const toCategories = (childrenContent: string[]): Category[] =>
  // eslint-disable-next-line @typescript-eslint/naming-convention
  childrenContent.map((category_name: string) => ({ category_name, category_icon: undefined }))

export const toFromAccount = (childrenContent: Record<keyof FromAccount, StringOrArray>): FromAccount =>
  pick(
    ['account_name', 'description', 'account_type', 'account_icon', 'counterparty', 'last_digits'],
    childrenContent
  )

export interface Block {
  content: string
  propertiesTextValues: Record<string, StringOrArray>
}

type StringOrArray = string // | string[] | readonly string[]

// const splitAndTrim = pipe(split(','), map(trim))

// const transformValue: (x: string) => StringOrArray = pipe(
//   cleanUpString,
//   R.ifElse(includes(','), splitAndTrim, identity)
// )

const transformEntry = ([key, value]: [string, string]): [string, StringOrArray] => [
  convertToSnakeCase(key),
  cleanUpString(value)
]

export const transformProperties = (
  originalObject: Record<string, StringOrArray>
): Record<string, StringOrArray> =>
  compose(
    fromPairs,
    map(transformEntry),
    filter(([, v]) => typeof v === 'string'),
    filter(([k]) => k !== 'id'),
    toPairs
  )(originalObject)
