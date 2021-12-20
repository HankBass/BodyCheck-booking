// pages/booking/addPage/index.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    list: ['a', 'b', 'c'],
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
    activeNames: ['1'],
  },
  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },
  handleTipsClick(){
    Dialog.alert({
      message: '弹窗内容',
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
    if(e.currentTarget.dataset.index === "0"){
      wx.navigateTo({
        url: '../selectTime/selectTime'
      })
    }else{
      wx.navigateTo({
        url: '../pay/pay'
      })
    }
    
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