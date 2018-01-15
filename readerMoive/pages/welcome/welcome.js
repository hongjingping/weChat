Page({
  onTap: function () {
    // switchTab只能跳转到带有tab的页面，其他的页面不行
    wx.switchTab({
      url: '../post/post',  
    })
  }
})