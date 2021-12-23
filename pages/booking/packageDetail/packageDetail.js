// pages/booking/packageDetail/packageDetail.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
import http from "../../../assets/js/http"
// 可选导入的包
import common from "../../../assets/js/common.js"
import utils from "../../../assets/js/utils"
import requestApi from "../../../assets/js/requestApi.js"
Page(Object.assign({}, http, utils, common, {

  /**
   * 页面的初始数据
   */
  data: {

  },
  handleTipsClick() {
    Dialog.alert({
      message: '弹窗内容',
      theme: 'round-button',
    }).then(() => {
      // on close
    });
  },
  goPage() {
    wx.navigateTo({
      url: '../selectTime/selectTime'
    })
  },
  initComboData(age,gender) {
    http.get(requestApi.comboList, {
      ageSection: age,
      gender: gender,
      projectType: 0, // 基础套餐
    }).then(res =>{

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {age , sex} = options 
    this.initComboData(age , sex)
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
}))