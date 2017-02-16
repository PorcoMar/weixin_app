var app = getApp();
var url = app.globalData.HOST;
Page({
  data:{
    array: [
      {
      id:"1",
      logo:'../../../images/order/gou@2x.png',
      shopName:'Cocodemer杭州大厦店',
      payStatus:"待付款",
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
        },{
          id:"13",
          orderName:'Cocodemer面部护理2',
          note:5200,
        },{
          id:"14",
          orderName:'Cocodemer面部护理2',
          note:5300,
        }
      ],
      orderTotal:2,
      combind:10338,
      operate:["立即支付","取消订单"]
    },{
      id:"2",
      logo:'../../../images/order/gou@2x.png',
      shopName:'Cocodemer杭州大厦店',
      payStatus:"待付尾款",
      orderTime:'2016-05-25 16:04',
      orderDetail:[
        {
          id:"21",
          orderName:'Cocodemer面部护理1',
          note:5000,
        }
      ],
      totalPrice:5169,
      blance:5200,
      operate:["立即支付","取消订单"]
    },{
      id:"2",
      logo:'../../../images/order/gou@2x.png',
      shopName:'Cocodemer杭州大厦店',
      payStatus:"已付款",
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
      id:"3",
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
  orderDetail:function(e){
    // 获取当前下标的id
    var id = e.currentTarget.id;
    // 获取全局对象
    var app = getApp();
    // 设置全局请求访问传递的参数
    app.requestDetailid = id;
    wx.navigateTo({
      url: './pages/wait-pay/wait-pay'
    })
  },
  onLoad: function () {
    console.log("---index onload---");
    wx.request({
      url: url+'/order/query',
      data: {
        pageNo:1,
        pageSize:10
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type':'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
      },
      fail: function() {
        // fail
        alert("fail")
      },
      complete: function() {
        // complete
      }
    })
  },
  onShow:function(){
    console.log("---index onShow----")
  },
  onReady:function(){
    console.log("---index onReady---")
  },
  onHide:function(){
    console.log("---index onHide----")
  },
  onUnload:function(){
    console.log("----index onUnload----")
  }
})