import axios from '@/libs/api.request'
import { product,productPack } from './resetApi';

/*
  分页查询商品信息
  @param {
  "classCode": "string",
  "fastQuery": "string",
  "page": 0,
  "pageSize": 0,
  "storeCode": "string"
}
*/
export const productFindPage = (params) => {
  return axios.request({
    url: product.findPage,
    method: 'post',
    data: params
  })
};
export const productFindList = (params) => {
  return axios.request({
    url: product.findList,
    method: 'post',
    data: params
  })
};

export const productUpdate = (params) => {
  return axios.request({
    url: product.update,
    method: 'post',
    data: params
  })
};

export const productSave = (params) => {
  return axios.request({
    url: product.save,
    method: 'post',
    data: params
  })
};
export const producBatchDeleteByIds = (params) => {
  return axios.request({
    url: product.batchDeleteByIds,
    method: 'post',
    data: params
  })
};
export const productTmplDownload = () => {
  return axios.request({
    url: product.tmplDownload,
    method: 'get',
    responseType: 'blob'
  })
};

export const productExportExcel = (data) => {
  return axios.request({
    url: product.exportExcel,
    method: 'post',
    responseType: 'blob',
    data: data
  })
};
// 商品包装条码API : Product Pack Controller
export const productPackFindPage = (params) => {
  return axios.request({
    url: productPack.findPage,
    method: 'post',
    data: params
  })
};
export const productPackSave = (params) => {
  return axios.request({
    url: productPack.save,
    method: 'post',
    data: params
  })
};
export const productPackUpdate = (params) => {
  return axios.request({
    url: productPack.update,
    method: 'post',
    data: params
  })
};
export const productPackDelete = (params) => {
  return axios.request({
    url: productPack.delete,
    method: 'get',
    params: params
  })
};
