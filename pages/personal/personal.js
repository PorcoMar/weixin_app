// pages/personal/personal.js
var app = getApp();
var HOST = app.globalData.HOST;
Page({
  data: {
    wxInfo: null,
    userInfo:null
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
    this.setData({ wxInfo: app.globalData.wxInfo});
    if(app.globalData.HEADER.uid){
      console.log("存在uid");
      //获取用户信息
      wx.request({
        url: HOST + "/user/info",
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: app.globalData.HEADER, // 设置请求的 header
        success: function(res){
          if(res.data.code == "0"){
            console.log(res.data.result);
            that.setData({userInfo:res.data.result});
          }   
        }
      })
    }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //点击个人余额
  userBalance: function () {
    if(!this.data.wxInfo){
      this.login();
      return;
    };
    if(this.data.userInfo && this.data.userInfo.phone){
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
    if(!this.data.wxInfo){
      this.login();
      return;
    };
    if(this.data.userInfo && this.data.userInfo.phone){
      wx.navigateTo({
        url: "./userInfo/userInfo"
      })
    }else{
      wx.navigateTo({
        url: "./bindPhone/bindPhone"
      })
    };
  },
  //登录
  login: function () {
    var that = this;
    wx.login({
      success: function (res) {
        console.log("---登录成功----");
        wx.getUserInfo({
          success: function (res) {
            console.log(res);
            var wxInfo = JSON.parse(res.rawData);
            app.globalData.wxInfo = wxInfo;
            that.setData({ wxInfo: wxInfo });
            wx.setStorage({
              key: 'wxInfo',
              data: wxInfo,
              success: function(res){
                // success
                console.log("-----setStorage successed------")
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
  },
  downMore:function(){
    console.log("-----more-----");
  }
})