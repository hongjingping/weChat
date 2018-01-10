let postsData = require('../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 小程序总是会读取data对象来做数据绑定，这个动作我们叫做A
    // 而这个动作A的执行，是在onLoad事件执行之后发生的
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      post_content: postsData.posts_list
    })
  },

  onPostTap: function (event) {
    // 获取postId
    let postId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?postId=' + postId,
    })
  },

  onSwiperItemTap: function (event) {
    // 获取postId
    let postId = event.currentTarget.dataset.postid
    // wx.navigateTo({
    //   url: 'post-detail/post-detail?postId=' + postId,
    // })
  },

  // 事件冒泡~
  onSwiperTap: function (event) {
    // target和currentTarget的区别，target指的是当前点击的组件，currentTarget指的是事件捕获的组件
    let postId = event.target.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?postId=' + postId,
    })
  }
})