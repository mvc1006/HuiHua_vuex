export default {
  data: [
    {
      path: "/home",
      name: "/home",
      icon: null,
      meta: {
        icon: "layui-icon-home",
        title: "门店管理"
      },
      children: [
        {
          path: "storeList",
          name: "storeList",
          icon: null,
          meta: {
            icon: "",
            title: "门店信息"
          },
          children: [],
          sortNo: 15
        },
        {
          path: "storeset",
          name: "storeset",
          icon: null,
          meta: {
            icon: "",
            title: "参数设置"
          },
          children: [],
          sortNo: 13
        },
        {
          path: "joinin",
          name: "joinin",
          icon: null,
          meta: {
            icon: "",
            title: "申请加盟"
          },
          children: [],
          sortNo: 0
        }
      ],
      sortNo: 13
    },
    {
      path: "/jurisdiction",
      name: "/jurisdiction",
      icon: null,
      meta: {
        icon: "layui-icon-app",
        title: "权限设置"
      },
      children: [
        {
          path: "user",
          name: "user",
          icon: null,
          meta: {
            icon: "",
            title: "用户设置"
          },
          children: [],
          sortNo: 2
        },
        {
          path: "role",
          name: "role",
          icon: null,
          meta: {
            icon: "",
            title: "角色设置"
          },
          children: [],
          sortNo: 1
        }
      ],
      sortNo: 11
    },
    {
      path: "/personnel",
      name: "/personnel",
      icon: null,
      meta: {
        icon: "layui-icon-app",
        title: "人员设置"
      },
      children: [
        {
          path: "cashier",
          name: "cashier",
          icon: null,
          meta: {
            icon: "",
            title: "收款员"
          },
          children: [],
          sortNo: 0
        }
      ],
      sortNo: 10
    },
    {
      path: "/pay",
      name: "/pay",
      icon: null,
      meta: {
        icon: "layui-icon-app",
        title: "收银管理"
      },
      children: [
        {
          path: "paySet",
          name: "paySet",
          icon: null,
          meta: {
            icon: "",
            title: "支付设置"
          },
          children: [],
          sortNo: 0
        }
      ],
      sortNo: 9
    },
    {
      path: "/goods",
      name: "/goods",
      icon: null,
      meta: {
        icon: "layui-icon-app",
        title: "商品管理"
      },
      children: [
        {
          path: "goodsColor",
          name: "goodsColor",
          icon: null,
          meta: {
            icon: null,
            title: "颜色设置"
          },
          children: [],
          sortNo: 0
        },
        {
          path: "goodsSize",
          name: "goodsSize",
          icon: null,
          meta: {
            icon: null,
            title: "尺码设置"
          },
          children: [],
          sortNo: 0
        },
        {
          path: "classification",
          name: "classification",
          icon: null,
          meta: {
            icon: "",
            title: "商品分类"
          },
          children: [],
          sortNo: 0
        },
        {
          path: "goodsList",
          name: "goodsList",
          icon: null,
          meta: {
            icon: "",
            title: "商品列表"
          },
          children: [],
          sortNo: 0
        }
      ],
      sortNo: 7
    },
    {
      path: "/hardware",
      name: "/hardware",
      icon: null,
      meta: {
        icon: "layui-icon-app",
        title: "硬件设备设置"
      },
      children: [
        {
          path: "workstation",
          name: "workstation",
          icon: null,
          meta: {
            icon: "",
            title: "收银台设置"
          },
          children: [],
          sortNo: 0
        }
      ],
      sortNo: 6
    },
    {
      path: "/order",
      name: "/order",
      icon: null,
      meta: {
        icon: "layui-icon-app",
        title: "数据报表中心"
      },
      children: [
        {
          path: "operateStatistics",
          name: "operateStatistics",
          icon: null,
          meta: {
            icon: "",
            title: "营运统计表"
          },
          children: [],
          sortNo: 20
        },
        {
          path: "payModeStatistics",
          name: "payModeStatistics",
          icon: null,
          meta: {
            icon: "",
            title: "实收统计表"
          },
          children: [],
          sortNo: 19
        },
        {
          path: "orderTotal",
          name: "orderTotal",
          icon: null,
          meta: {
            icon: "",
            title: "订单汇总表"
          },
          children: [],
          sortNo: 17
        },
        {
          path: "dishSale",
          name: "dishSale",
          icon: null,
          meta: {
            icon: "",
            title: "商品销售排行"
          },
          children: [],
          sortNo: 14
        },
        {
          path: "dishClassify",
          name: "dishClassify",
          icon: null,
          meta: {
            icon: "",
            title: "商品分类排行"
          },
          children: [],
          sortNo: 15
        },
        {
          path: "orderFoodDetail",
          name: "orderFoodDetail",
          icon: null,
          meta: {
            icon: "",
            title: "订单明细表"
          },
          children: [],
          sortNo: 16
        },
        {
          path: "statement",
          name: "statement",
          icon: null,
          meta: {
            icon: null,
            title: "利润报表"
          },
          children: [],
          sortNo: 0
        },
        {
          path: "exceptionOrder",
          name: "exceptionOrder",
          icon: null,
          meta: {
            icon: "",
            title: "异常订单统计表"
          },
          children: [],
          sortNo: 18
        },
        {
          path: "shift",
          name: "shift",
          icon: null,
          meta: {
            icon: "",
            title: "交接班记录"
          },
          children: [],
          sortNo: 10
        }
      ],
      sortNo: 5
    },
    {
      path: "/stock",
      name: "/stock",
      icon: null,
      meta: {
        icon: "layui-icon-app",
        title: "库存管理"
      },
      children: [
        {
          path: "warehouse",
          name: "warehouse",
          icon: null,
          meta: {
            icon: null,
            title: "库房管理"
          },
          children: [],
          sortNo: 0
        },
        {
          path: "check",
          name: "check",
          icon: null,
          meta: {
            icon: "",
            title: "盘点管理"
          },
          children: [],
          sortNo: 0
        },
        {
          path: "collar",
          name: "collar",
          icon: null,
          meta: {
            icon: "",
            title: "领用管理"
          },
          children: [],
          sortNo: 0
        },
        {
          path: "loss",
          name: "loss",
          icon: null,
          meta: {
            icon: "",
            title: "报损管理"
          },
          children: [],
          sortNo: 0
        },
        {
          path: "allocation",
          name: "allocation",
          icon: null,
          meta: {
            icon: null,
            title: "调拨管理"
          },
          children: [],
          sortNo: 0
        },
        {
          path: "supplier",
          name: "supplier",
          icon: null,
          meta: {
            icon: "",
            title: "供应商管理"
          },
          children: [],
          sortNo: 0
        },
        {
          path: "purchase",
          name: "purchase",
          icon: null,
          meta: {
            icon: "",
            title: "采购入库"
          },
          children: [],
          sortNo: 0
        },
        {
          path: "returnOut",
          name: "returnOut",
          icon: null,
          meta: {
            icon: "",
            title: "退货出库"
          },
          children: [],
          sortNo: 0
        }
      ],
      sortNo: 4
    },
    {
      path: "/inventory",
      name: "/inventory",
      icon: null,
      meta: {
        icon: "layui-icon-app",
        title: "库存报表",
        hideInMenu: true
      },
      children: [
        {
          path: "tracking",
          name: "tracking",
          icon: null,
          meta: {
            icon: "",
            title: "库存追踪"
          },
          children: [],
          sortNo: 0
        },
        {
          path: "statistics",
          name: "statistics",
          icon: null,
          meta: {
            icon: "",
            title: "库存统计"
          },
          children: [],
          sortNo: 0
        }
      ],
      sortNo: 3
    }
    // {
    //   path: "/vip",
    //   name: "/vip",
    //   icon: null,
    //   meta: {
    //     icon: "layui-icon-app",
    //     title: "会员中心"
    //   },
    //   children: [
    //     {
    //       path: 'vip',
    //       name: 'vip',
    //       icon: '',
    //       meta: {
    //         icon: 'md-funnel',
    //         title: '会员中心'
    //       },
    //     }
    //   ],
    //   sortNo: 2
    // },
    // {
    //   path: '/singlepage',
    //   name: 'singlepage',
    //   redirect: '/singlepage',
    //   meta: {
    //     icon: "",
    //     title: "首页",
    //     hideInMenu: true
    //   },
    //   hideInMenu: true
    // }
  ]
}
