Page({
  data:{
    array: [
      {
      id:"1",
      logo:'../../../images/order/gou@2x.png',
      shopName:'Cocodemer杭州大厦店',
      payStatus:"未付款",
      orderTime:'2016-05-25 16:04',
      orderDetail:[
        {
          id:"11",
          orderName:'Cocodemer面部护理1',
          note:5000,
        },{
          id:"12",
          orderName:'Cocodemer面部护理2',
          note:5100,
        }
      ],
      orderTotal:2,
      combind:10338,
      operate:["取消订单","立即支付"]
    }, {
      id:"2",
      logo:'../../../images/order/gou@2x.png',
      shopName:'Cocodemer杭州大厦店',
      payStatus:"未付款",
      orderTime:'2016-05-25 16:04',
      orderDetail:[
        {
          id:"21",
          orderName:'Cocodemer面部护理1',
          note:"已完成",
        },{
          id:"22",
          orderName:'Cocodemer面部护理2',
          note:"可使用",
        },{
          id:"23",
          orderName:'Cocodemer面部护理3',
          note:"待评价",
        }
      ],
      orderTotal:3,
      combind:10338,
      operate:["联系客服"]
    },{
      id:"2",
      logo:'../../../images/order/gou@2x.png',
      shopName:'Cocodemer杭州大厦店',
      payStatus:"已过期",
      orderTime:'2016-05-25 16:04',
      orderDetail:[
        {
          id:"31",
          orderName:'Cocodemer面部护理1',
          note:"10338",
        }
      ],
      orderTotal:3,
      combind:10338,
      operate:["需支付￥5,1669"]
    }]
  },
  // 订单跳转到订单详情
  orderDetail:function(){
    console.log("跳转到订单详情");
    wx.navigateTo({
      url: './pages/wait-pay/wait-pay'
    })
  }
})