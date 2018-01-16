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
    method: 'POST',
    header: { 
      'Content-Type': 'application/xml' 
    },
    success: function (res) {
      callBack(res.data)
    },
    fail: function (res) {
      console.log(res)
    }
  })
}

// 将后端返回的用/拼接
function covertToCastString(casts) {
  var castsjoin = "";
  for ( var idx in casts ) {
    castsjoin = castsjoin + casts[idx].name + '/'
  }
  return castsjoin.substring(0, castsjoin.length-2);
}

function covertToCastInfos (casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : '',
      name: casts[idx].name
    }
    castsArray.push(cast)
  }
  return castsArray;
}

module.exports = {
  covertToStarsArray: covertToStarsArray,
  http: http,
  covertToCastString: covertToCastString,
  covertToCastInfos: covertToCastInfos
}