import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getOrgMenu = () => {
  return axios.request({
    url: 'get_org_menu',
    method: 'get'
  })
}

export const getGoodsColorData = () => {
  return axios.request({
    url: 'get_goodsColor_data',
    method: 'get'
  })
}
// 左侧菜单
// export const menuUrl = () => {
//   return axios.request({  // 这里返回的是一个Promise，request方法传入一个配置对象
//     url: 'http://192.168.1.170:8091/v1/store/storeMenu/findListByRoleId',
//     params:{
//       roleId:'160'
//     },
//     headres:{
//        "Content-Type":'application/json'
//     },
//     method: 'get'
//   })
// }
