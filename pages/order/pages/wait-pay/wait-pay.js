// pages/order/pages/wait-pay/wait-pay.js
var app = getApp();
var url = app.globalData.HOST;

Page({
  data:{
    orderObject:{}
  },
  onLoad:function(options){
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    var id = app.requestDetailid;
    console.log(id);
    that.setData({
      orderStatus:id
    });
    var orderNo = options.orderNo;
    console.log(orderNo);
    wx.request({
      url: url+'/order/info',
      data: {
        orderNo: orderNo
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: app.globalData.HEADER, // 设置请求的 header
      success: function(res){
        // success
       if(res.data.code == "0"){
          console.log("获取订单详情成功！")
          var object = res.data.result;
          console.log('DDXQ',object);
          that.setData({
            'orderObject.oriPrice':object.oriPrice,//订单总额
            'orderObject.price':object.price,//实付款
            'orderObject.memPrice':object.memberCardPrice,//商户会员抵扣
            'orderObject.name':object.name,//下单人
            'orderObject.phone':object.phone,//联系电话
            'orderObject.orderNo':object.orderNo,//订单编号
            'orderObject.payType':object.payType,//支付方式
            'orderObject.createTime':object.createTime,//下单时间
            'orderObject.oveerSecond':object.overSecond//剩余支付时间
          })
          if(res.data.result.type == 'YUESAO'){
            that.setData({
              'orderObject.shopname':object.serviceName,
              'orderObject.logo':object.serviceLogo,
              'orderObject.serviceArr':[],
              'orderObject.serviceArr[0].serviceName':object.sku,
              'orderObject.serviceArr[0].totalCount':1
            })
          }else {
              that.setData({
              'orderObject.shopname':object.shopName,
              'orderObject.logo':object.shopLogo,
              'orderObject.serviceArr':object.orderItem
            })
          }
          console.log('订单详情：',that.data.orderObject);
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
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