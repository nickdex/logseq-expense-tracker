import { type BlockEntity } from '@logseq/libs/dist/LSPlugin'
import { describe, expect, it } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { transformProperties } from '../src/domain'
import { toBlocks } from '../src/logseq-helper'

describe('parseBlock', () => {
  const mockBlocks = mock<BlockEntity[]>([
    {
      content: 'Block 1',
      propertiesTextValues: {
        accountType: '[[Credit Card]]',
        counterparty: '[[ICICI]]',
        id: '641bb03b-f08d-4014-8863-665a53ac3208',
        lastDigits: '5002, 1002 1000, [[movie]], [[Nikhil]] '
      }
    },
    {
      content: 'Block 2',
      propertiesTextValues: {
        accountType: '[[Credit Card]]',
        counterparty: '[[ICICI]]',
        id: '641bb03b-f08d-4014-8863-665a53ac3208',
        lastDigits: '5002, 1002 1000, [[movie]], [[Nikhil]] '
      }
    }
  ])

  it('should clean up nested properties', () => {
    const result = toBlocks(mockBlocks)

    expect(result).toEqual([
      {
        content: 'Block 1',
        propertiesTextValues: {
          account_type: 'Credit Card',
          counterparty: 'ICICI',
          last_digits: '5002, 1002 1000, movie, Nikhil'
        }
      },
      {
        content: 'Block 2',
        propertiesTextValues: {
          account_type: 'Credit Card',
          counterparty: 'ICICI',
          last_digits: '5002, 1002 1000, movie, Nikhil'
        }
      }
    ])
  })

  it('should clean up string before returning', () => {
    const result = toBlocks(mockBlocks)
    expect(result[0].content).toBe('Block 1')
    expect(result[1].content).toBe('Block 2')
  })
})

describe('transformProperties', () => {
  it('should convert properties from camelCase to snake_case', () => {
    const input = {
      // propertiesTextValues: {
      firstName: 'John',
      lastName: 'Doe',
      age: '42',
      accountType: 'Credit Card',
      counterparty: 'ICICI'
      // }
    }

    const expectedOutput = {
      first_name: 'John',
      last_name: 'Doe',
      age: '42',
      account_type: 'Credit Card',
      counterparty: 'ICICI'
    }

    expect(transformProperties(input)).toEqual(expectedOutput)
  })
})
