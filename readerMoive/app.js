// 应用程序生命周期
App({
  globalData: {
    // 音乐是否播放标识
    g_isPlayingMusic: false,
    // 当前播放音乐标识
    g_currentMusicPostId: null, 
    // 接口前缀
    doubanBase: 'https://api.douban.com'
  },
  onLaunch: function (options) {
    // 调用API从本地获取场景值
    console.log(options)
  }
})

