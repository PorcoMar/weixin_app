var app = getApp();
var url = app.globalData.HOST;

Page({
  data: {
    footer: ""
  },
  // 订单跳转到订单详情
  orderDetail: function (e) {
    // 获取当前下标的id
    var status = e.currentTarget.dataset.status;
    console.log("订单状态", status);
    var orderId = e.currentTarget.dataset.id;
    console.log(orderId);
    var orderNo = this.data.orderArray[orderId].orderNo
    console.log(orderNo);
    // 设置全局请求访问传递的参数
    // app.requestDetailid = id;

    // wx.navigateTo({
    //   url: './pages/wait-pay/wait-pay?orderNo=' + orderNo + '&orderStatus=' + status
    // })
  },
  onLoad: function () {
    console.log("---index onload---", app.globalData.orderType);
    var that = this;
    that.setData({
      pageNo: 1,
      pageSize: 10
    });
    var token = app.globalData.HEADER.token;
    var uid = app.globalData.HEADER.uid;
    console.log("uid", uid);
    if (token && uid) {
      wx.request({
        url: url + '/order/query',
        data: {
          pageNo: 1,
          pageSize: 10,
          status: app.globalData.orderType
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: app.globalData.HEADER, // 设置请求的 header
        success: function (res) {
          // success
          console.log("全部订单分页列表", res);
          if (res.data.code == 0) {
            var arr = res.data.result;
            // console.log(arr);
            arr.map(function (item, index, array) {
              item["createdTime"] = app.formateTime(item["createdTime"]);
              item["status"] = app.formateStatus(item["status"]);
              if (item['orderItem'] != null) {
                item["orderItem"].map(function (item, index, array) {
                  // console.log("状态",item['status']);
                  item['status'] = app.formateServiceStatus(item['status']);
                  // item['status'] = item['status'];
                })
              }
              if (!item['shopLogo']) {
                item["shopLogo"] = '../../images/order/logo.jpg';
              }
            })
            that.setData({
              orderArray: arr,
            });
          } else {
            console.log(res.data.errorMsg);
            wx.showToast({
              title: res.data.errorMsg,
              duration: 2000
            })
          }

          console.log(that.data.orderArray);
        }
      });
    } else {
      wx.navigateTo({
        url: '../personal/bindPhone/bindPhone',
      })
    }

  },
  onPullDownRefresh: function () {
    // console.log("下拉刷新");
    // 隐藏下拉刷新动画
    wx.stopPullDownRefresh();
    this.onLoad();
  },
  // 联系客服
  phoneCall: function (e) {
    var that = this;
    var orderId = e.currentTarget.dataset.id;
    console.log("点击下标", orderId);
    var orderNo = this.data.orderArray[orderId].orderNo
    console.log(orderNo);
    wx.request({
      url: url + '/order/info',
      data: {
        orderNo: orderNo
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: app.globalData.HEADER,
      success: function (res) {
        // success
        console.log('订单电话', res.data);
        var sellerPhone = res.data.result.sellerTel;
        var arr = sellerPhone.split("-");
        sellerPhone = arr.join("");
        console.log(sellerPhone, typeof (sellerPhone));
        that.setData({
          sellerPhone: "400-902-3323"
        });
        wx.makePhoneCall({
          phoneNumber: that.data.sellerPhone,
          success: function (res) {
            // success
            console.log("联系客服");
          }
        })
      }
    })
  },

  // 底部加载更多
  onReachBottom: function (e) {
    var that = this;
    if (that.data.orderArray.length == (that.data.pageNo * 10)) {
      console.log('加载更多');
      var pageNo = that.data.pageNo + 1;
      // var cat=that.data.cat
      var pageSize = that.data.pageSize;
      console.log("pageNo:", pageNo, "pageSize", pageSize);

      wx.request({
        url: url + '/order/query',
        data: {
          pageNo: pageNo,
          pageSize: pageSize,
          status: app.globalData.orderType
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: app.globalData.HEADER, // 设置请求的 header
        success: function (res) {
          // success
          that.setData({
            pageNo: pageNo,
            pageSize: pageSize
          });
          console.log("全部订单分页列表", res.data);
          var arr = that.data.orderArray;
          if (res.data.code == "0") {
            console.log("获取订单列表成功！")
            //        console.log(orderArray);
            var list = res.data.result;
            list.map(function (item, index, array) {
              item["createdTime"] = app.formateTime(item["createdTime"]);
              item["status"] = app.formateStatus(item["status"]);
              if (item['orderItem'] != null) {
                item["orderItem"].map(function (item, index, array) {
                  item['status'] = app.formateServiceStatus(item['status']);
                })
              }
            })

            that.setData({
              orderArray: arr.concat(list),
            });

          }
          // console.log(that.data.orderArray);
        }
      });
    } else {
      console.log("已经到底了！");
      that.setData({
        footer: "已经到底了哦~"
      })
    }
  }
})