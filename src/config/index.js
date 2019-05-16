export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'E团火零售系统',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: true,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: ' ',
    pro: 'http://yuncantest1.yunqixinxi.com'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  },
  errorMessage: '%E6%9D%9C%E6%80%BB%E6%8E%A5%E5%8F%A3%E4%B8%8D%E7%BB%99%E5%8A%9B',
  errorNetwork: '%E6%9D%9C%E6%80%BB%E5%BF%98%E4%BA%86%E8%B5%B7%E6%9C%8D%E5%8A%A1%EF%BC%81',
  device: 0
}
