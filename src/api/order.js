import axios from '@/libs/api.request';
import {
  order
} from './resetApi';

/**
 * 订单报表
 * @param {*} params {
  "beginTime": "string",
  "cashierCode": "string",
  "cashierName": "string",
  "endTime": "string",
  "orderNo": "string",
  "page": 0,
  "pageSize": 0,
  "storeCode": "string"}
 */
export const orderFlow = params => {
  return axios.request({
    url: order.orderFlow,
    method: 'post',
    data: params
  })
};

/**
 * 订单报表合计
 * @param {*} params {
  "beginTime": "string",
  "cashierCode": "string",
  "cashierName": "string",
  "endTime": "string",
  "orderNo": "string",
  "page": 0,
  "pageSize": 0,
  "storeCode": "string"}
 */
export const orderFlowToal = params => {
  return axios.request({
    url: order.orderFlowToal,
    method: 'post',
    data: params
  })
};

/**
 * 商品销售排行
 * @param {*} params {
  "beginTime": "string",
  "classCode": "string",
  "colorCode": "string",
  "endTime": "string",
  "page": 0,
  "pageSize": 0,
  "sizeCode": "string",
  "storeCode": "string"}
 */
export const orderRanking = params => {
  return axios.request({
    url: order.orderRanking,
    method: 'post',
    data: params
  })
};

/**
 * 商品销售排行合计
 * @param {*} params {
  "beginTime": "string",
  "cashierCode": "string",
  "cashierName": "string",
  "endTime": "string",
  "orderNo": "string",
  "page": 0,
  "pageSize": 0,
  "storeCode": "string"}
 */
export const orderRankingTotal = params => {
  return axios.request({
    url: order.orderRankingTotal,
    method: 'post',
    data: params
  })
};

/**
 * 商品分类排行
 * @param {*} params {
  "beginTime": "string",
  "endTime": "string",
  "page": 0,
  "pageSize": 0,
  "storeCode": "string"}
 */
export const orderClassRanking = params => {
  return axios.request({
    url: order.orderClassRanking,
    method: 'post',
    data: params
  })
};

/**
 * 商品销售排行合计
 * @param {*} params {
  "beginTime": "string",
  "endTime": "string",
  "page": 0,
  "pageSize": 0,
  "storeCode": "string"}
 */
export const orderClassRankingTotal = params => {
  return axios.request({
    url: order.orderClassRankingTotal,
    method: 'post',
    data: params
  })
};

/**
 * 订单明细
 * @param {*} params {
  "beginTime": "string",
  "cashierCode": "string",
  "cashierName": "string",
  "classCode": "string",
  "colorCode": "string",
  "endTime": "string",
  "orderNo": "string",
  "page": 0,
  "pageSize": 0,
  "productBarcode": "string",
  "productCode": "string",
  "productEnglishName": "string",
  "productName": "string",
  "sizeCode": "string",
  "storeCode": "string"}
 */
export const orderDetail = params => {
  return axios.request({
    url: order.orderDetail,
    method: 'post',
    data: params
  })
};

/**
 * 商品销售排行合计
 * @param {*} params {
  "beginTime": "string",
  "cashierCode": "string",
  "cashierName": "string",
  "classCode": "string",
  "colorCode": "string",
  "endTime": "string",
  "orderNo": "string",
  "page": 0,
  "pageSize": 0,
  "productBarcode": "string",
  "productCode": "string",
  "productEnglishName": "string",
  "productName": "string",
  "sizeCode": "string",
  "storeCode": "string"
  }
 */
export const orderDetailTotal = params => {
  return axios.request({
    url: order.orderDetailTotal,
    method: 'post',
    data: params
  })
};

/**
 * 异常订单汇总
 * @param {*} params {
  "beginTime": "string",
  "cashierCode": "string",
  "cashierName": "string",
  "endTime": "string",
  "orderNo": "string",
  "page": 0,
  "pageSize": 0,
  "storeCode": "string"}
 */
export const orderFlowAbnormal = params => {
  return axios.request({
    url: order.orderFlowAbnormal,
    method: 'post',
    data: params
  })
};

/**
 * 异常订单汇总合计
 * @param {*} params {
 "beginTime": "string",
  "cashierCode": "string",
  "cashierName": "string",
  "endTime": "string",
  "orderNo": "string",
  "page": 0,
  "pageSize": 0,
  "storeCode": "string"}
 */
export const orderFlowAbnormalToal = params => {
  return axios.request({
    url: order.orderFlowAbnormalToal,
    method: 'post',
    data: params
  })
};

/**
 * 运营统计
 * @param {*} params {
  "beginTime": "string",
  "endTime": "string"}
 */
export const orderOperateStatistics = params => {
  return axios.request({
    url: order.orderOperateStatistics,
    method: 'post',
    data: params
  })
};

/**
 * 查询付款统计报表
 * @param {*} params {
  "beginTime": "string",
  "endTime": "string"}
 */
export const orderPayModeStatistics = params => {
  return axios.request({
    url: order.orderPayModeStatistics,
    method: 'post',
    data: params
  })
};
/**
 * 今日付款方式饼图
 */
export const orderTodayPayMode = () => {
  return axios.request({
    url: order.todayPayMode,
    method: 'get'
  })
};
/**
 * 近七天销售额
 */
export const orderSale7Total = () => {
  return axios.request({
    url: order.sale7Total,
    method: 'get'
  })
};
/**
 * 今日销售数据
 */
export const orderTodaySale = () => {
  return axios.request({
    url: order.todaySale,
    method: 'get'
  })
};
export const openCardCount = (data) => {
  return axios.request({
    url: order.openCardCount,
    method: 'post',
    data: data
  })
}
/**
 * 导出订单汇总统计报表
 * @param {*} data
 */
export const orderExportFlowExcel = (data) => {
  return axios.request({
    url: order.exportFlowExcel,
    method: 'post',
    responseType: 'blob',
    data: data
  })
};
/**
 * 出商品分类销售排行统计报表
 * @param {*} data
 */
export const orderExportGoodsClassSaleRankingExcel = (data) => {
  return axios.request({
    url: order.exportGoodsClassSaleRankingExcel,
    method: 'post',
    responseType: 'blob',
    data: data
  })
};
/**
 * 导出商品销售排行统计报表
 * @param {*} data
 */
export const orderExportGoodsSaleRankingExcel = (data) => {
  return axios.request({
    url: order.exportGoodsSaleRankingExcel,
    method: 'post',
    responseType: 'blob',
    data: data
  })
};
/**
 * 导出订单明细报表
 * @param {*} data
 */
export const orderExportOrderDetailExcel = (data) => {
  return axios.request({
    url: order.exportOrderDetailExcel,
    method: 'post',
    responseType: 'blob',
    data: data
  })
};
/**
 * 导出异常订单报表
 * @param {*} data
 */
export const orderExportAbnormalExcel = (data) => {
  return axios.request({
    url: order.exportAbnormalExcel,
    method: 'post',
    responseType: 'blob',
    data: data
  })
};
/**
 * 导出营运统计报表
 * @param {*} data
 */
export const orderExportOperateStatisticsExcel = (data) => {
  return axios.request({
    url: order.exportOperateStatisticsExcel,
    method: 'post',
    responseType: 'blob',
    data: data
  })
};
/**
 * 导出实收统计报表
 * @param {*} data
 */
export const orderExportPayModeExcel = (data) => {
  return axios.request({
    url: order.exportPayModeExcel,
    method: 'post',
    responseType: 'blob',
    data: data
  })
};
