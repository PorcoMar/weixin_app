// pages/personal/userInfo/userInfo.js
var app = getApp();
Page({
  data:{
    timePicker:{
      months:[],
      days:[],
      value:[]
    },
    dateSelection:false,
    birthdayTemp:{
      month:"",
      date:""
    },
    userInfo:{
      realName:null,
      birthday:"02-09"
    }
  },
  onLoad:function(options){
    this.setData({userInfo:app.globalData.userInfo})

    // 页面初始化 options为页面跳转所带来的参数
    var months = [];
    var days = [];
    var date = new Date();
    var Month = date.getMonth();
    var Day = date.getDate();
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
    for(var i = 1; i <= days_len; i ++){
      days.push(i);
    };
    var timePicker = {
      months:months,
      days:days,
      value:[Month,Day]
    };
    this.setData({timePicker,timePicker});
    var birthdayTemp = {
      month:Month,
      date:Day
    };
    this.setData({birthdayTemp:birthdayTemp});
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
  datebindchange:function(e){
    var month = e.detail.value[0];
    var date = e.detail.value[1];
    var months = [];
    var days = [];
    var days_len = 0;
    if(month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 10){
      days_len = 31;
    }else if(month == 3 || month == 5 || month == 8 || month == 11){
      days_len = 30;
    }else{
      days_len = 29;
    };
    for(var i = 1; i <= 12; i ++){
      months.push(i);
    };
    for(var i = 1; i <= days_len; i ++){
      days.push(i);
    };
    var timePicker = {
      months:months,
      days:days,
      value:[month,date]
    };
    this.setData({timePicker,timePicker})
    var birthdayTemp = {
      month:month,
      date:date
    };
    this.setData({birthdayTemp:birthdayTemp});
  },
  dateSelection:function(){
    this.setData({dateSelection:true});
  },
  cancel:function(){
    this.setData({dateSelection:false});
  },
  dateConfirm:function(){
    
    var month = 1 + this.data.birthdayTemp.month;
    var date = 1 + this.data.birthdayTemp.date;
    month = (month < 10)?("0" + month):month;
    date = (date < 10)?("0" + date):date;
    var userInfo = this.data.userInfo;
    userInfo.birthday = month + "-" + date;
    this.setData({userInfo:userInfo});
    app.globalData.userInfo = userInfo;
    this.setData({dateSelection:false});
  }
})