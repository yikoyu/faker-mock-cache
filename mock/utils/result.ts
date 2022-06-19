/*
 * 此处应使用 class 就行封装，但是使用 class 会报错，所以使用此写法
 * @Author: yikoyu
 * @Date: 2022-01-17 10:24:56
 * @Last Modified by: yikoyu
 * @Last Modified time: 2022-01-21 09:31:29
 */
import { Random } from 'mockjs'
import { hasIn, isString } from 'lodash-es'
import { withList } from './pages'
import { getUrl } from './utils'

import type { MockMethod, RespThisType } from 'vite-plugin-mock'

type Response = (
  this: RespThisType,
  opt: {
    url: Recordable
    body: Recordable
    query: Recordable
    headers: Recordable
  }
) => any

interface Http {
  url: string
  method: NonNullable<MockMethod['method']>
  response: Response
}

/**
 * @description http请求封装
 * @export
 * @param {string} baseUrl
 */
function request(baseUrl: string) {
  const http = ({ url, method, response }: Http) => {
    const noUrl = isString(url) && !url

    return {
      url: getUrl(`${baseUrl}${noUrl ? '' : '/' + url}`),
      method,
      response
    }
  }

  return {
    get: (url: string, response: Response): MockMethod => http({ url, method: 'get', response }),
    post: (url: string, response: Response): MockMethod => http({ url, method: 'post', response }),
    put: (url: string, response: Response): MockMethod => http({ url, method: 'put', response }),
    delete: (url: string, response: Response): MockMethod => http({ url, method: 'delete', response }),
    patch: (url: string, response: Response): MockMethod => http({ url, method: 'patch', response })
  }
}

interface RestfulOption<T> {
  baseUrl: string
  created: () => T[]
}

/**
 * @description restful封装
 * @export
 * @template T
 * @param {string} storeKey
 * @param {RestfulOption} options
 * @returns
 */
export function restful<T extends Recordable = Recordable>(storeKey: string, options: RestfulOption<T>) {
  const { baseUrl, created } = options
  const http = request(baseUrl)

  const list = () => {
    return http.get('list', ({ query }) => {
      const data = created()

      return withList(query, data)
    })
  }

  const gets = () => {
    return http.get('get', ({ query }) => {
      const data = created()

      if (!hasIn(query, 'ids')) return []
      return withList(query, data, true)
    })
  }

  const find = () => {
    return http.get(':id', ({ query }) => {
      const data = created()

      return data.find(item => item.id === Number(query.id))
    })
  }

  const add = () => {
    return http.post('', ({ headers, body }) => {
      const data = created()

      const query = {
        id: Random.integer(10, 10000),
        createDate: Random.now('day', 'yyyy-MM-dd HH:mm:ss'),
        ...body
      } as unknown as T

      data.push(query)

      return query
    })
  }

  const update = () => {
    return http.put(':id', ({ query, body }) => {
      const data = created()

      const params = { id: Number(query.id), ...body }

      const index = data.findIndex(item => item.id === Number(params.id))
      data[index] = { ...data[index], ...params }

      return data[index]
    })
  }

  const remove = () => {
    return http.delete(':id', ({ query }) => {
      const data = created()

      const index = data.findIndex(item => item.id === Number(query.id))
      data.splice(index, 1)
      return {}
    })
  }

  return {
    ...http,
    list,
    gets,
    find,
    add,
    update,
    remove
  }
}
