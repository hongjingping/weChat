var util = require('../../../utils/util.js');
var app = getApp();
Page({
  data: {
    movie: {}
  },
  onLoad: function (options) {
    var movieId = options.id;
    var url = app.globalData.doubanBase + '/v2/movie/subject/' + movieId;
    util.http( url, this.processDoubanData);
  },
  processDoubanData: function (data) {
    if (!data) {
      return;
    }
    var director = {
      avatar: '',
      name: '',
      id: ''
    }
    if ( data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var movie = {
      movieImg: data.images ? data.images.large : '',
      country: data.countries[0],
      titie: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join('、'),
      stars: util.covertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.covertToCastString(data.casts),
      castsInfo: util.covertToCastInfos(data.casts),
      summary: data.summary
    }
    console.log(movie)
    this.setData({
      movie: movie
    })

  }
})