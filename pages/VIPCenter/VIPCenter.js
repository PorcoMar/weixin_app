// pages/personal/userInfo/userInfo.js
var app = getApp();
var HOST = app.globalData.HOST;
Page({
  data:{

  },
  onLoad:function(options){
    //获取用户信息
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var that = this;
    wx.getStorage({
      key:"HEADER",
      success:function(res){
        //获取用户信息
        getApp().globalData.HEADER = res.data;
        wx.request({
          url:HOST + "/user/info",
          method:"POST",
          header:res.data,
          success:function(res){

          }
        });
      }
    })

    
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },


})