// pages/booking/baseInfo/baseInfo.js
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
    type: "身份证",
    typeNum: "",
    username: "",
    phone: "",
    sms: "",
    status: "发送验证码",
    disabled: false,
    waitTimer: false,
    errorMsg: {
      typeNum: "证件号码不能为空",
      username: "姓名不能为空",
      phone: "手机号码不能为空",
      sms: "验证码不能为空",
    }
  },
  // 发送验证码
  send() {
    if (this.data.waitTimer > 0) {
      return false;
    }
    if (!this.data.phone) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (!/^1\d{10}$/.test(this.data.phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 1500
      })
      return false;
    }

    this.data.waitTimer = 59;
    let that = this;
    let timerInterval = setInterval(function () {
      if (that.data.waitTimer > 0) {
        that.setData({
          status: that.data.waitTimer + 's后获取',
          disabled: true
        })
        that.data.waitTimer--
      } else if (that.data.waitTimer === 0) {
        that.setData({
          status: '重新获取',
          disabled: false,
        })
        clearInterval(timerInterval);
      } else if (that.data.waitTimer) {
        that.setData({
          status: '获取验证码',
          disabled: true
        })
        clearInterval(timerInterval);
      }
    }, 1000);
    
    this.sendCode()
  },
  sendCode(){
    http.post(requestApi.sendCode,{phone: this.data.phone}).then(res=>{
      if(res.data.code == 200){
        this.setData({
          sms: res.data.result
        })
      }else{
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 1500
        })
      }
      
    })
  },
  // 提交
  submit() {
    let msg = ""
    switch ("") {
      case this.data.username:
        msg = this.data.errorMsg['username']
        break;
      case this.data.phone:
        msg = this.data.errorMsg['phone']
        break;
      case this.data.sms:
        msg = this.data.errorMsg['sms']
        break;
      case this.data.typeNum:
        msg = this.data.errorMsg['typeNum']
        break;
      default:
        break;
    }
    if (msg) {
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 1500
      })
    } else {
      const age = utils.getAge(this.data.typeNum)
      const sex = utils.getSex(this.data.typeNum)
      http.post(requestApi.login, {
        "code": this.data.sms,
        "phone": this.data.phone
      }).then((res) =>{
        if(res.data.code == 200){
          this.bookingNow(age,sex)
          wx.setStorageSync('token', res.data.result.token)
          wx.setStorageSync('userCode', res.data.result.userCode)
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500
          })
        }
      })
     
    }

  },
  /**
   * 立即预约
   * @param {*} options 
   */
  bookingNow(age,sex){
    http.post(requestApi.order,{
      "cardNo": this.data.typeNum,
      "code": this.data.sms,
      "name": this.data.username,
      "phone": this.data.phone}).then(res=>{
        if(res.data.code == 200){
          wx.navigateTo({
            url: `../packageDetail/packageDetail?age=${age}&gender=${sex.val}&projectType=0`
          })
          wx.setStorageSync("bookingData",{
            "cardNo": this.data.typeNum,
            "name": this.data.username,
            "phone": this.data.phone})
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
}))
