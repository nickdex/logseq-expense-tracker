import { describe, expect, it } from 'vitest'

import {
  toCamelCase,
  isEquals,
  clean,
  sanitizedBlockContent,
} from '../src/domain'

import { removeBraces, convertToSnakeCase } from '../src/util'

describe('Convert to camel case', () => {
  it('Normal input', () => {
    expect(toCamelCase('FROM-ACCOUNT ')).toBe('fromAccount')
  })

  it('Input with special characters', () => {
    expect(toCamelCase('Foo Bar!@#$%^&*()')).toBe('fooBar')
  })

  it('Empty input', () => {
    expect(toCamelCase('')).toBe('')
  })
})

describe('convertToSnakeCase', () => {
  it('converts a camelCase string to snake_case', () => {
    expect(convertToSnakeCase('myVariableName')).toEqual('my_variable_name')
  })
})

describe('isEquals', () => {
  it('should return true if input is from block content', () => {
    const content =
      'FROM-ACCOUNT :PROPERTIES: :id: 641bb03b-60f1-4e1a-82cf-dc18d4fc46ff :END:'

    const type = 'fromAccount'

    expect(isEquals(content)(type)).toBe(true)
  })

  it('should return true if input is from block content in JSON', () => {
    const content =
      'FROM-ACCOUNT\n:PROPERTIES:\n:id: 641bb03b-60f1-4e1a-82cf-dc18d4fc46ff\n:END:'

    const type = 'fromAccount'

    expect(isEquals(content)(type)).toBe(true)
  })

  it('should return false if input does not equal "FROM-ACCOUNT :PROPERTIES: :id: 641bb03b-60f1-4e1a-82cf-dc18d4fc46ff :END:"', () => {
    const content =
      'to-account :PROPERTIES: :id: 641bb03b-60f1-4e1a-82cf-dc18d4fc46ff :END:"'

    const type = 'fromAccount'

    expect(isEquals(content)(type)).toBe(false)
  })
})

describe('clean', () => {
  it('removes everything after the first non-word character', () => {
    expect(clean('some text here. more text here.')).toEqual('some text here')
  })

  it('removes newline characters', () => {
    expect(clean('some text\nhere')).toEqual('some text')
  })

  it('should keep a word (one word)', () => {
    const input = 'Hello'

    const expectedOutput = 'Hello'

    expect(clean(input)).toEqual(expectedOutput)
  })

  it('should keep all words (multiple))', () => {
    const input = 'The quick brown fox jumps over the lazy dog'

    const expectedOutput = 'The quick brown fox jumps over the lazy dog'

    expect(clean(input)).toEqual(expectedOutput)
  })

  it('should return an empty string for an empty input', () => {
    const input = ''

    const expectedOutput = ''

    expect(clean(input)).toEqual(expectedOutput)
  })

  it('should handle special characters', () => {
    const input = 'FROM-ACCOUNT\n:PROPERTIES:\n'

    const expectedOutput = 'FROM-ACCOUNT'

    expect(clean(input)).toEqual(expectedOutput)
  })

  it('normal input', () => {
    const input =
      'FROM-ACCOUNT\n:PROPERTIES:\n:id: 641bb03b-60f1-4e1a-82cf-dc18d4fc46ff\n:END:'

    const expectedOutput = 'FROM-ACCOUNT'

    expect(clean(input)).toEqual(expectedOutput)
  })
})

describe('removeBraces', () => {
  it('removes extra whitespace and newline characters', () => {
    expect(removeBraces('   [[hello]] [[world]] ')).toEqual('hello world')
  })
})

describe('sanitizedBlockContent', () => {
  it('cleans up and converts block content to uppercase', () => {
    expect(sanitizedBlockContent('   some\ncontent   ')).toEqual('SOME')
  })
})
