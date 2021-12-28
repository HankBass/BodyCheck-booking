// pages/booking/selectTime/selectTime.js
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
        text: '选择时间',
      },
      {
        text: '选择加项',
      },
      {
        text: '确认信息',
      },
    ],
    time:"",
    address:"",
    errorMsg:{time:"请选择预约时间",address:"请输入预约地址"},
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    show: false,
   
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
      time: this.timer(event.detail,"-"),
      show:false
    });
  },
  handleTime(){
    this.setData({
      show:true
    })
  },
  onClose(){
    this.setData({
      show:false
    })
  },
  timer(timestamp,singe){ 
    let d = new Date(timestamp);    
    let date = (d.getFullYear()) + singe + (d.getMonth() + 1) + singe +(d.getDate())
    return date
  },
  oncancel(){
    this.setData({
      shouw:false
    })
  },
  goPage(){
    let msg = ""
    switch ("") {
      case this.data.time:
        msg = this.data.errorMsg['time']
        break;
      case this.data.address:
        msg = this.data.errorMsg['address']
        break;
      default:
        break;
    }
    if(msg) return
    http.post(requestApi.check,{dateStr:this.timer(this.data.currentDate,"")}).then((res) =>{
      console.log(9999,res)
      if(res.data.code == 200){
        wx.navigateTo({
          url: '../addPage/index'
        })
        let bookingData = wx.getStorageSync("bookingData")
        bookingData.address = address
        bookingData.time = time
        wx.setStorageSync("bookingData",bookingData)
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