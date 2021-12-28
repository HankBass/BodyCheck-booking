import request from './request.js'
import env from 'requestConfig.js'
import utils from "utils.js"

// 创建request实例
const service = request.create({
  baseURL: env.API_URL,
})

// 拦截器
service.interceptors.request.use(config => {
  wx.showLoading({
    mask: true,
    title: '加载中...',
  })
  if (!utils.isNull(utils.getStorage("token"))) {
    config.header['token'] = utils.getStorage("token")
  }
  return config;
})

service.interceptors.response.use(response => {
  wx.hideLoading()
  return response;
}, error => {
  // console.log('response-error：', error);
  wx.hideLoading()
  return error;
}, config => {
  wx.hideLoading()
  // console.log('response-config：', config);
  return config;
})

export default service;