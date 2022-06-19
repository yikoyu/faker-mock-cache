import { createFakerArray } from "@mock/utils/utils"

export interface ProductTag extends BaseApiQuery {
  name: string
}

export const createProductTag = () => createFakerArray<ProductTag>("ProductTag", ({ faker }) => ({
  name: faker.commerce.productAdjective()
}))
