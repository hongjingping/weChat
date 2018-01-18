// pages/chooseAddress/chooseAddress.js
Page({
  onChooseAddress: function (options) {
    wx.chooseAddress({
      success: function (res) {
        console.log(res)
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  },
  onOpenSetting: function ( options ) {
    wx.openSetting({
      success: (res) => {
        console.log(res)
      }
    })    
  },
  checkSession: function ( options ) {
    wx.checkSession({
      success: function () {
        console.log('success')
      },
      fail: function () {
        console.log('fail')
      }
    })
  },
  getUserInfo: function ( ) {
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          withCredentials: true,
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }
    })
  },
  starRecord: function ( options ) {
    wx.startRecord({
      success: (res) => {
        console.log(res)
      }
    })    
  },
  showShare: function ( options ) {
    wx.showShareMenu({
      success: (res) => {
        console.log(res)
      }
    })  
  },
  hideShare: function ( options ) {
    wx.hideShareMenu({
      success: (res) => {
        console.log(res)
      }
    })
  }
})