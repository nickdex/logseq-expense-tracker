import { describe, expect, it } from 'vitest'
import { toCamelCase, isEquals } from '../src/domain'

describe('Convert to camel case', () => {
  it('Normal input', () => {
    expect(toCamelCase('FROM-ACCOUNT :PROPERTIES: :id: 641bb03b-60f1-4e1a-82cf-dc18d4fc46ff :END:')).toBe(
      'fromAccount'
    )
  })

  it('Input with special characters', () => {
    expect(toCamelCase('Foo Bar!@#$%^&*()')).toBe('fooBar')
  })

  it('Empty input', () => {
    expect(toCamelCase('')).toBe('')
  })
})

describe('isContentEquals', () => {
  it('should return true if input is from block content', () => {
    const content = 'FROM-ACCOUNT :PROPERTIES: :id: 641bb03b-60f1-4e1a-82cf-dc18d4fc46ff :END:'
    const type = 'fromAccount'

    expect(isEquals(content)(type)).toBe(true)
  })
  it('should return true if input is from block content in JSON', () => {
    const content = '"FROM-ACCOUNT\n:PROPERTIES:\n:id: 641bb03b-60f1-4e1a-82cf-dc18d4fc46ff\n:END:"'
    const type = 'fromAccount'

    expect(isEquals(content)(type)).toBe(true)
  })

  it('should return false if input does not equal "FROM-ACCOUNT :PROPERTIES: :id: 641bb03b-60f1-4e1a-82cf-dc18d4fc46ff :END:"', () => {
    const content = 'to-account :PROPERTIES: :id: 641bb03b-60f1-4e1a-82cf-dc18d4fc46ff :END:"'
    const type = 'fromAccount'

    expect(isEquals(content)(type)).toBe(false)
  })
})
