// pages/order/pages/submit-order/submit-order.js
var app = getApp();
var url = app.globalData.HOST;

Page({
  data:{
    detail:{},
    userInfo:{},
    weixinImg:'../../../../images/order/checked@3x.png',
    weixin:false,
    balance:true,
    payType:'MEMBER_CARD',
    serviceCount:1
  },
  onLoad:function(options){
    var that = this;
    wx.request({
      url: url + '/user/info',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: app.globalData.HEADER, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        that.setData({
            'userInfo.realName':res.data.result.realName || '无',
            'userInfo.phone':res.data.result.phone || '无',
            'userInfo.memberLevelName':res.data.result.memberLevelName || '无'
        })
      }
    })
    console.log('用户信息',that.data.userInfo);
  
    // 页面初始化 options为页面跳转所带来的参数
    // console.log(options);
    var shopId = options.shopId;
    var serviceId = options.serviceId;
    this.setData({
      shopId:shopId,
      serviceId:serviceId
    })
    // console.log(app.globalData.userInfo);
    // console.log(shopId,serviceId);
    // 请求门店和服务详情
    wx.request({
        url: url + '/service/detail',
        method: 'GET',
        data: {serviceId:serviceId,shopId:shopId},
        header: {
            'Accept': 'application/json'
        },
        success: function(res) {
            console.log("订单详情",res);
            if(res.data.code == '0'){
                var arr = res.data.result;
                that.setData({
                  'detail.memberName':that.data.userInfo.realName,
                  'detail.memberPhone':that.data.userInfo.phone,
                  'detail.memberLevel':that.data.userInfo.memberLevelName,
                  'detail.shopLogo':arr.shop.logo,
                  'detail.shopName':arr.shop.name,
                  'detail.serviceLogo':arr.logo,
                  'detail.serviceName':arr.name,
                  'detail.price':arr.price,
                  'detail.oriPrice':arr.oriPrice,
                  'detail.payStrategy':arr.payStrategy
                })
            }else {
               console.log("res.data.errorMsg");
            } 
        }
    });
    // 请求服务价格
    wx.request({
      url: url + '/order/calPrice',
      data: {serviceId:serviceId,count:that.data.serviceCount},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: app.globalData.HEADER, // 设置请求的 header
      success: function(res){
        // success
        console.log('计算订单价格',res.data.result);
        var arr = res.data.result;
        if(res.data.code === '0'){
          that.setData({
            'detail.memberCardPrice':arr.memberCardPrice,
            'detail.disCountPrice':arr.discountPrice,
            'detail.orderPrice':arr.orderPrice
          })
        }else {
          console.log(res.data.errorMsg);
        }
      }
    })
  },
  // 购买数量选择
  serviceAdd:function(){
    console.log('增加购买数量');
    var that = this;
    var num = this.data.serviceCount + 1;
    this.setData({
      serviceCount:num
    });
    console.log(this.data.serviceCount);
    // 请求服务价格
    wx.request({
      url: url + '/order/calPrice',
      data: {serviceId:that.data.serviceId,count:that.data.serviceCount},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: app.globalData.HEADER, // 设置请求的 header
      success: function(res){
        // success
        console.log('计算订单价格',res.data.result);
        var arr = res.data.result;
        if(res.data.code === '0'){
          that.setData({
            'detail.memberCardPrice':arr.memberCardPrice,
            'detail.disCountPrice':arr.discountPrice,
            'detail.orderPrice':arr.orderPrice
          })
        }else {
          console.log(res.data.errorMsg);
        }
      }
    })
  },
  serviceReduce:function(){
    console.log("减少购买数量");
    var that = this;
    var num = this.data.serviceCount - 1;
    if(num <= 1){
      num = 1;
    }
    this.setData({
      serviceCount:num
    });
    console.log(this.data.serviceCount);
    //请求价格
    wx.request({
      url: url + '/order/calPrice',
      data: {serviceId:that.data.serviceId,count:that.data.serviceCount},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: app.globalData.HEADER, // 设置请求的 header
      success: function(res){
        // success
        console.log('计算订单价格',res.data.result);
        var arr = res.data.result;
        if(res.data.code === '0'){
          that.setData({
            'detail.memberCardPrice':arr.memberCardPrice,
            'detail.disCountPrice':arr.discountPrice,
            'detail.orderPrice':arr.orderPrice
          })
        }else {
          console.log(res.data.errorMsg);
        }
      }
    })
  },

  // 支付方式选择 
  weixinPayment:function(){
    console.log("微信支付");
    this.setData({
      weixin:true,
      balance:false
    });
  },
  balancePayment:function(){
    console.log("余额支付");
     this.setData({
      weixin:false,
      balance:true
    });
  },
  // 确认支付
  confirmPayment:function(e){
    console.log('确认支付');
    var that = this;

    // 调下订单接口
    wx.request({
      url: url + '/order/create',
      data: {serviceId:that.data.serviceId,shopId:that.data.shopId,serviceCount:that.data.serviceCount},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: app.globalData.HEADER, // 设置请求的 header
      success: function(res){
        // success
        console.log('支付',res);
        if(res.data.code === '0'){
          var result = res.data.result;
          that.setData({
            'detail.orderNo':result.orderNo
          });
          // 余额支付方式
          if(that.data.balance){
            wx.showModal({
                content: "请再次确认是否使用余额支付",
                confirmText: "确认",
                cancelText: "取消",
                success:function(res){
                  that.setData({
                    payType:'MEMBER_CARD'
                  });
                  console.log('提交订单支付',that.data);
                  // 立即支付
                  if(res.confirm){
                    console.log('确认',res.confirm);
                    wx.request({
                      url: url + '/order/confirm',
                      data: {
                        orderNo:that.data.detail.orderNo,
                        payType:that.data.payType,
                        payStrategy:that.data.detail.payStrategy || 'ALL',
                        price:that.data.detail.orderPrice
                      },
                      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                      header: app.globalData.HEADER, // 设置请求的 header
                      success: function(res){
                        // success
                        console.log('立即支付',res);
                      
                        if(res.data.code === '0'){
                          console.log('订单支付成功！');
                          wx.navigateTo({
                            url: '../wait-pay/wait-pay?orderNo='+ that.data.detail.orderNo+'&orderStatus=已付款',
                          })
                        }else {
                          console.log(res.data.errorMsg);
                          wx.showToast({
                            title: res.data.errorMsg,
                            duration: 2000
                          })
                        }
                      }
                    })
                  }else {
                    console.log("订单未支付！");
                    console.log('取消',res.confirm);
                    wx.navigateTo({
                        url: '../wait-pay/wait-pay?orderNo='+ that.data.detail.orderNo+'&orderStatus=待付款',
                    })
                  }
                  
                }
              })
            }else {
              // 微信支付方式
              console.log("weixin支付",that.data);
              that.setData({
                payType:'WX'
              });
              wx.request({
                url: url + '/order/confirm',
                data: {
                  orderNo:that.data.detail.orderNo,
                  payType:that.data.payType,
                  payStrategy:that.data.detail.payStrategy || 'ALL',
                  price:that.data.detail.orderPrice,
                  openId:app.globalData.openid
                },
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: app.globalData.HEADER, // 设置请求的 header
                success: function(res){
                  // success
                  console.log('立即支付',res);
                  if(res.data.code === '0'){
                      console.log('openId请求成功！');
                      wx.requestPayment({
                        'timeStamp': res.data.result.timeStamp,
                        'nonceStr': res.data.result.nonceStr,
                        'package': res.data.result.package,
                        'signType': res.data.result.signType,
                        'paySign': res.data.result.paySign,
                        'success':function(res){
                          console.log('订单支付成功！');
                          wx.navigateTo({
                            url: '../wait-pay/wait-pay?orderNo='+ that.data.detail.orderNo+'&orderStatus=已付款',
                          })
                        },
                        'fail':function(res){
                          console.log("订单未支付");
                          wx.navigateTo({
                            url: '../wait-pay/wait-pay?orderNo='+ that.data.detail.orderNo+'&orderStatus=待付款',
                          })
                        }
                      })
                      
                  }else {
                    wx.showToast({
                      title: res.data.errorMsg,
                      duration: 2000
                    })
                    
                  }
                }
              })             
            }
        }else {
          wx.showToast({
            title: res.data.errorMsg,
            duration: 2000
          })
        }
        
        
      }
    })
  }
})