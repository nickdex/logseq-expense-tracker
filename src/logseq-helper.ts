import { type BlockEntity } from '@logseq/libs/dist/LSPlugin.user'

import { transformProperties, type Block } from './domain'

import { removeBraces } from './util'

import { map } from 'ramda'

// step 5: perform complete transformation of a single block
export const transformBlock = (block: BlockEntity): Block => ({
  content: removeBraces(block.content),
  propertiesTextValues: transformProperties(block.propertiesTextValues),
})

// step 6: transform entire list of blocks
export const toBlocks = map(transformBlock)
