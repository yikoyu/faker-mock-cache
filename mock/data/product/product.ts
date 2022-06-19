import type { SEO } from "@mock/types/seo";
import { ProductTag, productTags } from "./tag";
import { ProductCategory, productCategorys } from "./category";
import { createFakerArray } from "@mock/utils/utils";

export interface ProductProduct extends BaseApiQuery {
  name: string; // 名称
  referencePrice?: number; // 参考价
  shortDescription?: string; // 短描述
  description?: string; // 图文描述
  shelves?: boolean; // 是否上架
  shelvesDate?: string; // 上架时间
  sort?: number; // 排序
  seo: SEO; // SEO
  productCategory: Partial<ProductCategory>; // 产品分类
  productTag: ProductTag[]; // 产品标签
}

const description = `
This is short description
<img src="https://images.yikoyu.xyz/beach.jpg" alt="beach.jpg">
<h1>Yay Headlines!</h1>
<table>
  <tbody>
    <tr>
      <th><p>1</p></th>
      <th><p>2</p></th>
      <th><p>3</p></th>
      <th><p>4</p></th>
    </tr>
    <tr>
      <td><p>5</p></td>
      <td><p>6</p></td>
      <td><p>7</p></td>
      <td><p>8</p></td>
      </tr>
    </tbody>
  </table>
<p>All these <strong>cool tags</strong> are working now.</p>
`;

export const productProducts = createFakerArray<ProductProduct>("ProductProduct", ({ faker, nowDate, i }) => {
  const name = faker.commerce.productMaterial();
  const productDescription = faker.commerce.productDescription();

  return {
    name,
    referencePrice: Number(faker.commerce.price()),
    shortDescription: productDescription,
    description,
    shelves: faker.datatype.boolean(),
    shelvesDate: nowDate,
    sort: 0,
    seo: {
      id: i + 1,
      createDate: nowDate,
      title: name,
      description,
      keywords: [faker.commerce.productMaterial(), faker.commerce.productMaterial()].join(","),
    },
    productCategory: faker.helpers.arrayElement(productCategorys),
    productTag: faker.helpers.arrayElements(productTags),
  };
});

