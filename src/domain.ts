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
  split,
  toLower,
  toPairs,
  toUpper,
  trim,
} from 'ramda'

import { removeBraces, convertToSnakeCase } from './util'

const capitalizeFirstLetter = (e: string): string =>
  e.replace(/^\w/, (c) => c.toUpperCase())

export const clean = pipe(
  split('\n'),
  (x: string[]) => x[0],
  replace(/([\w\s-]+)[^\w\s-].*/, '$1'),
  trim,
  replace(/\n/g, '')
)

export const toCamelCase = pipe(
  match(/[a-zA-Z0-9]+/g),
  map(toLower),
  reduce((acc: string, e: string) => acc + capitalizeFirstLetter(e), ''),
  (s: string) => s.replace(/^\w/, (c: string) => c.toLowerCase())
)

export const sanitizedBlockContent = pipe(clean, toUpper)

export const isEquals = (content: string): ((x: string) => boolean) =>
  equals(pipe(clean, toCamelCase)(content))

export const toCategories = (
  childrenContent: string
): Record<string, string> => ({
  category_name: childrenContent,
  // category_icon:
})

export const toFromAccount = (block: Block): Record<string, string> => {
  const { content, propertiesTextValues } = block

  return {
    ...pick(
      [
        'account_name',
        'description',
        'account_type',
        'account_icon',
        'counterparty',
        'last_digits',
      ],
      propertiesTextValues
    ),
    ...{ account_name: sanitizedBlockContent(content) },
  }
}

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
  removeBraces(value),
]

export const transformProperties = (
  originalObject: Record<string, string>
): Record<string, string> =>
  // @ts-expect-error: Use conditional typings
  compose(
    fromPairs,
    map(transformEntry),
    filter(([, v]: [string, any]) => typeof v === 'string'),
    filter(([k]: [string]) => k !== 'id'),
    toPairs
  )(originalObject)
