//index.js
//获取应用实例
var app = getApp();
var HOST = app.globalData.HOST;
var HEADER = app.globalData.HEADER;
Page({
  data: {
    shopName:"Cocodemer港汇店",
    shopImage:"../../images/homePage/shop_image.jpg",
    shop:null,
    location:null
  },
  onLoad: function () {
    console.log("-----index onLoad----");
    //判断全局变量中location值是否为空
    if(!app.globalData.location){
      console.log("------获取位置信息------")
      //获取地理位置信息
       wx.getLocation({
         type:"wgs84",
         success:function(res){
           app.globalData.location = {
             lat:res.latitude,
             lng:res.longitude
           };

           //获取门店信息
           wx.request({
             url: HOST + "/shop/detail",
             data: app.globalData.location,
             method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
             header:HEADER,
             success: function(res){
                if(res.data.code == "0"){
                     app.globalData.shop = res.data.result;
                };
             }  
           })
         }
       })
    }
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
