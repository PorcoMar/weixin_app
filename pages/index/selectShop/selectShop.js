// pages/index/selectShop/selectShop.js
var app = getApp();
var HOST = app.globalData.HOST;
var HEADER = app.globalData.HEADER;
// var location = app.globalData.location;
Page({
  data:{
    shopList:null,
    cityName:null,
    options: {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var location = app.globalData.location || {city:"上海市"};
    this.setData({ cityName:location.city });
    console.log("--shoplist onload--",location)
    // var city = {city: '上海市'};
    this.setData({
      options: options
    })
    if (app.globalData.shop){
      var shopId = app.globalData.shop.id
    }else {
      var shopId = 0;
    }
    console.log(shopId);
    var that = this;

    if (options.limitcat) { // 当从优惠券查看门店进入的情况下请求/shop/supportShopByCat
      var _params = Object.assign({}, location, {cat: options.limitcat})
      wx.request({
        url: HOST + "/shop/supportShopByCat",
        data: _params,
        method: 'POST',
        header: HEADER,
        success: function (res) {
          if (res.data.code == "0") {
            var shopList = res.data.result;
            shopList.map(function(item, index) {
              var _imgArr = item.images.split(',');

              for (var i = 0; i < _imgArr.length; i++ ) {
                _imgArr[i] = "http://appimg.yizhenjia.com/" + _imgArr[i];
              }
              item.imgs = _imgArr;
              item.logo = "http://appimg.yizhenjia.com/" + item.logo
              item.selected = false;
            })
          }
          // 根据distance进行排序
          shopList.sort(function(a, b) {
            if(a.distance > b.distance) {
              return 1;
            } else {
              return -1;
            }
          });
          that.setData({
            shopList: shopList
          })
        }
      })
    } else {
      console.log(HOST,location);
      wx.request({
        url: HOST + "/shop/list",
        data: location,
        method: 'POST',
        header: HEADER,
        success: function (res) {
          console.log("----get shopList successed----",res);
          if (res.data.code == "0") {
            var shopList = res.data.result;
            console.log("shopList",shopList);
            for (var i = 0; i < shopList.length; i++) {
              if (shopId == shopList[i].id) {
                shopList[i].selected = true;
              } else {
                shopList[i].selected = false;
              }
            }
            that.setData({ shopList: shopList});
          };
        }
      })
    }

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
  changeCity: function () {
    console.log("chageCity");
    wx.navigateTo({
      url: '../selectCity/selectCity'
    })
  },
  selected:function(e){
    var id = e.currentTarget.dataset.id;
    var shopList = this.data.shopList;
    for (var i = 0; i < shopList.length; i++) {
      if (i == id) {
        shopList[i].selected = true;
      } else {
        shopList[i].selected = false;
      }
    };
    this.setData({ shopList: shopList });
    console.log("shopList",shopList);
    var shopId = this.data.shopList[id].id;
    console.log("shopId",shopId);
    getApp().globalData.shopId = shopId;

    wx.switchTab({
        url: '/pages/index/index',
    })
    // if (this.data.options.limitcat) {
    //   wx.switchTab({
    //     url: '/pages/index/index',
    //   })
    // } else {
    //   //选择完毕门店后返回到首页
    //   wx.navigateBack({
    //     delta: 1 // 回退前 delta(默认为1) 页面
    //   })
    // }
    
  }
})