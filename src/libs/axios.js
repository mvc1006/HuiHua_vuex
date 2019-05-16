import axios from 'axios'
import store from '@/store'
import { Message } from 'iview';
import $config from '@/config/index';
import router from '../router/index';
import {
  storeInfo
} from '@/api/resetApi';
// import storage from '@/libs/storage';
// const addErrorLog = errorInfo => {
//   const {
//     statusText,
//     status,
//     request: {
//       responseURL
//     }
//   } = errorInfo
//   let info = {
//     type: 'ajax',
//     code: status,
//     mes: statusText,
//     url: responseURL
//   }
//   if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
// }
axios.defaults.withCredentials = true

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      if (config.url.indexOf(storeInfo.loginStore) == -1) {
        console.log("store",store)
        config.headers['authorization'] = store.state.user.token;
        config.headers['companyNo'] = store.state.user.companyNo;
      }
      config.headers['device'] = $config.device;
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const {
        data,
        status
      } = res
      if (res.config.url.indexOf('loginStore') > -1) {
        store.dispatch('setAuthorization', res.headers.authorization);
        // store.dispatch('setAuthorization', 'retail');
        // console.log(res.headers.authorization,'res.headers.authorization');
        // console.log(res.headers,'res.headers');
      }
      if (data && data.code && data.code == 401) {
        if (res.config.url.indexOf(storeInfo.logout) > -1) {
          goLogin();
        } else {
          store.dispatch('handleLogOut').then(() => {
            goLogin();
          });
        }
      }
      if (data && data.code && data.code == 204) {
        data.message = '暂无数据';
      }
      return {
        data,
        status
      }
    }, error => {
      console.log(url,'url');
      let nowUr = url;
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        try {
          const {
            request: {
              statusText,
              status
            },
            config
          } = JSON.parse(JSON.stringify(error))
          errorInfo = {
            statusText,
            status,
            request: {
              responseURL: config.url
            }
          }
        } catch (error) {
          store.dispatch('handleLogOut').then(() => {
            goLogin();
          });
        }
      }
      Message.destroy();
      if (errorInfo.status == 401) {
        if (nowUr.indexOf(storeInfo.logout) > -1) {
          goLogin();
        } else {
          store.dispatch('handleLogOut').then(() => {
            goLogin();
          });
        }
      } else if (errorInfo.status == 404) {
        Message.error({
          content: decodeURIComponent($config.errorMessage),
          duration: 10,
          onClose: () => {
            window.Loading && window.Loading.close();
            Message.destroy();
          }
        });
      } else if (errorInfo.status == undefined) {
        Message.error({
          content: decodeURIComponent($config.errorNetwork),
          duration: 10,
          onClose: () => {
            window.Loading && window.Loading.close();
            Message.destroy();
          }
        });
      } else if (errorInfo.status == 400) {
        console.log(errorInfo,'errorInfo');
        if (errorInfo.data && errorInfo.data.message) {
          Message.error({
            content: errorInfo.data.message,
            duration: 10,
            onClose: () => {
              window.Loading && window.Loading.close();
              Message.destroy();
            }
          });
        } else {
          Message.error({
            content: '服务器内部错1111误',
            duration: 10,
            onClose: () => {
              window.Loading && window.Loading.close();
              Message.destroy();
            }
          });
        }
      } else if (errorInfo.status == 500) {
        console.log(errorInfo,'errorInfo');
        if (errorInfo.data && errorInfo.data.message) {
          Message.error({
            content: errorInfo.data.message,
            duration: 10,
            onClose: () => {
              window.Loading && window.Loading.close();
              Message.destroy();
            }
          });
        } else {
          Message.error({
            content: '服务器内部错误',
            duration: 10,
            onClose: () => {
              window.Loading && window.Loading.close();
              Message.destroy();
            }
          });
        }
      }
      // addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export function goLogin() {
  // if (window.location.href.indexOf('/store') > -1) {
  //   window.location.replace(window.location.origin + '/store/login');
  // } else {
  //   window.location.replace(window.location.origin + '/login');
  // }
  router.push({
    name: 'login'
  })
}
export default HttpRequest
