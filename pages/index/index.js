//index.js
//获取应用实例
var app = getApp();
var HOST = app.globalData.HOST;
var HEADER = app.globalData.HEADER;
// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.js'); 
var wxMarkerData = [];  //定位成功回调对象
Page({
  data: {
    shop: null,
    ak: "UnPNw6EZjdPyhL2dbpjoebPE2uvzm1LT", //填写申请到的ak  
    // cityInfo: {}     //城市信息  
  },  
  onLoad: function () {
    console.log("-----index onLoad----");
    //判断全局变量中location值是否为空
    var that = this;
    if(!app.globalData.location){
      console.log("------获取位置信息------")
      /* 获取定位地理位置 */
      // 新建bmap对象   
      var BMap = new bmap.BMapWX({
        ak: that.data.ak
      });
      var fail = function (data) {
        console.log(data);
      };
      var success = function (data) {
        //返回数据内，已经包含经纬度  
        // console.log(data);
        //使用wxMarkerData获取数据  
        wxMarkerData = data.wxMarkerData;
        var location = {
          lat: wxMarkerData[0].latitude,
          lng: wxMarkerData[0].longitude,
          city: data.originalData.result.addressComponent.city || '上海市'
          // city: '上海市'
          // lat: 121.48,
          // lng: 31.22
        }
        console.log("location",location);
        wx.request({
          url: HOST + "/shop/detail",
          data: location,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: HEADER,
          success: function (res) {
            console.log(res.data);
            if (res.data.code == "0") {
              res.data.result.distance = (res.data.result.distance / 1000).toFixed(1) || 0;
              app.globalData.shop = res.data.result;
              app.globalData.location = location;
              // console.log(app.globalData.location);
              that.setData({ shop: app.globalData.shop });
            };
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (data) {
            console.log(data);
          }
        })
        //把所有数据放在初始化data内  
        // console.log("city", data.originalData.result.addressComponent.city, wxMarkerData[0].latitude, wxMarkerData[0].longitude);
        // app.globalData.cityInfo = data.originalData.result.addressComponent.city;
        // that.setData({
        //   markers: wxMarkerData,
        //   latitude: wxMarkerData[0].latitude,
        //   longitude: wxMarkerData[0].longitude,
        //   address: wxMarkerData[0].address,
          // cityInfo: data.originalData.result.addressComponent
        // });
      }
      // 发起regeocoding检索请求   
      BMap.regeocoding({
        fail: fail,
        success: success
      });   
      //获取地理位置信息
      //  wx.getLocation({
      //    type:"wgs84",
      //    success:function(res){
      //      var location = {
      //        lat:res.latitude,
      //        lng:res.longitude
      //      };
      //      console.log(HOST, location, app.globalData.cityInfo);
      //      //获取门店信息
      //      wx.request({
      //        url: HOST + "/shop/detail",
      //        data: location,
      //        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      //        header:HEADER,
      //        success: function(res){
      //          console.log(res.data);
      //           if(res.data.code == "0"){
      //                res.data.result.distance = (res.data.result.distance/1000).toFixed(1) || 0;
      //                app.globalData.shop = res.data.result;
      //                app.globalData.location = location;
      //                that.setData({shop:app.globalData.shop});
      //           };
      //        } ,
      //        fail: function(res){
      //          console.log(res);
      //        } ,
      //        complete:function(data){
      //           console.log("data",data);
      //        }
      //      })
      //    }
      //  })
    }else{
      this.setData({shop:app.globalData.shop});
    }
  },
  onShow:function(){
    var that = this;
    var shopId = getApp().globalData.shopId;
    if(shopId){
      var lat = getApp().globalData.location.lat;
      var lng = getApp().globalData.location.lng;
      wx.request({
        url:HOST + "/shop/detail",
        method:"POST",
        header:getApp().globalData.HEADER,
        data:{
          shopId:shopId,
          lat:lat,
          lng:lng
          },
        success:function(res){
          console.log(res);
          if(res.data["code"] == "0"){
            console.log(res.data);
            res.data.result.distance = res.data.result.distance ?(res.data.result.distance/1000).toFixed(1) : 0;
            that.setData({shop:res.data.result});
            getApp().globalData.shop = res.data.result;
          }
        }
      })
    };
  },
  onReady:function(){
    console.log("---index onReady---")
  },
  onHide:function(){
    console.log("---index onHide----")
  },
  onUnload:function(){
    console.log("----index onUnload----")
  },
  changeShop:function(){
    wx.navigateTo({
      url: './selectShop/selectShop'
    })
  },
  appointmentTime:function(){
    wx.navigateTo({
      url: '../appointment/appointment',
    })
  },
  //拨打电话
  phoneCall:function(){
    var phone = this.data.shop.tel;
    wx.makePhoneCall({
      phoneNumber: phone
    });
  },
  getLocation:function(){
    var location = getApp().globalData.shop;
    wx.openLocation({
      latitude: location.lat, // 纬度，范围为-90~90，负数表示南纬
      longitude: location.lng, // 经度，范围为-180~180，负数表示西经
      scale: 28
    })
  },
  loadCity: function (longitude, latitude) {
    var page = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=UnPNw6EZjdPyhL2dbpjoebPE2uvzm1LT&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success    
        console.log(res);
        var city = res.data.result.addressComponent.city;
        console.log("city",city);
        // page.setData({ currentCity: city });
      },
      fail: function () {
        // page.setData({ currentCity: "获取定位失败" });
      },

    })
  }, 
  selectService:function(e){
    var id = e.currentTarget.dataset.id;
    var shopId = this.data.shop.id;
    wx.navigateTo({
      url: '/pages/service/detail/detail?shopId=' + shopId + "&id=" + id 
    })
  } 
})
