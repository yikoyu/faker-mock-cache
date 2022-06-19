declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

/**
 * 安装pwa事件接口
 * @see   https://stackoverflow.com/a/51847335
 * @see   https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
 */
declare interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

declare interface BaseApiQuery {
  id: number
  ids?: number[]
  createDate: string
  remarks?: string
}

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = Nullable<ComponentElRef<T>>

declare interface __APP_INFO__ {
  version: string
  name: string
  short_name: string
  description: string
  appId: string
  icp: string
  copyright: string
  lang: string
  seo: {
    description: string
    keywords: string
  }
  plugin: {
    gzip: boolean
    cdn: boolean
    mock: boolean
  }
}
declare const __APP_INFO__: __APP_INFO__
