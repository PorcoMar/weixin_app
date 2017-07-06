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


})