export interface GetPages {
  page: number
  itemsPerPage: number
  sortBy: string[]
  sortDesc: boolean[]
  [x: string]: any
}

export interface Pages<T extends Recordable = Recordable> extends Pick<GetPages, 'page' | 'itemsPerPage'> {
  totalPage: number
  totalCount: number
  rows: T[]
}

export interface LoadData<T extends Recordable = Recordable> {
  (parameter: Partial<GetPages & T>): Promise<Pages<T>>
}
