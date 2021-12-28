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
    active:'all',
    orderList:[
      {name:"广东医科大学-男-体检分类套餐A",status:"已预约",price:"1000",bookingData:{person:"张三",time:"2021-12-06",address:"广东医科大学"}},
      {name:"广东医科大学-男-体检分类套餐A",status:"已预约",price:"1000"},
      {name:"广东医科大学-男-体检分类套餐A",status:"已预约",price:"1000"},
      {name:"广东医科大学-男-体检分类套餐A",status:"已预约",price:"1000"},
      {name:"广东医科大学-男-体检分类套餐A",status:"已预约",price:"1000"},
      {name:"广东医科大学-男-体检分类套餐A",status:"已预约",price:"1000"},
      {name:"广东医科大学-男-体检分类套餐A",status:"已预约",price:"1000"},
    ],
    orderList: [
      {
        "age": 0,
        "ageSection": 0,
        "bcPackageOptionVOList": [
          {
            "bcPackageOptionMessageList": [
              {
                "discountPrice": 0,
                "mean": "",
                "name": "",
                "price": 0
              }
            ],
            "num": "",
            "numName": "广东医科大学-男-体检分类套餐A",
            "projectType": 0
          }
        ],
        "cardNo": "",
        "orderMoney": 1000,
        "orderNum": "",
        "orderStatus": 0,
        "payTime": "",
        "payType": 0,
        "phone": "",
        "price": 0,
        "refundNum": "",
        "refundTime": "",
        "remark": "",
        "sex": 0,
        "subscribePlace": "广东医科大学",
        "subscribeTime": "2021-12-25",
        "userCode": "",
        "userName": "xiao"
      }
    ],
    // orderStatus:{all:"",toPay:0,toCheck:2,refund:3},
    orderStatus:{all:"",0:"待付款",1:"已取消",2:"待体检",3:"退款"}
  },
  /**
   * 获取订单数据
   * @param {orderStatus,userCode} options 
   */
  getOrderData(data){
    http.get(requestApi.order, data).then((res) =>{

    })
  },
  onChange(data){
    this.setData({
      active:data.detail.name
    })
    let options = null
    if(this.data.active === "all"){
      options = {userCode: app.globalData.userCode}
    }else{
      options = {orderStatus: this.data.active,userCode: app.globalData.userCode}
    }
    this.getOrderData(options)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      active:options.active
    })
    let data = null
    if(this.data.active === "all"){
      data = {userCode: app.globalData.userCode}
    }else{
      data = {orderStatus: this.data.active,userCode: app.globalData.userCode}
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
  handleGoDetail(){
    wx.navigateTo({
      url: '../detail/index'
    })
  }
})