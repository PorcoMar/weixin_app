const util = require('../../../utils/util.js');
var app = getApp();
var HOST = app.globalData.HOST;
Page({
  data: {
    wxInfo: null,
    userInfo: null,
    cash:"",
    name:"",
    num:"",
    placehold:"2000",
    modalHidden1: false,
    modalHidden2: false,
    modalHidden3: false,
    modalHidden4: false,
    modalHidden5: false,
    modalHidden6: false,
  },
  onLoad: function (options) {
    this.setData({ userId: app.globalData.HEADER.uid })
    //console.log(app.globalData)
  //查看提现规则
  wx.request({
    url:HOST+"/distribute/takeoutWarn",
    method:"POST",
    header:getApp().globalData.HEADER,
    success:(res)=>{
      //console.log(res)
      let datap = res.data.result;
      this.setData({
        minTakeout: datap.minTakeout,
        minTakeoutNo: datap.minTakeoutNo
      })
    }
  })
 //查看个人记录
    wx.request({
      url: HOST + "/distribute/getUserDistributeAccount",
      method: "POST",
      header: getApp().globalData.HEADER,
      data: {
      userId: this.data.userId,
      //userId:"18981"
      },
      success:(res)=> {
        console.log(res)
        if(!res.data.result){
          this.setData({
             allMoney: 0,
             placehold:0
           })
        }else{
          this.setData({ allMoney: res.data.result.canAmount })
        }
       
      }
    });  

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
  getgift:function(){
    let name = this.data.name;
    let num = this.data.num;
    let cash = this.data.cash;
   
    if (!name){
      console.log("请填写姓名")
      this.setData({ modalHidden1: true})
    } else if (!num){
      console.log("请填写支付宝账号")
      this.setData({ modalHidden2: true })
    } else if (!cash) {
      if (this.data.allMoney=="0"){
        this.setData({ modalHidden6: true, alertCont:"没有可提现的金额" })
      }else{
        console.log("请填写提现金额")
        this.setData({ modalHidden3: true })
      }

    }else{
      if (cash > this.data.allMoney){
        this.setData({ modalHidden4: true })
      }else{
        //console.log("提现成功")
        //this.setData({ modalHidden5: true })
  //申请提现   
        console.log(name, num, cash, this.data.userId)
    wx.request({
      url: HOST + "/distribute/addTakeOut",
      method: "POST",
      header: getApp().globalData.HEADER,
      data:{
        amount:cash,
        //userId: 18981,
        userId: this.data.userId,
        userName:name,
        alipayAccount:num,
      },
      success:(res)=> {
        console.log(res)
        if(res.data.code=="0"){
          this.setData({ modalHidden5: true })
        }else{
          this.setData({
             modalHidden6: true,
             alertCont: res.data.errorMsg 
             })

        }
      }
    });

      }
    }

  },
  bindCash: function (e) {
    this.setData({
      cash: e.detail.value
    })
  },
  bindName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindNum: function (e) {
    this.setData({
      num: e.detail.value
    })
  },
  allGetCash:function(){
    this.setData({ cash:this.data.allMoney})
  },
  modalChange1: function () {//点击确定,隐藏
    this.setData({
      modalHidden1: false
    })
  },
  modalChange2: function () {//点击确定,隐藏
    this.setData({
      modalHidden2: false
    })
  },
  modalChange3: function () {//点击确定,隐藏
    this.setData({
      modalHidden3: false
    })
  },
  modalChange4: function () {//点击确定,隐藏
    this.setData({
      modalHidden4: false
    })
  },
  modalChange5: function () {
    this.setData({
      modalHidden5: false
    })
      wx.navigateTo({
        url: '/pages/VIPCenter/getGift/getGift',
      })
  },
  modalChange6: function () {//点击确定,隐藏
    this.setData({
      modalHidden6: false
    })
  },


})