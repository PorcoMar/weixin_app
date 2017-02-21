// pages/personal/userInfo/userInfo.js
var app = getApp();
var HOST = app.globalData.HOST;
Page({
  data:{
    timePicker:{
      months:[],
      days:[],
      value:[]
    },
    dateSelection:false,
    addressSelection:false,
    birthDateTemp:{
      month:"",
      date:"" 
    },
    userInfo:{
    },
    provinces:[{name:"省",code:""}],
    citys:[{name:"市",code:""}],
    areas:[{name:"区",code:""}],
    address_value:[],
    address:{
      province:"",
      city:"",
      area:""
    }
  },
  onLoad:function(options){
    //获取用户信息
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var that = this;
    //获取用户信息
    wx.request({
      url:HOST + "/user/info",
      method:"POST",
      header:getApp().globalData.HEADER,
      success:function(res){
        if(res.data.code == "0"){
          that.setData({userInfo:res.data.result});
        }
      }
    });
    // 页面显示

    // 页面初始化 options为页面跳转所带来的参数
    // 获取省
    wx.request({
      url: HOST + "/location/getAllProvinces",
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: getApp().globalData.HEADER, // 设置请求的 header
      success: function(res){
        var result = res.data.result;
        var provinces = that.data.provinces.concat(result);
        that.setData({provinces:provinces});
      }
    });

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
      value:[Month,Day - 1]
    };
    this.setData({timePicker,timePicker});
    var birthDateTemp = {
      month:Month,
      date:Day
    };
    this.setData({birthDateTemp:birthDateTemp});
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
    var birthDateTemp = {
      month:month,
      date:date
    };
    this.setData({birthDateTemp:birthDateTemp});
  },
  dateSelection:function(){
    this.setData({dateSelection:true});
  },
  cancel:function(){
    this.setData({dateSelection:false});
    this.setData({addressSelection:false});
  },
  dateConfirm:function(){
    var month = 1 + this.data.birthDateTemp.month;
    var date = this.data.birthDateTemp.date;
    month = (month < 10)?("0" + month):month;
    date = (date < 10)?("0" + date):date;
    var birthDate = month + "-" + date;
    var that = this;
    wx.request({
      url: HOST + "/user/edit",
      data: {birthDate:birthDate},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: app.globalData.HEADER, // 设置请求的 header
      success: function(res){
        console.log(res);
        if(res.data.code == "0"){
            var userInfo = that.data.userInfo;
            userInfo.birthDate = birthDate;
            that.setData({userInfo:userInfo});
        }
      },
      fail: function() {
        // fail
      }
    })
  },
  editRealName:function(){
    wx.navigateTo({
      url: '../realName/realName'
    })
  },
  addressbindchange:function(e){
    var that = this;
    var province_value = e.detail.value[0];
    var province_code = that.data.provinces[province_value]["code"];
    var province_name = that.data.provinces[province_value]["name"];

    if(that.data.address.province != province_name){
        var address_value = [province_value,0,0];
        that.setData({address_value:address_value});
    }
    //获取市列表
    wx.request({
      url:HOST + "/location/getCitiesByProviceCode",
      method:"POST",
      header:getApp().globalData.HEADER,
      data:{provinceCode:province_code},
      success:function(res){
        var result = res.data.result;
        var citys = [{name:"市",code:""}].concat(result);
        that.setData({citys:citys});
      }
    });

    var city_value = e.detail.value[1];
    var city_code = that.data.citys[city_value]["code"];
    var city_name = that.data.citys[city_value]["name"];
    if(that.data.address.city != city_name){
        var address_value = that.data.address_value;
        address_value[1] = city_value;
        that.setData({address_value:address_value});
    };

    //获取区列表
    wx.request({
      url:HOST + "/location/getAreasByCityCode",
      method:"POST",
      header:getApp().globalData.HEADER,
      data:{cityCode:city_code},
      success:function(res){
        var result = res.data.result;
        var areas = [{name:"区",code:""}].concat(result);
        that.setData({areas:areas});
      }
    });
    
    var area_value = e.detail.value[2];
    var area_code = that.data.areas[area_value]["code"];
    var area_name = that.data.areas[area_value]["name"];

    var address = {
      province:province_name,
      city:city_name,
      area:area_name
    };
    that.setData({address:address});
  },
  addressSelection:function(){
    console.log("good");
    this.setData({addressSelection:true});
  },
  addressConfirm:function(){
    var that = this;
    var address = this.data.address;
    wx.request({
      url:HOST + "/user/edit",
      method:"POST",
      header:getApp().globalData.HEADER,
      data:address,
      success:function(res){
        if(res.data.code == "0"){
           var userInfo = that.data.userInfo;
           userInfo.province = address.province;
           userInfo.city = address.city;
           userInfo.area = address.area;
           that.setData({userInfo:userInfo});
           that.setData({addressSelection:false});
        }
      }
    })
  }
})