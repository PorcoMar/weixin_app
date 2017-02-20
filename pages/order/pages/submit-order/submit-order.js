// pages/order/pages/submit-order/submit-order.js
var app = getApp();
var url = app.globalData.HOST; 
Page({
  data:{
    detail:{},
    weixinImg:'../../../../images/order/checked@3x.png',
    weixin:true,
    balance:false,
    payType:'WX',
    serviceCount:1
  },
  onLoad:function(options){
    var that = this;
    console.log("用户信息",app.globalData.userInfo);
    var memberName = app.globalData.userInfo.realName;//会员姓名
    var memberPhone = app.globalData.userInfo.phone;//会员电话
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
                  'detail.memberName':memberName,
                  'detail.memberPhone':memberPhone,
                  'detail.memberLevel':'高级',
                  'detail.shopLogo':arr.shop.logo,
                  'detail.shopName':arr.shop.name,
                  'detail.serviceLogo':arr.logo,
                  'detail.serviceName':arr.name,
                  'detail.price':arr.price,
                  'detail.oriPrice':arr.oriPrice,
                  'detail.payStrategy':arr.payStrategy
                })
            }else {
               alert("res.data.errorMsg");
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
          alert(res.data.errorMsg);
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
          alert(res.data.errorMsg);
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
          alert(res.data.errorMsg);
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
          })
        }
        // 
        if(that.data.balance){
        // 余额
        wx.showModal({
              content: "请再次确认是否使用余额支付",
              confirmText: "确认",
              cancelText: "取消",
              success:function(e){
                console.log('确认');
                that.setData({
                  payType:'MEMBER_CARD'
                });
                console.log('提交订单支付',that.data);
                // 立即支付
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
                        url: '../wait-pay/wait-pay?orderNo='+ that.data.detail.orderNo+'&orderStatus=PAY',
                      })
                    }
                  }
                })
              }
            })
        }else {
          // 立即支付
          console.log("weixin支付",that.data);
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
                  url: '../wait-pay/wait-pay?orderNo='+ that.data.detail.orderNo+'&orderStatus=PAY',
                })
              }
            }
          })
        }
      }
    })
  }
})