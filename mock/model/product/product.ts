import { restful } from '@mock/utils'
import { productProducts } from '@mock/data/product/product'

const rest = restful('/product/product', productProducts)
const request = [rest.list(), rest.gets(), rest.find(), rest.add(), rest.update(), rest.remove()]
export default request
