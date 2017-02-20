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
      success: function (res) {
        console.log("---登录成功----");
        console.log(res);
        // wx.requestPayment({
        //   'timeStamp': '1487580042',
        //   'nonceStr': "i4HYSUtgPV36dEl0",
        //   'package': 'prepay_id=wx20170220164043e7eae0687e0340954594',
        //   'signType': 'MD5',
        //   'paySign': '5D9882747CCB10513340EC00872AA886',
        //   'success':function(res){
        //     console.log(res);
        //   },
        //   'fail':function(res){
        //     console.log("---111--");
        //   }
        // });

        // var url = "https://api.weixin.qq.com/sns/jscode2session?appid=wxdc72e9a87f72ca15&secret=28f21efa68c21702db644011e547376f&js_code=" + res.code + "&grant_type=authorization_code"

        // wx.request({
        //   url: url,
        //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        //   //header: {}, // 设置请求的 header
        //   success: function(res){
        //     // success
        //     console.log("----success-----");
        //     console.log(res);
        //   },
        //   fail: function() {
        //     // fail
        //     console.log("-----fail-----");
        //   },
        //   complete: function() {
        //     // complete
        //   }
        // });

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