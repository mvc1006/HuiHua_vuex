import axios from '@/libs/api.request';
import { machine } from './resetApi';

/**
 * 分页查询工作站
 * @param {*} params {
  "fastQuery": "",
  "page": 0,
  "pageSize": 10,
  "storeCode": "30000001"
}
 */
export const machineFindPage = (params) => {
  return axios.request({
    url: machine.findPage,
    method: 'post',
    data: params
  })
};

/**
 * 分页查询电子秤
 * @param {*} params {
  "page": 0,
  "pageSize": 10,
  "storeCode": "30000001"
}
 */
export const balanceFlag = (params) => {
  return axios.request({
    url: machine.balanceFlag,
    method: 'post',
    data: params
  })
};

/**
 * 添加工作站
 * @param params {
  "balancePort": "string",
  "guestledModel": "string",
  "guestledPort": "string",
  "machineCode": "string",
  "machineIp": "string",
  "machineName": "string",
  "machinePosition": "string",
  "openboxPort": "string",
  "printerModel": "string",
  "storeCode": "string"
}
 */
export const machineSave = (params) => {
  return axios.request({
    url: machine.save,
    method: 'post',
    data: params
  })
};

/**
 * 添加电子秤信息
 * @param params {
  "codeLength": 0,
  "expressAccuracy": 0,
  "expressFlag": 0,
  "expressLength": 0,
  "flagContent": "string",
  "flagLength": 0,
  "id": 0,
  "storeCode": "string"
}
 */
export const balanceFlagSave = (params) => {
  return axios.request({
    url: machine.balanceFlagSave,
    method: 'post',
    data: params
  })
};

/**
 * 修改工作站
 * @param params {
  "balancePort": "string",
  "guestledModel": "string",
  "guestledPort": "string",
  "id": 0,
  "machineCode": "string",
  "machineIp": "string",
  "machineName": "string",
  "machinePosition": "string",
  "openboxPort": "string",
  "printerModel": "string",
  "storeCode": "string"
} "webPay": 0
 */
export const machineUpdate = (params) => {
  return axios.request({
    url: machine.update,
    method: 'post',
    data: params
  })
};

/**
 * 修改电子秤信息
 * @param params {
  "codeLength": 0,
  "expressAccuracy": 0,
  "expressFlag": 0,
  "expressLength": 0,
  "flagContent": "string",
  "flagLength": 0,
  "id": 0,
  "storeCode": "string"
}
 */
export const balanceFlagUpdate = (params) => {
  return axios.request({
    url: machine.balanceFlagUpdate,
    method: 'post',
    data: params
  })
};

/**
 * 删除工作站
 * @param {*} params {id:''}
 */
export const machineDelete = (params) => {
  return axios.request({
    url: machine.delete,
    method: 'get',
    params: params
  })
};
