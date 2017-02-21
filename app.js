//app.js
App({
  onLaunch: function () {
    //获取用户微信缓存信息
    wx.getStorage({
      key: 'wxInfo',
      success: function(res){
        // success
        getApp().globalData.wxInfo = res.data;
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
    wxInfo:null,
    location:null,
    shop:null,
    shopId:null,
    HOST:"https://test.yizhenjia.com/xcxapi",
    HEADER:{
        "Content-Type":"application/x-www-form-urlencoded"
    }
  },
  formateTime:function(timestamp){
    var time = new Date(timestamp);
    var year = time.getFullYear();
    var month = ((time.getMonth() + 1) < 10)?("0" + (time.getMonth() + 1)): (time.getMonth() + 1);
    var date = (time.getDate() < 10) ? ("0" + time.getDate()) : time.getDate();
    var hours = (time.getHours() < 10) ? ("0" + time.getHours()) : time.getHours();
    var minutes = (time.getMinutes() < 10) ? ("0" + time.getMinutes()) : time.getMinutes();
    var seconds = (time.getSeconds() < 10) ? ("0" + time.getSeconds()) : time.getSeconds();
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  }
})