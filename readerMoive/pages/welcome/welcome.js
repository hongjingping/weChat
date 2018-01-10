Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  
  // 事件冒泡
  onTap: function () {
    wx.redirectTo({
      url: '../post/post',  
    })
  }
})