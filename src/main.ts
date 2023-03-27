import '@logseq/libs'
import { type BlockEntity } from '@logseq/libs/dist/LSPlugin'

import { postRequest, type Payload } from './api'
import { isEquals, toCategories, toFromAccount } from './domain'
import { toBlocks } from './logseq-helper'
import { debug, error, getCurrentBlock } from './util'

export const main = (): void => {
  logseq.Editor.registerSlashCommand('0 Test Plugin', async () => {
    const block = await getCurrentBlock()
    if (block == null) {
      error('No Block found')
      return
    }
    if (block?.children == null) {
      error('No children found')
      return
    }

    debug(`Parent ${block.content}`)

    // Block
    // get children
    // from children clean and return content and propertiesTextValues

    const x = toBlocks(block.children as BlockEntity[])

    // if category then return content
    const c = x.map((y) => y.content).map(toCategories)

    // if FromAccount then return propertiesTextValues
    const xx = x.map((y) => y.propertiesTextValues).map(toFromAccount)

    // map each of them to api properties

    const isEqualToContent = isEquals(block.content)
    const payload: Payload = {
      categories: isEqualToContent('category') ? c : undefined,
      fromAccounts: isEqualToContent('fromAccount') ? xx : undefined
    }
    debugger

    // request payload
    await postRequest(payload)
      .then(async ({ message }) => {
        if (message !== 'Webhook trigger fired successfully') throw new Error(message)
        await logseq.UI.showMsg('Data Posted successfully')
      })
      .catch(async (error) => {
        console.error(error)
        await logseq.UI.showMsg('Data Sync Failed')
      })
  })
}

// bootstrap
logseq
  .ready(main)
  .then(() => {
    debug('Plugin Ready')
  })
  .catch(console.error)
