import axios from '@/libs/api.request';
import {
  storeInfo
} from './resetApi';
/**
 * 登录门店
 * @param {*} params id,password
 */
export const storeInfoLoginStore = params => {
  return axios.request({
    url: storeInfo.loginStore,
    method: 'post',
    params: params
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
