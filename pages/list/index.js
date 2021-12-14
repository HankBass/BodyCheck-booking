// pages/list/index.js
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
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      active:options.active
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

  },
  handleGoDetail(){
    wx.navigateTo({
      url: '../detail/index'
    })
  }
})