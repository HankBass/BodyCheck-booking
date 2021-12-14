// pages/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[
      {image:"image1",label:"全部订单",icon:"orders-o",bgColor:'#FCF6F6',color:"#8C8484" ,type:"all"},
      {image:"image2",label:"待付款",icon:"balance-pay",bgColor:'#FCF7F1',color:"#8C8484",type:"toPay" },
      {image:"image3",label:"待体检",icon:"guide-o",bgColor:'#FAF7EB',color:"#8C8484",type:"toCheck"  },
      {image:"image4",label:"退款",icon:"balance-o",bgColor:'#FFF7EE',color:"#8C8484",type:"refund"  },
    ],
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

  },
  handleGoList(event){
    const currentTarget = event.currentTarget.dataset.item
    wx.navigateTo({
      url: `../list/index?active=${currentTarget.type}`,
    })
  }
})