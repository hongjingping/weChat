var util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    containerShow: true,
    searchPanelShow: false,
    searchResult: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters' + '?start=0&count=3';
    var comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon' + '?start=0&count=3';
    var top250Url = app.globalData.doubanBase + '/v2/movie/top250' + '?start=0&count=3';
    this.getMovieListData(inTheatersUrl, 'inTheaters', '正在热映');
    this.getMovieListData(comingSoonUrl, 'comingSoon', '即将上映');
    this.getMovieListData(top250Url, 'top250', '豆瓣top250');
  },
  // 更多电影页面
  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/movie-movie?category=' + category,
    })
  },
  // 电影详情页面
  onMovieTap: function ( event ) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: "more-detail/movie-detail?id=" + movieId,
    })
  },
  getMovieListData: function (url, settedKey, cagetoryTitle) {
    let _this = this;
    // 调用豆瓣接口
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Content-Type': "application/xml"
      },
      success: function (res) {
        if (res.data.subjects.length != 0 ) {
          _this.processDoubanData(res.data, settedKey, cagetoryTitle)
        } else {
          console.log('亲爱的用户，该文案目前没有对应的电影哦，请查看其他的电影~')
        }
      },
      fail: function (res) {
        console.log(res)
      },
      complate: function (res) {
        console.log(res)
      }
    })
  },

  OnCancelImgTap: function (options) {
    this.setData({
      containerShow: true,
      searchPanelShow: false
    })
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true,
    })
  },

  onBindBlur: function (event) {
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + '/v2/movie/search?q=' + text;
    this.getMovieListData(searchUrl, 'searchResult', '');
  },

  processDoubanData: function (moviesDouban, settedKey, cagetoryTitle) {
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
    // 如何知道是那个类型的电影(用JS动态属性解决)
    var readyData = {};
    readyData[settedKey] = {
      cagetoryTitle: cagetoryTitle,
      movies: movies
    };
    _this.setData(readyData)
  }
})