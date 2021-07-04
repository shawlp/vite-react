interface IRoute {
  /** 路径 */
  path: string
  /** 组件 */
  component: any
  /** 精准匹配 */
  exact?: boolean
  /** 是否缓存 */
  cachePath?: boolean
  /** 附带参数 */
  meta?: {
    title: string
    [key: string]: string | boolean
  }
}
