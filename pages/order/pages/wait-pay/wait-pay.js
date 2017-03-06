// pages/order/pages/wait-pay/wait-pay.js
var app = getApp();
var url = app.globalData.HOST;

Page({
  data:{
    orderObject:{},
    weixinImg:'../../../../images/order/checked@3x.png',
    weixin:false,
    balance:true,
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
          var overSecond = app.formateSecond(object.overSecond);
          setInterval(function(){
            // console.log('倒计时');
            overSecond = app.formateSecond(object.overSecond);
            object.overSecond = object.overSecond - 1;
            that.setData({
              'orderObject.overSecond':overSecond//剩余支付时间
            })
          },1000)
          
          that.setData({
            
            'orderObject.oriPrice':object.oriPrice,//订单总额
            'orderObject.price':object.price,//实付款
            'orderObject.memPrice':object.memberCardPrice,//商户会员抵扣
            'orderObject.name':object.name,//下单人
            'orderObject.phone':object.phone,//联系电话
            'orderObject.orderNo':object.orderNo,//订单编号
            'orderObject.payType':object.payType || 'MEMBER_CARD',//支付方法
            'orderObject.createTime':createTime,//下单时间
            'orderObject.totalCount':object.quantity,//服务数量
            'orderObject.overSecond':overSecond,//剩余支付时间
            'orderObject.sellerPhone':object.sellerTel,//客服电话
            'orderObject.payStrategy':object.payStrategy//支付方式
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
  // 立即支付
  payImmediately:function(){
    var that = this;
    var payData = {};
    if(that.data.weixin){
      payData = {
        orderNo:that.data.orderObject.orderNo,
        payType:"WX",
        payStrategy:that.data.orderObject.payStrategy || "ALL",
        price:that.data.orderObject.price,
        openId:app.globalData.openid
      };
      wx.request({
        url: url + '/order/confirm',
        data: payData,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: app.globalData.HEADER, // 设置请求的 header
        success: function(res){
          // success
          console.log('立即支付',res,payData);
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
                    url: '../wait-pay/wait-pay?orderNo='+ payData.orderNo+'&orderStatus=已付款',
                  })
                },
                'fail':function(res){
                  console.log("支付失败！");
                  wx.navigateTo({
                    url: '../wait-pay/wait-pay?orderNo='+ payData.orderNo+'&orderStatus=待付款',
                  })
                }
              })           
          }else {
            console.log('支付失败',res,payData);
            wx.showToast({
              title: res.data.errorMsg,
              duration: 2000
            })
          }
        }
      })
    }else {
      payData = {
        orderNo:that.data.orderObject.orderNo,
        payType:"MEMBER_CARD",
        payStrategy:that.data.orderObject.payStrategy || "ALL",
        price:that.data.orderObject.price
      };
      wx.showModal({
        content: "请再次确认是否使用余额支付",
        confirmText: "确认",
        cancelText: "取消",
        success:function(res){
          // 立即支付
          console.log('立即支付',payData);
          // 确认
          if(res.confirm){
            wx.request({
              url: url + '/order/confirm',
              data: payData,
              method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              header: app.globalData.HEADER, // 设置请求的 header
              success: function(res){
                // success
                console.log('立即支付',res);
                // console.log(that.data.detail.orderNo,that.data.payType,that.data.detail.payStrategy,that.data.detail.orderPrice)
                if(res.data.code === '0'){
                  console.log('订单支付成功！');
                  wx.navigateTo({
                    url: '../wait-pay/wait-pay?orderNo='+ payData.orderNo+'&orderStatus=已付款',
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
          }else{
            // 取消
            console.log("订单未支付！")
             wx.navigateTo({
                url: '../wait-pay/wait-pay?orderNo='+ payData.orderNo+'&orderStatus=待付款',
             })
          }
        }
      })
    
    }
    console.log("立即支付",payData);
    

  }
})