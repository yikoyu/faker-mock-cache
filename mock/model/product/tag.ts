import { restful } from '@mock/utils'
import { productTags } from '@mock/data/product/tag'

const rest = restful('/product/tag', productTags)
const request = [rest.list(), rest.gets(), rest.find(), rest.add(), rest.update(), rest.remove()]
export default request
