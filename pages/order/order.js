var app = getApp();
var url = app.globalData.HOST;

Page({
  data:{},
  // 订单跳转到订单详情
  orderDetail:function(e){
    // 获取当前下标的id
    var id = e.currentTarget.id;
    console.log("订单状态",id);
    var orderId = e.currentTarget.dataset.id;
    console.log(orderId);
    var orderNo = this.data.orderArray[orderId].orderNo
    console.log(orderNo);
    // 设置全局请求访问传递的参数
    app.requestDetailid = id;
    wx.navigateTo({
      url: './pages/wait-pay/wait-pay?orderNo='+orderNo
    })
  },
  onLoad: function () {
    console.log("---index onload---");
    var that = this;
    wx.request({
      url: url+'/order/query',
      data: {
        pageNo:1,
        pageSize:10
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: app.globalData.HEADER, // 设置请求的 header
      success: function(res){
        // success
//      console.log("全部订单分页列表",res.data);
        if(res.data.code == "0"){
          console.log("获取订单列表成功！")
//        console.log(orderArray);
          var arr = res.data.result;
          that.setData({
          	orderArray:arr
          })
        }
        console.log(that.data.orderArray);
      },
      fail: function() {
        // fail
        alert("fail")
      },
      complete: function() {
        // complete
      }
    });
    
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