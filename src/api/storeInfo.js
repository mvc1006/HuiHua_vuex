import axios from '@/libs/api.request';
import {
  storeInfo
} from './resetApi';
/**
 * 登录门店
 * @param {*} params id,password
 */
export const storeInfoLogin = params => {
  return axios.request({
    url: storeInfo.login,
    method: 'post',
    params: params
  });
};

/**
 * 注册门店
 * @param {*} params {
  "address": "string",
  "area": "string",
  "bussinessType": 0,
  "city": "string",
  "introduction": "string",
  "linkEmail": "string",
  "linkMobile": "string",
  "linkName": "string",
  "linkPhone": "string",
  "loginPassword": "string",
  "province": "string",
  "remark": "string",
  "storeName": "string"
   }
 */
export const storeInfoRegister = params => {
  return axios.request({
    url: storeInfo.register,
    method: 'post',
    data: params
  });
};

/**
 * 登录门店
 * @param {*} params id,password
 */
export const storeInfoLoginStore = params => {
  return axios.request({
    url: storeInfo.loginStore,
    method: 'post',
    data: params
  });
};

/**
 * 退出登录
 * @param {*}
 */
export const storeInfoLogout = () => {
  return axios.request({
    url: storeInfo.logout,
    method: 'get'
  })
};

/**
 *
 * @param {*} params
 */

export const getVerifyCode = params => {
  return axios.request({
    url: storeInfo.getVerifyCode,
    method: 'get',
    params: params
  })
}

/**
 * 发送验证码
 * @param {*}params {phone:'',code:''}
 */
export const verifyCode = params => {
  return axios.request({
    url: storeInfo.verifyCode,
    method: 'post',
    data: params
  })
};
