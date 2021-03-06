// var util = require('../../../utils/util.js');
import {Movie} from 'class/Movie.js'
var app = getApp();
Page({
  data: {
    movie: {}
  },
  // es6: module, class, promise, =>
  onLoad: function (options) {
    // let _this = this;
    var movieId = options.id;
    var url = app.globalData.doubanBase + '/v2/movie/subject/' + movieId;
    // util.http( url, this.processDoubanData);
    var movie = new Movie(url)
    // 异步
    // movie.getMovieData(function (movie) {
    //   _this.setData({
    //     movie: movie
    //   })
    // })
    // 使用箭头函数
    movie.getMovieData( (movie) => {
      this.setData({
        movie: movie
      })
    })
  },
  // processDoubanData: function (data) {
    // if (!data) {
    //   return;
    // }
    // var director = {
    //   avatar: '',
    //   name: '',
    //   id: ''
    // }
    // if ( data.directors[0] != null) {
    //   if (data.directors[0].avatars != null) {
    //     director.avatar = data.directors[0].avatars.large
    //   }
    //   director.name = data.directors[0].name;
    //   director.id = data.directors[0].id;
    // }
    // var movie = {
    //   movieImg: data.images ? data.images.large : '',
    //   country: data.countries[0],
    //   titie: data.title,
    //   originalTitle: data.original_title,
    //   wishCount: data.wish_count,
    //   commentCount: data.comments_count,
    //   year: data.year,
    //   generes: data.genres.join('、'),
    //   stars: util.covertToStarsArray(data.rating.stars),
    //   score: data.rating.average,
    //   director: director,
    //   casts: util.covertToCastString(data.casts),
    //   castsInfo: util.covertToCastInfos(data.casts),
    //   summary: data.summary
    // }
    // console.log(movie)
    // this.setData({
    //   movie: movie
    // })
  // },
  // 查看图片
  viewMoviePostImg: function (event) {
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src], // 需要预览图片的http链接
    })
  }
})