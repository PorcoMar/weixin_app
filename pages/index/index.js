//index.js
//获取应用实例
var app = getApp();
var HOST = app.globalData.HOST;
Page({
  data: {
    shopName:"Cocodemer港汇店",
    shopImage:"../../images/homePage/shop_image.jpg"
  },
  onLoad: function () {
    console.log("---index onload---");
    console.log(getApp().globalData);
    var location = app.globalData.location;
    console.log(location);
    wx.request({
        url:HOST + "/shop/detail",
        data:{
          lng:location.longitude,
          lat:location.latitude
        },
        header:{
        "Content-Type":"application/x-www-form-urlencoded"
        },
        method:"POST",
        success:function(res){
          console.log(res);
          console.log("------get shop successed-----");
        },
        fail:function(){
          console.log("------get shop fail-----")
        }
    })
  },
  onShow:function(){
    console.log("---index onShow----")
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
  }
})
