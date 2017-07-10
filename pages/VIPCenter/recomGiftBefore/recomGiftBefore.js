var app = getApp();
var HOST = app.globalData.HOST;
Page({
  data: {
    wxInfo: null,
    userInfo: null
  },
  onLoad: function (options) {
    wx.setStorage({
      key: "firstIn",
      data: true
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  toAfter:function(){
    wx.navigateTo({
      url: '/pages/VIPCenter/recomGiftAfter/recomGiftAfter',
    })
  }
})