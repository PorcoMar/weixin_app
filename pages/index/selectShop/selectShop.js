// pages/index/selectShop/selectShop.js
var app = getApp();
var HOST = app.globalData.HOST;
var HEADER = app.globalData.HEADER;
Page({
  data:{
    shopList:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var location = app.globalData.location;
    console.log("--shoplist onload--")
    var shopId = app.globalData.shop.id;
    console.log(shopId);
    var that = this;
    wx.request({
      url: HOST + "/shop/list",
      data: location,
      method: 'POST', 
      header: HEADER,
      success: function(res){
        console.log("----get shopList successed----");
        if(res.data.code == "0"){
            var shopList = res.data.result;
            console.log(shopList);
            for(var i = 0; i < shopList.length; i ++){
              if(shopId == shopList[i].id){
                shopList[i].selected = true;
              }else{
                 shopList[i].selected = false;
              }
            }
            that.setData({shopList:shopList});
        };
      }
    })
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
  selected:function(e){
    var id = e.currentTarget.dataset.id;
    var shopList = this.data.shopList;
    for(var i = 0; i < shopList.length; i ++){
      if(i == id){
          shopList[i].selected = true;
      }else{
          shopList[i].selected = false;
      }
    };
    this.setData({shopList:shopList});
    var shopId = this.data.shopList[id].id;
    getApp().globalData.shopId = shopId;

    //选择完毕门店后返回到首页
    wx.navigateBack({
      delta: 1 // 回退前 delta(默认为1) 页面
    })
  }
})