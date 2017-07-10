const util = require('../../../utils/util.js');
var app = getApp();
var HOST = app.globalData.HOST;
Page({
  data: {
    wxInfo: null,
    userInfo: null
  },

  onLoad: function (options) {
    //获取用户信息
    var token = app.globalData.HEADER.token;
    var uid = app.globalData.HEADER.uid;
    console.log(token, uid);
    if (token && uid) {
      console.log(util.secondTimestamp(1499245853))
      console.log(util.stringNum(13678765465))
      console.log(app.globalData)
      this.setData({ wxInfo: app.globalData.wxInfo})
    } else {
      wx.navigateTo({
        url: '../personal/bindPhone/bindPhone',
      })
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    var that = this;

    wx.getStorage({
      key: "HEADER",
      success: function (res) {
        //获取用户信息
        getApp().globalData.HEADER = res.data;
        wx.request({
          url: HOST + "/user/info",
          method: "POST",
          header: res.data,
          success: function (res) {
            console.log(res)
          }
        });
      }
    })


  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  //转发
  onShareAppMessage: function (res) {
    let info = app.globalData;
    console.log(info)
    let infoName = info.wxInfo.nickName;
    let oriOpenId = info.openid
    if (res.from === 'button') {
      // 来自页面内转发按钮
      //console.log(res.target)
    }
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
    // wx.getShareInfo({
    //   withShareTicket: true,
    //   success(res) {
    //     console.log(res)
    //   }
    // })
    return {
      title: '推荐有礼',
      path: '/pages/VIPCenter/shareGift/shareGift?openid=' + oriOpenId + '&name=' + infoName,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  getBash:function(){
    wx.navigateTo({
      url: '/pages/VIPCenter/applyCash/applyCash',
    })
  },
  

})