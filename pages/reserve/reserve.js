// reserve.js
var app = getApp();
var HOST = app.globalData.HOST;
var HEADER = app.globalData.HEADER;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reserveList:null,
    footer: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userId = app.globalData.HEADER.uid;
    var sellerId = 1;
    var type = "SHOP";
    var status = "CREATE";
    //该客户所有预约到店的记录
    var that = this;
    that.setData({
      pageNo: 1,
      pageSize: 10
    });
    wx.request({
      url: HOST + "/wx/listReserveShop",
      data: {
        userId: userId,
        sellerId: sellerId,
        type: type,
        status: status,
        pageNo: 1,
        pageSize: 10
      },
      method: 'POST',
      header: HEADER,
      success: function (res) {
        console.log("----get listReserveShop successed----", res);
        if (res.data.code == "0") {
          var reserveList = res.data.result.list;
          reserveList.map(function (item, index, array) {
            item["createdTime"] = app.formateTime(item["createdTime"]);
            item["modifiedTime"] = app.formateTime(item["modifiedTime"]);
            item["endTime"] = app.showTime(item["reserveTime"]);
            item["reserveTime"] = app.formateNormalTime(item["reserveTime"]);
          })
          that.setData({
            reserveList: reserveList,
          });
        } else {
          console.log(res.data.errorMsg);
          wx.showToast({
            title: res.data.errorMsg,
            duration: 2000
          })
        };
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // console.log("下拉刷新");
    // 隐藏下拉刷新动画
    wx.stopPullDownRefresh();
    this.onShow();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var userId = app.globalData.HEADER.uid;
    var sellerId = 1;
    var type = "SHOP";
    var status = "CREATE";
    //该客户所有预约到店的记录
    var that = this;
    if (that.data.reserveList.length == (that.data.pageNo * 10)) {
      console.log('加载更多');
      var pageNo = that.data.pageNo + 1;
      // var cat=that.data.cat
      var pageSize = that.data.pageSize;
      console.log("pageNo:", pageNo, "pageSize", pageSize);
      wx.request({
        url: HOST + '/wx/listReserveShop',
        data: {
          userId: userId,
          sellerId: sellerId,
          type: type,
          status: status,
          pageNo: pageNo,
          pageSize: pageSize
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
          var arr = that.data.reserveList;
          if (res.data.code == "0") {
            console.log("获取订单列表成功！")
            //        console.log(orderArray);
            var list = res.data.result.list;
            list.map(function (item, index, array) {
              item["createdTime"] = app.formateTime(item["createdTime"]);
              item["modifiedTime"] = app.formateTime(item["modifiedTime"]);
              item["endTime"] = app.showTime(item["reserveTime"]);
              item["reserveTime"] = app.formateNormalTime(item["reserveTime"]);
            })

            that.setData({
              reserveList: arr.concat(list),
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 跳转到历史预约记录列表
  checkHistoryList:function(){
    wx.navigateTo({
      url: './reserveHistory/reserveHistory',
    })
  },
  // 联系客服
  contactService:function(e){
    var phone = e.currentTarget.dataset.phone;
    console.log(phone);
    wx.makePhoneCall({
      phoneNumber: phone //仅为示例，并非真实的电话号码
    })
  },
  //取消预约
  cancelReserve:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id);
    var that = this;
    wx.request({
      url: HOST + "/wx/reserveShopCancel",
      data: {
        id:id
      },
      method: 'POST',
      header: HEADER,
      success: function (res) {
        console.log('rs', res);
        if (res.data.code == "0") {
          var userId = app.globalData.HEADER.uid;
          var sellerId = 1;
          var type = "SHOP";
          var status = "CREATE";
          //该客户所有预约到店的记录
          wx.request({
            url: HOST + "/wx/listReserveShop",
            data: {
              userId: userId,
              sellerId: sellerId,
              type: type,
              status: status,
              pageNo: 1,
              pageSize: 10
            },
            method: 'POST',
            header: HEADER,
            success: function (res) {
              console.log("----get listReserveShop successed----", res);
              if (res.data.code == "0") {
                var reserveList = res.data.result.list;
                reserveList.map(function (item, index, array) {
                  item["createdTime"] = app.formateTime(item["createdTime"]);
                  item["modifiedTime"] = app.formateTime(item["modifiedTime"]);
                  item["endTime"] = app.showTime(item["reserveTime"]);
                  item["reserveTime"] = app.formateNormalTime(item["reserveTime"]);
                })
                that.setData({
                  reserveList: reserveList,
                });
              } else {
                console.log(res.data.errorMsg);
                wx.showToast({
                  title: res.data.errorMsg,
                  duration: 2000
                })
              };
            }
          })
        }
      }
    })
  }
})