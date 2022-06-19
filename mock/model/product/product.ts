import { restful } from '@mock/utils'
import { createProductProduct } from '@mock/data/product/product'

const rest = restful('ProductProduct', {
  baseUrl: '/product/product',
  created: createProductProduct
})
const request = [rest.list(), rest.gets(), rest.find(), rest.add(), rest.update(), rest.remove()]
export default request
