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