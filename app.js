//app.js
App({
  onLaunch: function () {
    console.log("---------onLanch------------");
    //获取用户微信信息
    var that = this;
    wx.login({
      success: function (res) {
        console.log("---登录成功----");
        wx.getUserInfo({
          success: function (res) {
            console.log(res);
            var wxInfo = JSON.parse(res.rawData);
            getApp().globalData.wxInfo = wxInfo;
            wx.setStorage({
              key: 'wxInfo',
              data: wxInfo,
              success: function(res){
                // success
                console.log("-----setStorage successed------")
              }
            })
          },
          fail:function(){
            console.log("------login fail-------");
          }
        })
      }
    });
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
    //获取openID
    wx.login({
      success:function(res){
        var code = res.code;
        console.log(code);
        var url = "https://api.weixin.qq.com/sns/jscode2session?appid=wxdc72e9a87f72ca15&secret=551d3747abcbbf9a692453fa18bed146&js_code=" + res.code + "&grant_type=authorization_code";
        console.log(url);
        if(res.code){
          wx.request({
            url:url,
            method:"GET",
            success:function(res){
              console.log(res);
              console.log(code);
              getApp().globalData.openid = res.data.openid;
            }
          })
        }else {
          console.log(res.errorMsg);
        }
        
      }
    })
    // 将设备信息存储在globalData中
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.deviceInfo = res
      },
    })
  },
  globalData:{
    wxInfo:null,
    location:null,
    shop:null,
    shopId:null,
    HOST:"https://test.yizhenjia.com/xcxapi",
    HEADER:{
        "Content-Type":"application/x-www-form-urlencoded"
    },
    deviceInfo: null
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
  },
  // 转换订单状态名
  formateStatus:function(status){
    if(status == 'PAY'){
      return('已付款');
    }else if(status == 'CREATE'){
      return('待付款');
    }else {
      return("已过期");
    }
  },
  formateServiceStatus:function(status){
    if(status == 'UNUSED'){
      return('可使用');
    }else if(status == 'USED'){
      return('待评价');
    }else {
      return("已完成");
    }
  },
  // 倒计时转换
  formateSecond:function(value) {
   var theTime = parseInt(value);// 秒
   var theTime1 = 0;// 分
   var theTime2 = 0;// 小时
  // alert(theTime);
   if(theTime > 60) {
      theTime1 = parseInt(theTime/60);
      theTime = parseInt(theTime%60);
      // alert(theTime1+"-"+theTime);
      if(theTime1 > 60) {
         theTime2 = parseInt(theTime1/60);
         theTime1 = parseInt(theTime1%60);
       }
   }
       var result = ""+parseInt(theTime)+"秒";
       if(theTime1 > 0) {
       result = ""+parseInt(theTime1)+"分"+result;
       }
       if(theTime2 > 0) {
       result = ""+parseInt(theTime2)+"小时"+result;
       }
       return result;
   }
})