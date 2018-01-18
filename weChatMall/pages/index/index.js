Page({
  data: {
    reload: '加载中',
    angle: 0
  },
  onLoad: function (options) {
  
  },
  onReady: function (options) {
    let _this = this;
    setTimeout(function () {
      _this.setData({
        reload: ''
      })
    }, 2000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  }
})