export const cashier = {
  findList: '/v1/user/cashier/findList',
  getMaxCashierCode: '/v1/user/cashier/getMaxCashierCode',
  save: '/v1/user/cashier/save',
  delete: '/v1/user/cashier/delete',
  update: '/v1/user/cashier/update',
  updatePasswd: '/v1/user/cashier/updatePasswd',
  findPage: '/v1/user/cashier/findPage',
  orderFind: '/v1/user/cashierChange/findPage',
  exportAbnormalExcel: '/v1/user/cashierChange/exportAbnormalExcel'
};

export const storeInfo = {
  login: '/v1/basic/storeInfo/login',
  register: '/v1/basic/storeInfo/register',
  loginStore: '/v1/basic/storeInfo/loginStore',
  saveMenuInfo: '/v1/basic/storeInfo/update',
  loginMenu: '/v1/basic/storeMenu/findListByRoleId',
  menuInfo: '/v1/basic/storeInfo/find',
  logout: '/v1/basic/storeInfo/logout',
  storeSet: '/v1/basic/storeParameter/findList',
  storeSave: '/v1/basic/storeParameter/save',
  verifyCode: '/v1/basic/storeInfo/verifyCode',
  getVerifyCode: '/v1/basic/storeInfo/getVerifyCode',
  menuInfoKey: '/v1/basic/storeInfo/getLatAndLogByName'
};

export const storeUser = {
  findListByLinkMobile: '/v1/basic/storeUser/findListByLinkMobile',
  findList: '/v1/basic/storeUser/findList'
};

