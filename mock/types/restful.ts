import { GetPages, Pages } from './page'
import type { AxiosPromise } from 'axios'

/**
 * 接口获取列表
 * @export
 * @interface List
 * @template T
 */
export interface List<T extends Recordable = Recordable, R extends Recordable = T> {
  (parameter?: Partial<GetPages & T>): AxiosPromise<Pages<R>>
}

/**
 * 接口获取全部
 * @export
 * @interface Gets
 * @template T
 */
export interface Gets<T extends Recordable = Recordable, R extends Recordable = T> {
  (parameter?: Partial<GetPages & T>): AxiosPromise<R[]>
}

/**
 * 接口精确获取某项
 * @export
 * @interface Find
 * @template T
 */
export interface Find<T extends Recordable = Recordable> {
  (id: number): AxiosPromise<T>
}

/**
 * 接口添加数据
 * @export
 * @interface Add
 * @template T
 */
export interface Add<T extends Recordable = Recordable, R extends Recordable = T> {
  (parameter: Partial<T>): AxiosPromise<R>
}

/**
 * 接口更新数据
 * @export
 * @interface Update
 * @template T
 */
export interface Update<T extends Recordable = Recordable, R extends Recordable = T> {
  (parameter: Partial<T>): AxiosPromise<R>
}

/**
 * 接口删除数据
 * @export
 * @interface Remove
 * @template T
 */
export interface Remove<T extends Recordable = Recordable> {
  (id: number): AxiosPromise<T>
}
