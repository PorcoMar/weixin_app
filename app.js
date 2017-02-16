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
        // success
        console.log("----get HEAER successed-----")
        getApp().globalData.HEADER = res.data;
        console.log(res.data);
        console.log(getApp().globalData.HEADER);
      },
      fail: function() {
        // fail
        console.log("-----get HEADER failed------")
      }
    })
    //获取地理位置
    wx.getLocation({
      type:"wgs84",
      success:function(res){
        var location = {
          latitude:res.latitude,
          longitude:res.longitude
        }
        wx.request({
          url: getApp().globalData.HOST + "/shop/detail",
          data: {
            lng:res.longitude,
            lat:res.latitude
          },
          method: 'POST', 
          header: getApp().globalData.HEADER, 
          success: function(res){
            // success
            console.log("-------get shop successed-------")
            console.log(res);
          },
          fail: function() {
            // fail
            console.log("-----get shop failed-----")
          }
        })
        // getApp().globalData.location = location;
        // console.log("-----getLocation successed------")
      },
      fail:function(){
        console.log("-----getLocation failed----")
      }
    })
  },
  globalData:{
    userInfo:null,
    location:{},
    HOST:"https://test.yizhenjia.com/xcxapi",
    HEADER:{
        "Content-Type":"application/x-www-form-urlencoded"
    }
  }
})