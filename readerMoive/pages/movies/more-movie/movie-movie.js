// pages/movies/more-movie/movie-movie.js
var util = require('../../../utils/util.js')
var app = getApp()
Page({
  data: {
    movies: {},
    navigationTitle: ''
  },
  onLoad: function (options) {
    var category = options.category;
    this.data.navigationTitle = category;
    var dataUrl = '';
    switch (category) {
      case '正在热映': dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters' 
      break;
      case '即将上映': dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon'
      break;
      case '豆瓣top250': dataUrl = app.globalData.doubanBase + '/v2/movie/top250'
      break;
    }
    util.http(dataUrl, this.processDoubanData)
  },
  // 处理数据
  processDoubanData: function (moviesDouban) {
    let _this = this;
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        stars: util.covertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    _this.setData({
      movies: movies
    })
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