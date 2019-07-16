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
    playSure: false,
    innerAudioContext: null
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
          _this.data.innerAudioContext.src = _this.data.playMusicData.music
          if (index != 0) {
            _this.data.innerAudioContext.stop()
            _this.data.innerAudioContext.onStop(() => {
              console.log('停止成功')
            })
            _this.data.innerAudioContext.offCanplay()
            _this.playMusicFunc()
          }
        }
      })
    }
  },
  // 播放音乐
  playMusicFunc () {
    const _this = this
    _this.data.innerAudioContext.play()
    _this.data.innerAudioContext.onPlay(() => {
      console.log('播放成功')
    })
    _this.data.innerAudioContext.onError((err) => {
      console.log(err)
    })
    _this.data.innerAudioContext.onEnded(() => {
      _this.setData({
        playSure: false
      })
    })
    _this.setData({
      playSure: true
    })
  },
  pauseMusicFunc () {
    const _this = this
    _this.data.innerAudioContext.pause()
    _this.data.innerAudioContext.onPause(() => {
      console.log('暂停成功')
    })
    _this.setData({
      playSure: false
    })
  },
  onLoad (options) {
    this.getMusicData()
    this.setData({
      innerAudioContext: wx.createInnerAudioContext()
    })
  }
})
