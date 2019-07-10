//index.js
import musicData from '../../static/data/musicData'
Page({
  data: {
    name: '',
    musicArr: null 
  },
  onLoad (options) {
    this.getMusicData()
  },
  getMusicData () {
    const _this = this
    wx.request({
      url: 'https://v1.itooi.cn/netease/song/newest',
      success (res) {
        console.log(res.data.data)
        _this.setData({
          musicArr: res.data.data
        })
      }
    })
  }
})