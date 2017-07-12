const util = require('../../../utils/util.js');
var app = getApp();
var HOST = app.globalData.HOST;
Page({
  data: {
    wxInfo: null,
    userInfo: null
  },

  onLoad: function (options) {
    //获取用户信息
    console.log(util.secondTimestamp(1499245853))
    console.log(util.stringNum(13678765465))
    let info = app.globalData.wxInfo;
    this.setData({wxInfo:info})
    this.setData({ userId: app.globalData.HEADER.uid })
    console.log(this.data.userId)
  },
  onReady: function () {
  // 页面渲染完成
  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: "HEADER",
      success: function (res) {
        //获取用户信息
        getApp().globalData.HEADER = res.data;
        wx.request({
          url: HOST + "/user/info",
          method: "POST",
          header: res.data,
          success: (res)=> {
            console.log(res)
            
          }
        });
      }
    })
//请求个人数据   
console.log(this.data.userId) 
    wx.request({
      url: HOST + "/distribute/getUserDistributeAccount",
      method: "POST",
      header: getApp().globalData.HEADER,
      data:{
      userId: this.data.userId
      //userId: 18981
        },
      success:(res)=> {
        console.log(res)
        let datan  = res.data.result;
        this.setData({
          canAmount: util.toMoney(datan.canAmount),
          totalAmount: util.toMoney(datan.totalAmount),
          subUserCount: datan.subUserCount,
          orderCount: datan.orderCount,
          pastAmount: util.toMoney(datan.pastAmount)
        })
      }
    });
    //请求推荐记录
    wx.request({
      url: HOST + "/distribute/listDistributeUser",
      method: "POST",
      header: getApp().globalData.HEADER,
      data: {
        referrerId: this.data.userId,
        //referrerId: 18981,
        referrerType: "USER",
        pageNo: 1,
        pageSize: 4,
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

  //转发
  onShareAppMessage: function (res) {
    let info = app.globalData;
    console.log(info)
    let infoName = info.wxInfo.nickName;
    let oriOpenId = info.openid
    if (res.from === 'button') {
      // 来自页面内转发按钮
      //console.log(res.target)
    }
    return {
      title: '推荐有礼',
      path: '/pages/VIPCenter/shareGift/shareGift?openid=' + oriOpenId + '&name=' + infoName + "&uid=" + this.data.userId,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  getBash:function(){
    wx.navigateTo({
      url: '/pages/VIPCenter/applyCash/applyCash',
    })
  },
  

})