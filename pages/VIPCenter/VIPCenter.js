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
      //console.log(app.globalData.wxInfo)
      var that = this;
      if (app.globalData.wxInfo) {
        this.setData({ wxInfo: app.globalData.wxInfo });
        wx.getStorage({
          key: "HEADER",
          success:(res)=> {
            console.log("------get header success-------");
            //获取用户信息
            getApp().globalData.HEADER = res.data;
            wx.request({
              url: HOST + "/user/info",
              method: 'POST',
              header: res.data,
              success: (res)=> {
                console.log(res)
                if (res.data.code == "0") {
                  let datnn = res.data.result;
                  this.setData({
                    cardName: datnn.memberLevelName,
                    idCardNo: datnn.idCardNo,
                    shopName: datnn.shopName,
                    shopLogo: datnn.shopLogo
                  })
                  this.setData({ userInfo: res.data.result});
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
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  recomGigt:function(){
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
  toMoneyRecord:function(){
    wx.navigateTo({
      url: '/pages/VIPCenter/moneyRecord/moneyRecord',
    })
  }


})