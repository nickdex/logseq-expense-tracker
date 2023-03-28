// Import dependencies
// import '@logseq/libs'
import { describe, expect, it } from 'vitest'

import { removeBraces, convertToSnakeCase } from '../src/util'

describe('cleanUpString', () => {
  it('should remove [[ and ]] from string', () => {
    const input = '[[hello world]]'

    const expectedOutput = 'hello world'

    expect(removeBraces(input)).toEqual(expectedOutput)
  })

  it("should not modify input if it doesn't contain [[]] characters", () => {
    const input = 'test string without brackets'

    expect(removeBraces(input)).toEqual(input)
  })
})

describe('convertToSnakeCase', () => {
  it('should convert camelCase string to snake_case', () => {
    const input = 'camelCaseString'

    const expectedOutput = 'camel_case_string'

    expect(convertToSnakeCase(input)).toEqual(expectedOutput)
  })

  it('should convert PascalCase string to snake_case', () => {
    const input = 'PascalCaseString'

    const expectedOutput = 'pascal_case_string'

    expect(convertToSnakeCase(input)).toEqual(expectedOutput)
  })

  it('should convert whitespace separated string to snake_case', () => {
    const input = 'A sentence with whitespace'

    const expectedOutput = 'a_sentence_with_whitespace'

    expect(convertToSnakeCase(input)).toEqual(expectedOutput)
  })

  it('should handle leading/trailing white spaces correctly', () => {
    const input = '   string with leading trailing spaces   '

    const expectedOutput = 'string_with_leading_trailing_spaces'

    expect(convertToSnakeCase(input)).toEqual(expectedOutput)
  })
})
