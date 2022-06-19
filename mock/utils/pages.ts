import { isUndefined, isString, pick, omit, mapKeys, includes, map, filter, hasIn } from 'lodash-es'
import type { Pages } from '../types'

export function paging(params: any, list: any[]) {
  const pages = pick(params, ['page', 'itemsPerPage', 'sortBy', 'sortDesc'])

  pages.page = Number(pages.page) > 0 ? Number(pages.page) : 1
  pages.itemsPerPage = Number(pages.itemsPerPage) > 0 ? Number(pages.itemsPerPage) : list.length

  if (isUndefined(pages.sortBy)) pages.sortBy = []
  if (isString(pages.sortBy)) pages.sortBy = [pages.sortBy]

  if (isUndefined(pages.sortDesc)) pages.sortDesc = []
  if (isString(pages.sortDesc)) pages.sortDesc = [pages.sortDesc]

  pages.sortDesc = map(pages.sortDesc, (k: string) => {
    if (k === 'false') return 'asc'
    if (k === 'true') return 'desc'
  })

  return pages
}

export function withList(params: any, list: any[], skipPage: boolean = false): Pages | any[] {
  const query = mapKeys(omit(params, ['page', 'itemsPerPage', 'sortBy', 'sortDesc']), (val, key) => {
    const replaceValue = 'Date'
    const datesExp = new RegExp(`${replaceValue}s$`)

    return datesExp.test(key) ? key.replace(datesExp, replaceValue) : key
  })

  const PKeys = Object.keys(query)
  const hasIds = PKeys.includes('ids')

  const arr = filter(list, item => {
    const IKeys = Object.keys(item)

    const intersection = filter(IKeys, (v: string) => PKeys.includes(v))

    if (hasIds && !includes(query.ids, String(item.id))) {
      return false
    }

    for (const key of intersection) {
      const isDate = key.includes('Date')

      if (isDate) {
        const sub: Date = new Date(item[key])
        if (sub < new Date(query[key][0]) || sub > new Date(query[key][1])) {
          return false
        }
      }

      if (!isDate && String(item[key]) !== query[key]) {
        return false
      }
    }
    return true
  })

  if (!skipPage) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const sortArray = require('sort-array')
    const pages = paging(params, arr)

    // arr = sortArray(arr, {
    //   by: pages.sortBy,
    //   order: pages.sortDesc
    // })

    const startCount = (pages.page - 1) * pages.itemsPerPage
    const endCount = pages.page * pages.itemsPerPage
    const rows = arr.slice(startCount, endCount)

    return {
      page: pages.page,
      itemsPerPage: pages.itemsPerPage,
      totalCount: arr.length,
      totalPage: Math.ceil(arr.length / pages.itemsPerPage),
      rows: rows
    }
  }

  return arr || []
}
