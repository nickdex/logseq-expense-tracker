import '@logseq/libs'

import { type BlockEntity } from '@logseq/libs/dist/LSPlugin'

import { postRequest, type Payload } from './api'

import { isEquals, toCategories, toFromAccount } from './domain'

import { toBlocks } from './logseq-helper'

import { getCurrentBlock, logLabel } from './util'

export const main = (): void => {
  logseq.Editor.registerSlashCommand('0 Test Plugin', async () => {
    const block = await getCurrentBlock()

    if (block == null) {
      console.error(logLabel, 'No Block found')

      return
    }

    if (block?.children == null) {
      console.error(logLabel, 'No children found')

      return
    }

    console.debug(logLabel, `Parent ${block.content}`)

    // Block
    // get children
    // from children clean and return content and propertiesTextValues

    const x = toBlocks(block.children as BlockEntity[])

    // if category then return content
    const c = x.map((y) => y.content).map(toCategories)

    // if FromAccount then return propertiesTextValues
    const xx = x.map(toFromAccount)

    // map each of them to api properties

    const isEqualToContent = isEquals(block.content)

    const payload: Payload = {
      categories: isEqualToContent('category') ? c : undefined,
      fromAccounts: isEqualToContent('fromAccount') ? xx : undefined,
    }

    debugger

    console.log(payload)

    // request payload
    // await postRequest(payload)
    //   .then(async ({ message }) => {
    //     if (message !== 'Webhook trigger fired successfully') throw new Error(message)
    //     await logseq.UI.showMsg('Data Posted successfully')
    //   })
    //   .catch(async (error) => {
    //     console.error(error)
    //     await logseq.UI.showMsg('Data Sync Failed')
    //   })
  })
}

// bootstrap
logseq
  .ready(main)
  .then(() => {
    console.debug(logLabel, 'Plugin Ready')
  })
  .catch(console.error)
