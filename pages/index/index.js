//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    shopName:"Cocodemer港汇店",
    shopImage:"../../images/homePage/shop_image.jpg"
  },
  onLoad: function () {
    console.log("---index onload---")
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
