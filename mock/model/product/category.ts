import { restful } from '@mock/utils'
import { createProductCategory } from '@mock/data/product/category'

const rest = restful('ProductCategory', {
  baseUrl: '/product/category',
  created: createProductCategory
})
const request = [rest.list(), rest.gets(), rest.find(), rest.add(), rest.update(), rest.remove()]
export default request
