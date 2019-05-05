import axios from '@/libs/api.request';
import {
  stock,
  stockReturn,
  stockSupplier,
  stockPurchase,
  stockCheck,
  stockDraw,
  stockScrap,
  stockAllocation,
  stockProduct
} from './resetApi';
// stock start
/**
 * 默认展示库存信息树结构
 * @param {*} params {
  "depotCode": "string",
  "depotName": "string",
  "level": 0,
  "page": 0,
  "pageSize": 0,
  "pid": 0,
  "storeCode": "string"}
 */
export const stockWareHouseTreeList = params => {
  return axios.request({
    url: stock.stockWareHouseTreeList,
    method: 'post',
    data: params
  })
};

/**
 * 查询库房所有信息
 * @param {*} params {
  "depotCode": "string",
  "depotName": "string"}
 */
export const stockWareHouseList = params => {
  return axios.request({
    url: stock.stockWareHouseList,
    method: 'post',
    data: params
  })
};

/**
 * 新增库存
 * @param {*} params {
  "depotName": "string",
  "level": 0,
  "pid": 0,
  "remarks": "string",
  "storeCode": "string"}
 */
export const stockWareHouseSave = params => {
  return axios.request({
    url: stock.stockWareHouseSave,
    method: 'post',
    data: params
  })
};

/**
 * 修改库存
 * @param {*} params {
  "depotName": "string",
  "id": 0,
  "remarks": "string"}
 */
export const stockWareHouseUpdata = params => {
  return axios.request({
    url: stock.stockWareHouseUpdata,
    method: 'post',
    data: params
  })
};

/**
 * 删除库房
 * @param {*} params {*}
 */
export const stockWareHouseDelete = (id) => {
  return axios.request({
    url: stock.stockWareHouseDelete + '/' + id,
    method: 'GET'
  })
};

// stock end
// stockReturn start
/**
 * 查询商品退货订单列表
 * @param {*} params {
  "page": 0,
  "pageSize": 0,
  "payModel": 0,
  "recordPerson": "string",
  "returnPerson": "string",
  "returnStatus": 0,
  "storeCode": "string",
  "supplierId": 0
}
 */
export const stockReturnFindList = params => {
  return axios.request({
    url: stockReturn.findList,
    method: 'post',
    data: params
  });
};

/**
 * 查询商品退货订单数量
 * @param {*} params {
  "page": 0,
  "pageSize": 0,
  "payModel": 0,
  "recordPerson": "string",
  "returnPerson": "string",
  "returnStatus": 0,
  "storeCode": "string",
  "supplierId": 0
}
 */
export const stockReturnFindCount = params => {
  return axios.request({
    url: stockReturn.findCount,
    method: 'post',
    data: params
  });
};

export const stockReturnSave = params => {
  return axios.request({
    url: stockReturn.save,
    method: 'post',
    data: params
  });
};
export const stockReturnUpdate = params => {
  return axios.request({
    url: stockReturn.update,
    method: 'post',
    data: params
  });
};
export const stockReturnDetailList = (params) => {
  return axios.request({
    url: stockReturn.detailList,
    method: 'get',
    params: params
  })
};
export const stockReturnDeleteOrder = (params) => {
  return axios.request({
    url: stockReturn.deleteOrder,
    method: 'get',
    params: params
  })
};
// stockReturn end
// stockSupplier start
/**
 * 根据条件查询代理商信息
 * @param {*} params {
  contactName (string, optional): 联系人姓名 ,
  page (integer, optional): 当前页数 ,
  pageSize (integer, optional): 每页数量 ,
  shortName (string, optional): 简称 ,
  status (integer, optional): 状态 0-禁用；1-正常 ,
  storeCode (string, optional): 门店编号 ,
  supplierName (string, optional): 供应商名称 ,
  telNo (string, optional): 电话
  }
 */
export const stockSupplierFindList = params => {
  return axios.request({
    url: stockSupplier.findList,
    method: 'post',
    data: params
  });
};
/**
 * 根据条件查询代理商数量
 * @param {*} params {
  address (string, optional): 地址 ,
  contactName (string, optional): 联系人姓名 ,
  remark (string, optional): 备注 ,
  shortName (string, optional): 简称 ,
  storeCode (string, optional): 门店编号 ,
  supplierName (string, optional): 供应商名称 ,
  telNo (string, optional): 电话
  }
 */
export const stockSupplierFindCount = params => {
  return axios.request({
    url: stockSupplier.findCount,
    method: 'post',
    data: params
  });
};
/**
 * 保存代理商信息
 * @param {*} params {
  address (string, optional): 地址 ,
  contactName (string, optional): 联系人姓名 ,
  remark (string, optional): 备注 ,
  shortName (string, optional): 简称 ,
  storeCode (string, optional): 门店编号 ,
  supplierName (string, optional): 供应商名称 ,
  telNo (string, optional): 电话
  }
 */
export const stockSupplierSave = params => {
  return axios.request({
    url: stockSupplier.save,
    method: 'post',
    data: params
  });
};
/**
 * 保存代理商信息
 * @param {*} params {
  address (string, optional): 地址 ,
  contactName (string, optional): 联系人姓名 ,
  id (integer, optional): 供应商主键标识 ,
  remark (string, optional): 备注 ,
  shortName (string, optional): 简称 ,
  storeCode (string, optional): 门店编号 ,
  supplierName (string, optional): 供应商名称 ,
  telNo (string, optional): 电话
  }
 */
