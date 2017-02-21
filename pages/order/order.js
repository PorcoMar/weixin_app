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
      url: './pages/wait-pay/wait-pay?orderNo='+orderNo+'&orderStatus='+id
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
        console.log("全部订单分页列表",res.data);
        if(res.data.code == "0"){
          console.log("获取订单列表成功！")
//        console.log(orderArray);
          var arr = res.data.result;
          
          arr.map(function(item,index,array){
            item["createdTime"] = app.formateTime(item["createdTime"]);
            item["status"] = app.formateStatus(item["status"]);
            item["orderItem"].map(function(item,index,array){
              item['status'] = app.formateServiceStatus(item['status']);
            })
            // console.log(item["createdTime"]);
          })
          
          that.setData({
          	orderArray:arr,
          });

        }
        console.log(that.data.orderArray);
      }
    });
  },
  // 联系客服
  phoneCall:function(e){
    var that = this;
    var orderId = e.currentTarget.dataset.id;
    console.log("点击下标",orderId);
    var orderNo = this.data.orderArray[orderId].orderNo
    console.log(orderNo);
    wx.request({
      url: url + '/order/info',
      data: {
        orderNo:orderNo
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: app.globalData.HEADER,
      success: function(res){
        // success
        console.log('订单电话',res.data);
        var sellerPhone = res.data.result.sellerTel;
        var arr = sellerPhone.split("-");
        sellerPhone = arr.join("");
        console.log(sellerPhone,typeof(sellerPhone));
        that.setData({
          sellerPhone:sellerPhone
        });
        wx.makePhoneCall({
          phoneNumber: that.data.sellerPhone,
          success: function(res) {
            // success
            console.log("联系客服");
          }
        })
      }
    })
    
  },
  // 支付尾款
  timeChange:function(){
    console.log("time");
  }
})