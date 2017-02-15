// pages/order/pages/wait-pay/wait-pay.js
var app =getApp();
Page({
  data:{
    serviceDetail:{
      shopName:"Cocodemer杭州大厦店",
      picture:"",
      serviceName:"孕后修身补水护肤服务",
      num:2,
      price:5152,
      discount:3888
    },
    priceDetail:{
      orderTotal:10304.00,
      amount:2528.00,
      realPay:7756.00
    },
    infoDetail:{
      single:"某某某",
      phone:18025632563,
      note:"卡萨丁放假啊"
    },
    orderDetail:{
      orderNo:123456789,
      payment:"微信零钱",
      orderTime:"2016-10-10 21:22:22"
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var id = app.requestDetailid;
    console.log(id);
    this.setData({
      orderStatus:id
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
  // 跳转到提交订单页面
  toSubmit:function(){
    wx.navigateTo({
      url: '../submit-order/submit-order',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})