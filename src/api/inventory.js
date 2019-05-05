import axios from '@/libs/api.request'
import {
  inventory
} from './resetApi';

/**
 * 库存报表追踪
 * @param {*} params
 */

export const inventoryLog = params => {
  return axios.request({
    url: inventory.stockLogList,
    method: 'post',
    data: params
  })
};
/**
 * 库存报表统计
 * @param {*} params
 */
export const inventoryApi = params => {
  return axios.request({
    url: inventory.stockApiList,
    method: 'post',
    data: params
  })
}
/**
 * 根据条件查询商品库存
 * @param {*} params
 */
export const inventoryCount = params => {
  return axios.request({
    url: inventory.stockCount,
    method: 'post',
    data: params
  })
}
/**
 * 根据条件查询商品库存数量
 * @param {*} params
 */
export const stockApiCount = params => {
  return axios.request({
    url: inventory.stockApiCount,
    method: 'post',
    data: params
  })
}
/**
 * 导出库存追踪
 * @param {*} data
 */
export const orderLogExport = (data) => {
  return axios.request({
    url: inventory.orderLogExport,
    method: 'post',
    responseType: 'blob',
    data: data
  })
};

/**
 * 导出库存统计
 * @param {*} data
 */
export const orderStockExport = (data) => {
  return axios.request({
    url: inventory.orderStockExport,
    method: 'post',
    responseType: 'blob',
    data: data
  })
};
