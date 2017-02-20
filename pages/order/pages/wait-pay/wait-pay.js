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
    // var id = app.requestDetailid;
    // console.log(id);
    that.setData({
      orderStatus:options.orderStatus
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
       console.log("订单详情页面",res);
       if(res.data.code == "0"){
          console.log("获取订单详情成功！")
          var object = res.data.result;
          console.log('DDXQ',object);
          var createTime = app.formateTime(object.createdTime);
          var overSecond = app.formateTime(object.overSecond);
          that.setData({
            
            'orderObject.oriPrice':object.oriPrice,//订单总额
            'orderObject.price':object.price,//实付款
            'orderObject.memPrice':object.memberCardPrice,//商户会员抵扣
            'orderObject.name':object.name,//下单人
            'orderObject.phone':object.phone,//联系电话
            'orderObject.orderNo':object.orderNo,//订单编号
            'orderObject.payType':object.payType,//支付方式
            'orderObject.createTime':createTime,//下单时间
            'orderObject.overSecond':overSecond,//剩余支付时间
            'orderObject.totalCount':object.quantity,//服务数量
            'orderObject.sellerPhone':object.sellerTel,//客服电话
            'orderObject.payStrategy':object.payStrategy//
          })
          if(res.data.result.type == 'YUESAO'){
            that.setData({
              'orderObject.shopName':object.serviceName,
              'orderObject.logo':object.serviceLogo,
              'orderObject.serviceArr':[],
              'orderObject.serviceArr[0].serviceName':object.sku,
              'orderObject.serviceArr[0].totalCount':1
            })
          }else {
              that.setData({
              'orderObject.shopName':object.shopName,
              'orderObject.logo':object.shopLogo,
              'orderObject.serviceArr':object.orderItem
            })
          }
          console.log('订单详情：',that.data.orderObject);
        }
      }
    })
  },
  // 联系客服
  phoneCall:function(e){
      
      wx.makePhoneCall({
        phoneNumber: this.data.orderObject.sellerPhone,
        success: function(res) {
          // success
          console.log("联系客服");
        }
      })
  },
  // 立即支付
  payImmediately:function(){
    console.log("立即支付");
    wx.request({
      url: url + '/order/confirm',
      data: {
        orderNo:that.data.orderObject.orderNo,
        payType:that.data.orderObject.payType,
        payStrategy:that.data.orderObject.payStrategy || 'ALL',
        price:that.data.orderObject.price
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: app.globalData.HEADER, // 设置请求的 header
      success: function(res){
        // success
        console.log('立即支付',res);
        if(res.data.code === '0'){
            console.log('订单支付成功！');
            wx.navigateTo({
            url: '../wait-pay/wait-pay?orderNo='+ that.data.detail.orderNo+'&orderStatus=PAY',
          })
        }
      }
    })
  }
})