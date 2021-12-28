import http from "../../assets/js/http"
// 可选导入的包
import common from "../../assets/js/common.js"
import utils from "../../assets/js/utils"
import requestApi from "../../assets/js/requestApi.js"

Page(Object.assign({}, http, utils, common, {
  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    sms: "",
    userType: "",
    show: false,
    status: "发送验证码",
    disabled: false,
    waitTimer: false,
    errorMsg: {
      phone: "手机号码不能为空",
      sms: "验证码不能为空",
      userType: "用户类型不能为空",
    },
    columns: [{
        type: 1,
        text: '在职职工'
      },
      {
        type: 2,
        text: '退休职工'
      },
      {
        type: 3,
        text: '职工家属'
      },
      {
        type: 4,
        text: '管理员'
      },
    ],
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
  sendCode() {
    http.post(requestApi.sendCode, {
      phone: this.data.phone
    }).then(res => {
      if (res.data.code == 200) {
        this.setData({
          sms: res.data.result
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
  // 提交
  submit() {
    let msg = ""
    switch ("") {
      case this.data.userType:
        msg = this.data.errorMsg['userType']
        break;
      case this.data.phone:
        msg = this.data.errorMsg['phone']
        break;
      case this.data.sms:
        msg = this.data.errorMsg['sms']
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
      login()

    }
  },
  /**
   * 立即预约
   * @param {*} options 
   */
  login() {
    http.post(requestApi.login, {
      "code": this.data.sms,
      "phone": this.data.phone
    }).then(res => {
      if (res.data.code == 200) {
        wx.reLaunch({
          url: '../my/index'
        })
        wx.setStorageSync("token", res.data.result.token)
        wx.setStorageSync("userCode", res.data.result.userCode)
        wx.setStorageSync("userData", {
          "name": this.data.username,
          "phone": this.data.phone,
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

  handleChangeUserType() {
    this.setData({
      show: true
    })
  },

  onCancel() {
    this.setData({
      show: false
    })
  },
  onConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      userType: this.data.columns[index].type,
      userTypeName: this.data.columns[index].text
    })
    this.onCancel()

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