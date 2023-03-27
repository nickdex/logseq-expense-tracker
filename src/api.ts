import { type Category, type FromAccount } from './domain'

const url =
  'http://161.35.218.30:10000/api/webhooks/trigger/app_e5d5106edf334b0a90cf997ebc8a2a7d/wh_36be15efd19d49f68ab84bec55199d1e'

export interface Payload {
  categories?: Category[]
  fromAccounts?: FromAccount[]
}

export const postRequest = async (body: Payload): Promise<any> => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }

  // Make the request
  return await fetch(url, options).then(async (response) => await response.json())
}
