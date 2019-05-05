import axios from '@/libs/api.request';
import { storeUser , jurisdiction } from './resetApi';

/**
 * 根据注册门店手机号查询用户列表
 * @param {*} linkMobile
 */
export const storeUserFindListByLinkMobile = (linkMobile) => {
  return axios.request({
    url: storeUser.findListByLinkMobile,
    method: 'get',
    params: {
      linkMobile
    }
  })
};
/**
 * 查询门店用户列表
 * @param {*} id
 */
export const storeUserFindList = (storeCode) => {
  return axios.request({
    url: storeUser.findList,
    method: 'get',
    params: {
      storeCode
    }
  })
};
/**
 * 新增用户
 * @param {*} params {
  "createBy": "string",
  "roleId": 角色ID,
  "userLoginName": "string",
  "userPassword": "string",
  "userStatus": 用户状态 1正常 0禁用
 }
 */

export const userSave = params => {
  return axios.request({
    url: jurisdiction.userSave,
    method: 'post',
    data: params
  });
};
/**
 * 修改用户
 * @param {*} params {
  "createBy": "string",
  "roleId": 角色ID,
  "userLoginName": "string",
  "userPassword": "string",
  "userStatus": 用户状态 1正常 0禁用
 }
 */

export const userModfiySave = params => {
  return axios.request({
    url: jurisdiction.userModfiySave,
    method: 'post',
    data: params
  });
};
/**
 * 修改用户密码
 * @param {*}  params id,password
 */

export const userPassWord = params => {
  return axios.request({
    url: jurisdiction.userPassWord,
    method: 'post',
    params: params
  });
};
/**
 * 分页查询
 * @param {*} params {
  "fastQuery": "string",
  "page": 0,
  "pageSize": 0,
  "storeCode": "string"
 }
 */

export const userFindPage = params => {
  return axios.request({
    url: jurisdiction.userFindPage,
    method: 'post',
    data: params
  });
};

export const userDelete = (id) => {
  return axios.request({
    url: jurisdiction.userDelete,
    method: 'GET',
    params: id
  })
}