export const storeRole = {
  findList: '/v1/basic/storeRole/findList',
  delete: '/v1/basic/storeRole/delete'
};
// 商品信息和商品分类信息
export const goods = {
  findGoodsColorList: '/v1/product/productColor/findList',
  findListByStoreCode: '/v1/product/productColor/findListByStoreCode',
  // 商品颜色方法
  findGoodsColorPage: '/v1/product/productColor/findPage',
  saveGoodColor: '/v1/product/productColor/save',
  updateGoodColor: 'v1/product/productColor/update',

  // 商品尺寸方法
  findGoodsSizePage: '/v1/product/productSize/findPage',
  saveGoodSize: '/v1/product/productSize/save',
  updateGoodSize: 'v1/product/productSize/update',
  productSizeFindList: '/v1/product/productSize/findList',

  // 商品分类方法
  findChildProductClass: '/v1/product/productClass/findChildProductClass',
  productClassFindList: '/v1/product/productClass/findList',
  productClassFindPage: '/v1/product/productClass/findPage',
  updateproductClass: '/v1/product/productClass/update',
  GetMaxClassCode: '/v1/product/productClass/getMaxClassCode',

  productFindPage: '/v1/product/product/findPage',
  productClassDel: '/v1/product/productClass/delete',
  productClassSave: '/v1/product/productClass/save',
  imgUrlUpLoad: '/v1/product/product/product/uploadImage',
  findClassColorList: '/v1/product/productClass/findClassColorList',// 根据分类编号查询颜色集合
  findClassSizeList: '/v1/product/productClass/findClassSizeList',// 根据分类编号查询尺码集合

  productBarcodeUpdate: '/v1/product/productBarcode/update',// 添加商品条形码
  productBarcodeFindPage: '/v1/product/productBarcode/findPage',// 分页查询商品条形码集合

  productColorDel: '/v1/product/productColor/delete',// 删除商品颜色
  productSizeDel: '/v1/product/productSize/delete' // 删除商品尺码
};
// 权限设置
export const jurisdiction = {
  findAllMenu: '/v1/basic/storeMenu/findAllMenu',
  roleSave: 'v1/basic/storeRole/save',
  roleUpdate: '/v1/basic/storeRole/update',
  roleFindPage: '/v1/basic/storeRole/findPage',
  userSave: '/v1/basic/storeUser/save',
  userModfiySave: '/v1/basic/storeUser/update',
  userPassWord: '/v1/basic/storeUser/updatePasswd',
  userFindPage: '/v1/basic/storeUser/findPage',
  userDelete: '/v1/basic/storeUser/delete' // 删除门店用户
}
// Product Controller
export const product = {
  findPage: '/v1/product/product/findPage',
  update: '/v1/product/product/update',
  save: '/v1/product/product/save',
  batchDeleteByIds: '/v1/product/product/batchDeleteByIds',
  findList: '/v1/product/product/findList',
  importExcel: '/v1/product/product/importExcel',
  tmplDownload: '/v1/product/product/download',
  exportExcel: '/v1/product/product/exportExcel'
}
// 商品包装条码API : Product Pack Controller
export const productPack = {
  'delete': '/v1/product/productPack/delete', // 删除商品包装条码
  'findList': '/v1/product/productPack/findList', // 查询商品包装条码集合
  'getId': '/v1/product/productPack/get', // 根据id查询商品包装条码
  'findPage': '/v1/product/productPack/findPage', // 分页查询商品包装条码集合
  'save': '/v1/product/productPack/save', // 添加商品包装条码信息
  'update': '/v1/product/productPack/update' // 修改商品包装条码
}
// 库存管理
export const stock = {
  stockWareHouseList: '/v1/stock/depot/find/list',
  stockWareHouseSave: '/v1/stock/depot/save',
  stockWareHouseTreeList: '/v1/stock/depot/find/treeList',
  stockWareHouseUpdata: '/v1/stock/depot/update',
  stockAlarm: '/v1/stock/alarm/find/',
  stockAlarmList: '/v1/stock/alarm/find/alarmList',
  stockWareHouseDelete: '/v1/stock/depot/delete/' // 根据主键删除库房信息
}
// 数据报表
export const order = {
  orderFlow: '/v1/order/report/flow',
  orderFlowToal: '/v1/order/report/flowTotal',
  orderRanking: '/v1/order/report/goodsSaleRanking',
  orderRankingTotal: '/v1/order/report/goodsSaleRankingTotal',
  orderClassRanking: '/v1/order/report/goodsClassSaleRanking',
  orderClassRankingTotal: '/v1/order/report/goodsClassSaleRankingTotal',
  orderDetail: '/v1/order/report/detail',
  orderDetailTotal: '/v1/order/report/detailTotal',
  orderFlowAbnormal: '/v1/order/report/flowAbnormal',
  orderFlowAbnormalToal: '/v1/order/report/flowAbnormalToal',
  orderOperateStatistics: '/v1/retail/statistics/find/operateStatistics',
  orderPayModeStatistics: '/v1/retail/statistics/find/payModeStatistics',
  todayPayMode: '/v1/order/report/todayPayMode',
  todaySale: '/v1/order/report/todaySale',
  sale7Total: '/v1/order/report/sale7Total',
  exportFlowExcel: '/v1/order/report/exportFlowExcel',
  exportGoodsClassSaleRankingExcel: '/v1/order/report/exportGoodsClassSaleRankingExcel',
  exportGoodsSaleRankingExcel: '/v1/order/report/exportGoodsSaleRankingExcel',
  exportOrderDetailExcel: '/v1/order/report/exportOrderDetailExcel',
  exportAbnormalExcel: '/v1/order/report/exportAbnormalExcel',
  exportOperateStatisticsExcel: '/v1/retail/statistics/exportOperateStatisticsExcel',
  exportPayModeExcel: '/v1/retail/statistics/exportPayModeExcel',
  openCardCount: '/v1/card/record/open/count'
}
// Pay Mode Controller
export const payMode = {
  findPage: '/v1/basic/payMode/findPage',
  save: '/v1/basic/payMode/save',
  update: '/v1/basic/payMode/update',
  delete: '/v1/basic/payMode/delete'
}
// Machine Controller
export const machine = {
  findPage: '/v1/basic/machine/findPage',
  save: '/v1/basic/machine/save',
  update: '/v1/basic/machine/update',
  delete: '/v1/basic/machine/delete',
  balanceFlag: '/v1/basic/balanceFlag/findPage',
  balanceFlagSave: '/v1/basic/balanceFlag/save',
  balanceFlagUpdate: '/v1/basic/balanceFlag/update'
}

// 退货API : Stock Return Controller
export const stockReturn = {
  findList: '/v1/stock/return/find/list',
  findCount: '/v1/stock/return/find/count',
  save: '/v1/stock/return/save',
  update: '/v1/stock/return/update',
  detailList: '/v1/stock/return/find/detail/list',
  deleteOrder: '/v1/stock/return/delete/order'
};
// 供应商API : Supplier Controller
export const stockSupplier = {
  findList: '/v1/stock/supplier/find/list',
  findCount: '/v1/stock/supplier/find/count',
  save: '/v1/stock/supplier/save',
  update: '/v1/stock/supplier/update',
  delete: '/v1/stock/supplier/delete'
};

