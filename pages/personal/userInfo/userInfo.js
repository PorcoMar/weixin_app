// pages/personal/userInfo/userInfo.js
Page({
  data:{
    timePicker:{
      months:[],
      days:[],
      value:[]
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var months = [];
    var days = [];
    var date = new Date();
    var Month = date.getMonth();
    var Day = date.getDay();
    var days_len = 0;
    for(var i = 1; i <= 12; i ++){
      months.push(i);
    };
    if(Month == 0 || Month == 2 || Month == 4 || Month == 6 || Month == 7 || Month == 9 || Month == 10){
      days_len = 31;
    }else if(Month == 3 || Month == 5 || Month == 8 || Month == 11){
      days_len = 30;
    }else{
      days_len = 29;
    };
    for(var i = 0; i <= days_len; i ++){
      days.push(i);
    };
    var timePicker = {
      months:months,
      days:days,
      value:[1,2]
    };
    this.setData({timePicker,timePicker})
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
  bindchange:function(e){
    console.log(e);
  }
})