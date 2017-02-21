// pages/personal/twoBarCode/twoBarCode.js
var app = getApp();
var HOST = app.globalData.HOST;
Page({
  data:{
    wxInfo:null,
    userInfo:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    this.setData({wxInfo:app.globalData.wxInfo});
    wx.request({
      url:HOST + "/user/info",
      method:"POST",
      header:app.globalData.HEADER,
      success:function(res){
        if(res.data.code == "0"){
          that.setData({userInfo:res.data.result});
        }
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})