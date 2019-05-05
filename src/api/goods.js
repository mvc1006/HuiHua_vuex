import axios from '@/libs/api.request'
import { goods } from './resetApi';

// 查询商品颜色列表--暂时没有
export const goodsColorFindList = (ProductColor) => {
  return axios.request({
    url: goods.findGoodsColorList,
    method: 'POST',
    data: ProductColor
  })
};
//
/*
  查询商品颜色列表--暂时没有
  @param {*} storeCode
*/
export const goodsColorFindListByStoreCode = (storeCode) => {
  return axios.request({
    url: goods.findListByStoreCode,
    method: 'get'
  })
};

/**
 * 分页查询商品颜色列表
 * @param {*}
 * params {
  "fastQuery": "string",
  "page": 0,
  "pageSize": 0,
  "storeCode": "string"
}
 */
export const findGoodsColorPage = (params) => {
  return axios.request({
    url: goods.findGoodsColorPage,
    method: 'POST',
    data: params
  })
};

/**
 *修改颜色信息
 * @param {*} params
 * {
  "colorCode": "string",
  "colorName": "string",
  "id": 0,
}
 */
export const updateGoodColor = (params) => {
  return axios.request({
    url: goods.updateGoodColor,
    method: 'POST',
    data: params
  })
};

//
/*
添加商品颜色列表
@param {*} params{
  "colorCode": "string",
  "colorName": "string",
  "storeCode": "string"
}
*/
export const saveGoodColor = (params) => {
  return axios.request({
    url: goods.saveGoodColor,
    method: 'POST',
    data: params
  })
};

/**
 * 分页查询商品尺寸列表
 * @param {*}
 * params {
  "fastQuery": "string",
  "page": 0,
  "pageSize": 0,
  "storeCode": "string"
}
 */
export const findGoodsSizePage = (params) => {
  return axios.request({
    url: goods.findGoodsSizePage,
    method: 'POST',
    data: params
  })
};

/**
 *修改尺寸信息
 * @param {*} params
 * {
  "SizeCode": "string",
  "SizeName": "string",
  "id": 0,
}
 */
export const updateGoodSize = (params) => {
  return axios.request({
    url: goods.updateGoodSize,
    method: 'POST',
    data: params
  })
};

//
/*
添加商品尺寸列表
@param {*} params{
  "SizeCode": "string",
  "SizeName": "string",
  "storeCode": "string"
}
*/
export const saveGoodSize = (params) => {
  return axios.request({
    url: goods.saveGoodSize,
    method: 'POST',
    data: params
  })
};

/* 查询类型分类
  params{
    pid:"String",
    storeCode:"String"
  }
*/
export const findChildProductClass = (params) => {
  return axios.request({
    url: goods.findChildProductClass,
    method: 'GET',
    params: params
  })
};

/**
 * 查询类型列表
 * @param {*} params{
 *  "fastQuery": "string",
    "page": 0,
    "pageSize": 0,
    "pid": "string",
    "storeCode": "string"
 * }
 */
export const productClassFindList = (params) => {
  return axios.request({
    url: goods.productClassFindList,
    method: 'POST',
    data: params
  })
};

/**
 * 分页查询类型列表
 * @param {*} params{
  "fastQuery": "string",
  "page": 0,
  "pageSize": 0,
  "pid": "string",
  "storeCode": "string"
  }
 */
export const productClassFindPage = (params) => {
  return axios.request({
    url: goods.productClassFindPage,
    method: 'POST',
    data: params
  })
};

/**
 * 修改商品分类
 * @param {*} params {
  "classCode": "string",
  "className": "string",
  "id": 0,
  "level": 0,
  "pid": 0,
  "storeCode": "string"
}
 */
export const updateproductClass = (params) => {
  return axios.request({
    url: goods.updateproductClass,
    method: 'POST',
    data: params
  })
};

/**
 * 分页查看商品列表
 * @param {*} params {
  "classCode": "string",
  "fastQuery": "string",
  "page": 0,
  "pageSize": 0,
  "storeCode": "string"
}
 *
 */
export const productFindPage = (params) => {
  return axios.request({
    url: goods.productFindPage,
    method: 'POST',
    data: params
  })
};

/**
 * 删除分类名称
 * @param {*} params {id:''}
 */
export const productClassDel = (params) => {
  return axios.request({
    url: goods.productClassDel,
    method: 'get',
    params: params
  })
};

/**
 * 获取最大分类名称
 * @param {*} params
 */
export const GetMaxClassCode = () => {
  return axios.request({
    url: goods.GetMaxClassCode,
    method: 'get'
  })
};

/**
 * 添加分类
 * @param {*} params
  {
  "classCode": "string",
  "className": "string",
  "id": 0,
  "level": 0,
  "pid": 0,
  "storeCode": "string"
}
 */
export const productClassSave = params => {
  return axios.request({
    url: goods.productClassSave,
    method: 'post',
    data: params
  });
};

export const productSizeFindList = params => {
  return axios.request({
    url: goods.productSizeFindList,
    method: 'post',
    data: params
  });
};

/**
 * 获取颜色
 */
export const findClassColorList = (params) => {
  return axios.request({
    url: goods.findClassColorList,
    method: 'GET',
    params: params
  });
}
/**
 * 获取尺码
 */
export const findClassSizeList = (params) => {
  return axios.request({
    url: goods.findClassSizeList,
    method: 'GET',
    params: params
  });
};

/**
 * @param {*} params
 * {
  "id": 0,
  "productBarcode": "string",
  "productCode": "string",
  "storeCode": "string"
 * }
 */
export const productBarcodeUpdate = params => {
  return axios.request({
    url: goods.productBarcodeUpdate,
    method: 'post',
    data: params
  });
};

/**
 * @param {*} params
 * {
  "id": 0,
  "productBarcode": "string",
  "productCode": "string",
  "storeCode": "string"
 * }
 */
export const productBarcodeFindPage = params => {
  return axios.request({
    url: goods.productBarcodeFindPage,
    method: 'post',
    data: params
  });
};
/**
 * 删除商品颜色
 * @param {*} params(id)
 */
export const productColorDel = (params) => {
  return axios.request({
    url: goods.productColorDel,
    method: 'GET',
    params: params
  });
}
/**
 * 删除商品尺码
 * @param {*} params(id)
 */
export const productSizeDel = (params) => {
  return axios.request({
    url: goods.productSizeDel,
    method: 'GET',
    params: params
  });
}
