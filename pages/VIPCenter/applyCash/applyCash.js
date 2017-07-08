const util = require('../../../utils/util.js');
var app = getApp();
var HOST = app.globalData.HOST;
Page({
  data: {
    wxInfo: null,
    userInfo: null,
    cash:"",
    name:"",
    num:""
  },
  onLoad: function (options) {
    //获取用户信息
    var token = app.globalData.HEADER.token;
    var uid = app.globalData.HEADER.uid;
    console.log(token, uid);
    if (token && uid) {
      console.log(util.secondTimestamp(1499245853))
      console.log(app.globalData)
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
  getgift:function(){
    let name = this.data.name;
    let num = this.data.num;
    let cash = this.data.cash;
    console.log(name,num,cash)
    if(name && num && cash){
      console.log(1111111)
    }else{
      console.log(222222)
      wx.navigateTo({
        url: '/pages/VIPCenter/getGift/getGift',
      })
    }

  },
  bindCash: function (e) {
    this.setData({
      cash: e.detail.value
    })
  },
  bindName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindNum: function (e) {
    this.setData({
      num: e.detail.value
    })
  },


})