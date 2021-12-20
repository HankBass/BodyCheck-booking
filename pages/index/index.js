// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    list:[
      {image:"image1",title1:"在职员工",title2:"预约通道"},
      {image:"image2",title1:"退休员工",title2:"预约通道"},
      {image:"image3",title1:"职工家属",title2:"预约通道"},
      {image:"image4",title1:"管理人员",title2:"后台通道"},
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },
 
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goPage(e){
    if(e.currentTarget.dataset.index < 3){
      wx.navigateTo({
        url: '../booking/baseInfo/baseInfo'
      })
    }
  },
  onLoad() {
   
  },
 
})
