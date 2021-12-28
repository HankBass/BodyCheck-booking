/*
 * 功能：小程序仿axios的Request封装
 *
 * 创建日期：2019-12-23
 * 更新日期：2019-12-27
 */
export default class Request {
  // 配置项
  configure = {
    baseURL: '', // 请求url地址
    header: {
      'content-type': 'application/json;charset=utf-8'
    }, // header
    method: 'GET', // 请求的类型，支持get，post，put，delete等
    dataType: 'json', // 返回的数据格式，默认json
    responseType: 'text', // 响应的数据格式，默认text
    data: {}, // 传参
    timeout: 50 * 1000, // 请求超时时间
  }

  // 拦截器
  interceptors = {
    request: {
      use: (configCb) => {
        if (configCb) this.interceptors.request.before = configCb;
      },
      before: (configCb => {
        return configCb
      })
    },
    response: {
      use: (successCb, errorCb) => {
        if (successCb) this.interceptors.response.success = successCb;
        if (errorCb) this.interceptors.response.error = errorCb;
      },
      success: (successCb => successCb),
      error: (errorCb => errorCb)
    }
  }

  // 构造器
  constructor(props) {
    this.configure = Object.assign(this.configure, props)
  }

  // 提供create方法注入参数
  static create(configure = {}) {
    return new this(configure)
  }

  // 支持的http请求类型
  get(url, data = {}, header = {
    'content-type': 'application/json;charset=utf-8'
  }) {
    return this.request('GET', url, data, header);
  }
  post(url, data = {}, header = {
    'content-type': 'application/json;charset=utf-8'
  }) {
    return this.request('POST', url, data, header);
  }
  put(url, data = {}, header = {}) {
    return this.request('PUT', url, data, header);
  }
  delete(url, data = {}, header = {}) {
    return this.request('DELETE', url, data, header);
  }
  head(url, data = {}, header = {}) {
    return this.request('HEAD', url, data, header);
  }
  options(url, data = {}, header = {}) {
    return this.request('OPTIONS', url, data, header);
  }
  trace(url, data = {}, header = {}) {
    return this.request('TRACE', url, data, header);
  }
  connect(url, data = {}, header = {}) {
    return this.request('CONNECT', url, data, header);
  }
  // 判断是否传的url中带有http前缀，有则不会拼加baseUrl
  isProtocol(url) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
  }
  // request封装
  request(method = '', url = '', data = {}, header = {}) {
    // 参数配置
    url = this.isProtocol(url) ? url : this.configure.baseURL + url;
    header = {
      ...this.configure.header,
      ...header
    }
    // 设置传递的最新数据
    this.configure.data = data;
    this.configure.header = header;
    this.configure.method = method;
    // 请求拦截
    this.interceptors.request.before({
      ...this.configure
    });
    // request请求
    return new Promise((resolve, reject) => {

      wx.request({
        url: url,
        data: data,
        header: header,
        dataType: this.configure.dataType || 'json',
        responseType: this.configure.responseType || 'text',
        method: method,
        success: res => {
          // 成功拦截器回调
          if (res && res.statusCode == 200) {
            this.interceptors.response.success(res);
            resolve(res);
          } else if (res.statusCode === 401) {
            wx.showModal({
              title: '温馨提示', //提示的标题,
              content: '抱歉，微信授权失败，请重新登录后进入', //提示的内容,
              showCancel: false, //是否显示取消按钮,
              confirmText: '确定', //确定按钮的文字，默认为取消，最多 4 个字符,
              success(res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '/pages/lead/lead'
                  })
                }
              }
            });
          } else {
            // 错误拦截器回调
            this.interceptors.response.error(res);
            reject(res)
          }
        },
        fail: err => {
          // 错误拦截器回调
          this.interceptors.response.error(err);
          reject(err)
        }
      })
    })
  }
}