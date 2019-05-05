import axios from '@/libs/api.request';
import { cashier } from './resetApi';
/**
 * 查询全部收款员
 * @param {*} storeCode
 */
export const cashierFindList = (storeCode) => {
  return axios.request({
    url: cashier.findList,
    method: 'get',
    params: {
      storeCode
    }
  })
};
/**
 * 获取当前可用的收款员编号
 * @param {*}
 */
export const cashierGetMaxCashierCode = () => {
  return axios.request({
    url: cashier.getMaxCashierCode,
    method: 'get'
  })
};
/**
 * 删除收款员
 * @param {*} params {id:''}
 */
export const cashierDelete = (params) => {
  return axios.request({
    url: cashier.delete,
    method: 'get',
    params: params
  })
};
/**
 * 添加收款员
 * @param {*} params {
  "cashierCode": "string",
  "cashierName": "string",
  "cashierPwd": "string",
  "changePrice": 0,
  "give": 0,
  "id": 0,
  "maxDiscountyh": 0,
  "memberCard": 0,
  "minDiscount": 0,
  "repeatReport": 0,
  "report": 0,
  "retreat": 0,
  "signing": 0,
  "storeCode": "string"
}
 */
export const cashierSave = params => {
  return axios.request({
    url: cashier.save,
    method: 'post',
    data: params
  });
};
/**
 * 修改收款员
 * @param {*} params {
  "cashierName": "string",
  "changePrice": 0,
  "give": 0,
  "id": 0,
  "maxDiscountyh": 0,
  "memberCard": 0,
  "minDiscount": 0,
  "repeatReport": 0,
  "report": 0,
  "retreat": 0,
  "signing": 0,
}
 */
export const cashierUpdate = params => {
  return axios.request({
    url: cashier.update,
    method: 'post',
    data: params
  });
};
/**
 * 修改收款员密码
 * @param {*} params id,password
 */
export const cashierUpdatePasswd = params => {
  return axios.request({
    url: cashier.updatePasswd,
    method: 'post',
    data: params
  });
};
export const cashierFindPage = params => {
  return axios.request({
    url: cashier.findPage,
    method: 'post',
    data: params
  });
};
/**
 * 交接班记录
 * @param {*} params {
  "beginTime": "string",
  "endTime": "string"
  "machineCode": "string",
  "cashierCode": "string",
  "page": 0,
  "pageSize": 0,
  "storeCode": "string"}
 */
export const cashierOrderFind = params => {
  return axios.request({
    url: cashier.orderFind,
    method: 'post',
    data: params
  })
};
/**
 * 导出实收统计报表
 * @param {*} data
 */
export const cashierExportAbnormalExcel = (data) => {
  return axios.request({
    url: cashier.exportAbnormalExcel,
    method: 'post',
    responseType: 'blob',
    data: data
  })
};
