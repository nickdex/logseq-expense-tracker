import * as R from 'ramda'
import { getChildren } from './logseq-helper'

export interface Category {
  category_name: string
  category_icon?: string
}

export interface FromAccount {
  account_name: string
  description?: string
  account_type: string
  account_icon: string
  counter_party: string
  last_digits: number
}

const toCategories = (childrenContent: string[]): Category[] =>
  // eslint-disable-next-line @typescript-eslint/naming-convention
  childrenContent.map((category_name: string) => ({ category_name, category_icon: undefined }))

export const getCategoryData = R.pipe(getChildren, toCategories)

const toData = (x: string[]): any[] => [x]

export const getData = R.pipe(getChildren, toData)
