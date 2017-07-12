// appointment.js
var app = getApp();
var HOST = app.globalData.HOST;
var HEADER = app.globalData.HEADER;
var util = require('../../utils/util.js');  
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chooseDate:null,
    chooseTime:null,
    dateList:null,
    timeList: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"],
    timeReserve:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var date = util.nextWeek(new Date());
    console.log(date);
    //获取预约门店时间列表
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    that.setData({
      dateList: date,
      chooseDate: 0
    });
    // var id = e.currentTarget.dataset.id;
    // var dateList = that.data.dateList;
    // this.setData({ chooseDate: id });
    // console.log(e.currentTarget.dataset.id);
    var reserveDay = date[0].year + "-" + date[0].date;
    var shopId = app.globalData.shop.id;
    //获取预约门店时间列表
    wx.request({
      url: HOST + "/wx/listReserveShopTime",
      data: {
        reserveDay: reserveDay,
        shopId: shopId
      },
      method: 'POST',
      header: HEADER,
      success: function (res) {
        console.log("----get timeReserve successed----", res);
        if (res.data.code == "0") {
          var timeReserve = res.data.result;
          // var numArr = ["time0", "time1", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9", "time10", "time11"];
          var arr = [];
          console.log(timeReserve);
          var objKeys = Object.keys(timeReserve);
          objKeys = objKeys.sort();//这里写所需要的规则
          for (var i = 0; i < objKeys.length; i++) {
            // console.log(objKeys[i] + " : " + timeReserve[objKeys[i]]);
            arr.push(timeReserve[objKeys[i]]);
          }
          var time10 = arr[2];
          var time11 = arr[3];
          arr.splice(2,2);
          arr.push(time10);
          arr.push(time11);
          console.log(arr);
          that.setData({ timeReserve: arr });
        };
      }
    })
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
    // var dateList = this.data.dateList;
    // var chooseDate = this.data.chooseDate;
    // var reserveDay = dateList[chooseDate].year + "-" + dateList[chooseDate].date;
    // var shopId = app.globalData.shop.id;
    // wx.request({
    //   url: HOST + "/wx/listReserveShopTime",
    //   data: {
    //     reserveDay: reserveDay,
    //     shopId: shopId
    //   },
    //   method: 'POST',
    //   header: HEADER,
    //   success: function (res) {
    //     console.log("----get timeReserve successed----", res);
    //     if (res.data.code == "0") {
    //       var timeReserve = res.data.result;
    //       console.log(timeReserve);
    //       var arr = [];
    //       for (var item in timeReserve) {
    //         arr.push(timeReserve[item]);
    //       }
    //       that.setData({ timeReserve: arr });
    //     };
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that =this;
    var dateList = this.data.dateList;
    var chooseDate = this.data.chooseDate;
    var reserveDay = dateList[chooseDate].year + "-" + dateList[chooseDate].date;
    var shopId = app.globalData.shop.id;
    wx.request({
      url: HOST + "/wx/listReserveShopTime",
      data: {
        reserveDay: reserveDay,
        shopId: shopId
      },
      method: 'POST',
      header: HEADER,
      success: function (res) {
        console.log("----get timeReserve successed----", res);
        if (res.data.code == "0") {
          var timeReserve = res.data.result;
          // var numArr = ["time0", "time1", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9", "time10", "time11"];
          var arr = [];
          console.log(timeReserve);
          var objKeys = Object.keys(timeReserve);
          objKeys = objKeys.sort();//这里写所需要的规则
          for (var i = 0; i < objKeys.length; i++) {
            // console.log(objKeys[i] + " : " + timeReserve[objKeys[i]]);
            arr.push(timeReserve[objKeys[i]]);
          }
          var time10 = arr[2];
          var time11 = arr[3];
          arr.splice(2, 2);
          arr.push(time10);
          arr.push(time11);
          console.log(arr);
          that.setData({ timeReserve: arr });
        };
      }
    })
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 提交预约
  submitAppointment:function(){
    var userId = app.globalData.HEADER.uid;
    var shopId = app.globalData.shop.id;
    var sellerId = 1;
    var data = this.data;
    var reserveTime = data.dateList[data.chooseDate].year + '-' + data.dateList[data.chooseDate].date+' '+data.timeList[data.chooseTime] +':00';
    console.log(userId,shopId,sellerId,reserveTime);
    //添加预约到店
    if(userId){
      wx.request({
        url: HOST + "/wx/addReserveShop",
        data: {
          userId: userId,
          shopId: shopId,
          sellerId: sellerId,
          reserveTime: reserveTime
        },
        method: 'POST',
        header: HEADER,
        success: function (res) {
          console.log("---- addReserveShop successed----", res);
          if (res.data.code == "0") {
            wx.navigateTo({
              url: './appointmentSuccess/appointmentSuccess',
            })
            // var timeReserve = res.data.result;
            // console.log(timeReserve);
            // var arr = [];
            // for (var item in timeReserve) {
            //   arr.push(timeReserve[item]);
            // }
            // that.setData({ timeReserve: arr });
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.errorMsg,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          };
        }
      })
    } else {
      wx.navigateTo({
        url: '../personal/bindPhone/bindPhone',
      })
    } 
  },
  // 修改日期
  changeDate:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var dateList = that.data.dateList;
    this.setData({ chooseDate:id});
    // console.log(e.currentTarget.dataset.id);
    var reserveDay = dateList[id].year+"-"+dateList[id].date;
    var shopId = app.globalData.shop.id;
    wx.request({
      url: HOST + "/wx/listReserveShopTime",
      data: {
        reserveDay: reserveDay,
        shopId: shopId
      },
      method: 'POST',
      header: HEADER,
      success: function (res) {
        console.log("----get timeReserve successed----", res);
        if (res.data.code == "0") {
          var timeReserve = res.data.result;
          // var numArr = ["time0", "time1", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9", "time10", "time11"];
          var arr = [];
          console.log(timeReserve);
          var objKeys = Object.keys(timeReserve);
          objKeys = objKeys.sort();//这里写所需要的规则
          for (var i = 0; i < objKeys.length; i++) {
            // console.log(objKeys[i] + " : " + timeReserve[objKeys[i]]);
            arr.push(timeReserve[objKeys[i]]);
          }
          var time10 = arr[2];
          var time11 = arr[3];
          arr.splice(2, 2);
          arr.push(time10);
          arr.push(time11);
          console.log(arr);
          that.setData({ timeReserve: arr });
        };
      }
    })
  },
  //修改时间
  changeTime:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    this.setData({ chooseTime: id });
  }
})