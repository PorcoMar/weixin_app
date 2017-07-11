const util = require('../../../utils/util.js');
var app = getApp();
var HOST = app.globalData.HOST;
Page({
  data: {
    wxInfo: null,
    userInfo: null,
    hothidden: false,
  },
  onLoad: function (options) {
    //获取用户信息
    this.setData({ userId: app.globalData.HEADER.uid })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    //请求推荐记录
    wx.request({
      url: HOST + "/distribute/listDistributeUser",
      method: "POST",
      header: getApp().globalData.HEADER,
      data: {
        //referrerId: this.data.userId,
        referrerId:18981,
        referrerType: "USER",
        pageNo: 1,
        pageSize: 100,
      },
      success: (res) => {
        console.log(res)
        let dataList = res.data.result.list;
        this.setData({ dataList: dataList })
        let newList = this.data.dataList;
        for (let i in newList) {
          let datan = newList[i];
          datan.customerPhone = util.stringNum(datan.customerPhone)
          datan.createdTime = util.secondTimestamp(datan.createdTime)
        }
        this.setData({ dataList: newList })
      }


    });



  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },


})