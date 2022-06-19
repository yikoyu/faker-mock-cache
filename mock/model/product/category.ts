import { restful } from '@mock/utils'
import { productCategorys } from '@mock/data/product/category'

const rest = restful('/product/category', productCategorys)
const request = [rest.list(), rest.gets(), rest.find(), rest.add(), rest.update(), rest.remove()]
export default request
