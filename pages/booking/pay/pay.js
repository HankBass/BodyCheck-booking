// pages/booking/pay/pay.js
import http from "../../../assets/js/http"
// 可选导入的包
import common from "../../../assets/js/common.js"
import utils from "../../../assets/js/utils"
import requestApi from "../../../assets/js/requestApi.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: '选择加项',
      },
      {
        text: '选择时间',
      },
      {
        text: '确认信息',
      },
    ],
    totalPrice:0
  },
  pay(){
    let bookingData = wx.getStorageSync('bookingData')
    let userCode = wx.getStorageSync('userCode')
    let projectIds = bookingData.optionalPackagesNum.concat(bookingData.singleListNum)
    let remark = bookingData.address
    let subscribeDate = bookingData.time.replaceAll("-","")
    let options = {payType:0,userCode,projectIds,remark,subscribeDate}
    http.post(requestApi.placeOrder,options).then(res=>{
      console.log(888999,res)
      if(res.data.code == 200){

      }else{
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let bookingData = wx.getStorageSync("bookingData")
    let totalPrice = bookingData.basePackageDiscountPrice + bookingData.totalPrice + bookingData.singleTotalPrice
    this.setData({
      infoList: bookingData,
      totalPrice: totalPrice.toFixed(2)
    })

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

  }
})