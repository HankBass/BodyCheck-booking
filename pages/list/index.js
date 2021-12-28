// pages/list/index.js
const app = getApp()

import http from "../../assets/js/http"
// 可选导入的包
import common from "../../assets/js/common.js"
import utils from "../../assets/js/utils"
import requestApi from "../../assets/js/requestApi.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 'all',
    orderList:[],
    // orderStatus:{all:"",toPay:0,toCheck:2,refund:3},
    orderStatus: {
      all: "",
      0: "待付款",
      1: "已取消",
      2: "待体检",
      3: "退款"
    }
  },
  /**
   * 获取订单数据
   * @param {orderStatus,userCode} options 
   */
  getOrderData(data) {
    http.get(requestApi.order, data).then((res) => {
      if (res.data.code == 200) {
        this.setData({
          orderList:res.data.result
        })
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  onChange(data) {
    this.setData({
      active: data.detail.name
    })
    let options = null
    if (this.data.active === "all") {
      options = {
        userCode: app.globalData.userCode
      }
    } else {
      options = {
        orderStatus: this.data.active,
        userCode: app.globalData.userCode
      }
    }
    this.getOrderData(options)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      active: options.active
    })
    let data = null
    if (this.data.active === "all") {
      data = {
        userCode: app.globalData.userCode
      }
    } else {
      data = {
        orderStatus: this.data.active,
        userCode: app.globalData.userCode
      }
    }
    this.getOrderData(data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleGoDetail(event) {
    const { item } = event.currentTarget.dataset;
    let userCode = null
    wx.getStorage({
      key: 'userCode',
      success(res) {
        userCode = res.data;
        console.log('失败了？',res.data)
        wx.navigateTo({
          url: `../detail/index?orderNum=${item.orderNum}&userCode=${userCode}`
        })

      }
    })

  }
})