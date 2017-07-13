const util = require('../../../utils/util.js');
var app = getApp();
var HOST = app.globalData.HOST;
Page({
  data: {
    wxInfo: null,
    userInfo: null,
    hothidden: true,
    pageNo: 1,
  },
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight
        });
      }

    });
    this.setData({ userId: app.globalData.HEADER.uid })
//礼金记录
    wx.request({
      url:HOST+"/distribute/listAmountFlow",
      method:"post",
      header: app.globalData.HEADER,
      data:{
        //userId:18981,
        userId:this.data.userId,
        pageNo: this.data.pageNo,
        pageSize:10,
      },
      success:(res)=>{
        console.log(res)
        let dataList = res.data.result.list;
        if (!dataList) { this.setData({ hothidden:false})}
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
            datan.color = "#fc5a5f"
          }
          datan.phone = util.stringNum(datan.phone)
          datan.createdTime = util.secondTimestamp(datan.createdTime)
          datan.amount = util.toMoney(datan.amount)
        }
        this.setData({ dataList: newList })
        dataList.length < 10 ? this.setData({ hothidden: false }) : this.setData({ hothidden: true })
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
        if (!datn){
          this.setData({
            canAmount: 0,
            waitAmount: 0,
          })
        }else{
          datn.canAmount ? this.setData({ canAmount: util.toMoney(datn.canAmount) }) : this.setData({ canAmount: 0 })
          datn.waitAmount ? this.setData({ waitAmount: util.toMoney(datn.waitAmount) }) : this.setData({ waitAmount: 0 })
        }
        
      }
    })
  },
  scrolltolower: function (e) {
    if (this.data.isBolen) {
      this.setData({ hothidden: false })
    } else {
      this.setData({ hothidden: true })
      let list1 = this.data.dataList;
      let num = this.data.pageNo;
      wx.request({
        url: HOST + '/distribute/listAmountFlow',
        //url: HOST + '/service/list',
        method: 'POST',
        //data: { cat: 1, shopId: 10, pageNo: num + 1, pageSize: 10 },
        data: {
          userId: this.data.userId,
          //userId: 18981,
          pageSize: 10,
          pageNo: num + 1
        },
        header: app.globalData.HEADER,
        success: (res) => {
          console.log(res)
          let dataList = res.data.result.list;
          let len = dataList.length;
          let list1 = this.data.dataList;
          for (let i in dataList) {
            let datan = dataList[i];
            if (datan.amountStatus == "VERIFY") {
              datan.amountStatus = "待处理"
              datan.color = "#8f8f8f"
            } else if (datan.amountStatus == "REFUSE") {
              datan.amountStatus = "提现失败"
              datan.color = "#8f8f8f"
            } else if (datan.amountStatus == "SUCCESS") {
              datan.amountStatus = "审查通过"
              datan.color = "#fc5a5f"
            }
            datan.phone = util.stringNum(datan.phone)
            datan.createdTime = util.secondTimestamp(datan.createdTime)
            datan.amount = util.toMoney(datan.amount)
          }
          console.log(dataList)
          if (len < 10) {
            console.log("------2222222-----")
            this.setData({
              dataList: list1.concat(dataList),
              hothidden: false,
              isBolen: true
            })
          } else {
            this.setData({
              dataList: list1.concat(dataList),
              pageNo: num + 1
            })
            console.log("------1111111-----")
            return false;

          }
        }
      })
    }
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