export const stockSupplierUpdate = params => {
  return axios.request({
    url: stockSupplier.update,
    method: 'post',
    data: params
  });
};
export const stockSupplierDelete = (id) => {
  return axios.request({
    url: `${stockSupplier.delete}/${id}`,
    method: 'get'
  })
};
// stockSupplier end
// stockPurchase start
export const stockPurchaseFindList = params => {
  return axios.request({
    url: stockPurchase.findList,
    method: 'post',
    data: params
  });
};

export const stockPurchaseFindCount = params => {
  return axios.request({
    url: stockPurchase.findCount,
    method: 'post',
    data: params
  });
};

export const stockPurchaseSave = params => {
  return axios.request({
    url: stockPurchase.save,
    method: 'post',
    data: params
  });
};
export const stockPurchaseUpdate = params => {
  return axios.request({
    url: stockPurchase.update,
    method: 'post',
    data: params
  });
};
export const stockPurchaseDetailList = (params) => {
  return axios.request({
    url: stockPurchase.detailList,
    method: 'get',
    params: params
  })
};
export const stockPurchaseDeleteOrder = (params) => {
  return axios.request({
    url: stockPurchase.deleteOrder,
    method: 'get',
    params: params
  })
};
// stockPurchase end
// stockCheck start
export const stockCheckFindList = params => {
  return axios.request({
    url: stockCheck.findList,
    method: 'post',
    data: params
  });
};

export const stockCheckFindCount = params => {
  return axios.request({
    url: stockCheck.findCount,
    method: 'post',
    data: params
  });
};

export const stockCheckSave = params => {
  return axios.request({
    url: stockCheck.save,
    method: 'post',
    data: params
  });
};
export const stockCheckUpdate = params => {
  return axios.request({
    url: stockCheck.update,
    method: 'post',
    data: params
  });
};
export const stockCheckDetailList = (params) => {
  return axios.request({
    url: stockCheck.detailList,
    method: 'get',
    params: params
  })
};
export const stockCheckDeleteOrder = (params) => {
  return axios.request({
    url: stockCheck.deleteOrder,
    method: 'get',
    params: params
  })
};
// stockCheck end
// stockDraw start
export const stockDrawFindList = params => {
  return axios.request({
    url: stockDraw.findList,
    method: 'post',
    data: params
  });
};

export const stockDrawFindCount = params => {
  return axios.request({
    url: stockDraw.findCount,
    method: 'post',
    data: params
  });
};

export const stockDrawSave = params => {
  return axios.request({
    url: stockDraw.save,
    method: 'post',
    data: params
  });
};
export const stockDrawUpdate = params => {
  return axios.request({
    url: stockDraw.update,
    method: 'post',
    data: params
  });
};
export const stockDrawDetailList = (params) => {
  return axios.request({
    url: stockDraw.detailList,
    method: 'get',
    params: params
  })
};
export const stockDrawDeleteOrder = (params) => {
  return axios.request({
    url: stockDraw.deleteOrder,
    method: 'get',
    params: params
  })
};
// stockDraw end
// stockScrap start
export const stockScrapFindList = params => {
  return axios.request({
    url: stockScrap.findList,
    method: 'post',
    data: params
  });
};

export const stockScrapFindCount = params => {
  return axios.request({
    url: stockScrap.findCount,
    method: 'post',
    data: params
  });
};

export const stockScrapSave = params => {
  return axios.request({
    url: stockScrap.save,
    method: 'post',
    data: params
  });
};
export const stockScrapUpdate = params => {
  return axios.request({
    url: stockScrap.update,
    method: 'post',
    data: params
  });
};
export const stockScrapDetailList = (params) => {
  return axios.request({
    url: stockScrap.detailList,
    method: 'get',
    params: params
  })
};
export const stockScrapDeleteOrder = (params) => {
  return axios.request({
    url: stockScrap.deleteOrder,
    method: 'get',
    params: params
  })
};
// stockScrap end
// stockAllocation start
export const stockAllocationFindList = params => {
  return axios.request({
    url: stockAllocation.findList,
    method: 'post',
    data: params
  });
};

export const stockAllocationFindCount = params => {
  return axios.request({
    url: stockAllocation.findCount,
    method: 'post',
    data: params
  });
};

export const stockAllocationSave = params => {
  return axios.request({
    url: stockAllocation.save,
    method: 'post',
    data: params
  });
};
export const stockAllocationUpdate = params => {
  return axios.request({
    url: stockAllocation.update,
    method: 'post',
    data: params
  });
};
export const stockAllocationDetailList = (params) => {
  return axios.request({
    url: stockAllocation.detailList,
    method: 'get',
    params: params
  })
};
export const stockAllocationDeleteOrder = (params) => {
  return axios.request({
    url: stockAllocation.deleteOrder,
    method: 'get',
    params: params
  })
};
// stockAllocation end
// stockProduct start
export const stockProductFindList = params => {
  return axios.request({
    url: stockProduct.findList,
    method: 'post',
    data: params
  });
};

export const stockProductFindCount = params => {
  return axios.request({
    url: stockProduct.findCount,
    method: 'post',
    data: params
  });
};

export const stockAlarm = (params) => {
  return axios.request({
    url: stock.stockAlarm + params.storeCode + '/' + params.productCode,
    method: 'get'
  })
}

export const stockAlarmList = params => {
  return axios.request({
    url: stock.stockAlarmList,
    method: 'post',
    data: params
  });
}

// stockProduct end
