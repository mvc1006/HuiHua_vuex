import axios from '@/libs/api.request';
import { storeRole,jurisdiction } from './resetApi';

/**
 * 查询全部门店角色
 * @param {*} params {storeCode:''}
 */
export const storeRoleFindList = (storeCode) => {
  return axios.request({
    url: storeRole.findList,
    method: 'get',
    params: {
      storeCode
    }
  })
};
/**
 * 删除门店角色
 * @param {*} id
 */
export const storeRoleDelete = (id) => {
  return axios.request({
    url: storeRole.delete,
    method: 'get',
    params: {
      id
    }
  })
};
/**
 * 查询所有菜单
 * @param {*} allMenuId
 */
export const findAllMenu = (allMenuId) => {
  return axios.request({
    url: jurisdiction.findAllMenu,
    method: 'get',
    params: {
      allMenuId
    }
  })
};

/**
 * 添加角色
 * @param {*} params {
  "createBy": "string",
  "menuAuthen": "string",
  "roleName": "string",
  "storeCode": "string"
 }
 */

export const roleSave = params => {
  return axios.request({
    url: jurisdiction.roleSave,
    method: 'post',
    data: params
  });
};

/**
 * 修改角色
 * @param {*} params {
  "createBy": "string",
  "menuAuthen": "string",
  "roleName": "string",
  "storeCode": "string"
 }
 */

export const roleUpdate = params => {
  return axios.request({
    url: jurisdiction.roleUpdate,
    method: 'post',
    data: params
  });
};

/**
 * 查询角色
 * @param {*} params {
  "fastQuery": "string",
  "page": 0,
  "pageSize": 0,
 }
 */

export const roleFindPage = params => {
  return axios.request({
    url: jurisdiction.roleFindPage,
    method: 'post',
    data: params
  });
};
