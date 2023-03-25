import { type BlockEntity } from '@logseq/libs/dist/LSPlugin.user'
import { cleanUpString } from './util'

export const getChildren = (block: BlockEntity): string[] => {
  const children = block.children as BlockEntity[]

  const childrenContent = children.map(({ content }) => cleanUpString(content))

  return childrenContent
}
