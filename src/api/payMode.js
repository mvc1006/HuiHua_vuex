import axios from '@/libs/api.request'
import { payMode,payConfig,payChannel } from './resetApi';

/*
  分页查询门店支付方式
  @param {
  "page": 0,
  "pageSize": 0,
  "storeCode": "string"
}
*/
export const payModeFindPage = (params) => {
  return axios.request({
    url: payMode.findPage,
    method: 'post',
    data: params
  })
};

/**
 * 添加门店支付方式
 * @param params {
  "memberUse": 0,
  "payModeName": "string",
  "receptionUse": 0,
  "remarks": "string",
  "storeCode": "string",
  "webPay": 0
}
 */
export const payModeSave = (params) => {
  return axios.request({
    url: payMode.save,
    method: 'post',
    data: params
  })
};
/**
 * 修改门店支付方式
 * @param params {
  "id": “”,
  "memberUse": 0,
  "payModeName": "string",
  "receptionUse": 0,
  "remarks": "string",
  "storeCode": "string",
  "webPay": 0
}
 */
export const payModeUpdate = (params) => {
  return axios.request({
    url: payMode.update,
    method: 'post',
    data: params
  })
};

/**
 * 删除门店支付方式
 * @param {*} params {id:''}
 */
export const payModeDelete = (params) => {
  return axios.request({
    url: payMode.delete,
    method: 'get',
    params: params
  })
};
export const payConfigFind = (url) => {
  return axios.request({
    url: payConfig[url],
    method: 'get'
  })
};
export const payConfigSave = (url,params) => {
  return axios.request({
    url: payConfig[url],
    method: 'post',
    data: params
  })
};
export const payChannelFind = (params) => {
  return axios.request({
    url: payChannel.channelFind,
    method: 'get',
    params: params
  })
};
export const payChannelSave = (params) => {
  return axios.request({
    url: payChannel.channelSave,
    method: 'post',
    data: params
  })
};
