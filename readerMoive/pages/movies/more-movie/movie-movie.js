// pages/movies/more-movie/movie-movie.js
Page({
  data: {
    navigationTitle: ''
  },
  onLoad: function (options) {
    var category = options.category;
    this.data.navigationTitle = category;
    console.log(category);
  },
  // 动态设置导航栏标题
  onReady: function (options) {
    wx.setNavigationBarTitle({
      title: this.data.navigationTitle,
      success: function (res) {

      }
    })
  }
})