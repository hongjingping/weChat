var postsData = require('../../../data/posts-data.js')
var app = getApp()
Page({
  data: {
    isPlayingMusic: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 接受post.js中传过来的postId
    var postId = options.postId;
    this.data.currentPostId = postId;
    var posts_collected = postsData.posts_list[postId];
    this.setData({
      postData: posts_collected
    })
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected,
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected)
    }
    // 读取app中的变量，判断是否需要播放音乐
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId ) {
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setAudioMonitor()
  },
  // 收藏功能与取消收藏
  onCollectionTap: function (event) {
    // 同步调用
    this.getPostsCollectedSyc();
    // 异步调用
    // this.getPostsCollectedAsy();
  },
  
  setAudioMonitor: function () {
    // 监听音乐启动事件
    var _this = this;
    wx.onBackgroundAudioPlay(function () {
      _this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true
      app.globalData.g_currentMusicPostId = _this.data.currentPostId
    })
    // 监听音乐暂停事件
    wx.onBackgroundAudioPause(function () {
      _this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    })
  },

  // 异步方法
  getPostsCollectedAsy: function () {
    let _this = this;
    wx.getStorage({
      key: "posts_collected",
      success: function (res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[_this.data.currentPostId];
        // 收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[_this.data.currentPostId] = postCollected;
        // this.showModal(postsCollected, postCollected);
        // 收藏功能比较小直接用showToast即可
        _this.showToast(postsCollected, postCollected);
      }
    });
  },
  // 同步方法-如果某一个方法执行很慢的话，会影响后面的方法的执行
  getPostsCollectedSyc: function () {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    // 收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    // this.showModal(postsCollected, postCollected);
    // 收藏功能比较小直接用showToast即可
    this.showToast(postsCollected, postCollected);
  },
  showModal: function (postsCollected, postCollected) {
    var _this = this;
    wx.showModal({
      title: '收藏',
      content: postCollected?'收藏该文章?':'取消收藏该文章?',
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          // 更新文章是否收藏的缓存值
          wx.setStorageSync('posts_collected', postsCollected);
          // 更新数据绑定变量，从而实现切换图片
          _this.setData({
            collected: postCollected,
          })
        }
      }
    })
  },
  showToast: function (postsCollected, postCollected) {
    var _this = this;
    // 更新文章是否收藏的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    // 更新数据绑定变量，从而实现切换图片
    _this.setData({
      collected: postCollected,
    })
    wx.showToast({
      title: postCollected?"收藏成功":"取消成功",
      duration: 1000,
      icon: 'success'
    })
  },
  onShareTap: function (event) {
    let itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        // res.cancel 用户是否点击了取消
        // res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: "用户" + itemList[res.tapIndex],
          content: "用户是否取消？"+res.cancel+"现在无法实现分享功能，什么时候能支持呢？"
        })
      }
    })
  },
  // 播放音乐-音乐播放开启后不会自动关闭，需要手动暂停和播放
  onMusicTap: function (event) {
    var currentPostId = this.data.currentPostId
    var postData = postsData.posts_list[currentPostId]
    var isPlayingMusic = this.data.isPlayingMusic
    if (isPlayingMusic) {
      // 暂停
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic : false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }
})