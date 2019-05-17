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
    data: params
  });
};

/**
 * 导航菜单
 * @param {*}
 */
export const loginMenu = params => {
  return axios.request({
    url: storeInfo.loginMenu,
    method: 'post',
    data: params
  });
};

/**
 * 树结构导航菜单
 * @param {*}
 */
export const loginStoreMenu = params => {
  return axios.request({
    url: storeInfo.loginStoreMenu,
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