// 采购API : Stock Purchase Controller
export const stockPurchase = {
  findList: '/v1/stock/purchase/find/list',
  findCount: '/v1/stock/purchase/find/count',
  save: '/v1/stock/purchase/save',
  update: '/v1/stock/purchase/update',
  detailList: '/v1/stock/purchase/find/detail/list',
  deleteOrder: '/v1/stock/purchase/delete/order'
};

// 盘点API : Stock Check Controller
export const stockCheck = {
  findList: '/v1/stock/check/find/list',
  findCount: '/v1/stock/check/find/count',
  save: '/v1/stock/check/save',
  update: '/v1/stock/check/update',
  detailList: '/v1/stock/check/find/detail/list',
  deleteOrder: '/v1/stock/check/delete/order'
};
// 领用API : Stock Draw Controller
export const stockDraw = {
  findList: '/v1/stock/draw/find/list',
  findCount: '/v1/stock/draw/find/count',
  save: '/v1/stock/draw/save',
  update: '/v1/stock/draw/update',
  detailList: '/v1/stock/draw/find/detail/list',
  deleteOrder: '/v1/stock/draw/delete/order'
};
// 报损API : Stock Scrap Controller
export const stockScrap = {
  findList: '/v1/stock/scrap/find/list',
  findCount: '/v1/stock/scrap/find/count',
  save: '/v1/stock/scrap/save',
  update: '/v1/stock/scrap/update',
  detailList: '/v1/stock/scrap/find/detail/list',
  deleteOrder: '/v1/stock/scrap/delete/order'
};
// 调拨API : Stock Allocation Controller
export const stockAllocation = {
  findList: '/v1/stock/allocation/find/list',
  findCount: '/v1/stock/allocation/find/count',
  save: '/v1/stock/allocation/save',
  update: '/v1/stock/allocation/update',
  detailList: '/v1/stock/allocation/find/detail/list',
  deleteOrder: '/v1/stock/allocation/delete/order'
};
// 库存报表
export const inventory = {
  stockLogList: '/v1/stock/stockLog/find/list',
  stockApiList: '/v1/stock/productStock/find/list',
  stockCount: '/v1/stock/stockLog/find/count',
  stockApiCount: '/v1/stock/productStock/find/count',
  orderLogExport: '/v1/stock/stockLog/exportStockLogExcel',
  orderStockExport: '/v1/stock/productStock/exportProductStockExcel'
}
// 支付参数配置API : Config Controller
export const payConfig = {
  aliFind: '/v1/pay/config/ali/pay/find', // 查询门店支付宝支付参数
  aliSave: '/v1/pay/config/ali/pay/save', // 保存支付宝支付参数
  gaodaFind: '/v1/pay/config/gaoda/pay/find', // 查询门店码上赢支付参数
  gaodaSave: '/v1/pay/config/gaoda/pay/save', // 保存码上赢支付参数
  saobeiFind: '/v1/pay/config/saobei/pay/find', // 查询门店扫呗支付参数
  saobeiSave: '/v1/pay/config/saobei/pay/save', // 保存扫呗支付参数
  treasureFind: '/v1/pay/config/treasure/pay/find', // 查询门店会员宝支付参数
  treasureSave: '/v1/pay/config/treasure/pay/save', // 保存会员宝支付参数
  wechatFind: '/v1/pay/config/wechat/pay/find', // 查询门店微信支付参数
  wechatSave: '/v1/pay/config/wechat/pay/save' // 保存微信支付参数
};
// 支付渠道API : Pay Channel Controller
export const payChannel = {
  channelFind: '/v1/pay/channel/find', // 查询门店支付渠道
  channelSave: '/v1/pay/channel/save' // 保存或修改支付渠道参数
};
// 商品库存API : Product Stock Controller
export const stockProduct = {
  findCount: '/v1/stock/productStock/find/count', // 根据条件查询商品库存数量
  findList: '/v1/stock/productStock/find/list' // 根据条件查询商品库存
};
// 首页数据接口
export const homeCount = {
  newVip: '/v1/card/record/open/count'
};
