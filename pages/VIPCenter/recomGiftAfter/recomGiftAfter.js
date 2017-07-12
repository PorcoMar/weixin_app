const util = require('../../../utils/util.js');
var app = getApp();
var HOST = app.globalData.HOST;
Page({
  data: {
    wxInfo: null,
    userInfo: null,
    record:true
  },

  onLoad: function (options) {
    //获取用户信息
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
        if(!datan){
          this.setData({
            canAmount:0,
            totalAmount:0,
            subUserCount:0,
            orderCount:0,
            pastAmount:0
          })
        }else{
          this.setData({
            canAmount: util.toMoney(datan.canAmount),
            totalAmount: util.toMoney(datan.totalAmount),
            subUserCount: datan.subUserCount,
            orderCount: datan.orderCount,
            pastAmount: util.toMoney(datan.pastAmount)
          })
        }

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
        console.log(dataList)
        if(dataList.length==0){
          this.setData({ record:false})
        }
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