//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '我的',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  }
})
