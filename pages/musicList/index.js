//index.js
import musicData from '../../static/data/musicData'
Page({
  data: {
    name: '',
    musicArr: [],
    playMusicData: {
      music: '',
      name: '',
      img: '',
      author: ''
    },
    clickOf: true,
    playSure: false
  },
  getMusicData () {
    const _this = this
    wx.request({
      url: 'https://v1.itooi.cn/netease/song/newest',
      method: 'get',
      success (res) {
        _this.setData({
          musicArr: res.data.data
        })
        _this.getplayMusic('',0)
      }
    })
  },
  getplayMusic (event, num) {
    const _this = this
    let index = num
    if (event) {
      console.log(event)
      index = event.currentTarget.dataset.index
    }
    if (_this.data.clickOf) {
      _this.setData({
        clickOf: false
      })
      wx.request({
        url: 'https://v1.itooi.cn/netease/url',
        header: { 'Content-Type': 'json' },
        method: 'get',
        data: {
          id: _this.data.musicArr[index].id,
          quality: 'flac',
          isRedirect: 0
        },
        success(res) {
          console.log(res.data)
          _this.setData({
            playMusicData: {
              music: res.data.data,
              name: _this.data.musicArr[index].name,
              img: _this.data.musicArr[index].song.album.picUrl,
              author: _this.data.musicArr[index].song.artists[0].name
            },
            clickOf: true
          })
        }
      })
    }
  },
  playMusicFunc () {
    const _this = this
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = _this.data.playMusicData.music
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    _this.setData({
      playSure: true
    })
  },
  pauseMusicFunc () {
    const _this = this
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.onPause(() => {
      console.log('暂停播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    _this.setData({
      playSure: false
    })
  },
  onLoad (options) {
    this.getMusicData()
  }
})