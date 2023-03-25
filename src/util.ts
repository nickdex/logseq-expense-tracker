import { type BlockEntity } from '@logseq/libs/dist/LSPlugin'

const logLabel = 'expense-tracker'

export const debug = (x: any): void => {
  console.debug(logLabel, x)
}

export const error = (x: any): void => {
  console.error(logLabel, x)
}

export const getCurrentBlock = async (): Promise<BlockEntity | null> => {
  const block = await logseq.Editor.getCurrentBlock()
  if (block == null) return null

  return await logseq.Editor.getBlock(block.uuid, { includeChildren: true })
}

export const cleanUpString = (str: string): string => {
  return str.replace(/[^\w\s]/gi, '').replace(/\n$/, '')
}
