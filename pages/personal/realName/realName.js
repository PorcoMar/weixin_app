// pages/personal/realName/realName.js
var app = getApp();
var HOST = getApp().globalData.HOST;
Page({
  data:{
    realName:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    //获取用户信息
    var that = this;
    wx.request({
      url:HOST + "/user/info",
      method:"POST",
      header:getApp().globalData.HEADER,
      success:function(res){
        if(res.data.code == "0"){
          var realName = res.data.result.realName;
          that.setData({realName:realName});
        }
      }
    })
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
                if(res.data.code == "0"){
                     wx.navigateBack({
                      delta: 1 // 回退前 delta(默认为1) 页数
                    });
                };
              }
            })
        }
      }
    })
  }
})