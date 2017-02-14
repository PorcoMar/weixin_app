// pages/personal/personal.js
var app = getApp();
Page({
  data:{
    userInfo:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    this.setData({userInfo:app.globalData.userInfo});
    console.log(this.data);
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  //点击个人余额
  userBalance:function(){
    wx.navigateTo({
      url:"./balance/balance"
    })
  },
  //点击个人信息
  userInfo:function(){
    wx.navigateTo({
      url:"./userInfo/userInfo"
    })
  },
  //登录
  login:function(){
    var that = this;
    wx.showModal({
      title:"提示",
      content:"是否允许微信号登录？",
      success:function(res){
        if(res.confirm){
            //获取微信账号信息
            wx.login({
              success:function(){
                wx.getUserInfo({
                  success:function(res){
                    console.log(res);
                    var userInfo = JSON.parse(res.rawData);
                    app.globalData.userInfo = userInfo;
                    console.log(userInfo);
                    that.setData({userInfo:userInfo})
                  }
                })
              }
            })
        }
      }
    })
    
  },
  //绑定手机号
  bindPhone:function(){
    wx.navigateTo({
      url: './bindPhone/bindPhone'
    })
  }
})