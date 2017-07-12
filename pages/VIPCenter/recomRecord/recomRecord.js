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
    //获取用户信息
    this.setData({ userId: app.globalData.HEADER.uid })
    wx.getSystemInfo({
      success:(res)=> {
        this.setData({
          windowHeight: res.windowHeight
        });
      }

    });
    //console.log(this.data.pageNo)
    wx.request({
      url: HOST + '/distribute/listDistributeUser',
      //url: HOST + '/service/list',
      method: 'POST',
      //data: { cat: 1, shopId: 10, pageNo: this.data.pageNo, pageSize: 10 },
      data:{
        //referrerId: this.data.userId,
        referrerId:18981,
         referrerType: "USER",
         pageSize:10,
         pageNo: this.data.pageNo
      },
      header: app.globalData.HEADER,
      success: (res) => {
        console.log(res.data.result.list)
        let dat = res.data.result.list
        let len = dat.length;
        for(let i in dat){
          let datn = dat[i];
          datn.customerPhone = util.stringNum(datn.customerPhone)
          datn.createdTime = util.secondTimestamp(datn.createdTime)
        }
        this.setData({ dataList: dat })
        dat.length < 10 ? this.setData({ hothidden: false }) : this.setData({ hothidden: true })
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
        url: HOST + '/distribute/listDistributeUser',
        //url: HOST + '/service/list',
        method: 'POST',
        //data: { cat: 1, shopId: 10, pageNo: num + 1, pageSize: 10 },
        data: {
          referrerId: this.data.userId,
          //referrerId: 18981,
          referrerType: "USER",
          pageSize: 10,
          pageNo: num+1
        },
        header: app.globalData.HEADER,
        success: (res) => {
          console.log(res.data.result)
          let newList = res.data.result.list;
          console.log(res.data.result)
          let len = newList.length;
          for(let i in newList){
            let listm = newList[i];
            listm.customerPhone = util.stringNum(listm.customerPhone)
            listm.createdTime = util.secondTimestamp(listm.createdTime)
          }
          if (len < 10) {
            console.log("------2222222-----")
            this.setData({
              dataList: list1.concat(newList),
              hothidden: false,
              isBolen: true
            })
          } else {
            this.setData({
              dataList: list1.concat(newList),
              pageNo: num + 1
            })
            console.log("------1111111-----")

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