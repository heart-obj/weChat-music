//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '音乐播放器',
    imgUrls: [
      './img/1509030.jpg',
      './img/1515000.jpg',
      './img/1515403.jpg',
      './img/1520124.jpg',
      './img/1520134.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular: true,
    classifyMusic: [
      {
        imgSrc: './img/track_radio_199_12_8.jpg',
        text: '热门'
      },
      {
        imgSrc: './img/20190709165132.jpg',
        text: '流行'
      },
      {
        imgSrc: './img/T005R600x600M000002CJKAY1LKpcz.jpg',
        text: '摇滚'
      },
      {
        imgSrc: './img/T006R300x300M000004bFmjW2PXSqF.jpg',
        text: '民谣'
      },
      {
        imgSrc: './img/20190709163624.jpg',
        text: '古风'
      },
      {
        imgSrc: './img/20190709164419.jpg',
        text: '伤感'
      },
      {
        imgSrc: './img/20190709165236.jpg',
        text: '轻音乐'
      },
      {
        imgSrc: './img/20190709165324.jpg',
        text: '经典'
      }
    ]
  }
})
