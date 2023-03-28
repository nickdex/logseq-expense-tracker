import { type BlockEntity } from '@logseq/libs/dist/LSPlugin'

import * as R from 'ramda'

export const logLabel = 'expense-tracker'

export const getCurrentBlock = async (): Promise<BlockEntity | null> => {
  const block = await logseq.Editor.getCurrentBlock()

  if (block == null) return null

  return await logseq.Editor.getBlock(block.uuid, { includeChildren: true })
}

export const removeBraces = R.compose(R.trim, R.replace(/\[\[|\]\]/g, ''))

const toSnakeCase = (input: string): string =>
  input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()

export const convertToSnakeCase = (input: string): string => {
  const words = input.trim().split(/\s+/)

  const snakeCasedWords = words.map(toSnakeCase)

  return snakeCasedWords.join('_')
}
