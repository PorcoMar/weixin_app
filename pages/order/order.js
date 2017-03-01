var app = getApp();
var url = app.globalData.HOST;

Page({
  data:{},
  // 订单跳转到订单详情
  orderDetail:function(e){
    // 获取当前下标的id
    var status = e.currentTarget.dataset.status;
    console.log("订单状态",status);
    var orderId = e.currentTarget.dataset.id;
    console.log(orderId);
    var orderNo = this.data.orderArray[orderId].orderNo
    console.log(orderNo);
    // 设置全局请求访问传递的参数
    // app.requestDetailid = id;

    wx.navigateTo({
      url: './pages/wait-pay/wait-pay?orderNo='+orderNo+'&orderStatus='+status
    })
  },
  onLoad: function () {
    console.log("---index onload---");
    var that = this;
    that.setData({
      pageNo:1,
      pageSize:10
    })
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
        console.log("全部订单分页列表",res);
        if(res.statusCode == 401){
          wx.navigateTo({
            url: '../personal/bindPhone/bindPhone',
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
        }else {
          if(res.data.code == "0"){
            console.log("获取订单列表成功！")
  //        console.log(orderArray);
            var arr = res.data.result;
            // if(arr.length != 0){
              arr.map(function(item,index,array){
                item["createdTime"] = app.formateTime(item["createdTime"]);
                item["status"] = app.formateStatus(item["status"]);
                if(item['orderItem'] != null){
                item["orderItem"].map(function(item,index,array){
                  item['status'] = app.formateServiceStatus(item['status']);
                })
                }
                // console.log(item["createdTime"]);
              })
            // }else {
              // arr = false;
            // }         
            that.setData({
              orderArray:arr,
            });
          }else{
            console.log(res.data.errorMsg);
          }
        }
        
        console.log(that.data.orderArray);
      },
      fail: function(res){
        
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
  
  // 底部加载更多
  onReachBottom: function( e ) {
    console.log('加载更多');
    var that = this;
        var pageNo = that.data.pageNo+1;
        // var cat=that.data.cat
        var pageSize = that.data.pageSize;
        wx.request({
          url: url+'/order/query',
          data: {
            pageNo:pageNo,
            pageSize:pageSize
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: app.globalData.HEADER, // 设置请求的 header
          success: function(res){
            // success
            console.log("全部订单分页列表",res.data);
            var arr = that.data.orderArray;
            if(res.data.code == "0"){
              console.log("获取订单列表成功！")
    //        console.log(orderArray);
              var list = res.data.result;
              list.map(function(item,index,array){
                item["createdTime"] = app.formateTime(item["createdTime"]);
                item["status"] = app.formateStatus(item["status"]);
                if(item['orderItem'] != null){
                item["orderItem"].map(function(item,index,array){
                  item['status'] = app.formateServiceStatus(item['status']);
                })
                }
                // console.log(item["createdTime"]);
              })
              
              that.setData({
                orderArray:arr.concat(list),
              });

            }
            console.log(that.data.orderArray);
          }
        });
        
    }
})