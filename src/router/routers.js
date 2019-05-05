import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: 'register - 注册',
      notCache: true,
      hideInMenu: true
    },
    component: () => import('@/view/register/register.vue')
  },
  {
    path: '/',
    name: '_singlepage',
    component: Main,
    redirect: '/singlepage',
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [{
      path: '/singlepage',
      name: 'singlepage',
      meta: {
        hideInMenu: true,
        title: '首页',
        notCache: true,
        icon: 'md-home'
      },
      component: () => import('@/view/singlepage/singlepage')
    }]
  },
  {
    path: '/home',
    name: 'home',
    icon: 'ios-home',
    meta: {
      icon: 'ios-home',
      title: '门店管理'
    },
    component: Main,
    children: [
      {
        path: 'storeList',
        name: 'storeList',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '门店信息'
        },
        component: () => import('@/view/home/storeList.vue')
      },
      {
        path: 'storeset',
        name: 'storeset',
        icon: '',
        meta: {
          icon: 'md-clipboard',
          notCache: true,
          title: '参数设置'
        },
        component: () => import('@/view/home/storeset.vue')
      },
      {
        path: 'joinin',
        name: 'joinin',
        icon: '',
        meta: {
          icon: 'md-clipboard',
          notCache: true,
          title: '申请加盟'
        },
        component: () => import('@/view/home/joinin.vue')
      }
    ]
  },
  {
    path: '/goods',
    name: 'goods',
    icon: 'ios-pricetags',
    meta: {
      icon: 'md-menu',
      notCache: true,
      title: '商品管理'
    },
    component: Main,
    children: [
      {
        path: 'barCode',
        name: 'barCode',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '一品多码设置'
        },
        component: () => import('@/view/goods/barCode.vue')
      },
      {
        path: 'packCode',
        name: 'packCode',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '包装条码设置'
        },
        component: () => import('@/view/goods/packCode.vue')
      },
      {
        path: 'goodsColor',
        name: 'goodsColor',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '颜色设置'
        },
        component: () => import('@/view/goods/goodsColor.vue')
      },
      {
        path: 'goodsSize',
        name: 'goodsSize',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '尺码设置'
        },
        component: () => import('@/view/goods/goodsSize.vue')
      },
      {
        path: 'classification',
        name: 'classification',
        icon: '',
        meta: {
          icon: 'md-clipboard',
          notCache: true,
          title: '商品分类'
        },
        component: () => import('@/view/goods/classification.vue')
      },
      {
        path: 'goodsList',
        name: 'goodsList',
        icon: '',
        meta: {
          icon: 'md-clipboard',
          notCache: true,
          title: '商品列表'
        },
        component: () => import('@/view/goods/goodsList.vue')
      }
    ]
  },
  {
    path: '/pay',
    name: 'pay',
    icon: 'ios-pricetags',
    meta: {
      icon: 'md-menu',
      title: '收银管理',
      notCache: true,
      showAlways: true
    },
    component: Main,
    children: [{
      path: 'paySet',
      name: 'paySet',
      icon: '',
      meta: {
        icon: 'md-funnel',
        notCache: true,
        title: '支付设置'
      },
      component: () => import('@/view/pay/paySet.vue')
    }]
  },
  {
    path: '/hardware',
    name: 'hardware',
    icon: 'ios-pricetags',
    meta: {
      icon: 'md-menu',
      title: '硬件设备设置',
      notCache: true,
      showAlways: true
    },
    component: Main,
    children: [{
      path: 'workstation',
      name: 'workstation',
      icon: '',
      meta: {
        icon: 'md-funnel',
        notCache: true,
        title: '收银台设置'
      },
      component: () => import('@/view/hardware/workstation.vue')
    },
    {
      path: 'balanceFlag',
      name: 'balanceFlag',
      icon: '',
      meta: {
        icon: 'md-funnel',
        notCache: true,
        title: '条码秤设置'
      },
      component: () => import('@/view/hardware/balanceFlag.vue')
    }]
  },
  {
    path: '/personnel',
    name: 'personnel',
    icon: 'ios-pricetags',
    meta: {
      icon: 'md-menu',
      title: '人员设置',
      notCache: true
    },
    component: Main,
    children: [{
      path: 'cashier',
      name: 'cashier',
      icon: '',
      meta: {
        icon: 'md-funnel',
        notCache: true,
        title: '收款员'
      },
      component: () => import('@/view/personnel/cashier.vue')
    }]
  },
  {
    path: '/jurisdiction',
    name: 'jurisdiction',
    icon: 'ios-pricetags',
    meta: {
      icon: 'md-menu',
      notCache: true,
      title: '权限设置'
    },
    component: Main,
    children: [
      {
        path: 'user',
        name: 'user',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '用户设置'
        },
        component: () => import('@/view/jurisdiction/user.vue')
      },
      {
        path: 'role',
        name: 'role',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '角色设置'
        },
        component: () => import('@/view/jurisdiction/role.vue')
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    icon: 'ios-pricetags',
    meta: {
      icon: 'md-menu',
      title: '数据报表中心'
    },
    component: Main,
    children: [
      {
        path: 'operateStatistics',
        name: 'operateStatistics',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '营运统计表'
        },
        component: () => import('@/view/order/operateStatistics.vue')
      },
      {
        path: 'payModeStatistics',
        name: 'payModeStatistics',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '实收统计表'
        },
        component: () => import('@/view/order/payModeStatistics.vue')
      },
      {
        path: 'orderTotal',
        name: 'orderTotal',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '订单汇总表'
        },
        component: () => import('@/view/order/orderTotal.vue')
      },
      {
        path: 'dishSale',
        name: 'dishSale',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '商品销售排行'
        },
        component: () => import('@/view/order/dishSale.vue')
      },
      {
        path: 'dishClassify',
        name: 'dishClassify',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '商品分类排行'
        },
        component: () => import('@/view/order/dishClassify.vue')
      },
      {
        path: 'orderFoodDetail',
        name: 'orderFoodDetail',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '订单明细表'
        },
        component: () => import('@/view/order/orderFoodDetail.vue')
      },
      {
        path: 'statement',
        name: 'statement',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '利润报表'
        },
        component: () => import('@/view/order/statement.vue')
      },
      {
        path: 'exceptionOrder',
        name: 'exceptionOrder',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '异常订单统计表'
        },
        component: () => import('@/view/order/exceptionOrder.vue')
      },
      {
        path: 'shift',
        name: 'shift',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '交接班记录'
        },
        component: () => import('@/view/order/shift.vue')
      }
    ]
  },
  {
    path: '/stock',
    name: 'stock',
    icon: 'ios-pricetags',
    meta: {
      icon: 'md-menu',
      title: '库存管理'
    },
    component: Main,
    children: [
      {
        path: 'warehouse',
        name: 'warehouse',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '库房管理'
        },
        component: () => import('@/view/stock/warehouse.vue')
      },
      {
        path: 'check',
        name: 'check',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '盘点管理'
        },
        component: () => import('@/view/stock/check.vue')
      },
      {
        path: 'collar',
        name: 'collar',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '领用管理'
        },
        component: () => import('@/view/stock/collar.vue')
      },
      {
        path: 'loss',
        name: 'loss',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '报损管理'
        },
        component: () => import('@/view/stock/loss.vue')
      },
      {
        path: 'allocation',
        name: 'allocation',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '调拨管理'
        },
        component: () => import('@/view/stock/allocation.vue')
      },
      {
        path: 'supplier',
        name: 'supplier',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '供应商管理'
        },
        component: () => import('@/view/stock/supplier.vue')
      },
      {
        path: 'purchase',
        name: 'purchase',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '采购入库'
        },
        component: () => import('@/view/stock/purchase.vue')
      },
      {
        path: 'returnOut',
        name: 'returnOut',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '退货出库'
        },
        component: () => import('@/view/stock/returnOut.vue')
      }
    ]
  },
  {
    path: '/inventory',
    name: 'inventory',
    icon: 'ios-pricetags',
    meta: {
      icon: 'md-menu',
      notCache: true,
      title: '库存报表'
    },
    component: Main,
    children: [
      {
        path: 'tracking',
        name: 'tracking',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '库存追踪'
        },
        component: () => import('@/view/inventory/tracking.vue')
      },
      {
        path: 'statistics',
        name: 'statistics',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '库存统计'
        },
        component: () => import('@/view/inventory/statistics.vue')
      },
      {
        path: 'stockAlarm',
        name: 'stockAlarm',
        icon: '',
        meta: {
          icon: 'md-funnel',
          notCache: true,
          title: '库存预警'
        },
        component: () => import('@/view/inventory/stockAlarm.vue')
      }
    ]
  },
  {
    path: '',
    name: 'vip',
    meta: {
      title: '会员中心',
      href: 'http://pos.yunqixinxi.com/crm',
      icon: 'ios-pricetags'
    }
  },
  // {
  //   path: '/vip',
  //   name: '_vip',
  //   icon: 'ios-pricetags',
  //   meta: {
  //     icon: 'md-menu',
  //     title: '会员中心',
  //     // hideInMenu: true,
  //     notCache: true
  //     // showAlways: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'vip',
  //       name: 'vip',
  //       icon: '',
  //       meta: {
  //         icon: 'md-funnel',
  //         notCache: true,
  //         title: '会员中心'
  //       },
  //       component: () => import('')
  //     }
  //   ]
  // },
  {
    path: '/i18n',
    name: 'i18n',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [{
      path: 'i18n_page',
      name: 'i18n_page',
      meta: {
        icon: 'md-planet',
        title: 'i18n - {{ i18n_page }}'
      },
      component: () => import('@/view/i18n/i18n-page.vue')
    }]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
