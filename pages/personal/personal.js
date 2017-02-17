// pages/personal/personal.js
var app = getApp();
var HOST = app.globalData.HOST;
Page({
  data: {
    userInfo: null
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.setData({ userInfo: app.globalData.userInfo });
    console.log(this.data);
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //点击个人余额
  userBalance: function () {
    if(!app.globalData.userInfo){
      this.login();
      return;
    };
    if(app.globalData.userInfo.phone){
        wx.navigateTo({
          url: "./balance/balance"
        })
    }else{
        wx.navigateTo({
          url: "./bindPhone/bindPhone"
        })
    };
  },
  //点击个人信息
  userInfo: function () {
    if(!app.globalData.userInfo){
      this.login();
      return;
    }
    if(app.globalData.userInfo.phone){
      wx.navigateTo({
        url: "./userInfo/userInfo"
      })
    }else{
      wx.navigateTo({
        url: "./bindPhone/bindPhone"
      })
    }
    
  },
  //登录
  login: function () {
    var that = this;
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            console.log(res);
            var userInfo = JSON.parse(res.rawData);
            app.globalData.userInfo = userInfo;
            that.setData({ userInfo: userInfo });
            wx.setStorage({
              key: 'userInfo',
              data: userInfo,
              success: function(res){
                // success
                console.log("-----setStorage successed------")
              },
              fail: function() {
                // fail
                console.log("-----setStorage failed-----")
              },
              complete: function() {
                // complete
              }
            })
          },
          fail:function(){
            console.log("------login fail-------");
          }
        })
      }
    })
  },
  //绑定手机号
  bindPhone: function () {
    wx.navigateTo({
      url: './bindPhone/bindPhone'
    })
  },
  //点击二维码
  twoBarCode: function () {
    wx.navigateTo({
      url: './twoBarCode/twoBarCode'
    })
  }
})