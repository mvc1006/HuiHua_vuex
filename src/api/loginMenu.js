import axios from '@/libs/api.request';
import {
  storeInfo,
  homeCount
} from './resetApi';
/**
 * 登录权限
 * @param {*} roleId
 */
export const loginMenu = (roleId) => {
  return axios.request({
    url: storeInfo.loginMenu,
    method: 'GET',
    params: {
      roleId
    }
  });
};
/**
 *
 * @param {*} params
 */
export const newVip = params => {
  return axios.request({
    url: homeCount.newVip,
    // url:'http://192.168.1.114:8091/v1/card/record/open/count',
    method: 'POST',
    params: params
  });
}

/**
 * 获取门店信息
 * @param {*} storeCode
 */
export const menuInfo = (storeCode) => {
  return axios.request({
    url: storeInfo.menuInfo,
    method: 'GET',
    params: {
      storeCode
    }
  });
};

/**
 * 保存门店信息
 * @param {*} params {
  "address": "string",
  "agent": "string",
  "agentBalance": 0,
  "area": "string",
  "businessTime": "string",
  "bussinessType": 0,
  "city": "string",
  "expDatetime": "2019-01-31T06:09:01.950Z",
  "id": 0,
  "introduction": "string",
  "latitude": 0,
  "linkEmail": "string",
  "linkMobile": "string",
  "linkName": "string",
  "linkPhone": "string",
  "loginName": "string",
  "loginPassword": "string",
  "longitude": 0,
  "openFlag": 0,
  "province": "string",
  "remark": "string",
  "status": 0,
  "storeCode": "string",
  "storeName": "string",
  "token": "string",
  "version": "string"
 */
export const saveMenuInfo = params => {
  return axios.request({
    url: storeInfo.saveMenuInfo,
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const menuInfoKey = params => {
  return axios.request({
    url: storeInfo.menuInfoKey,
    method: 'GET',
    params: params
  })
}

/**
 * 获取参数设置
 * @param {*}
 */
export const storeSet = () => {
  return axios.request({
    url: storeInfo.storeSet,
    method: 'GET'
  });
};

/**
 * 保存参数设置
 * @param {*}
 */
export const storeSave = params => {
  return axios.request({
    url: storeInfo.storeSave,
    method: 'post',
    data: params
  });
};
