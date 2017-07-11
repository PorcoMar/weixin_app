const util = require('../../../utils/util.js');
var app = getApp();
var HOST = app.globalData.HOST;
Page({
  data: {
    wxInfo: null,
    userInfo: null
  },
  onLoad: function (options) {
    this.setData({ userId: app.globalData.HEADER.uid })
//礼金记录
    wx.request({
      url:HOST+"/distribute/listAmountFlow",
      method:"post",
      header: app.globalData.HEADER,
      data:{
        //userId:18981,
        userId:this.data.userId,
        pageNo:1,
        pageSize:100,
      },
      success:(res)=>{
        console.log(res)
        let dataList = res.data.result.list;
        this.setData({ dataList: dataList })
        let newList = this.data.dataList;
        for (let i in newList) {
          let datan = newList[i];
          if (datan.amountStatus == "VERIFY") {
            datan.amountStatus = "待处理"
            datan.color = "#8f8f8f"
          } else if (datan.amountStatus == "REFUSE") {
            datan.amountStatus = "提现失败"
            datan.color = "#8f8f8f"
          } else if (datan.amountStatus == "SUCCESS") {
            datan.amountStatus = "审查通过"
            //this.setData({color: "#fc5a5f" })
            datan.color = "#fc5a5f"
          }
          datan.phone = util.stringNum(datan.phone)
          datan.createdTime = util.secondTimestamp(datan.createdTime)
          datan.amount = util.toMoney(datan.amount)
        }
        this.setData({ dataList: newList })
        //console.log(this.data.dataList)
      }
    })
//个人记录
    wx.request({
      url: HOST + "/distribute/getUserDistributeAccount",
      method: "post",
      header: app.globalData.HEADER,
      data: {
        //userId: 18981
        userId:this.data.userId
      },
      success: (res) => {
        console.log(res)
        let datn = res.data.result;
        if(!res.data.result){
          this.setData({
            canAmount: 0,
            totalAmount: 0,
          })
        }else{
          this.setData({
            canAmount: util.toMoney(datn.canAmount),
            totalAmount: util.toMoney(datn.totalAmount),
          })
        }
        


      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },


})