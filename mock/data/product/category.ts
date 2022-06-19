import { createFakerArray } from "@mock/utils/utils"
import { SEO } from '@mock/types/seo'

export interface ProductCategory extends BaseApiQuery {
  name: string
  parentId: number
  description?: string
  sort?: number
  seo: SEO
}

export const createProductCategory = () => createFakerArray<ProductCategory>("ProductCategory", ({ faker, nowDate, i }) => {
  const name = faker.commerce.productMaterial()
  const description = faker.commerce.productDescription()
  
  return {
    name,
    parentId: 0,
    description,
    sort: 0,
    seo: {
      id: i + 1,
      createDate: nowDate,
      title: name,
      description,
      keywords: [faker.commerce.productMaterial(), faker.commerce.productMaterial()].join(',')
    }
  }
})
