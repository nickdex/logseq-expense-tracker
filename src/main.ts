import '@logseq/libs'
// import { postRequest, type Payload } from './api'
import * as R from 'ramda'
// import { getChildren } from './logseq-helper'

import { debug, error, getCurrentBlock } from './util'
import { getData } from './domain'

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
    debug(`Children ${JSON.stringify(block.children)}`)

    const isContentEquals = R.equals(block.content.toLowerCase())
    // const getCategories = R.ifElse(isContentEquals, getCategoryData(block), undefined)

    const getData1 = R.ifElse(isContentEquals, () => getData(block), R.always(undefined))

    const x = getData1('category')
    debug(x)
    // const payload: Payload = {
    //   categories: isContentEquals('category') ? getCategoryData(block) : undefined,
    //   fromAccount: []
    // }

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
    debug('Plugin Ready')
  })
  .catch(console.error)
