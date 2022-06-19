/* eslint-disable @typescript-eslint/no-empty-interface */

interface ViteEnv {
  /**
   * @description 部署目录
   * @type {string}
   * @memberof ViteEnv
   */
  readonly VITE_BASE_URL: string

  /**
   *
   * @description 请求基地址
   * @type {string}
   * @memberof ViteEnv
   */
  readonly VITE_API_BASE_URL: string

  /**
   * @description electron 和 android 服务器地址（后端需要跨域）
   * @type {string}
   * @memberof ViteEnv
   */
  readonly VITE_SERVER_URL: string

  /**
   *
   * @description electron 更新服务器地址
   * @type {string}
   * @memberof ViteEnv
   */
  readonly VITE_ELECTRON_PUBLISH_URL: string

  /**
   * @description 七牛云地址
   * @type {string}
   * @memberof ViteEnv
   */
  readonly VITE_QINIU_BASE_URL: string

  /**
   * @description 开发环境 pxory 代理
   * @type {[string, string][]}
   * @memberof ViteEnv
   */
  readonly VITE_PROXY: [string, string][]

  /**
   * @description 是否 electron 下运行
   * @type {('false' | 'true')}
   * @memberof ViteEnv
   */
  readonly VITE_ELECTRON: 'false' | 'true'

  /**
   * 是否在 android 下运行
   * @type {('false' | 'true')}
   * @memberof ViteEnv
   */
  readonly VITE_ANDROID: 'false' | 'true'
}

interface ImportMetaEnv extends ViteEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
