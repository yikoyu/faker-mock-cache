/**
 * @description SEO信息
 * @export
 * @interface SEO
 */
export interface SEO {
  id: number
  createDate: string
  title: string
  description: string
  keywords: string
  remarks?: string
}

/**
 * @description SEOMeta信息
 * @export
 * @interface SEOMeta
 */
export interface SEOMeta {
  createDate: string
  id: number
  metaKey: string
  metaValue: string
  remarks?: string
}
