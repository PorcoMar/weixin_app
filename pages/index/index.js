//index.js
//获取应用实例
var app = getApp();
var HOST = app.globalData.HOST;
Page({
  data: {
    shopName:"Cocodemer港汇店",
    shopImage:"../../images/homePage/shop_image.jpg",
    shop:null,
    location:null
  },
  onLoad: function () {
    console.log("-----index data----");
  },
  onShow:function(){
    console.log("---index onShow----");
    console.log(getApp().globalData);
    console.log(getApp().globalData.shopId);
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
