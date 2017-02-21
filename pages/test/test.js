// pages/test/test.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  pay:function(){
    wx.requestPayment({
      'timeStamp': '1487643430',
      'nonceStr': 'Fc08UXgY1QVGkS3G',
      'package': 'prepay_id=wx20170221101710c88e39c9130219642333',
      'signType': 'MD5',
      'paySign': 'EB13CEA8747D52F36AFFF3F95158CE5A',
      'success':function(res){
      },
      'fail':function(res){
      }
    })
  }
})