const accountUrl =
  'http://161.35.218.30:10000/api/webhooks/trigger/app_e5d5106edf334b0a90cf997ebc8a2a7d/wh_5eda2dd78f8a4313955cfd590eb2013a'

const categoryUrl = 'http://161.35.218.30:10000/api/webhooks/trigger/app_e5d5106edf334b0a90cf997ebc8a2a7d/wh_36be15efd19d49f68ab84bec55199d1e'

export interface Payload {
  categories?: Array<Record<string, string>>
  fromAccounts?: Array<Record<string, string>>
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
  return await fetch(accountUrl, options).then(async (response) => await response.json())
}
