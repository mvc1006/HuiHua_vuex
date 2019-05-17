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
 * 退出登录
 * @param {*}
 */
export const storeInfoLogout = () => {
  return axios.request({
    url: storeInfo.logout,
    method: 'get'
  })
};

// CompanySaveDto {
//   companyName (string, optional): 企业名称 ,
//   province (string, optional): 省份 ,
//   city (string, optional): 市区 ,
//   businessLicense (string, optional): 营业执照图片路径 ,
//   linkMobile (string, optional): 联系人电话 ,
//   linkName (string, optional): 联系人名称 ,
//   pass (string, optional): 登录密码 ,
//   vercode (string, optional): 注册验证码
//   }
// 注册
export const storeInfoRegister = params => {
  return axios.request({
    url: storeInfo.register,
    method: 'post',
    data: params
  });
};
// 获取图形验证码
/**
* @param {*} params
*/

export const getVerifyCode = () => {
  return axios.request({
    url: storeInfo.getVerifyCode,
    method: 'get'
  })
}
/**
* 发送验证码
* @param {*}ata {phone:'',code:''}
*/
export const verifyCode = params => {
  return axios.request({
    url: storeInfo.verifyCode,
    method: 'post',
    data: params
  })
};
