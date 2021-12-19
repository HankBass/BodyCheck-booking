// pages/booking/pay/pay.js
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
    infoList:[
      {name:"name",label:'体检人',value:"张三"},
      {name:"phone",label:'手机号',value:"张三张三张三张三张三张三"},
      {name:"name",label:'身份证号',value:"张三"},
      {name:"name",label:'预约时间',value:"张三"},
      {name:"name",label:'预约地点',value:"张三张三张三张三张三张三张三张三张三张三张三张三张三"},
    ]
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