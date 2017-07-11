const util = require('../../utils/util.js');
var app = getApp();
var HOST = app.globalData.HOST;
Page({
  data:{
    wxInfo: null,
    userInfo: null
  },
  onLoad:function(options){
    //获取用户信息
    var token = app.globalData.HEADER.token;
    var uid = app.globalData.HEADER.uid;
    console.log("uid", uid);
    if (token && uid) {
      console.log(util.secondTimestamp(1499245853))
      console.log(app.globalData)
    } else{
      wx.navigateTo({
        url: '../personal/bindPhone/bindPhone',
      })
    }   
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    console.log(app.globalData.wxInfo)
    var that = this;
    if (app.globalData.wxInfo) {
      this.setData({ wxInfo: app.globalData.wxInfo });
      wx.getStorage({
        key: "HEADER",
        success: function (res) {
          console.log("------get header success-------");
          //获取用户信息

          getApp().globalData.HEADER = res.data;

          wx.request({
            url: HOST + "/user/info",
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: res.data, // 设置请求的 header
            success: function (res) {
              if (res.data.code == "0") {
                console.log(res.data.result);
                that.setData({ userInfo: res.data.result });
              }
            }
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请删除小程序后重新进入，使用微信授权登录',
        showCancel: false
      });
    };
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
            console.log(res)
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
  recomGigt:function(){
   // console.log(11111111)
    wx.getStorageInfo({
      success: function (res) {
        let keys = res.keys.join(",");
        //console.log(keys)
        if (keys.indexOf("firstIn")>0){
          wx.navigateTo({
            url: '/pages/VIPCenter/recomGiftAfter/recomGiftAfter',
          })
        }else{
          wx.navigateTo({
            url: '/pages/VIPCenter/recomGiftBefore/recomGiftBefore',
          })
        }


      }
    })

  },
  birthPower:function(){
    wx.navigateTo({
      url: '',
    })
  },
  // 跳转到全部订单页面
  toOrderList:function(){
    app.globalData.orderType = "ALL";
    wx.navigateTo({
      url: '../order/order',
    })
  },
  // 跳转到代付款页面
  waitPayment:function(){
    app.globalData.orderType = "WAIT_PAY";
    wx.navigateTo({
      url: '../order/order',
    })
  },
  // 跳转到可用服务页面
  enableService: function () {
    app.globalData.orderType = "WAIT_USE";
    wx.navigateTo({
      url: '../order/wait_use_order/wait_use_order',
    })
  },
  // 跳转到待评价页面
  waitEvaluation: function () {
    app.globalData.orderType = "WAIT_RATE";
    wx.navigateTo({
      url: '../order/wait_rate_order/wait_rate_order',
    })
  },
  // 跳转到优惠券列表
  couponList:function(){
    wx.navigateTo({
      url: '../coupon/coupon',
    })
  },
  // 跳转到提现记录页面
  cashGift:function(){
    wx.navigateTo({
      url: '../VIPCenter/applyCashRecord/applyCashRecord',
    })
  },
  // 跳转到钱包页面
  searchWallet:function(){
    wx.navigateTo({
      url: '../personal/balance/balance',
    })
  }
})