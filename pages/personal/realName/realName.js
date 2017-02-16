// pages/personal/realName/realName.js
var app = getApp();
var HOST = getApp().globalData.HOST;
Page({
  data:{
    realName:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({realName:app.globalData.userInfo.realName});
    console.log(this.data.realName);
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  realNameInput:function(e){
    this.setData({realName:e.detail.value});
  },
  delete:function(){
    this.setData({realName:""});
  },
  saveRealName:function(){
    var realName = this.data.realName;

    wx.request({
      url: HOST + "/user/edit",
      data: {realName:realName},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: getApp().globalData.HEADER, // 设置请求的 header
      success: function(res){
        if(res.data.code == "0"){
            wx.request({
              url: HOST + "/user/info",
              data: {},
              method:"POST", 
              header: app.globalData.HEADER, 
              success: function(res){
                app.globalData.userInfo.phone = res.data.result.phone;
                app.globalData.userInfo.realName = res.data.result.realName || "";
                app.globalData.userInfo.province = res.data.result.province || "";
                app.globalData.userInfo.city = res.data.result.city || "";
                app.globalData.userInfo.area = res.data.result.area || "";
                app.globalData.userInfo.birthDate = res.data.result.birthDate || "";
                
                wx.setStorage({
                  key: 'userInfo',
                  data: app.globalData.userInfo
                });
                
                wx.navigateBack({
                  delta: 1 // 回退前 delta(默认为1) 页数
                });
              }
            })
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})