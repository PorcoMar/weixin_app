// pages/order/pages/submit-order/submit-order.js
Page({
  data:{
    member:{
      name:"韩梅梅",
      phone:14253698532,
      level:"高级"
    },
    weixinImg:'../../../../images/order/checked@3x.png',
    weixin:true,
    balance:false,
    payType:'WX',
    serviceCount:1
  },
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
  // 购买数量选择
  serviceAdd:function(){
    console.log('增加购买数量');
    var num = this.data.serviceCount + 1;
    this.setData({
      serviceCount:num
    });
    console.log(this.data.serviceCount);
  },
  serviceReduce:function(){
    console.log("减少购买数量");
    var num = this.data.serviceCount - 1;
    if(num <= 1){
      num = 1;
    }
    this.setData({
      serviceCount:num
    });
    console.log(this.data.serviceCount);
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
    if(this.data.balance){
      wx.showModal({
        content: "   请再次确认是否使用余额支付",
        confirmText: "确认",
        cancelText: "取消",
        success:function(e){
          console.log('确认');
          that.setData({
            payType:'MEMBER_CARD'
          });
          // 调下订单接口
          wx.request({
            url: 'https://URL',
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
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
        },
        fail:function(){
          
        }
      })
   }
  }
})