// pages/personal/balance/balance.js
var app = getApp();
var HOST = getApp().globalData.HOST;
Page({
  data:{
    memberJournalList:[],
    page:{
      pageNo:1,
      pageSize:10
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var page = this.data.page;
    wx.request({
      url: HOST + "/user/memberJournalList",
      data:page,
      method: 'POST', 
      header: getApp().globalData.HEADER, 
      success: function(res){
        console.log("----res data-----");
        if(res.data.code == "0"){
          console.log(res.data);
          var result = res.data.result;
          result.map(function(item,index,array){
            item["createTime"] = app.formateTime(item["createTime"]);
          });
          var memberJournalList = that.data.memberJournalList.concat(result);
          that.setData({memberJournalList:memberJournalList});
        };
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  downMore:function(){
    console.log("-----more-----");
    var page = this.data.page;
    page.pageNo += 1;
    this.setData({page:page});
    
    this.onLoad();
  },

})