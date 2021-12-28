// pages/booking/addPage/index.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
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
    checked: true,
    list: [],
    singleList:[],
    singleResult:[],
    result:[],
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
    activeNames: ['1'],
  },
  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },
  handleTipsClick(data){
    console.log("77777",data.currentTarget.dataset.mean)
    Dialog.alert({
      // message: data.currentTarget.dataset.mean,
      message: "临床意义",
      theme: 'round-button',
    }).then(() => {
      // on close
    });
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  goPage(e){
   
      wx.navigateTo({
        url: '../selectTime/selectTime'
      })
    
    
  },
  /**
   * 选择自选套餐
   * @param {*} options 
   */
  noop1(data){
    console.log(66666,data)
    let arr = data.detail
    this.setData({
      result: arr
    })
    console.log(555,arr)
    if(arr.length > 0){
      let optionalPackages = []
      let totalPrice = 0
      let optionalPackagesNum = []
      arr.forEach(element => {
        optionalPackages.push(this.data.list[element])
        totalPrice += this.data.list[element].discountPrice
        optionalPackagesNum.push(this.data.list[element].num)
      })
      console.log(678,optionalPackages)
      let bookingData = wx.getStorageSync("bookingData")
      bookingData.optionalPackages = optionalPackages
      bookingData.totalPrice = totalPrice
      bookingData.optionalPackagesNum = optionalPackagesNum
      wx.setStorageSync("bookingData",bookingData)
      console.log(8888,wx.getStorageSync("bookingData"))
    }
  },
  /* 选择自选单选项目
  * @param {*} options 
  */
 noop2(data){
   console.log(676767,data)
   let arr = data.detail
   this.setData({
    singleResult: arr
   })
   console.log(555,arr)
   if(arr.length > 0){
     let singleList = []
     let totalPrice = 0
     let singleListNum = []
     arr.forEach(element => {
       singleList.push(this.data.singleList[element])
       singleListNum.push(this.data.singleList[element].num)
       totalPrice += this.data.singleList[element].discountPrice
     })
     console.log(678,singleList)
     let bookingData = wx.getStorageSync("bookingData")
     bookingData.singleList = singleList
     bookingData.singleTotalPrice = totalPrice
     bookingData.singleListNum = singleListNum
     wx.setStorageSync("bookingData",bookingData)
     console.log(8888,wx.getStorageSync("bookingData"))
   }
 },
  /**
   * 获取自选套餐项目
   * @param {*} options 
   */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let bookingData = wx.getStorageSync("bookingData")
    let {ageSection,gender} = bookingData
    // 获取自选套餐
    this.getDatas(requestApi.optionalPackage,{ageSection,
      gender,
      projectType: 1},(res)=>{
        this.setData({
          list: res.data.result
        })
      })
    // 获取自选单项
    this.getDatas(requestApi.comboList,{ageSection:3,
      gender:2,
      projectType: 2},(res)=>{
        this.setData({
          singleList: res.data.result
        })
      })
  },
  /**
   * 获取数据
   */
  getDatas(url,options,callback){
    http.get(url, options).then(res =>{
      console.log(77777999,res)
      if(res.data.code == 200){
        callback(res)
      }
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