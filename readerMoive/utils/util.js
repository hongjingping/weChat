function covertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i =1; i <= 5; i++) {
    if ( i < num ) {
      array.push(1);
    } else {
      array.push(0)
    }
  }
  return array;
}

// 调接口
function http(url, callBack) {
  // 调用豆瓣接口
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'Content-Type': "application/xml"
    },
    success: function (res) {
      callBack(res.data)
    },
    fail: function (res) {
      console.log(res)
    }
  })
}
module.exports = {
  covertToStarsArray: covertToStarsArray,
  http: http
}