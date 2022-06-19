import { restful } from '@mock/utils'
import { createProductTag } from '@mock/data/product/tag'

const rest = restful('ProductTag', {
  baseUrl: '/product/tag',
  created: createProductTag
})
const request = [rest.list(), rest.gets(), rest.find(), rest.add(), rest.update(), rest.remove()]
export default request
