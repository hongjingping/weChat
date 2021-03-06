// pages/movies/more-movie/movie-movie.js
var util = require('../../../utils/util.js')
var app = getApp()
Page({
  data: {
    movies: {},
    navigationTitle: '',
    requestUrl: '',
    totalCount: 0,
    isEmpty: true
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
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData)
  },
  // 上拉加载更多
  // onScrollLower: function (options) {
  //   var nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20';
  //   util.http(nextUrl, this.processDoubanData)
  //   // 显示loading
  //   wx.showNavigationBarLoading()
  // },
  onReachBottom: function (options) {
    var nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20';
    util.http(nextUrl, this.processDoubanData)
    // 显示loading
    wx.showNavigationBarLoading()
  },
  // 下拉刷新
  onPullDownRefresh: function (options) {
    let _this = this;
    var refreshUrl = _this.data.requestUrl + '?start=0&count=20';
    _this.data.movies = {};
    _this.data.isEmpty = true;
    util.http(refreshUrl, _this.processDoubanData)
    wx.showNavigationBarLoading()
  },
  // 电影详情页面
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: "../more-detail/movie-detail?id=" + movieId,
    })
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
    var totalMovies = {};
    // 如果要绑定新加载的数据，就要和旧的数据结合在一起
    if (!_this.data.isEmpty) {
      totalMovies = _this.data.movies.concat(movies)
    } else {
      totalMovies = movies;
      _this.data.isEmpty = false;
    }
    _this.setData({
      movies: totalMovies
    })
    _this.data.totalCount += 20;
    // 隐藏loading
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
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