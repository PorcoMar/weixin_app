//app.js
App({
  onLaunch: function () {
    //获取用户缓存信息
    wx.getStorage({
      key: 'userInfo',
      success: function(res){
        // success
        getApp().globalData.userInfo = res.data;
      },
      fail: function() {
        // fail
        console.log('----getStorage fail----');
      },
      complete: function() {
        // complete
      }
    });
    //获取HEADER缓存信息
    wx.getStorage({
      key: 'HEADER',
      success: function(res){
        console.log("----get HEAER successed-----")
        getApp().globalData.HEADER = res.data;
      },
      fail: function() {
        console.log("-----get HEADER failed------")
      }
    });
  },
  globalData:{
    userInfo:null,
    location:null,
    shop:null,
    shopId:null,
    HOST:"https://test.yizhenjia.com/xcxapi",
    HEADER:{
        "Content-Type":"application/x-www-form-urlencoded"
    }
  }
})