export {}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, any> {
    /**
     * @description 标题
     * @type {string}
     * @memberof RouteMeta
     */
    title: string

    /**
     * @description 是否隐藏
     * @type {boolean}
     * @memberof RouteMeta
     */
    hidden?: boolean

    /**
     * @description 图标，格式`激活前:激活后`，如`$mdiTestOutline:$mdiTest`
     * @type {string}
     * @memberof RouteMeta
     */
    icon?: string

    /**
     * @description 是否开启页面缓存
     * @type {boolean}
     * @memberof RouteMeta
     */
    keepAlive?: boolean

    /**
     * @description 权限代码
     * @type {string}
     * @memberof RouteMeta
     */
    permission?: string

    /**
     * @description 打开方式，设置`_blank`打开新窗口
     * @type {string}
     * @memberof RouteMeta
     */
    target?: string

    /**
     * @description 是否显示
     * @type {boolean}
     * @memberof RouteMeta
     */
    show?: boolean

    /**
     * @description 组件名
     * @type {string}
     * @memberof RouteMeta
     */
    component?: string
  }
}
